from flask_cors import CORS

from flask import Flask, request, jsonify
import pickle
import os
import csv
from datetime import datetime
from preprocessing import clean_text
from utils import assign_priority

app = Flask(__name__)
CORS(app)

MODEL_PATH = "model/model_v1.pkl"
VECTORIZER_PATH = "model/vectorizer.pkl"
ENCODER_PATH = "model/label_encoder.pkl"
LOG_PATH = "logs/predictions.csv"

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(VECTORIZER_PATH, "rb") as f:
    vectorizer = pickle.load(f)

with open(ENCODER_PATH, "rb") as f:
    le = pickle.load(f)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "API is running"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if "text" not in data:
        return jsonify({"error": "Missing text field"}), 400

    raw_text = data["text"]
    cleaned = clean_text(raw_text)
    vector_input = vectorizer.transform([cleaned])

    pred_num = model.predict(vector_input)[0]
    scores = model.decision_function(vector_input)
    confidence = float(max(scores[0]))

    category = le.inverse_transform([pred_num])[0]
    priority = assign_priority(category)

    os.makedirs(f"{BASE_PATH}/logs", exist_ok=True)
    with open(LOG_PATH, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([raw_text, category, priority, confidence, datetime.now()])

    return jsonify({
        "category": category,
        "priority": priority,
        "confidence": confidence
    })

@app.route("/model-info", methods=["GET"])
def model_info():
    return jsonify({
        "model_name": "Customer Feedback Classifier",
        "version": "1.0",
        "training_date": "2026-01"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

