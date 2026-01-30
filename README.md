# FeedSense – Intelligent Customer Feedback Classification System

FeedSense is an end-to-end machine learning system that classifies customer feedback into actionable categories and assigns priority levels using NLP and a deployed API.

## 🚀 Features
- NLP-based text preprocessing
- TF-IDF + Linear SVM model
- Flask REST API for real-time predictions
- Confidence scoring
- Priority assignment logic
- Logging system for monitoring
- React frontend UI

## 🧠 Tech Stack
**ML/NLP:** Scikit-learn, TF-IDF, Linear SVM  
**Backend:** Flask, Python  
**Frontend:** React  
**Deployment:** Ngrok (for demo)

## 🏗 Architecture
User → React UI → Flask API → ML Model → Prediction Response

## ▶️ How to Run Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
