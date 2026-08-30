const NETLIFY_API_URL = "/.netlify/functions/api";
let cart = [];
let currentConfig = { mode: "python", redirectUrl: "", shopifyUrl: "https://tuo-shop.myshopify.com", pythonServerUrl: "http://localhost:5000" };

async function initRouting() {
    try {
        const response = await fetch(`${NETLIFY_API_URL}/mode`);
        if (response.ok) {
            currentConfig = await response.json();
            if (currentConfig.mode === "redirect" && currentConfig.redirectUrl) {
                window.location.href = currentConfig.redirectUrl;
                return;
            }
            if (currentConfig.mode === "python") {
                await loadProductsFromPython();
            }
        }
    } catch (error) {
        console.error("Errore configurazione:", error);
    }
}

async function loadProductsFromPython() {
    try {
        const res = await fetch(`${currentConfig.pythonServerUrl}/api/products`);
        if (!res.ok) return;
        const data = await res.json();
        const products = data.products;
        const heroProduct = products.find(p => p.is_hero) || products[0];
        const catalogProducts = products.filter(p => p.id !== heroProduct.id);

        const heroContainer = document.getElementById('hero-section');
        if (heroContainer && heroProduct) {
            heroContainer.innerHTML = `
                <div class="hero-image-container"><img src="${heroProduct.image}" alt="${heroProduct.title}"></div>
                <div class="hero-content">
                    <span class="badge">Best Seller del Mese</span>
                    <h1 class="searchable-title">${heroProduct.title}</h1>
                    <p class="hero-description">${heroProduct.description}</p>
                    <div class="price">€ ${heroProduct.price.toFixed(2)}</div>
                    <div class="btn-container">
                        <button class="btn btn-primary" onclick="buyNow('${heroProduct.title}', ${heroProduct.price})">Acquista</button>
                        <button class="btn btn-secondary" onclick="addToCart('${heroProduct.title}', ${heroProduct.price})">Aggiungi al carrello</button>
                    </div>
                </div>`;
        }

        const gridContainer = document.getElementById('product-grid');
        if (gridContainer) {
            gridContainer.innerHTML = catalogProducts.map(prod => `
                <div class="product-card">
                    <div>
                        <img src="${prod.image}" alt="${prod.title}">
                        <h3 class="searchable-title">${prod.title}</h3>
                    </div>
                    <div>
                        <div class="price">€ ${prod.price.toFixed(2)}</div>
                        <div class="btn-container">
                            <button class="btn btn-primary" onclick="buyNow('${prod.title}', ${prod.price})">Acquista</button>
                            <button class="btn btn-secondary" onclick="addToCart('${prod.title}', ${prod.price})">Aggiungi al carrello</button>
                        </div>
                    </div>
                </div>`).join('');
        }
    } catch (err) {
        console.warn("Impossibile caricare prodotti dal server Python:", err);
    }
}

function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    if (viewName === 'home') document.getElementById('home-view').classList.add('active');
    else if (viewName === 'cart') { document.getElementById('cart-view').classList.add('active'); renderCart(); }
    window.scrollTo(0, 0);
}

function addToCart(name, price) { cart.push({ name, price }); updateCartCount(); showToast("Aggiunto al carrello!"); }
function buyNow(name, price) {
    if (currentConfig.mode === "shopify") { window.location.href = currentConfig.shopifyUrl; return; }
    cart.push({ name, price }); updateCartCount(); switchView('cart');
}
function removeFromCart(index) { cart.splice(index, 1); updateCartCount(); renderCart(); }
function updateCartCount() { document.getElementById('cart-count').innerText = cart.length; }

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const summarySection = document.getElementById('cart-summary-section');
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#777;">Il tuo carrello è vuoto.</p>';
        summarySection.style.display = 'none';
        return;
    }
    summarySection.style.display = 'flex';
    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `<div class="cart-item"><div><h4>${item.name}</h4><p>€ ${item.price.toFixed(2)}</p></div><button class="remove-btn" onclick="removeFromCart(${index})">Rimuovi</button></div>`;
    }).join('');
    document.getElementById('cart-total-price').innerText = `Totale: € ${total.toFixed(2)}`;
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

async function checkout() {
    if (cart.length === 0) return;
    if (currentConfig.mode === "shopify") { window.location.href = currentConfig.shopifyUrl; return; }
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    try {
        const res = await fetch(`${NETLIFY_API_URL}/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ timestamp: new Date().toISOString(), items: cart, total: totalAmount })
        });
        if (res.ok) { alert("Ordine completato!"); cart = []; updateCartCount(); switchView('home'); }
    } catch (err) { alert("Errore di connessione."); }
}

function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    if (!document.getElementById('home-view').classList.contains('active')) switchView('home');
    document.querySelectorAll('.product-card').forEach(card => {
        const title = card.querySelector('.searchable-title').innerText.toLowerCase();
        card.style.display = title.includes(query) ? 'flex' : 'none';
    });
}

document.addEventListener("DOMContentLoaded", initRouting);