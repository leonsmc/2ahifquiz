from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/save_score', methods=['POST'])
def save_score():
    data = request.json
    name = data['name']
    score = data['score']

    # Save to database.txt
    with open('database.txt', 'a') as file:
        file.write(f"{name},{score}\n")

    return jsonify({'status': 'success'}), 200

@app.route('/get_top_5', methods=['GET'])
def get_top_5():
    with open('database.txt', 'r') as file:
        entries = [line.strip().split(",") for line in file.readlines()]
        # Sort by score (convert string to int for correct sorting) in descending order
        entries.sort(key=lambda x: int(x[1]), reverse=True)
    return jsonify(entries[:5])

@app.route('/get_leaderboard', methods=['GET'])
def get_leaderboard():
    with open('database.txt', 'r') as file:
        entries = [line.strip().split(",") for line in file.readlines()]
    return jsonify(entries)

if __name__ == '__main__':
    app.run(debug=True)
