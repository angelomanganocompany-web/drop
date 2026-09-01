from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PRODUCTS_DATABASE = [
    {
        "id": "10604421513482",
        "variantId": "53594794656010",
        "title": "Men’s Long Sleeve Shirt",
        "price": 15.42,
        "description": "Premium men's long sleeve shirt crafted from soft breathable cotton. Versatile and elegant.",
        "image": "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/unisex-long-sleeve-shirt-black-back-6a930a6dc0160.jpg?v=1788021378",
        "is_hero": True,
        "options": [
            { "name": "Size", "values": ["S", "M", "L", "XL", "2XL", "3XL", "4XL"] }
        ],
        "variants": [
            { "id": "53594794656010", "title": "S", "price": 15.42, "options": { "Size": "S" } },
            { "id": "53594794688778", "title": "M", "price": 15.42, "options": { "Size": "M" } },
            { "id": "53594794721546", "title": "L", "price": 15.42, "options": { "Size": "L" } },
            { "id": "53594794754314", "title": "XL", "price": 15.42, "options": { "Size": "XL" } },
            { "id": "53594794787082", "title": "2XL", "price": 15.42, "options": { "Size": "2XL" } },
            { "id": "53594794819850", "title": "3XL", "price": 15.42, "options": { "Size": "3XL" } },
            { "id": "53594794852618", "title": "4XL", "price": 15.42, "options": { "Size": "4XL" } }
        ]
    },
    {
        "id": "10604417876234",
        "variantId": "53594768867594",
        "title": "Unisex classic tee",
        "price": 7.02,
        "description": "100% cotton unisex classic t-shirt, breathable and durable for everyday comfort.",
        "image": "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/unisex-classic-tee-white-front-and-back-6a9306ae8db45.jpg?v=1788020415",
        "is_hero": False,
        "options": [],
        "variants": [
            { "id": "53594768867594", "title": "Default Title", "price": 7.02, "options": {} }
        ]
    },
    {
        "id": "10604369215754",
        "variantId": "53594513309962",
        "title": "Hoody Imperial",
        "price": 10.82,
        "description": "Sporty Imperial hoodie with adjustable drawstring hood and full zip. Cozy, warm and stylish.",
        "image": "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/S65afb369de854f8bb995fb02457dd708L.webp?v=1788014417",
        "is_hero": False,
        "options": [
            { "name": "Color", "values": ["Black", "Navy Blue", "Gray", "Brown", "Khaki", "Red"] },
            { "name": "Size", "values": ["S", "M", "L", "XL", "XXL", "XXXL"] }
        ],
        "variants": [
            { "id": "53594513309962", "title": "Black / S", "price": 10.82, "options": { "Color": "Black", "Size": "S" } },
            { "id": "53594513408266", "title": "Black / M", "price": 10.82, "options": { "Color": "Black", "Size": "M" } },
            { "id": "53594513375498", "title": "Black / L", "price": 10.82, "options": { "Color": "Black", "Size": "L" } },
            { "id": "53594513735946", "title": "Black / XL", "price": 10.82, "options": { "Color": "Black", "Size": "XL" } },
            { "id": "53594513703178", "title": "Black / XXL", "price": 10.82, "options": { "Color": "Black", "Size": "XXL" } },
            { "id": "53594513801482", "title": "Black / XXXL", "price": 10.82, "options": { "Color": "Black", "Size": "XXXL" } },
            { "id": "53594514030858", "title": "Navy Blue / S", "price": 10.82, "options": { "Color": "Navy Blue", "Size": "S" } },
            { "id": "53594514129162", "title": "Navy Blue / M", "price": 10.82, "options": { "Color": "Navy Blue", "Size": "M" } },
            { "id": "53594514096394", "title": "Navy Blue / L", "price": 10.82, "options": { "Color": "Navy Blue", "Size": "L" } },
            { "id": "53594514194698", "title": "Navy Blue / XL", "price": 10.82, "options": { "Color": "Navy Blue", "Size": "XL" } },
            { "id": "53594514161930", "title": "Navy Blue / XXL", "price": 10.82, "options": { "Color": "Navy Blue", "Size": "XXL" } },
            { "id": "53594513342730", "title": "Navy Blue / XXXL", "price": 10.82, "options": { "Color": "Navy Blue", "Size": "XXXL" } },
            { "id": "53594513441034", "title": "Gray / S", "price": 10.82, "options": { "Color": "Gray", "Size": "S" } },
            { "id": "53594513539338", "title": "Gray / M", "price": 10.82, "options": { "Color": "Gray", "Size": "M" } },
            { "id": "53594513506570", "title": "Gray / L", "price": 10.82, "options": { "Color": "Gray", "Size": "L" } },
            { "id": "53594513604874", "title": "Gray / XL", "price": 10.82, "options": { "Color": "Gray", "Size": "XL" } },
            { "id": "53594513572106", "title": "Gray / XXL", "price": 10.82, "options": { "Color": "Gray", "Size": "XXL" } },
            { "id": "53594513670410", "title": "Gray / XXXL", "price": 10.82, "options": { "Color": "Gray", "Size": "XXXL" } },
            { "id": "53594514358538", "title": "Red / S", "price": 10.82, "options": { "Color": "Red", "Size": "S" } },
            { "id": "53594514456842", "title": "Red / M", "price": 10.82, "options": { "Color": "Red", "Size": "M" } },
            { "id": "53594514424074", "title": "Red / L", "price": 10.82, "options": { "Color": "Red", "Size": "L" } },
            { "id": "53594513998090", "title": "Red / XL", "price": 10.82, "options": { "Color": "Red", "Size": "XL" } },
            { "id": "53594513965322", "title": "Red / XXL", "price": 10.82, "options": { "Color": "Red", "Size": "XXL" } },
            { "id": "53594514063626", "title": "Red / XXXL", "price": 10.82, "options": { "Color": "Red", "Size": "XXXL" } }
        ]
    }
]

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify({"status": "success", "products": PRODUCTS_DATABASE}), 200

@app.route('/api/orders', methods=['POST'])
def process_order():
    order_data = request.get_json()
    print(f"\n📦 Order received: €{order_data.get('total')}")
    print(f"Items: {order_data.get('items')}")
    return jsonify({"status": "success", "message": "Order recorded"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)