const NETLIFY_API_URL = "https://exquisite-truffle-3d707a.netlify.app/.netlify/functions/api";

let cart = [];
let loadedProducts = [];
let selectedVariantsMap = {}; // Tracks selected options per product ID (e.g., { "10604421513482": { "Size": "M" } })

let currentConfig = { 
    mode: "shopify", 
    redirectUrl: "", 
    shopifyUrl: "https://hkadip-1s.myshopify.com",
    pythonServerUrl: "http://localhost:5000" 
};

// Real Default Products with exact Shopify Variant IDs and Options
const DEFAULT_PRODUCTS = [
    {
        id: "10604421513482",
        variantId: "53594794656010",
        title: "Men’s Long Sleeve Shirt",
        price: 15.42,
        description: "Premium men's long sleeve shirt crafted from soft breathable cotton. Versatile and elegant.",
        image: "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/unisex-long-sleeve-shirt-black-back-6a930a6dc0160.jpg?v=1788021378",
        is_hero: true,
        options: [
            { name: "Size", values: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"] }
        ],
        variants: [
            { id: "53594794656010", title: "S", price: 15.42, options: { "Size": "S" } },
            { id: "53594794688778", title: "M", price: 15.42, options: { "Size": "M" } },
            { id: "53594794721546", title: "L", price: 15.42, options: { "Size": "L" } },
            { id: "53594794754314", title: "XL", price: 15.42, options: { "Size": "XL" } },
            { id: "53594794787082", title: "2XL", price: 15.42, options: { "Size": "2XL" } },
            { id: "53594794819850", title: "3XL", price: 15.42, options: { "Size": "3XL" } },
            { id: "53594794852618", title: "4XL", price: 15.42, options: { "Size": "4XL" } }
        ]
    },
    {
        id: "10604417876234",
        variantId: "53594768867594",
        title: "Unisex classic tee",
        price: 7.02,
        description: "100% cotton unisex classic t-shirt, breathable and durable for everyday comfort.",
        image: "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/unisex-classic-tee-white-front-and-back-6a9306ae8db45.jpg?v=1788020415",
        is_hero: false,
        options: [],
        variants: [
            { id: "53594768867594", title: "Default Title", price: 7.02, options: {} }
        ]
    },
    {
        id: "10604369215754",
        variantId: "53594513309962",
        title: "Hoody Imperial",
        price: 10.82,
        description: "Sporty Imperial hoodie with adjustable drawstring hood and full zip. Cozy, warm and stylish.",
        image: "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/S65afb369de854f8bb995fb02457dd708L.webp?v=1788014417",
        is_hero: false,
        options: [
            { name: "Color", values: ["Black", "Navy Blue", "Gray", "Brown", "Khaki", "Red"] },
            { name: "Size", values: ["S", "M", "L", "XL", "XXL", "XXXL"] }
        ],
        variants: [
            { id: "53594513309962", title: "Black / S", price: 10.82, options: { "Color": "Black", "Size": "S" } },
            { id: "53594513408266", title: "Black / M", price: 10.82, options: { "Color": "Black", "Size": "M" } },
            { id: "53594513375498", title: "Black / L", price: 10.82, options: { "Color": "Black", "Size": "L" } },
            { id: "53594513735946", title: "Black / XL", price: 10.82, options: { "Color": "Black", "Size": "XL" } },
            { id: "53594513703178", title: "Black / XXL", price: 10.82, options: { "Color": "Black", "Size": "XXL" } },
            { id: "53594513801482", title: "Black / XXXL", price: 10.82, options: { "Color": "Black", "Size": "XXXL" } },
            { id: "53594514030858", title: "Navy Blue / S", price: 10.82, options: { "Color": "Navy Blue", "Size": "S" } },
            { id: "53594514129162", title: "Navy Blue / M", price: 10.82, options: { "Color": "Navy Blue", "Size": "M" } },
            { id: "53594514096394", title: "Navy Blue / L", price: 10.82, options: { "Color": "Navy Blue", "Size": "L" } },
            { id: "53594514194698", title: "Navy Blue / XL", price: 10.82, options: { "Color": "Navy Blue", "Size": "XL" } },
            { id: "53594514161930", title: "Navy Blue / XXL", price: 10.82, options: { "Color": "Navy Blue", "Size": "XXL" } },
            { id: "53594513342730", title: "Navy Blue / XXXL", price: 10.82, options: { "Color": "Navy Blue", "Size": "XXXL" } },
            { id: "53594513441034", title: "Gray / S", price: 10.82, options: { "Color": "Gray", "Size": "S" } },
            { id: "53594513539338", title: "Gray / M", price: 10.82, options: { "Color": "Gray", "Size": "M" } },
            { id: "53594513506570", title: "Gray / L", price: 10.82, options: { "Color": "Gray", "Size": "L" } },
            { id: "53594513604874", title: "Gray / XL", price: 10.82, options: { "Color": "Gray", "Size": "XL" } },
            { id: "53594513572106", title: "Gray / XXL", price: 10.82, options: { "Color": "Gray", "Size": "XXL" } },
            { id: "53594513670410", title: "Gray / XXXL", price: 10.82, options: { "Color": "Gray", "Size": "XXXL" } },
            { id: "53594514358538", title: "Red / S", price: 10.82, options: { "Color": "Red", "Size": "S" } },
            { id: "53594514456842", title: "Red / M", price: 10.82, options: { "Color": "Red", "Size": "M" } },
            { id: "53594514424074", title: "Red / L", price: 10.82, options: { "Color": "Red", "Size": "L" } },
            { id: "53594513998090", title: "Red / XL", price: 10.82, options: { "Color": "Red", "Size": "XL" } },
            { id: "53594513965322", title: "Red / XXL", price: 10.82, options: { "Color": "Red", "Size": "XXL" } },
            { id: "53594514063626", title: "Red / XXXL", price: 10.82, options: { "Color": "Red", "Size": "XXXL" } }
        ]
    }
];

// Sanitization to prevent XSS
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
        initDefaultVariants(loadedProducts);
        renderProductsUI(loadedProducts);
    }
}

function initDefaultVariants(products) {
    products.forEach(p => {
        const pId = String(p.id);
        if (!selectedVariantsMap[pId]) {
            selectedVariantsMap[pId] = {};
        }
        if (p.options && p.options.length > 0) {
            p.options.forEach(opt => {
                if (!selectedVariantsMap[pId][opt.name] && opt.values && opt.values.length > 0) {
                    selectedVariantsMap[pId][opt.name] = opt.values[0];
                }
            });
        }
    });
}

// Dynamically extract real options & variants from Shopify item JSON
function parseShopifyVariants(item) {
    const rawVariants = item.variants || [];
    const rawOptions = item.options || [];

    // Filter out generic "Title" with "Default Title"
    const options = rawOptions
        .filter(o => o.name && !(o.name.toLowerCase() === "title" && o.values?.length === 1 && o.values[0] === "Default Title"))
        .map(o => ({
            name: String(o.name).trim(),
            values: (o.values || []).map(v => String(v).trim())
        }));

    const variants = rawVariants.map(v => {
        const vOptMap = {};
        rawOptions.forEach((opt, idx) => {
            const val = v[`option${idx + 1}`];
            if (val && opt.name) {
                vOptMap[String(opt.name).trim()] = String(val).trim();
            }
        });

        return {
            id: String(v.id),
            title: v.title,
            price: parseFloat(v.price || 0),
            options: vOptMap
        };
    });

    return { options, variants };
}

// 1. Initialization and Config Routing
async function initRouting() {
    try {
        const response = await fetch(`${NETLIFY_API_URL}/mode`);
        if (response.ok) {
            const remoteConfig = await response.json();
            
            if (remoteConfig.mode) currentConfig.mode = remoteConfig.mode;
            if (remoteConfig.shopifyUrl && !remoteConfig.shopifyUrl.includes("tuo-shop")) {
                currentConfig.shopifyUrl = remoteConfig.shopifyUrl;
            }
            if (remoteConfig.redirectUrl) currentConfig.redirectUrl = remoteConfig.redirectUrl;
            
            if (currentConfig.mode === "redirect" && currentConfig.redirectUrl) {
                try {
                    new URL(currentConfig.redirectUrl);
                    window.location.href = currentConfig.redirectUrl;
                    return;
                } catch(e) {
                    console.error("Invalid redirect URL.");
                }
            }
        }
    } catch (error) {
        console.warn("Using local fallback config:", error);
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

// 2. Fetch Products FROM SHOPIFY
async function loadProductsFromShopify() {
    let rawProducts = null;

    try {
        const res = await fetch(`${currentConfig.shopifyUrl}/products.json`);
        if (res.ok) {
            const data = await res.json();
            if (data && data.products && data.products.length > 0) {
                rawProducts = data.products;
            }
        }
    } catch (err) {
        console.warn("Direct Shopify fetch blocked by CORS or offline:", err);
    }

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
            console.warn("Netlify proxy unreachable:", err);
        }
    }

    if (rawProducts && rawProducts.length > 0) {
        loadedProducts = rawProducts.map((item, index) => {
            const parsed = parseShopifyVariants(item);
            return {
                id: String(item.id),
                variantId: item.variants?.[0]?.id ? String(item.variants[0].id) : null, 
                title: item.title,
                price: parseFloat(item.variants?.[0]?.price || 0),
                description: item.body_html ? item.body_html.replace(/<[^>]*>?/gm, '') : 'No description available.',
                image: item.images?.[0]?.src || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
                is_hero: index === 0,
                options: parsed.options,
                variants: parsed.variants
            };
        });

        initDefaultVariants(loadedProducts);
        renderProductsUI(loadedProducts);
    } else {
        console.warn("Fallback to default pre-loaded Shopify products.");
        loadDefaultProducts();
    }
}

// 3. Fetch Products FROM PYTHON SERVER
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
            is_hero: item.is_hero || false,
            options: item.options || [],
            variants: item.variants || []
        }));

        initDefaultVariants(loadedProducts);
        renderProductsUI(loadedProducts);
    } catch (err) {
        console.warn("Could not load from Python server, using default catalog:", err);
        loadDefaultProducts();
    }
}

let currentSlide = 0;
let slideInterval = null;

// Variant selection handler
window.selectVariantOption = function selectVariantOption(btn, productId, optName, optVal) {
    const pId = String(productId);
    if (!selectedVariantsMap[pId]) {
        selectedVariantsMap[pId] = {};
    }
    selectedVariantsMap[pId][optName] = optVal;

    // Update UI active class in the button parent container
    const parentContainer = btn.parentElement;
    if (parentContainer) {
        parentContainer.querySelectorAll('.variant-pill').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    }
};

// Render Dynamic Variant Option Pickers
function renderVariantPickersHTML(product) {
    if (!product.options || product.options.length === 0) return '';

    const pId = String(product.id);
    const sel = selectedVariantsMap[pId] || {};

    const rowsHTML = product.options.map(opt => {
        const activeVal = sel[opt.name] || opt.values[0];
        const pillsHTML = opt.values.map(val => `
            <button type="button" 
                    class="variant-pill ${val.toLowerCase() === String(activeVal).toLowerCase() ? 'selected' : ''}" 
                    onclick="selectVariantOption(this, '${escapeHTML(pId)}', '${escapeHTML(opt.name)}', '${escapeHTML(val)}')">
                ${escapeHTML(val)}
            </button>
        `).join('');

        return `
            <div class="variant-row">
                <span class="variant-label">${escapeHTML(opt.name)}:</span>
                <div class="variant-options">${pillsHTML}</div>
            </div>
        `;
    }).join('');

    return `
        <div class="variants-picker-container">
            ${rowsHTML}
        </div>
    `;
}

// 4. Render UI (Hero Carousel & Catalog Grid)
function renderProductsUI(products) {
    if (!products || products.length === 0) return;

    // Hero Carousel
    const track = document.getElementById('carousel-track');
    const indicators = document.getElementById('carousel-indicators');
    if (track && indicators) {
        track.innerHTML = products.map((prod, index) => `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="hero-image-container">
                    <img src="${escapeHTML(prod.image)}" alt="${escapeHTML(prod.title)}">
                </div>
                <div class="hero-content">
                    <span class="badge">${prod.is_hero ? 'Best Seller' : 'New Arrival'}</span>
                    <h1 class="searchable-title">${escapeHTML(prod.title)}</h1>
                    <p class="hero-description">${escapeHTML(prod.description)}</p>
                    
                    ${renderVariantPickersHTML(prod)}

                    <div class="price">€ ${prod.price.toFixed(2)}</div>
                    <div class="btn-container">
                        <button class="btn btn-primary" onclick="buyNow('${escapeHTML(prod.id)}')">Buy Now</button>
                        <button class="btn btn-secondary" onclick="addToCart('${escapeHTML(prod.id)}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');

        indicators.innerHTML = products.map((_, index) => `
            <span class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})" title="Go to slide ${index + 1}"></span>
        `).join('');
        
        const heroSection = document.getElementById('hero-section');
        if (heroSection && !heroSection.dataset.hoverBound) {
            heroSection.addEventListener('mouseenter', stopCarousel);
            heroSection.addEventListener('mouseleave', startCarousel);
            heroSection.dataset.hoverBound = 'true';
        }

        currentSlide = 0;
        updateCarousel();
        startCarousel();
    }

    // Product Grid (Vertical Showcases)
    const gridContainer = document.getElementById('product-grid');
    if (gridContainer) {
        gridContainer.innerHTML = products.map(prod => `
            <div class="product-card" data-id="${escapeHTML(prod.id)}">
                <div class="product-card-top">
                    <div class="product-image-box">
                        <img src="${escapeHTML(prod.image)}" alt="${escapeHTML(prod.title)}">
                        <span class="card-badge">${prod.is_hero ? 'TOP' : 'NEW'}</span>
                    </div>
                    <h3 class="searchable-title">${escapeHTML(prod.title)}</h3>
                    <p class="product-card-desc">${escapeHTML(prod.description)}</p>
                </div>
                
                <div class="product-card-bottom">
                    ${renderVariantPickersHTML(prod)}
                    
                    <div class="price">€ ${prod.price.toFixed(2)}</div>
                    <div class="btn-container">
                        <button class="btn btn-primary" onclick="buyNow('${escapeHTML(prod.id)}')">Buy Now</button>
                        <button class="btn btn-secondary" onclick="addToCart('${escapeHTML(prod.id)}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Carousel logic
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

// Match selected options to exact variant ID
function getSelectedVariant(product) {
    const pId = String(product.id);
    const sel = selectedVariantsMap[pId] || {};

    if (product.variants && product.variants.length > 0) {
        // Find exact variant where all selected option values match
        let match = product.variants.find(v => {
            if (!v.options) return false;
            return Object.entries(sel).every(([optName, optVal]) => {
                const vVal = v.options[optName];
                return vVal && String(vVal).toLowerCase() === String(optVal).toLowerCase();
            });
        });

        // Fallback: match partial options if exact full match wasn't found
        if (!match) {
            match = product.variants.find(v => {
                if (!v.options) return false;
                return Object.entries(sel).some(([optName, optVal]) => {
                    const vVal = v.options[optName];
                    return vVal && String(vVal).toLowerCase() === String(optVal).toLowerCase();
                });
            });
        }

        if (!match) {
            match = product.variants[0];
        }

        if (match && match.id) {
            return {
                id: String(match.id),
                title: match.title,
                price: match.price || product.price,
                selectedOptions: { ...sel }
            };
        }
    }

    const fallbackVariantId = String(product.variantId || product.id);
    return {
        id: fallbackVariantId,
        title: product.title,
        price: product.price,
        selectedOptions: { ...sel }
    };
}

// 5. Direct Purchase Action
function buyNow(productId) {
    const product = loadedProducts.find(p => String(p.id) === String(productId));
    if (!product) return;

    const variant = getSelectedVariant(product);
    const targetVariantId = variant.id || product.variantId || product.variants?.[0]?.id;
    const shopifyBase = (currentConfig.shopifyUrl || "https://hkadip-1s.myshopify.com").replace(/\/$/, "");

    if (targetVariantId) {
        window.location.href = `${shopifyBase}/cart/${targetVariantId}:1`;
    } else {
        window.location.href = shopifyBase;
    }
}

// 6. Cart Management
function addToCart(productId) {
    const product = loadedProducts.find(p => String(p.id) === String(productId));
    if (!product) return;

    const variant = getSelectedVariant(product);

    cart.push({ 
        id: String(product.id),
        variantId: String(variant.id || product.variantId),
        name: product.title, 
        options: variant.selectedOptions,
        price: variant.price || product.price,
        image: product.image
    });
    
    updateCartCount();

    if (currentConfig.mode === "shopify") {
        const shopifyCartUrl = generateShopifyCartUrl(cart);
        window.location.href = shopifyCartUrl;
        return;
    }

    showToast("Item added to cart!");
}

function openCartView() {
    if (currentConfig.mode === "shopify") {
        const shopifyBase = (currentConfig.shopifyUrl || "https://hkadip-1s.myshopify.com").replace(/\/$/, "");
        if (cart.length > 0) {
            window.location.href = generateShopifyCartUrl(cart);
        } else {
            window.location.href = `${shopifyBase}/cart`;
        }
    } else {
        switchView('cart');
    }
}
window.openCartView = openCartView;

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

function generateShopifyCartUrl(cartItems) {
    const shopifyBase = (currentConfig.shopifyUrl || "https://hkadip-1s.myshopify.com").replace(/\/$/, "");
    if (!cartItems || cartItems.length === 0) return shopifyBase;

    const variantCounts = {};
    cartItems.forEach(item => {
        const vId = item.variantId || item.id;
        if (vId) {
            variantCounts[vId] = (variantCounts[vId] || 0) + 1;
        }
    });

    const permalinkItems = Object.entries(variantCounts)
        .map(([vId, qty]) => `${vId}:${qty}`)
        .join(',');

    if (permalinkItems) {
        return `${shopifyBase}/cart/${permalinkItems}`;
    }
    return `${shopifyBase}/cart`;
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const summarySection = document.getElementById('cart-summary-section');
    
    if (!container || !summarySection) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Your shopping cart is empty.</p>';
        summarySection.style.display = 'none';
        return;
    }

    summarySection.style.display = 'flex';
    let total = 0;

    container.innerHTML = cart.map((item, index) => {
        total += item.price;
        const optionsTags = item.options ? Object.entries(item.options).map(([k, v]) => `<span class="variant-tag">${escapeHTML(k)}: ${escapeHTML(v)}</span>`).join('') : '';

        return `
            <div class="cart-item">
                <div class="cart-item-left">
                    ${item.image ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" class="cart-item-thumb">` : ''}
                    <div class="cart-item-details">
                        <h4>${escapeHTML(item.name)}</h4>
                        <div class="cart-item-meta">
                            ${optionsTags}
                        </div>
                        <p class="cart-item-price">€ ${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    }).join('');

    const cartTotalPriceElement = document.getElementById('cart-total-price');
    if (cartTotalPriceElement) {
        cartTotalPriceElement.innerText = `Total: € ${total.toFixed(2)}`;
    }
}

// 7. Order Checkout directly to Shopify Cart Permalink
async function checkout() {
    if (cart.length === 0) return alert("Your cart is empty!");

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    const shopifyCartUrl = generateShopifyCartUrl(cart);

    try {
        await fetch(`${NETLIFY_API_URL}/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                timestamp: new Date().toISOString(),
                items: cart,
                total: totalAmount
            })
        });
    } catch (err) {
        console.warn("Checkout log warning:", err);
    }

    // Redirect directly to Shopify cart permalink with all variant items & quantities
    window.location.href = shopifyCartUrl;
}

// 8. View Switching
function switchView(viewName) {
    if (viewName === 'cart' && currentConfig.mode === "shopify") {
        const shopifyBase = (currentConfig.shopifyUrl || "https://hkadip-1s.myshopify.com").replace(/\/$/, "");
        if (cart.length > 0) {
            window.location.href = generateShopifyCartUrl(cart);
        } else {
            window.location.href = `${shopifyBase}/cart`;
        }
        return;
    }

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

// 9. Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// 10. Real-time Product Search & Filter
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