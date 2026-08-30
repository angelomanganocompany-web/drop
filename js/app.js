const NETLIFY_API_URL = "https://exquisite-truffle-3d707a.netlify.app/.netlify/functions/api";

let cart = [];
let loadedProducts = [];
let currentConfig = { 
    mode: "shopify", 
    redirectUrl: "", 
    shopifyUrl: "https://hkadip-1s.myshopify.com",
    pythonServerUrl: "http://localhost:5000" 
};

// Prodotti di Default Reali (Fallback immediato con il catalogo Shopify reale per garantire il funzionamento 100% offline o con CORS)
const DEFAULT_PRODUCTS = [
    {
        id: "10604421513482",
        variantId: "53594685374730",
        title: "Men’s Long Sleeve Shirt",
        price: 15.42,
        description: "Maglia a maniche lunghe da uomo in morbido cotone, versatile ed elegante.",
        image: "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/unisex-long-sleeve-shirt-black-back-6a930a6dc0160.jpg?v=1788021378",
        is_hero: true
    },
    {
        id: "10604417876234",
        variantId: "53594676527370",
        title: "Unisex classic tee",
        price: 7.02,
        description: "T-shirt classica unisex 100% cotone, traspirante e confortevole per ogni giorno.",
        image: "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/unisex-classic-tee-white-front-and-back-6a9306ae8db45.jpg?v=1788020415",
        is_hero: false
    },
    {
        id: "10604369215754",
        variantId: "53594513309962",
        title: "Hoody Imperial",
        price: 10.82,
        description: "Felpa sportiva Hoody Imperial con cappuccio e zip, calda e resistente.",
        image: "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/S65afb369de854f8bb995fb02457dd708L.webp?v=1788014417",
        is_hero: false
    }
];

// Sanitizzazione HTML per prevenire DOM XSS
function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function loadDefaultProducts() {
    if (loadedProducts.length === 0) {
        loadedProducts = DEFAULT_PRODUCTS;
        renderProductsUI(loadedProducts);
    }
}

// 1. Inizializzazione e Sincronizzazione Configurazione
async function initRouting() {
    try {
        const response = await fetch(`${NETLIFY_API_URL}/mode`);
        if (response.ok) {
            const remoteConfig = await response.json();
            
            // Aggiorna solo se la configurazione remota è valida
            if (remoteConfig.mode) currentConfig.mode = remoteConfig.mode;
            if (remoteConfig.shopifyUrl && !remoteConfig.shopifyUrl.includes("tuo-shop")) {
                currentConfig.shopifyUrl = remoteConfig.shopifyUrl;
            }
            if (remoteConfig.redirectUrl) currentConfig.redirectUrl = remoteConfig.redirectUrl;
            
            // Reindirizzamento se la modalità è 'redirect'
            if (currentConfig.mode === "redirect" && currentConfig.redirectUrl) {
                try {
                    const url = new URL(currentConfig.redirectUrl);
                    window.location.href = currentConfig.redirectUrl;
                    return;
                } catch(e) {
                    console.error("URL di redirect non valido.");
                }
            }
        }
    } catch (error) {
        console.warn("Utilizzo configurazione locale di fallback:", error);
    }

    if (currentConfig.mode === "shopify") {
        await loadProductsFromShopify();
    } else {
        await loadProductsFromPython();
    }

    if (!loadedProducts || loadedProducts.length === 0) {
        loadDefaultProducts();
    }
}

// 2. Caricamento Prodotti DA SHOPIFY (Con fallback multi-livello per CORS e offline)
async function loadProductsFromShopify() {
    let rawProducts = null;

    // Livello 1: Fetch diretto da Shopify
    try {
        const res = await fetch(`${currentConfig.shopifyUrl}/products.json`);
        if (res.ok) {
            const data = await res.json();
            if (data && data.products && data.products.length > 0) {
                rawProducts = data.products;
            }
        }
    } catch (err) {
        console.warn("Fetch diretto Shopify bloccato da CORS o offline:", err);
    }

    // Livello 2: Proxy Server-Side Netlify Function (Bypassa CORS completamente)
    if (!rawProducts) {
        try {
            const res = await fetch(`${NETLIFY_API_URL}/shopify-products`);
            if (res.ok) {
                const data = await res.json();
                if (data && data.products && data.products.length > 0) {
                    rawProducts = data.products;
                }
            }
        } catch (err) {
            console.warn("Proxy Netlify non raggiungibile:", err);
        }
    }

    // Processamento dei prodotti ricevuti
    if (rawProducts && rawProducts.length > 0) {
        loadedProducts = rawProducts.map((item, index) => ({
            id: String(item.id),
            variantId: item.variants?.[0]?.id ? String(item.variants[0].id) : null, 
            title: item.title,
            price: parseFloat(item.variants?.[0]?.price || 0),
            description: item.body_html ? item.body_html.replace(/<[^>]*>?/gm, '') : 'Nessuna descrizione disponibile.',
            image: item.images?.[0]?.src || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            is_hero: index === 0
        }));

        renderProductsUI(loadedProducts);
    } else {
        console.warn("Attivazione fallback prodotti Shopify reali pre-caricati.");
        loadDefaultProducts();
    }
}

// 3. Caricamento Prodotti DAL SERVER PYTHON
async function loadProductsFromPython() {
    try {
        const res = await fetch(`${currentConfig.pythonServerUrl}/api/products`);
        if (!res.ok) throw new Error("HTTP " + res.status);

        const data = await res.json();
        
        loadedProducts = data.products.map(item => ({
            id: String(item.id),
            variantId: item.variantId || null,
            title: item.title,
            price: parseFloat(item.price),
            description: item.description,
            image: item.image,
            is_hero: item.is_hero || false
        }));

        renderProductsUI(loadedProducts);
    } catch (err) {
        console.warn("Impossibile caricare dal server Python, uso prodotti Shopify reali:", err);
        loadDefaultProducts();
    }
}

let currentSlide = 0;
let slideInterval = null;

// 4. Renderizzazione dinamica dell'Interfaccia Utente (Hero Carousel & Catalogo)
function renderProductsUI(products) {
    if (!products || products.length === 0) return;

    // Iniezione Hero Carousel
    const track = document.getElementById('carousel-track');
    const indicators = document.getElementById('carousel-indicators');
    if (track && indicators) {
        track.innerHTML = products.map((prod, index) => `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="hero-image-container">
                    <img src="${escapeHTML(prod.image)}" alt="${escapeHTML(prod.title)}">
                </div>
                <div class="hero-content">
                    <span class="badge">${prod.is_hero ? 'Best Seller del Mese' : 'Nuova Collezione'}</span>
                    <h1 class="searchable-title">${escapeHTML(prod.title)}</h1>
                    <p class="hero-description">${escapeHTML(prod.description)}</p>
                    <div class="price">€ ${prod.price.toFixed(2)}</div>
                    <div class="btn-container">
                        <button class="btn btn-primary" onclick="buyNow('${escapeHTML(prod.id)}')">Acquista Ora</button>
                        <button class="btn btn-secondary" onclick="addToCart('${escapeHTML(prod.id)}')">Aggiungi al carrello</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Tre puntini sotto il carousel
        indicators.innerHTML = products.map((_, index) => `
            <span class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})" title="Vai alla diapositiva ${index + 1}"></span>
        `).join('');
        
        // Pausa dello scorrimento automatico al passaggio del mouse
        const heroSection = document.getElementById('hero-section');
        if (heroSection && !heroSection.dataset.hoverBound) {
            heroSection.addEventListener('mouseenter', stopCarousel);
            heroSection.addEventListener('mouseleave', startCarousel);
            heroSection.dataset.hoverBound = 'true';
        }

        // Inizializza carousel e avvia scorrimento automatico
        currentSlide = 0;
        updateCarousel();
        startCarousel();
    }

    // Iniezione Griglia Catalogo
    const gridContainer = document.getElementById('product-grid');
    if (gridContainer) {
        gridContainer.innerHTML = products.map(prod => `
            <div class="product-card">
                <div>
                    <img src="${escapeHTML(prod.image)}" alt="${escapeHTML(prod.title)}">
                    <h3 class="searchable-title">${escapeHTML(prod.title)}</h3>
                </div>
                <div>
                    <div class="price">€ ${prod.price.toFixed(2)}</div>
                    <div class="btn-container">
                        <button class="btn btn-primary" onclick="buyNow('${escapeHTML(prod.id)}')">Acquista</button>
                        <button class="btn btn-secondary" onclick="addToCart('${escapeHTML(prod.id)}')">Aggiungi</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Funzioni per il Carousel
function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        slide.classList.toggle('active', index === currentSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveCarousel(direction) {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    if (totalSlides === 0) return;
    
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetCarouselTimer();
}

function startCarousel() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        moveCarousel(1);
    }, 4000);
}

function stopCarousel() {
    if (slideInterval) clearInterval(slideInterval);
}

function resetCarouselTimer() {
    stopCarousel();
    startCarousel();
}

// 5. Azione Acquisto Diretto
function buyNow(productId) {
    const product = loadedProducts.find(p => p.id === String(productId));
    if (!product) return;

    if (currentConfig.mode === "shopify" || product.variantId) {
        if (product.variantId) {
            window.location.href = `${currentConfig.shopifyUrl}/cart/${product.variantId}:1`;
        } else {
            window.location.href = currentConfig.shopifyUrl;
        }
        return;
    }

    cart.push({ name: product.title, price: product.price });
    updateCartCount();
    switchView('cart');
}

// 6. Gestione Carrello Locale
function addToCart(productId) {
    const product = loadedProducts.find(p => p.id === String(productId));
    if (!product) return;

    cart.push({ name: product.title, price: product.price });
    updateCartCount();
    showToast("Aggiunto al carrello!");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const summarySection = document.getElementById('cart-summary-section');
    
    if (!container || !summarySection) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Il tuo carrello è vuoto.</p>';
        summarySection.style.display = 'none';
        return;
    }

    summarySection.style.display = 'flex';
    let total = 0;

    container.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${escapeHTML(item.name)}</h4>
                    <p>€ ${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Rimuovi</button>
            </div>
        `;
    }).join('');

    const cartTotalPriceElement = document.getElementById('cart-total-price');
    if (cartTotalPriceElement) {
        cartTotalPriceElement.innerText = `Totale: € ${total.toFixed(2)}`;
    }
}

// 7. Invio Ordine / Checkout
async function checkout() {
    if (cart.length === 0) return alert("Il tuo carrello è vuoto!");

    if (currentConfig.mode === "shopify") {
        window.location.href = currentConfig.shopifyUrl;
        return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    const payload = {
        timestamp: new Date().toISOString(),
        items: cart,
        total: totalAmount
    };

    try {
        const res = await fetch(`${NETLIFY_API_URL}/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert("Ordine completato con successo!");
            cart = [];
            updateCartCount();
            switchView('home');
        } else {
            alert("Si è verificato un errore durante l'invio dell'ordine.");
        }
    } catch (err) {
        console.error("Errore di rete durante il checkout:", err);
        alert("Impossibile connettersi al server per completare l'ordine.");
    }
}

// 8. Navigazione tra le Viste (Home e Carrello)
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    
    if (viewName === 'home') {
        const homeView = document.getElementById('home-view');
        if (homeView) homeView.classList.add('active');
    } else if (viewName === 'cart') {
        const cartView = document.getElementById('cart-view');
        if (cartView) cartView.classList.add('active');
        renderCart();
    }
    window.scrollTo(0, 0);
}

// 9. Notifiche Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// 10. Ricerca e Filtro Prodotti in Tempo Reale
window.filterProducts = function filterProducts() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();
    
    const homeView = document.getElementById('home-view');
    if (homeView && !homeView.classList.contains('active')) {
        switchView('home');
    }

    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
        heroSection.style.display = (query === '') ? 'block' : 'none';
    }

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const title = card.querySelector('.searchable-title')?.innerText.toLowerCase() || '';
        if (title.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", initRouting);