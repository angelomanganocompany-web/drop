from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PRODUCTS_DATABASE = [
    {
        "id": "10604421513482",
        "variantId": "53594685374730",
        "title": "Men’s Long Sleeve Shirt",
        "price": 15.42,
        "description": "Maglia a maniche lunghe da uomo in morbido cotone, versatile ed elegante.",
        "image": "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/unisex-long-sleeve-shirt-black-back-6a930a6dc0160.jpg?v=1788021378",
        "is_hero": True
    },
    {
        "id": "10604417876234",
        "variantId": "53594676527370",
        "title": "Unisex classic tee",
        "price": 7.02,
        "description": "T-shirt classica unisex 100% cotone, traspirante e confortevole per ogni giorno.",
        "image": "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/unisex-classic-tee-white-front-and-back-6a9306ae8db45.jpg?v=1788020415",
        "is_hero": False
    },
    {
        "id": "10604369215754",
        "variantId": "53594513309962",
        "title": "Hoody Imperial",
        "price": 10.82,
        "description": "Felpa sportiva Hoody Imperial con cappuccio e zip, calda e resistente.",
        "image": "https://cdn.shopify.com/s/files/1/0961/7529/2682/files/S65afb369de854f8bb995fb02457dd708L.webp?v=1788014417",
        "is_hero": False
    }
]

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify({"status": "success", "products": PRODUCTS_DATABASE}), 200

@app.route('/api/orders', methods=['POST'])
def process_order():
    order_data = request.get_json()
    print(f"\n📦 Ordine ricevuto: €{order_data.get('total')}")
    return jsonify({"status": "success", "message": "Ordine registrato"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)