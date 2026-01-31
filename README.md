# **FeedSense – Intelligent Customer Feedback Classification System**

FeedSense is a **production-deployed end-to-end machine learning system** that classifies customer feedback into actionable categories and assigns priority levels using NLP and a live API.

It demonstrates **ML + Backend + Frontend + Deployment** working together as a real-world application.

---

## 🚀 Features

* NLP-based text preprocessing pipeline
* TF-IDF feature extraction (unigrams + bigrams)
* Linear SVM classifier for feedback categorization
* Real-time predictions via Flask REST API
* Confidence score for each prediction
* Automated priority assignment logic
* Logging system for prediction tracking
* Clean React frontend interface
* Fully deployed ML web application 🌍

---

## 🧠 Tech Stack

### Machine Learning / NLP

* Scikit-learn
* TF-IDF Vectorizer
* Linear Support Vector Machine (SVM)

### Backend

* Flask
* Flask-CORS
* Gunicorn (production server)

### Frontend

* React
* Fetch API for backend communication

### Deployment

* **Backend:** Render
* **Frontend:** Vercel
* **Version Control:** GitHub

---

## 🏗 System Architecture

User → React Frontend → Flask API → NLP Preprocessing → ML Model → Prediction Response

---

## 🌐 Live Demo

🔗 **Frontend UI:**
[https://feedsense-feedback-classifier.vercel.app](https://feedsense-feedback-classifier.vercel.app)

🔗 **Backend API:**
[https://feedsense.onrender.com](https://feedsense.onrender.com)

---

## 🧪 Example Prediction

**Input:**

> My laptop is not working

**Output:**
Category: Complaint
Priority: Low
Confidence: 0.89

---

## ▶️ Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📦 API Endpoints

| Endpoint      | Method | Description                            |
| ------------- | ------ | -------------------------------------- |
| `/health`     | GET    | Check if API is running                |
| `/predict`    | POST   | Get category, priority, and confidence |
| `/model-info` | GET    | Model metadata                         |

