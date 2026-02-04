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
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "connect_args": {"sslmode": "require"}
}

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

from sqlalchemy import func

@app.route("/stats", methods=["GET"])
def get_stats():
    total = db.session.query(func.count(PredictionLog.id)).scalar()
    urgent = db.session.query(func.count(PredictionLog.id)).filter_by(priority="High").scalar()
    positive = db.session.query(func.count(PredictionLog.id)).filter_by(category="Positive").scalar()

    negative = total - positive if total else 0

    positive_percent = round((positive / total) * 100, 1) if total else 0
    negative_percent = round((negative / total) * 100, 1) if total else 0

    return jsonify({
        "total_feedback": total,
        "positive_percent": positive_percent,
        "negative_percent": negative_percent,
        "urgent_issues": urgent
    })

@app.route("/trend", methods=["GET"])
def trend():
    results = db.session.query(
        func.date(PredictionLog.timestamp),
        func.count(PredictionLog.id)
    ).group_by(func.date(PredictionLog.timestamp)) \
     .order_by(func.date(PredictionLog.timestamp)).all()

    data = [{"date": str(r[0]), "value": r[1]} for r in results]
    return jsonify(data)


@app.route("/sentiment-distribution", methods=["GET"])
def sentiment_distribution():
    results = db.session.query(
        PredictionLog.category,
        func.count(PredictionLog.id)
    ).group_by(PredictionLog.category).all()

    data = [{"name": r[0], "value": r[1]} for r in results]
    return jsonify(data)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if "text" not in data:
        return jsonify({"error": "Missing text field"}), 400

    raw_text = data["text"]
    cleaned = clean_text(raw_text)
    vector_input = vectorizer.transform([cleaned])

    # 🔹 Prediction
    pred_num = model.predict(vector_input)[0]

    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(vector_input)[0]
        confidence = float(max(probs))
    elif hasattr(model, "decision_function"):
        scores = model.decision_function(vector_input)
        confidence = float(abs(scores[0][pred_num]))
    else:
        confidence = 0.0

    category = le.inverse_transform([pred_num])[0]
    priority = assign_priority(category)

    # 🔹 Save to database
    log_entry = PredictionLog(
        text=raw_text,
        category=category,
        priority=priority,
        confidence=confidence,
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

