# EngineeringPath AI (FastAPI + Next.js Migration)

An AI-powered MHT-CET Rank Predictor & College Recommender platform for Maharashtra engineering aspirants. This project has been migrated from a Flask monolith into a decoupled, modern web application.

---

## 🏗️ Tech Stack
* **Backend**: FastAPI (Python) + Scikit-Learn
* **Frontend**: Next.js 16 (React) + TypeScript + Vanilla CSS (Glassmorphic Design)

---

## 🚀 How to Run the Project Locally

To run the project, you need to start **both** the FastAPI backend and the Next.js frontend servers.

### 1. Start the FastAPI Backend
Open a terminal in the root directory:

```bash
# Navigate to the backend directory
cd backend

# (Optional) Create a virtual environment
python -m venv venv
# Activate virtual environment:
# - On Windows:
.\venv\Scripts\activate
# - On macOS/Linux:
source venv/bin/activate

# Install required dependencies
pip install -r requirements.txt

# Start the FastAPI development server
python -m uvicorn main:app --reload --port 8000
```
The backend will be running at **`http://localhost:8000`**.  
You can view the interactive API documentation at **`http://localhost:8000/docs`**.

---

### 2. Start the Next.js Frontend
Open a **new, separate terminal** in the root directory:

```bash
# Navigate to the frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the Next.js development server
npm run dev
```
The frontend will be running at **`http://localhost:3000`**.  
Open **`http://localhost:3000`** in your browser to view the application. Go to **`/predictor`** to access the admission predictor tool.

---

## 📂 Project Structure

```
EngineeringPath AI/
├── backend/
│   ├── main.py                     # FastAPI server entry point
│   ├── preprocess.py               # Preprocessing pipelines
│   ├── train_model.py              # Script to train/save model
│   ├── model.pkl                   # Trained ML model pipeline
│   ├── PH2025_MH_MeritList_Clean.csv # Merit list dataset
│   └── requirements.txt            # Backend dependencies
└── frontend/
    ├── src/
    │   ├── app/                    # Next.js pages (layout, home, predictor)
    │   └── components/             # Reusable React components (Navbar, Footer, Section blocks)
    ├── public/                     # Static assets (logo, images, gltf models)
    ├── .env.local                  # Environment variables config
    └── package.json                # Frontend packages
```
