# 🌊 नीरOrbit

Backend code is available here: [IntuitiveBackend](https://github.com/yashsai786/IntuitiveBackend.git)

### Smart Flood Forecasting, Mitigation & Simulation System

> **An AI-powered, real-time flood intelligence and disaster management platform designed to help citizens, authorities, and emergency responders predict, prepare for, and mitigate flood disasters.**

---

## 🛡️ Team Information

**Team Name:** **AIvengers**

**Project Name:** **नीरOrbit**
**Domain:** **Disaster Management**
**Final Evaluation Date:** *11 January 2026*

### 👥 Team Members

* **Yash Gangwani** *(Team Lead)*
* **Purav Shah**
* **Diya Jain**
* **Jaimin Trivedi**
* **Zalak Thakkar**

---

## 📌 Problem Statement

Floods are among the most destructive natural disasters, causing widespread loss of life, damage to infrastructure, agricultural disruption, and economic instability. Existing flood forecasting systems often lack real-time adaptability, multi-source intelligence, and actionable decision support—especially under rapidly changing climate conditions.

The challenge is to build an **AI-driven flood forecasting and mitigation system** that:

* Integrates **weather data, satellite imagery, historical flood records, and community inputs**
* Provides **real-time flood risk prediction and early warnings**
* Enables **flood simulations and scenario testing**
* Assists authorities in **resource planning, evacuation strategies, and mitigation planning**
* Remains **scalable, accurate, and user-friendly** for both experts and non-experts

---

## 🌍 What is नीरOrbit?

**नीरOrbit** is a **web-based, real-time flood monitoring and intelligence platform** that combines:

* **AI-powered flood prediction**
* **Satellite & ground image analysis**
* **Weather-based forecasting**
* **Crowdsourced community reporting**
* **Interactive maps, simulations, and analytics**

The platform provides **nationwide flood risk visibility**, early alerts, and actionable insights to support **faster, smarter disaster response**.

---

## 🚀 Core System Features

### 🌦️ Weather-Based Flood Forecasting

* Analyzes live weather parameters:

  * Rainfall
  * Temperature
  * Humidity
  * Wind speed
  * Atmospheric pressure
* Predicts **flood probability for the next 24 hours**
* AI models enhanced with historical flood data

---

### 🗺️ Real-Time Flood Risk Mapping

* Interactive regional & global flood risk maps
* Color-coded risk zones:

  * Low
  * Moderate
  * High
  * Extreme
* Nationwide and location-specific monitoring

---

### 🧠 AI-Powered Flood Detection

* CNN-based flood classification using **Sentinel-1 SAR imagery**
* Works under:

  * Cloud cover
  * Night-time conditions
* Outputs:

  * Binary flood maps (Flood / No Flood)
  * Pixel-wise probability maps

---

### 📡 Satellite & Ground Image Analysis

* Users upload:

  * Satellite images
  * Ground-level flood images
* Supports:

  * Drag-and-drop upload
  * GPS tagging
  * Timestamping
* AI verifies flood presence and severity

---

### 👥 Community Crowdsourcing Module

* Users submit flood reports with:

  * Location (Latitude & Longitude)
  * Category
  * Description
  * Images
* Enables rapid ground-level intelligence
* Improves model validation and response accuracy

---

### 🧪 Flood Simulation & Scenario Testing

* Adjust simulation parameters:

  * Rainfall intensity
  * River overflow
  * Terrain type (Urban / Rural / Mixed)
  * Duration
* Visualizes:

  * Affected regions
  * Water levels
  * Risk zones
* Helps authorities test mitigation strategies **before real disasters**

---

### 🚨 Alerts, SOS & Emergency Support

* Early warning alerts
* SOS emergency services
* Emergency helplines
* Safety guidelines & Do’s / Don’ts
* G2C (Government-to-Citizen) broadcast alerts

---

### 📊 Analytics & Insights

* Flood incident tracking
* Lives affected & regions impacted
* Historical trend analysis
* Flood frequency & vulnerability heatmaps
* Community contribution statistics

---

### 🏆 Contributor Recognition System

* Tracks:

  * Top contributors
  * Contribution streaks
  * Membership levels (Elite, Gold, Silver, Bronze)
* Encourages continuous community participation

---

### 🛠️ Admin & Authority Portal

* Real-time monitoring of:

  * Flood reports
  * Users
  * Regions
* Report status management:

  * Pending
  * Approved
  * Flagged
* Alert broadcasting with quick templates
* Centralized crisis management dashboard

---

## 🧠 AI / ML Pipeline Overview

### Dataset

* **3,331 Sentinel-1 SAR image tiles**
* Balanced flooded & non-flooded samples
* Train / Validation / Test split: **70 / 15 / 15**

### Input Structure

* **6-channel SAR tensor (256×256):**

  * VV_dB
  * VH_dB
  * VV + VH
  * VV − VH
  * VV / VH
  * VV × VH

### Model Performance (CNN)

* **Accuracy:** 82.6%
* **ROC-AUC:** 0.91
* **Recall:** 0.89
* **Precision:** 0.84

> High recall ensures minimal missed flood events—critical for early warnings.

---

## 🔌 API & System Workflow

1. Sentinel-1 SAR data ingestion (VV & VH)
2. Data preprocessing & EDA
3. CNN-based flood inference
4. Probability & classification output
5. REST API response via FastAPI
6. Visualization on dashboard & maps

---

## 🧰 Technology Stack

### Frontend

* HTML
* CSS
* Bootstrap
* JavaScript

### Backend

* Django
* Django REST Framework
* JWT Authentication

### AI / ML

* Python
* CNN (Keras)
* FastAPI
* NumPy
* Pandas

### Database

* SQLite

### Infrastructure & Tools

* Redis
* Celery
* Git & GitHub
* Render
* ngrok

### Design

* Figma
* Canva

---

## 📈 Future Enhancements

* IoT sensor integration
* Mobile application support
* Advanced mitigation recommendation engine
* Climate-adaptive self-learning models
* Multi-language accessibility

---

## 🏁 Conclusion

**नीरOrbit** brings together **AI, satellite intelligence, real-time data, and community participation** into a unified disaster management platform.
It empowers authorities and citizens to **predict early, respond faster, and minimize flood damage**.

> **Predict Early · Act Smart · Save Lives 🌍**


