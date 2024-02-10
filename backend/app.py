import os
from flask import Flask, request, jsonify 
from vertexai.preview.language_models import ChatModel , InputOutputTextPair 
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

chat_model = ChatModel.from_pretrained("chat-bison@001")
@app.route('/send-message', methods=['POST'])
def send_message(temperature : float = 0.2):
    user_message = request.json['message']

    parameters = {
        "temperature": temperature,  # Temperature controls the degree of randomness in token selection.
        "max_output_tokens": 256,  # Token limit determines the maximum amount of text output.
        "top_p": 0.95,  # Tokens are selected from most probable to least until the sum of their probabilities equals the top_p value.
        "top_k": 40,  # A top_k of 1 means the selected token is the most probable among all tokens.
    }


    # Start a new chat
    chat = chat_model.start_chat(
        context="You are a clothing store assistant for TrendyThreads, an online fashion retailer. Your goal is to provide excellent customer service, help customers find the perfect outfits,and promote ongoing promotions and discounts." , 
        examples=[
            InputOutputTextPair(
                input_text="Hi",
                output_text="Hello fashionista! 👋 How can I assist you today? Looking for a specific outfit or style?",
            ),
            InputOutputTextPair(
               input_text="What's the latest trend in formal wear?",
                output_text="Great question! Our latest formal wear collection features elegant dresses and sharp suits. Whether it's for a special occasion or a professional event, we've got you covered. Is there a particular style or color you're interested in?",
                ),
            InputOutputTextPair(
                input_text="Tell me about the shipping options.",
                output_text="Certainly! We offer standard and express shipping options. Standard shipping usually takes 3-5 business days, while express shipping delivers within 1-2 business days. Feel free to let me know if you have a preference.",
            ),
            InputOutputTextPair(
                input_text="Are there any ongoing promotions?",
                output_text="Absolutely! 🎉 Right now, you can use code TRENDY20 to get a 20% discount on your order. Keep an eye on our newsletter for exclusive deals and updates on upcoming sales. Have you subscribed yet?",
            ),
        ]
    )
    response = chat.send_message(user_message)

    custom_response = {
        'text': response.text,
        'showType': None,
        'imagePath': None,
    }

    type_keywords = ['shirts', 'bags', 'shoe']
    for keyword in type_keywords:
        if keyword in user_message.lower():
            custom_response['showType'] = keyword
            print(f'Showing {keyword} in user message')
            image_path = os.path.join('data', keyword, 'images')
            custom_response['imagePath'] = image_path
            break

    return jsonify({'reply': custom_response})

@app.route('/api/get-images', methods=['GET'])
def get_images():
    image_path = request.args.get('image_path')
    if image_path:
        filename = f"./{image_path}/shirt001.jpg"
        print(filename)
        # directory = os.path.join(filename)
        # image_path_call = os.path.join(directory , filename)
        # print(filename , directory , image_path_call)
        return jsonify({'images': [filename]})

    return jsonify({'error': 'Invalid request'}), 400

if __name__ == '__main__':
    app.run(debug=True)