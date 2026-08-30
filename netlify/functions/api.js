const { connectLambda, getStore } = require("@netlify/blobs");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;
const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL;

exports.handler = async (event) => {
    connectLambda(event);
    const store = getStore("site_config");

    // Normalizza il percorso rimuovendo l'eventuale barra finale '/'
    const path = (event.path || "").replace(/\/$/, "");
    const method = event.httpMethod;
    const headers = { 
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Headers": "Content-Type", 
        "Content-Type": "application/json" 
    };

    if (method === "OPTIONS") return { statusCode: 200, headers, body: "" };

    // GET /mode
    if (method === "GET" && path.endsWith("/mode")) {
        let mode = (await store.get("mode")) || "shopify";
        let shopifyUrl = (await store.get("shopifyUrl")) || "https://hkadip-1s.myshopify.com";
        const redirectUrl = (await store.get("redirectUrl")) || "";

        // Auto-correzione indirizzo Shopify se invalido o segnaposto
        if (!shopifyUrl || shopifyUrl.includes("tuo-shop")) {
            shopifyUrl = "https://hkadip-1s.myshopify.com";
            await store.set("shopifyUrl", shopifyUrl);
        }

        return { 
            statusCode: 200, 
            headers, 
            body: JSON.stringify({ mode, redirectUrl, shopifyUrl, pythonServerUrl: PYTHON_SERVER_URL || "http://localhost:5000" }) 
        };
    }

    // GET /shopify-products (Proxy server-side per bypassare il blocco CORS del browser)
    if (method === "GET" && path.endsWith("/shopify-products")) {
        try {
            const sUrl = (await store.get("shopifyUrl")) || "https://hkadip-1s.myshopify.com";
            const response = await fetch(`${sUrl}/products.json`);
            if (response.ok) {
                const data = await response.json();
                return { statusCode: 200, headers, body: JSON.stringify(data) };
            }
        } catch (err) {
            console.error("Errore recupero prodotti Shopify server-side:", err);
        }
        return { statusCode: 500, headers, body: JSON.stringify({ error: "Impossibile recuperare prodotti da Shopify" }) };
    }

    // POST /telegram-webhook
    if (method === "POST" && path.endsWith("/telegram-webhook")) {
        const body = JSON.parse(event.body || "{}");
        if (body.message?.text) {
            const chatId = body.message.chat.id;
            const fullText = body.message.text.trim();
            
            const parts = fullText.split(/\s+/);
            const command = parts[0].split("@")[0].toLowerCase();
            let replyText = "";

            if (command === "/shopify") { 
                await store.set("mode", "shopify"); 
                await store.set("shopifyUrl", "https://hkadip-1s.myshopify.com");
                replyText = "🟢 Modalità attiva: SHOPIFY (hkadip-1s.myshopify.com)"; 
            } else if (command === "/python") { 
                await store.set("mode", "python"); 
                replyText = "🔵 Modalità attiva: SERVER PYTHON"; 
            } else if (command === "/redirect") {
                const url = parts[1];
                if (url?.startsWith("http")) { 
                    await store.set("mode", "redirect"); 
                    await store.set("redirectUrl", url); 
                    replyText = `🟡 Redirect -> ${url}`; 
                } else replyText = "⚠️ Usare: /redirect https://link.com";
            } else if (command === "/status") {
                const currentMode = (await store.get("mode")) || "shopify";
                const currentShopify = (await store.get("shopifyUrl")) || "https://hkadip-1s.myshopify.com";
                replyText = `ℹ️ Modalità attuale: ${currentMode.toUpperCase()}\nStore: ${currentShopify}`;
            } else {
                replyText = "🤖 Comandi disponibili:\n/shopify\n/python\n/redirect <url>\n/status";
            }

            if (TELEGRAM_TOKEN) {
                await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                    method: "POST", 
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id: chatId, text: replyText })
                });
            }
        }
        return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    // POST /checkout
    if (method === "POST" && path.endsWith("/checkout")) {
        const orderData = JSON.parse(event.body || "{}");
        if (TELEGRAM_TOKEN && TELEGRAM_ADMIN_CHAT_ID) {
            const items = (orderData.items || []).map(i => `• ${i.name} (€${i.price?.toFixed(2) || '0.00'})`).join("\n");
            await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    chat_id: TELEGRAM_ADMIN_CHAT_ID, 
                    text: `🛍️ NUOVO ORDINE!\n\n${items}\n\nTotale: €${orderData.total?.toFixed(2) || '0.00'}` 
                })
            });
        }
        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 404, headers, body: JSON.stringify({ error: "Non trovato" }) };
};