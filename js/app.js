/* HKADIP STORE — vetrina statica collegata alla Shopify Storefront API. */
const SHOPIFY_CONFIG = {
  domain: 'hkadip-1s.myshopify.com',
  accessToken: 'fae24d7c5d43a17a7981a2c64e21ecc1',
  apiVersion: '2024-01'
};

const PLACEHOLDER_IMAGE = 'https://placehold.co/700x700/151225/a8a0c0?text=Prodotto';
const LANG_LOCALES = { it: 'it-IT', en: 'en-GB', fr: 'fr-FR', es: 'es-ES', de: 'de-DE' };
const LANG_FLAGS = { it: '🇮🇹', en: '🇬🇧', fr: '🇫🇷', es: '🇪🇸', de: '🇩🇪' };
const translations = {
  it: { search_placeholder:'Cerca prodotti...', catalog_heading:'Tutti i Prodotti', no_products:'Nessun prodotto trovato.', loading:'Caricamento catalogo in corso...', load_error:'Impossibile caricare i prodotti. Riprova più tardi.', badge_sale:'IN OFFERTA', badge_hyperdrip:'HYPERDRIP', add_to_cart:'🛒 Aggiungi al Carrello', add_short:'🛒 Aggiungi', buy_now:'⚡ Acquista Ora', variants_available:'varianti disponibili', back_to_catalog:'Torna al Catalogo', in_stock:'Disponibile', out_of_stock:'Esaurito', quantity:'Quantità:', cart_heading:'Il tuo Carrello', empty_cart:'Il tuo carrello è attualmente vuoto.', continue_shopping:'Continua lo Shopping', total:'Totale:', proceed_checkout:'Procedi al Checkout', remove:'Rimuovi', added_to_cart:'Articolo aggiunto al carrello! 🛒', option:'Opzione', ad_badge:'PROMO SPONSORIZZATA', ad_title:'🔥 Offerta Limitata: Ottieni il 20% DI SCONTO sul tuo ordine!', ad_subtitle:'Usa il codice PROMO20 alla cassa.', ad_button:'Acquista Ora', nav_home:'Home', nav_catalog:'Catalogo Prodotti', nav_cart:'Carrello', footer_copyright:'Tutti i diritti riservati.' },
  en: { search_placeholder:'Search products...', catalog_heading:'All Products', no_products:'No products found.', loading:'Loading catalog...', load_error:'Products could not be loaded. Please try again later.', badge_sale:'ON SALE', badge_hyperdrip:'HYPERDRIP', add_to_cart:'🛒 Add to Cart', add_short:'🛒 Add', buy_now:'⚡ Buy Now', variants_available:'variants available', back_to_catalog:'Back to Catalog', in_stock:'In Stock', out_of_stock:'Out of Stock', quantity:'Quantity:', cart_heading:'Your Shopping Cart', empty_cart:'Your cart is currently empty.', continue_shopping:'Continue Shopping', total:'Total:', proceed_checkout:'Proceed to Checkout', remove:'Remove', added_to_cart:'Item added to cart! 🛒', option:'Option', ad_badge:'SPONSORED PROMO', ad_title:'🔥 Limited Offer: Get 20% OFF Your Order!', ad_subtitle:'Use code PROMO20 at checkout.', ad_button:'Shop Now', nav_home:'Home', nav_catalog:'Product Catalog', nav_cart:'Shopping Cart', footer_copyright:'All rights reserved.' },
  fr: { search_placeholder:'Rechercher des produits...', catalog_heading:'Tous les produits', no_products:'Aucun produit trouvé.', loading:'Chargement du catalogue...', load_error:'Impossible de charger les produits. Réessayez plus tard.', badge_sale:'EN PROMOTION', badge_hyperdrip:'HYPERDRIP', add_to_cart:'🛒 Ajouter au panier', add_short:'🛒 Ajouter', buy_now:'⚡ Acheter maintenant', variants_available:'variantes disponibles', back_to_catalog:'Retour au catalogue', in_stock:'En stock', out_of_stock:'Rupture de stock', quantity:'Quantité :', cart_heading:'Votre Panier', empty_cart:'Votre panier est actuellement vide.', continue_shopping:'Continuer vos achats', total:'Total :', proceed_checkout:'Passer la commande', remove:'Supprimer', added_to_cart:'Article ajouté au panier ! 🛒', option:'Option', ad_badge:'PROMO SPONSORISÉE', ad_title:'🔥 Offre limitée : obtenez 20 % de réduction !', ad_subtitle:'Utilisez le code PROMO20 lors de la commande.', ad_button:'Acheter maintenant', nav_home:'Accueil', nav_catalog:'Catalogue', nav_cart:'Panier', footer_copyright:'Tous droits réservés.' },
  es: { search_placeholder:'Buscar productos...', catalog_heading:'Todos los productos', no_products:'No se encontraron productos.', loading:'Cargando catálogo...', load_error:'No se pudieron cargar los productos. Inténtalo más tarde.', badge_sale:'EN OFERTA', badge_hyperdrip:'HYPERDRIP', add_to_cart:'🛒 Añadir al carrito', add_short:'🛒 Añadir', buy_now:'⚡ Comprar ahora', variants_available:'variantes disponibles', back_to_catalog:'Volver al catálogo', in_stock:'En stock', out_of_stock:'Agotado', quantity:'Cantidad:', cart_heading:'Tu Carrito de Compras', empty_cart:'Tu carrito está vacío.', continue_shopping:'Seguir comprando', total:'Total:', proceed_checkout:'Proceder al pago', remove:'Eliminar', added_to_cart:'¡Artículo añadido al carrito! 🛒', option:'Opción', ad_badge:'PROMO PATROCINADA', ad_title:'🔥 Oferta limitada: ¡obtén un 20 % de descuento!', ad_subtitle:'Usa el código PROMO20 al pagar.', ad_button:'Comprar ahora', nav_home:'Inicio', nav_catalog:'Catálogo de productos', nav_cart:'Carrito', footer_copyright:'Todos los derechos reservados.' },
  de: { search_placeholder:'Produkte suchen...', catalog_heading:'Alle Produkte', no_products:'Keine Produkte gefunden.', loading:'Katalog wird geladen...', load_error:'Produkte konnten nicht geladen werden. Bitte später erneut versuchen.', badge_sale:'IM ANGEBOT', badge_hyperdrip:'HYPERDRIP', add_to_cart:'🛒 In den Warenkorb', add_short:'🛒 Hinzufügen', buy_now:'⚡ Jetzt kaufen', variants_available:'Varianten verfügbar', back_to_catalog:'Zurück zum Katalog', in_stock:'Auf Lager', out_of_stock:'Ausverkauft', quantity:'Menge:', cart_heading:'Ihr Warenkorb', empty_cart:'Ihr Warenkorb ist derzeit leer.', continue_shopping:'Weiter einkaufen', total:'Gesamt:', proceed_checkout:'Zur Kasse', remove:'Entfernen', added_to_cart:'Artikel zum Warenkorb hinzugefügt! 🛒', option:'Option', ad_badge:'SPONSORED PROMO', ad_title:'🔥 Befristetes Angebot: 20 % Rabatt!', ad_subtitle:'Nutzen Sie den Code PROMO20 an der Kasse.', ad_button:'Jetzt shoppen', nav_home:'Startseite', nav_catalog:'Produktkatalog', nav_cart:'Warenkorb', footer_copyright:'Alle Rechte vorbehalten.' }
};

let allProducts = [];
let filteredProducts = [];
let cart = loadCart();
let currentCarouselIndex = 0;
let carouselTimer = null;
let currentDetailProduct = null;
let selectedVariant = null;
let selectedOptions = {};
let currentLang = localStorage.getItem('site_theme_lang') || 'it';
if (!translations[currentLang]) currentLang = 'it';

function t(key) { return translations[currentLang][key] || translations.it[key] || key; }
function escapeHtml(value = '') { const el = document.createElement('div'); el.textContent = String(value); return el.innerHTML; }
function stripHtml(value = '') { const el = document.createElement('div'); el.innerHTML = value; return (el.textContent || '').trim(); }
function truncate(value, max) { return value.length > max ? `${value.slice(0, max - 1).trim()}…` : value; }
function formatMoney(amount, currency = 'EUR') {
  const number = Number(amount) || 0;
  try { return new Intl.NumberFormat(LANG_LOCALES[currentLang], { style: 'currency', currency }).format(number); }
  catch (_) { return `${number.toFixed(2)} ${currency}`; }
}
function getDefaultVariant(product) { return product.variants.find(variant => variant.available) || product.variants[0] || null; }
function hasOnlyDefaultVariant(product) {
  const variant = product.variants[0];
  return product.variants.length === 1 && (variant?.title === 'Default Title' || (variant?.options?.length === 1 && variant.options[0].name === 'Title' && variant.options[0].value === 'Default Title'));
}
function hasDiscount(variant) { return Number(variant?.compareAtPrice) > Number(variant?.price); }
function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem('hkadip_cart') || '[]');
    return Array.isArray(stored) ? stored.filter(item => item && item.variantId && Number(item.quantity) > 0) : [];
  } catch (_) { return []; }
}

async function shopifyRequest(query, variables) {
  const endpoint = `https://${SHOPIFY_CONFIG.domain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.accessToken },
    body: JSON.stringify({ query, variables })
  });
  if (!response.ok) throw new Error(`Shopify HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors.map(error => error.message).join('; '));
  return payload.data;
}

async function fetchProductsFromShopify() {
  const query = `query Products($after: String) {
    products(first: 100, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges { node {
        id handle title vendor descriptionHtml availableForSale
        options { name values }
        images(first: 20) { edges { node { url altText } } }
        variants(first: 250) { edges { node {
          id title availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText }
        } } }
      } }
    }
  }`;
  const products = [];
  let after = null;
  do {
    const data = await shopifyRequest(query, { after });
    const connection = data?.products;
    if (!connection) throw new Error('Risposta Shopify non valida');
    connection.edges.forEach(({ node }) => {
      const images = node.images.edges.map(({ node: image }) => ({ url: image.url, alt: image.altText || node.title }));
      const variants = node.variants.edges.map(({ node: variant }) => ({
        id: variant.id,
        title: variant.title,
        available: variant.availableForSale,
        price: Number(variant.price.amount),
        currency: variant.price.currencyCode,
        compareAtPrice: variant.compareAtPrice ? Number(variant.compareAtPrice.amount) : null,
        options: variant.selectedOptions,
        image: variant.image ? { url: variant.image.url, alt: variant.image.altText || node.title } : null
      }));
      const product = {
        id: node.id, handle: node.handle, title: node.title, vendor: node.vendor || 'HYPERDRIP',
        description: node.descriptionHtml || '', images: images.length ? images : [{ url: PLACEHOLDER_IMAGE, alt: node.title }],
        options: node.options || [], variants, available: node.availableForSale
      };
      const defaultVariant = getDefaultVariant(product);
      product.price = defaultVariant?.price || 0;
      product.currency = defaultVariant?.currency || 'EUR';
      products.push(product);
    });
    after = connection.pageInfo.hasNextPage ? connection.pageInfo.endCursor : null;
  } while (after);
  return products;
}

window.switchView = function(viewName) {
  document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
  document.getElementById(`${viewName}-view`)?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
window.openCartView = function() { renderCartView(); window.switchView('cart'); };
window.scrollToCatalog = function() { window.switchView('home'); setTimeout(() => document.querySelector('.catalog')?.scrollIntoView({ behavior: 'smooth' }), 0); };

function renderCarousel(products) {
  const track = document.getElementById('carousel-track');
  const indicators = document.getElementById('carousel-indicators');
  const section = document.getElementById('hero-section');
  if (!track || !indicators || !section) return;
  const featured = products.slice(0, 5);
  section.hidden = featured.length === 0;
  track.innerHTML = '';
  indicators.innerHTML = '';
  currentCarouselIndex = 0;
  featured.forEach((product, index) => {
    const variant = getDefaultVariant(product);
    const description = truncate(stripHtml(product.description) || 'Scopri le straordinarie caratteristiche e il design premium di questo prodotto esclusivo.', 130);
    const slide = document.createElement('div');
    slide.className = `carousel-slide${index === 0 ? ' active' : ''}`;
    slide.dataset.productId = product.id;
    slide.innerHTML = `
      <div class="hero-image-container"><button type="button" class="media-link" data-action="detail"><img src="${escapeHtml(product.images[0].url)}" alt="${escapeHtml(product.images[0].alt)}" ${index ? 'loading="lazy"' : ''}></button></div>
      <div class="hero-content">
        <div class="hero-badge-wrapper"><span class="badge${hasDiscount(variant) ? ' sale-badge' : ''}">${t(hasDiscount(variant) ? 'badge_sale' : 'badge_hyperdrip')}</span></div>
        <h1 class="hero-title"><button type="button" class="title-link" data-action="detail">${escapeHtml(product.title)}</button></h1>
        <div class="hero-price-wrapper"><span class="hero-price">${formatMoney(variant?.price, variant?.currency)}</span>${hasDiscount(variant) ? `<span class="hero-compare-price">${formatMoney(variant.compareAtPrice, variant.currency)}</span>` : ''}</div>
        <p class="hero-description">${escapeHtml(description)}</p>
        <div class="btn-container">
          <button type="button" class="btn btn-primary" data-action="hero-add" ${variant?.available ? '' : 'disabled'}>${variant?.available ? t('add_to_cart') : t('out_of_stock')}</button>
          <button type="button" class="btn btn-secondary" data-action="detail" ${variant?.available ? '' : 'disabled'}>${variant?.available ? t('buy_now') : t('out_of_stock')}</button>
        </div>
      </div>`;
    track.appendChild(slide);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `dot${index === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Slide ${index + 1}`);
    dot.addEventListener('click', () => setCarouselSlide(index));
    indicators.appendChild(dot);
  });
  clearInterval(carouselTimer);
  if (featured.length > 1) carouselTimer = setInterval(() => setCarouselSlide(currentCarouselIndex + 1), 5000);
}
function setCarouselSlide(index) {
  const slides = [...document.querySelectorAll('.carousel-slide')];
  const dots = [...document.querySelectorAll('.carousel-indicators .dot')];
  if (!slides.length) return;
  currentCarouselIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentCarouselIndex));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentCarouselIndex));
}
window.moveCarousel = direction => setCarouselSlide(currentCarouselIndex + direction);

function renderCatalog(products) {
  const grid = document.getElementById('product-grid');
  const empty = document.getElementById('search-empty');
  if (!grid) return;
  grid.innerHTML = '';
  if (empty) empty.hidden = products.length !== 0;
  products.forEach(product => {
    const variant = getDefaultVariant(product);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    const description = truncate(stripHtml(product.description) || 'Scopri le straordinarie caratteristiche e il design premium di questo prodotto esclusivo.', 90);
    card.innerHTML = `
      <div class="product-card-top">
        <button type="button" class="product-image-box" data-action="detail"><img src="${escapeHtml(product.images[0].url)}" alt="${escapeHtml(product.images[0].alt)}" loading="lazy"></button>
        <h3><button type="button" class="title-link" data-action="detail">${escapeHtml(product.title)}</button></h3>
        <div class="product-card-desc">${escapeHtml(description)}</div>
      </div>
      <div class="product-card-bottom">
        <div class="price-container"><span class="price">${formatMoney(variant?.price, variant?.currency)}</span>${hasDiscount(variant) ? `<span class="compare-price">${formatMoney(variant.compareAtPrice, variant.currency)}</span>` : ''}</div>
        ${!hasOnlyDefaultVariant(product) ? `<div class="card-variant-info"><span class="variant-count-badge">${product.variants.length} ${t('variants_available')}</span></div>` : ''}
        <div class="btn-container flex-column" style="flex-direction:column;gap:.6rem;width:100%">
          <div class="card-qty-wrapper" style="margin-bottom:.5rem"><div class="qty-control card-qty-control"><button type="button" class="qty-btn" data-action="qty-minus">−</button><input type="number" value="1" min="1" class="qty-input card-qty-input" aria-label="${t('quantity')}"><button type="button" class="qty-btn" data-action="qty-plus">+</button></div></div>
          <button type="button" class="btn btn-primary" style="width:100%" data-action="card-add" ${variant?.available ? '' : 'disabled'}>${variant?.available ? t('add_to_cart') : t('out_of_stock')}</button>
          <button type="button" class="btn btn-secondary" style="width:100%;text-align:center" data-action="detail" ${variant?.available ? '' : 'disabled'}>${variant?.available ? t('buy_now') : t('out_of_stock')}</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}
window.filterProducts = function() {
  const query = (document.getElementById('search-input')?.value || '').toLocaleLowerCase().trim();
  filteredProducts = allProducts.filter(product => `${product.title} ${stripHtml(product.description)}`.toLocaleLowerCase().includes(query));
  renderCatalog(filteredProducts);
};

function colorValue(value) {
  const normalized = String(value).trim().toLowerCase();
  const aliases = { nero:'#000', black:'#000', bianco:'#fff', white:'#fff', rosso:'#e53935', red:'#e53935', blu:'#1565c0', blue:'#1565c0', verde:'#43a047', green:'#43a047', grigio:'#777', gray:'#777', grey:'#777', marrone:'#795548', brown:'#795548', khaki:'#c3b091' };
  return aliases[normalized] || (/^(#[0-9a-f]{3,8}|rgb\(|hsl\()/i.test(normalized) ? normalized : '#777');
}
function isColorOption(name) { return /colou?r|colore|farbe|couleur/i.test(name); }
function renderProductDetail(product) {
  currentDetailProduct = product;
  selectedVariant = getDefaultVariant(product);
  selectedOptions = Object.fromEntries((selectedVariant?.options || []).map(option => [option.name, option.value]));
  const view = document.getElementById('product-view');
  if (!view || !selectedVariant) return;
  const image = selectedVariant.image || product.images[0];
  view.innerHTML = `<div class="product-page-section">
    <div class="product-breadcrumb"><a href="#" class="back-link" data-action="home">← <span>${t('back_to_catalog')}</span></a></div>
    <div class="product-single-container">
      <div class="product-media-gallery">
        <div class="product-main-image-box"><img id="main-product-image" src="${escapeHtml(image.url)}" alt="${escapeHtml(image.alt)}"></div>
        ${product.images.length > 1 ? `<div class="product-thumbnails">${product.images.map((item, i) => `<button type="button" class="thumb-item${item.url === image.url || (!selectedVariant.image && i === 0) ? ' active' : ''}" data-action="thumbnail" data-image="${escapeHtml(item.url)}"><img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.alt)}"></button>`).join('')}</div>` : ''}
      </div>
      <div class="product-details-container">
        <div class="product-vendor">${escapeHtml(product.vendor || 'HYPERDRIP')}</div>
        <h1 class="product-title">${escapeHtml(product.title)}</h1>
        <div class="product-price-wrapper"><span class="product-price" id="product-price"></span><span class="compare-price" id="compare-price"></span><span class="stock-badge" id="stock-badge"></span></div>
        <div class="product-description-short">${product.description || escapeHtml('Prodotto premium realizzato con materiali di elevata qualità.')}</div>
        <div class="variant-selectors-wrapper" id="detail-variant-selectors">${renderVariantSelectors(product)}</div>
        <div class="quantity-picker-wrapper"><label class="option-label" for="detail-quantity">${t('quantity')}</label><div class="qty-control"><button type="button" class="qty-btn" data-action="detail-qty-minus">−</button><input type="number" id="detail-quantity" value="1" min="1" class="qty-input"><button type="button" class="qty-btn" data-action="detail-qty-plus">+</button></div></div>
        <div class="product-action-buttons"><button type="button" id="add-to-cart-btn" class="btn btn-primary" data-action="detail-add"></button><button type="button" id="buy-now-btn" class="btn btn-secondary buy-now-btn" data-action="buy-now"></button></div>
      </div>
    </div>
  </div>`;
  updateDetailVariantUI();
}
function renderVariantSelectors(product) {
  if (hasOnlyDefaultVariant(product) || !product.options.length) return '';
  return product.options.map((option, index) => {
    const values = option.values?.length ? option.values : [...new Set(product.variants.flatMap(variant => variant.options.filter(item => item.name === option.name).map(item => item.value)))];
    return `<div class="variant-option-group" data-option-name="${escapeHtml(option.name)}"><label class="option-label">${escapeHtml(option.name)}: <span class="selected-value-text">${escapeHtml(selectedOptions[option.name] || values[0] || '')}</span></label><div class="option-values-list">${values.map(value => `<button type="button" class="option-pill ${isColorOption(option.name) ? 'color-pill ' : 'size-pill '}${selectedOptions[option.name] === value ? 'active' : ''}" data-action="select-option" data-value="${escapeHtml(value)}">${isColorOption(option.name) ? `<span class="color-swatch-circle" style="background-color:${colorValue(value)}"></span>` : ''}<span>${escapeHtml(value)}</span></button>`).join('')}</div></div>`;
  }).join('');
}
function findSelectedVariant() {
  return currentDetailProduct?.variants.find(variant => variant.options.every(option => selectedOptions[option.name] === option.value)) || null;
}
function updateDetailVariantUI() {
  const variant = selectedVariant;
  if (!variant) return;
  const price = document.getElementById('product-price');
  const compare = document.getElementById('compare-price');
  const stock = document.getElementById('stock-badge');
  const add = document.getElementById('add-to-cart-btn');
  const buy = document.getElementById('buy-now-btn');
  if (price) price.textContent = formatMoney(variant.price, variant.currency);
  if (compare) { compare.textContent = hasDiscount(variant) ? formatMoney(variant.compareAtPrice, variant.currency) : ''; compare.style.display = hasDiscount(variant) ? '' : 'none'; }
  if (stock) { stock.textContent = t(variant.available ? 'in_stock' : 'out_of_stock'); stock.className = `stock-badge ${variant.available ? 'in-stock' : 'out-of-stock'}`; }
  if (add) { add.textContent = variant.available ? t('add_to_cart') : t('out_of_stock'); add.disabled = !variant.available; }
  if (buy) { buy.textContent = variant.available ? t('buy_now') : t('out_of_stock'); buy.disabled = !variant.available; }
  if (variant.image) document.getElementById('main-product-image')?.setAttribute('src', variant.image.url);
}
window.showProductDetail = function(productId) {
  const product = allProducts.find(item => item.id === productId);
  if (!product) return;
  renderProductDetail(product);
  window.switchView('product');
};
window.adjustDetailQty = function(delta) {
  const input = document.getElementById('detail-quantity');
  if (input) input.value = Math.max(1, (parseInt(input.value, 10) || 1) + delta);
};
window.addDetailToCart = function() {
  if (currentDetailProduct && selectedVariant) addToCart(currentDetailProduct, selectedVariant, document.getElementById('detail-quantity')?.value);
};
window.buyDetailNow = function() { window.addDetailToCart(); window.checkout(); };

function addToCart(product, variant, quantity) {
  if (!variant?.available) return;
  const qty = Math.max(1, Number.parseInt(quantity, 10) || 1);
  const existing = cart.find(item => item.variantId === variant.id);
  if (existing) existing.quantity += qty;
  else cart.push({ productId: product.id, variantId: variant.id, title: product.title, variantTitle: variant.title === 'Default Title' ? '' : variant.title, price: variant.price, currency: variant.currency, image: (variant.image || product.images[0]).url, quantity: qty });
  saveCart();
  showToast(t('added_to_cart'));
}
function saveCart() { localStorage.setItem('hkadip_cart', JSON.stringify(cart)); updateCartBadge(); }
function updateCartBadge() { const badge = document.getElementById('cart-count'); if (badge) badge.textContent = cart.reduce((total, item) => total + item.quantity, 0); }
function renderCartView() {
  const view = document.getElementById('cart-view');
  if (!view) return;
  if (!cart.length) {
    view.innerHTML = `<div class="cart-page" style="margin:40px auto"><h2>${t('cart_heading')}</h2><div class="empty-cart-msg">${t('empty_cart')}</div><div style="text-align:center;margin-top:20px"><button type="button" class="btn btn-secondary" data-action="home">${t('continue_shopping')}</button></div></div>`;
    return;
  }
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const currency = cart[0]?.currency || 'EUR';
  view.innerHTML = `<div class="cart-page" style="margin:40px auto"><h2>${t('cart_heading')}</h2><div class="cart-items-list">${cart.map((item, index) => `
    <div class="cart-item" data-cart-index="${index}"><div class="cart-item-left"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" class="cart-item-thumb"><div class="cart-item-details"><h4>${escapeHtml(item.title)}</h4>${item.variantTitle ? `<div class="cart-item-meta"><span class="variant-tag">${escapeHtml(item.variantTitle)}</span></div>` : ''}<div class="cart-item-unit-price">${formatMoney(item.price, item.currency)}</div></div></div>
    <div class="cart-item-right"><div class="cart-qty-wrapper"><div class="qty-control cart-qty-control"><button type="button" class="qty-btn cart-qty-btn" data-action="cart-minus">−</button><input type="number" value="${item.quantity}" min="0" class="qty-input cart-qty-input" data-action="cart-input"><button type="button" class="qty-btn cart-qty-btn" data-action="cart-plus">+</button></div></div><div class="cart-item-price-wrapper"><div class="cart-item-price">${formatMoney(item.price * item.quantity, item.currency)}</div></div><button type="button" class="remove-btn" data-action="cart-remove"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg><span>${t('remove')}</span></button></div></div>`).join('')}</div>
    <div class="cart-summary"><div class="cart-total-info"><span class="cart-total-label">${t('total')}</span><span class="cart-total">${formatMoney(total, currency)}</span></div><div class="cart-summary-actions"><button type="button" class="btn btn-primary checkout-btn" data-action="checkout">${t('proceed_checkout')}</button></div></div></div>`;
}
function updateCartQuantity(index, quantity) {
  if (!cart[index]) return;
  const value = Math.max(0, Number.parseInt(quantity, 10) || 0);
  if (value === 0) cart.splice(index, 1); else cart[index].quantity = value;
  saveCart(); renderCartView();
}
window.checkout = function() {
  if (!cart.length) return;
  const items = cart.map(item => `${item.variantId.split('/').pop()}:${item.quantity}`).join(',');
  window.location.href = `https://${SHOPIFY_CONFIG.domain}/cart/${items}`;
};
function showToast(message) { const toast = document.getElementById('toast'); if (!toast) return; toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 3500); }

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('site_theme_lang', lang);
  document.documentElement.lang = lang;
  const flag = document.getElementById('current-flag-dot');
  const code = document.getElementById('current-lang-code');
  if (flag) flag.innerHTML = `<span class="flag-icon">${LANG_FLAGS[lang]}</span>`;
  if (code) code.textContent = lang.toUpperCase();
  document.querySelectorAll('.lang-option').forEach(option => option.classList.toggle('active', option.dataset.lang === lang));
  document.querySelectorAll('[data-i18n]').forEach(element => { if (translations[lang][element.dataset.i18n]) element.textContent = translations[lang][element.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => { if (translations[lang][element.dataset.i18nPlaceholder]) element.placeholder = translations[lang][element.dataset.i18nPlaceholder]; });
  if (allProducts.length) { renderCarousel(allProducts); renderCatalog(filteredProducts); }
  if (document.getElementById('product-view')?.classList.contains('active') && currentDetailProduct) renderProductDetail(currentDetailProduct);
  if (document.getElementById('cart-view')?.classList.contains('active')) renderCartView();
}
function initLanguageSelector() {
  const wrapper = document.getElementById('lang-selector-wrapper');
  const button = document.getElementById('lang-selector-btn');
  if (!wrapper || !button) return;
  button.addEventListener('click', event => { event.stopPropagation(); const open = wrapper.classList.toggle('open'); button.setAttribute('aria-expanded', String(open)); });
  wrapper.querySelectorAll('.lang-option').forEach(option => option.addEventListener('click', event => { event.stopPropagation(); setLanguage(option.dataset.lang); wrapper.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('click', event => { if (!wrapper.contains(event.target)) { wrapper.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); } });
  setLanguage(currentLang);
}

function productFromElement(element) { const holder = element.closest('[data-product-id]'); return allProducts.find(product => product.id === holder?.dataset.productId); }
document.addEventListener('click', event => {
  const actionElement = event.target.closest('[data-action]');
  if (!actionElement) return;
  const action = actionElement.dataset.action;
  if (action === 'home') { event.preventDefault(); window.switchView('home'); return; }
  if (action === 'detail') { const product = productFromElement(actionElement); if (product) window.showProductDetail(product.id); return; }
  if (action === 'hero-add') { const product = productFromElement(actionElement); if (product) addToCart(product, getDefaultVariant(product), 1); return; }
  if (action === 'qty-minus' || action === 'qty-plus') { const input = actionElement.closest('.qty-control')?.querySelector('.qty-input'); if (input) input.value = Math.max(1, (parseInt(input.value, 10) || 1) + (action === 'qty-plus' ? 1 : -1)); return; }
  if (action === 'card-add') { const product = productFromElement(actionElement); const qty = actionElement.closest('.product-card')?.querySelector('.card-qty-input')?.value; if (product) addToCart(product, getDefaultVariant(product), qty); return; }
  if (action === 'thumbnail') { document.getElementById('main-product-image')?.setAttribute('src', actionElement.dataset.image); document.querySelectorAll('.thumb-item').forEach(item => item.classList.toggle('active', item === actionElement)); return; }
  if (action === 'select-option') {
    const group = actionElement.closest('.variant-option-group');
    selectedOptions[group.dataset.optionName] = actionElement.dataset.value;
    group.querySelectorAll('.option-pill').forEach(item => item.classList.toggle('active', item === actionElement));
    group.querySelector('.selected-value-text').textContent = actionElement.dataset.value;
    selectedVariant = findSelectedVariant();
    if (!selectedVariant) {
      selectedVariant = currentDetailProduct.variants.find(variant => variant.available && variant.options.some(option => option.name === group.dataset.optionName && option.value === actionElement.dataset.value))
        || currentDetailProduct.variants.find(variant => variant.options.some(option => option.name === group.dataset.optionName && option.value === actionElement.dataset.value))
        || getDefaultVariant(currentDetailProduct);
      selectedOptions = Object.fromEntries(selectedVariant.options.map(option => [option.name, option.value]));
      document.getElementById('detail-variant-selectors').innerHTML = renderVariantSelectors(currentDetailProduct);
    }
    updateDetailVariantUI();
    return;
  }
  if (action === 'detail-qty-minus' || action === 'detail-qty-plus') { const input = document.getElementById('detail-quantity'); if (input) input.value = Math.max(1, (parseInt(input.value, 10) || 1) + (action === 'detail-qty-plus' ? 1 : -1)); return; }
  if (action === 'detail-add' || action === 'buy-now') { addToCart(currentDetailProduct, selectedVariant, document.getElementById('detail-quantity')?.value); if (action === 'buy-now') window.checkout(); return; }
  const row = actionElement.closest('[data-cart-index]');
  const index = Number(row?.dataset.cartIndex);
  if (action === 'cart-minus') updateCartQuantity(index, cart[index].quantity - 1);
  if (action === 'cart-plus') updateCartQuantity(index, cart[index].quantity + 1);
  if (action === 'cart-remove') updateCartQuantity(index, 0);
  if (action === 'checkout') window.checkout();
});
document.addEventListener('change', event => { if (event.target.dataset.action === 'cart-input') updateCartQuantity(Number(event.target.closest('[data-cart-index]').dataset.cartIndex), event.target.value); });

async function initApp() {
  updateCartBadge();
  initLanguageSelector();
  const grid = document.getElementById('product-grid');
  if (grid) grid.innerHTML = `<p class="catalog-status">${t('loading')}</p>`;
  try {
    allProducts = await fetchProductsFromShopify();
    filteredProducts = [...allProducts];
    renderCarousel(allProducts);
    renderCatalog(allProducts);
  } catch (error) {
    console.error('Errore durante il recupero dei prodotti Shopify:', error);
    document.getElementById('hero-section')?.setAttribute('hidden', '');
    if (grid) grid.innerHTML = `<p class="catalog-status">${t('load_error')}</p>`;
  }
}
document.addEventListener('DOMContentLoaded', initApp);
