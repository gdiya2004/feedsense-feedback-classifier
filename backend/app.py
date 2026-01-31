from flask_sqlalchemy import SQLAlchemy
import os

from flask_cors import CORS

from flask import Flask, request, jsonify
import pickle
import os
import csv
from datetime import datetime
from preprocessing import clean_text
from utils import assign_priority

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)
class PredictionLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    category = db.Column(db.String(50))
    priority = db.Column(db.String(20))
    confidence = db.Column(db.Float)
    timestamp = db.Column(db.DateTime)
with app.app_context():
    db.create_all()

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

    import os

from datetime import datetime

log_entry = PredictionLog(
    text=raw_text,
    category=category,
    priority=priority,
    confidence=float(confidence),
    timestamp=datetime.now()
)

db.session.add(log_entry)
db.session.commit()



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

