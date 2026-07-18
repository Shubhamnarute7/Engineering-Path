import os
import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from contextlib import asynccontextmanager
import preprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Global variables to hold model and data
model_pipeline = None
merit_list_df = None

# Dynamic Recommendation database containing top Maharashtra engineering colleges
COLLEGES_DB = [
    {"name": "COEP Technological University", "location": "Pune", "type": "Government", "base_cutoff": 99.0},
    {"name": "VJTI (Veermata Jijabai Technological Institute)", "location": "Mumbai", "type": "Government Aided", "base_cutoff": 99.2},
    {"name": "SPIT (Sardar Patel Institute of Technology)", "location": "Mumbai", "type": "Private Aided", "base_cutoff": 97.8},
    {"name": "PICT (Pune Institute of Computer Technology)", "location": "Pune", "type": "Private", "base_cutoff": 98.0},
    {"name": "VIT (Vishwakarma Institute of Technology)", "location": "Pune", "type": "Private", "base_cutoff": 94.0},
    {"name": "Walchand College of Engineering", "location": "Sangli", "type": "Government Aided", "base_cutoff": 95.5},
    {"name": "Shri Ramdeobaba College of Engineering", "location": "Nagpur", "type": "Private", "base_cutoff": 92.0},
    {"name": "Dwarkadas J. Sanghvi College of Engineering", "location": "Mumbai", "type": "Private", "base_cutoff": 95.8},
    {"name": "Thadomal Shahani Engineering College", "location": "Mumbai", "type": "Private", "base_cutoff": 93.0},
    {"name": "K. J. Somaiya College of Engineering", "location": "Mumbai", "type": "Private", "base_cutoff": 94.5},
    {"name": "Government College of Engineering", "location": "Aurangabad", "type": "Government", "base_cutoff": 91.0},
    {"name": "Government College of Engineering", "location": "Karad", "type": "Government", "base_cutoff": 90.0},
    {"name": "Government College of Engineering", "location": "Amravati", "type": "Government", "base_cutoff": 89.5},
    {"name": "MIT World Peace University (MIT-WPU)", "location": "Pune", "type": "Private", "base_cutoff": 92.5},
    {"name": "Army Institute of Technology (AIT)", "location": "Pune", "type": "Private", "base_cutoff": 96.0},
    {"name": "Fr. Conceicao Rodrigues College of Engineering", "location": "Bandra, Mumbai", "type": "Private", "base_cutoff": 91.2},
    {"name": "Pimpri Chinchwad College of Engineering (PCCOE)", "location": "Pune", "type": "Private", "base_cutoff": 93.5},
    {"name": "Yeshwantrao Chavan College of Engineering", "location": "Nagpur", "type": "Private", "base_cutoff": 84.5},
    {"name": "Ramrao Adik Institute of Technology (RAIT)", "location": "Navi Mumbai", "type": "Private", "base_cutoff": 87.0},
    {"name": "G.H. Raisoni College of Engineering", "location": "Nagpur", "type": "Private", "base_cutoff": 82.0},
]


def load_resources():
    """Load ML model and dataset into memory."""
    global model_pipeline, merit_list_df
    # Load model
    model_path = os.path.join(BASE_DIR, 'model.pkl')
    if os.path.exists(model_path):
        model_pipeline = joblib.load(model_path)
    else:
        print("Warning: model.pkl not found. Please train the model first.")
    
    # Load and preprocess dataset
    csv_path = os.path.join(BASE_DIR, 'PH2025_MH_MeritList_Clean.csv')
    if os.path.exists(csv_path):
        merit_list_df = preprocess.load_data(csv_path)
    else:
        print(f"Warning: Dataset {csv_path} not found.")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load resources on startup."""
    load_resources()
    yield


app = FastAPI(
    title="EngineeringPath AI API",
    description="FastAPI backend for ML-based MHT-CET rank prediction and college recommendation.",
    version="2.0.0",
    lifespan=lifespan,
)

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


import jwt
import hashlib
from datetime import datetime, timedelta

SECRET_KEY = "super-secret-key-for-engineeringpath-ai"
ALGORITHM = "HS256"

# Password Hashing Helpers using SHA-256
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    return hash_password(password) == hashed

# Access Token Helper
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=120)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# In-memory Mock Database
USERS_DB = {
    "admin@engineeringpath.ai": {
        "name": "Admin User",
        "email": "admin@engineeringpath.ai",
        "password_hash": hash_password("admin123"),
        "role": "Admin",
        "verified": True
    },
    "student@engineeringpath.ai": {
        "name": "Student User",
        "email": "student@engineeringpath.ai",
        "password_hash": hash_password("student123"),
        "role": "Student",
        "verified": True
    }
}
OTP_DB = {} # email -> active OTP code

# ──────────────────────────────────────────
# Pydantic Auth Request / Response Schemas
# ──────────────────────────────────────────

class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    role: str = "Student" # Admin, Client, Student, Employee

class UserLogin(BaseModel):
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordPayload(BaseModel):
    email: str
    otp: str
    new_password: str

class VerifyEmailPayload(BaseModel):
    email: str
    otp: str

# ──────────────────────────────────────────
# Pydantic Request / Response Schemas
# ──────────────────────────────────────────

class PredictRequest(BaseModel):
    percentile: float = Field(..., ge=0.0, le=100.0, description="MHT-CET percentile score")
    category: str = "Open"
    gender: str = "Male"
    branch_preference: str = "B. Pharmacy"
    ews: str = "No"
    tfws: str = "No"
    pwd: str = "No"
    minority_type: str = "-/-"
    hsc_marks: Optional[float] = None


class EnquiryRequest(BaseModel):
    name: str
    email: str
    phone: str
    course: str
    percentile: Optional[str] = ""


# ──────────────────────────────────────────
# Helper Functions (same logic as Flask app)
# ──────────────────────────────────────────

def get_branch_offset(branch: str) -> float:
    """Calculate engineering branch cutoff offset based on competitiveness."""
    b_lower = str(branch).strip().lower()
    if any(kw in b_lower for kw in ['computer', 'cse', 'cs', 'data', 'ai']):
        return 1.5
    elif any(kw in b_lower for kw in ['it', 'information']):
        return 0.8
    elif any(kw in b_lower for kw in ['telecommunication', 'entc', 'electronics']):
        return -1.0
    elif 'mechanical' in b_lower:
        return -4.0
    elif 'civil' in b_lower:
        return -6.0
    elif 'chemical' in b_lower:
        return -3.0
    else:
        return 0.0


def predict_rank_for_features(percentile, category, gender, ews, tfws, pwd, minority_type, hsc_marks):
    """Helper to call ML pipeline and predict rank."""
    if model_pipeline is None:
        # Fallback approximation if model is not loaded
        return int(52466 * (1 - percentile / 100))
        
    input_data = pd.DataFrame([{
        'merit_percentile': percentile,
        'category': category,
        'gender': gender,
        'is_ews': ews,
        'is_tfws': tfws,
        'is_pwd_def': pwd,
        'minority_type': minority_type,
        'hsc_total_percent': hsc_marks
    }])
    
    pred = model_pipeline.predict(input_data)[0]
    return int(max(1, round(pred)))


def get_similar_students(percentile, category, gender, limit=5):
    """Find actual students with closest percentile in same category/gender."""
    if merit_list_df is None:
        return []
        
    # Clean filters
    cat_clean = preprocess.normalize_category(category)
    gen_clean = preprocess.normalize_gender(gender)
    
    # Filter by category and gender if possible
    subset = merit_list_df[(merit_list_df['category'] == cat_clean) & (merit_list_df['gender'] == gen_clean)]
    if len(subset) < limit:
        subset = merit_list_df[merit_list_df['category'] == cat_clean]
    if len(subset) < limit:
        subset = merit_list_df
        
    diffs = (subset['merit_percentile'] - percentile).abs()
    closest_indices = diffs.nsmallest(limit).index
    similar_df = subset.loc[closest_indices].copy()
    
    results = []
    for _, row in similar_df.iterrows():
        raw_name = str(row['candidate_name']).title()
        name = " ".join(raw_name.split())
        results.append({
            'merit_no': int(row['merit_no']),
            'candidate_name': name,
            'merit_percentile': float(row['merit_percentile']),
            'category': str(row['category']),
            'gender': str(row['gender']),
            'hsc_total_percent': float(row['hsc_total_percent']),
            'is_ews': str(row['is_ews']),
            'is_tfws': str(row['is_tfws']),
            'is_pwd_def': str(row['is_pwd_def'])
        })
    return results


# ──────────────────────────────────────────
# API Endpoints
# ──────────────────────────────────────────

@app.get("/api/health")
def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "model_loaded": model_pipeline is not None,
        "dataset_loaded": merit_list_df is not None,
        "dataset_size": len(merit_list_df) if merit_list_df is not None else 0,
    }


@app.post("/api/predict")
def predict(payload: PredictRequest):
    """Predict rank, similar students, and recommendations based on percentile similarity."""
    # Ensure resources are loaded
    if model_pipeline is None or merit_list_df is None:
        load_resources()
        if model_pipeline is None or merit_list_df is None:
            raise HTTPException(status_code=500, detail="Server resources (model or dataset) are not loaded.")

    try:
        percentile = payload.percentile
        hsc_marks = payload.hsc_marks if payload.hsc_marks is not None else 63.0

        # Normalize values
        category_norm = preprocess.normalize_category(payload.category)
        gender_norm = preprocess.normalize_gender(payload.gender)
        ews_norm = preprocess.to_yes_no(payload.ews)
        tfws_norm = preprocess.to_yes_no(payload.tfws)
        pwd_norm = preprocess.to_yes_no(payload.pwd)
        minority_norm = preprocess.normalize_minority(payload.minority_type)

        # 1. Predict Rank using Machine Learning Model
        estimated_merit_rank = predict_rank_for_features(
            percentile, category_norm, gender_norm, ews_norm, tfws_norm, pwd_norm, minority_norm, hsc_marks
        )

        # 2. Get Similar Students
        similar_students = get_similar_students(percentile, category_norm, gender_norm, limit=5)

        # 3. Define percentile ranges and predict corresponding rank boundaries
        # Safe range: [P - 10.0, P - 2.5]
        p_safe_min = float(max(0.1, percentile - 10.0))
        p_safe_max = float(max(0.1, percentile - 2.5))
        rank_safe_min = predict_rank_for_features(p_safe_max, category_norm, gender_norm, ews_norm, tfws_norm, pwd_norm, minority_norm, hsc_marks)
        rank_safe_max = predict_rank_for_features(p_safe_min, category_norm, gender_norm, ews_norm, tfws_norm, pwd_norm, minority_norm, hsc_marks)

        # Moderate range: [P - 2.5, P + 1.5]
        p_mod_min = float(max(0.1, percentile - 2.5))
        p_mod_max = float(min(100.0, percentile + 1.5))
        rank_mod_min = predict_rank_for_features(p_mod_max, category_norm, gender_norm, ews_norm, tfws_norm, pwd_norm, minority_norm, hsc_marks)
        rank_mod_max = predict_rank_for_features(p_mod_min, category_norm, gender_norm, ews_norm, tfws_norm, pwd_norm, minority_norm, hsc_marks)

        # Dream range: [P + 1.5, P + 6.0]
        p_dream_min = float(min(100.0, percentile + 1.5))
        p_dream_max = float(min(100.0, percentile + 6.0))
        rank_dream_min = predict_rank_for_features(p_dream_max, category_norm, gender_norm, ews_norm, tfws_norm, pwd_norm, minority_norm, hsc_marks)
        rank_dream_max = predict_rank_for_features(p_dream_min, category_norm, gender_norm, ews_norm, tfws_norm, pwd_norm, minority_norm, hsc_marks)

        # 4. Recommendation Engine: filter colleges into Safe, Moderate, and Dream
        branch_offset = get_branch_offset(payload.branch_preference)
        recommendations = []

        for college in COLLEGES_DB:
            # Dynamically compute cutoff for the selected branch
            cutoff = float(np.clip(college['base_cutoff'] + branch_offset, 1.0, 99.95))
            
            # Predict merit rank for this cutoff percentile
            cutoff_rank = predict_rank_for_features(cutoff, category_norm, gender_norm, ews_norm, tfws_norm, pwd_norm, minority_norm, hsc_marks)

            # Determine admission type & chance
            if cutoff <= percentile - 2.5:
                category_rec = "Safe"
                chance = "Very High"
                color = "emerald"
            elif percentile - 2.5 < cutoff <= percentile + 1.5:
                category_rec = "Moderate"
                chance = "Moderate"
                color = "amber"
            elif percentile + 1.5 < cutoff <= percentile + 6.0:
                category_rec = "Dream"
                chance = "Aspirational"
                color = "indigo"
            else:
                # Cutoff is too high, skip for recommended list
                continue

            recommendations.append({
                "college_name": college['name'],
                "location": college['location'],
                "college_type": college['type'],
                "cutoff_percentile": round(cutoff, 2),
                "estimated_cutoff_rank": cutoff_rank,
                "branch": payload.branch_preference,
                "recommendation_type": category_rec,
                "admission_chance": chance,
                "color_theme": color
            })

        # Sort recommendations by cutoff percentile descending
        recommendations = sorted(recommendations, key=lambda x: x['cutoff_percentile'], reverse=True)

        return {
            'input_parameters': {
                'percentile': percentile,
                'category': category_norm,
                'gender': gender_norm,
                'branch_preference': payload.branch_preference,
                'ews': ews_norm,
                'tfws': tfws_norm,
                'pwd': pwd_norm,
                'minority_type': minority_norm,
                'hsc_marks': hsc_marks
            },
            'estimated_merit_rank': estimated_merit_rank,
            'safe_range': {
                'min_percentile': round(p_safe_min, 2),
                'max_percentile': round(p_safe_max, 2),
                'min_rank': rank_safe_min,
                'max_rank': rank_safe_max
            },
            'moderate_range': {
                'min_percentile': round(p_mod_min, 2),
                'max_percentile': round(p_mod_max, 2),
                'min_rank': rank_mod_min,
                'max_rank': rank_mod_max
            },
            'dream_range': {
                'min_percentile': round(p_dream_min, 2),
                'max_percentile': round(p_dream_max, 2),
                'min_rank': rank_dream_min,
                'max_rank': rank_dream_max
            },
            'similar_students': similar_students,
            'recommendations': recommendations
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")


@app.post("/api/enquire")
def handle_enquiry(payload: EnquiryRequest):
    """Handle course enrollment inquiry forms."""
    try:
        # Log to standard output/console
        print(f"\n==========================================", flush=True)
        print(f"NEW COURSE ENQUIRY SUBMISSION:", flush=True)
        print(f"Name: {payload.name}", flush=True)
        print(f"Email: {payload.email}", flush=True)
        print(f"Phone: {payload.phone}", flush=True)
        print(f"Course Interested: {payload.course}", flush=True)
        print(f"Student Percentile: {payload.percentile}", flush=True)
        print(f"==========================================\n", flush=True)
        
        return {
            "status": "success",
            "message": f"Thank you, {payload.name}! Your inquiry for the '{payload.course}' has been successfully submitted."
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/auth/register")
def register_user(payload: UserRegister):
    email = payload.email.lower().strip()
    if email in USERS_DB:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    # Hash password and create user session
    USERS_DB[email] = {
        "name": payload.name,
        "email": email,
        "password_hash": hash_password(payload.password),
        "role": payload.role,
        "verified": False # starts unverified to trigger Email Verification UI
    }
    
    # Set standard OTP for mock purposes
    OTP_DB[email] = "123456"
    
    return {
        "status": "success",
        "message": "Registration successful. Please verify your email using OTP 123456.",
        "email": email
    }

@app.post("/api/auth/login")
def login_user(payload: UserLogin):
    email = payload.email.lower().strip()
    if email not in USERS_DB:
        raise HTTPException(status_code=400, detail="Invalid email or password")
        
    user = USERS_DB[email]
    if not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
        
    if not user["verified"]:
        raise HTTPException(status_code=403, detail="Email is not verified. Please complete email verification.")
        
    # Generate Access Token
    access_token = create_access_token(data={"sub": user["email"], "role": user["role"], "name": user["name"]})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user["role"],
        "name": user["name"],
        "email": user["email"]
    }

@app.post("/api/auth/verify-email")
def verify_email(payload: VerifyEmailPayload):
    email = payload.email.lower().strip()
    if email not in USERS_DB:
        raise HTTPException(status_code=404, detail="User not found")
        
    if email in OTP_DB and OTP_DB[email] == payload.otp:
        USERS_DB[email]["verified"] = True
        del OTP_DB[email]
        
        # Log in automatically by returning token
        user = USERS_DB[email]
        access_token = create_access_token(data={"sub": user["email"], "role": user["role"], "name": user["name"]})
        return {
            "status": "success",
            "message": "Email verified successfully.",
            "access_token": access_token,
            "role": user["role"],
            "name": user["name"]
        }
    else:
        raise HTTPException(status_code=400, detail="Invalid verification code")

@app.post("/api/auth/forgot-password")
def forgot_password(payload: ForgotPasswordRequest):
    email = payload.email.lower().strip()
    if email not in USERS_DB:
        raise HTTPException(status_code=404, detail="Email address not found")
        
    # Set standard OTP reset code
    OTP_DB[email] = "654321"
    return {
        "status": "success",
        "message": "Password reset code sent. Please use OTP code 654321.",
        "email": email
    }

@app.post("/api/auth/reset-password")
def reset_password(payload: ResetPasswordPayload):
    email = payload.email.lower().strip()
    if email not in USERS_DB:
        raise HTTPException(status_code=404, detail="User not found")
        
    if email in OTP_DB and OTP_DB[email] == payload.otp:
        USERS_DB[email]["password_hash"] = hash_password(payload.new_password)
        del OTP_DB[email]
        return {
            "status": "success",
            "message": "Password updated successfully. You can now login with your new credentials."
        }
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP reset code")


# ──────────────────────────────────────────
# Pydantic Payment Request Schemas
# ──────────────────────────────────────────

class CreateCheckoutSessionPayload(BaseModel):
    provider: str  # "stripe" or "razorpay"
    plan_name: str
    amount: float  # Value in Rupees
    is_subscription: bool = False
    billing_email: str

class RefundRequestPayload(BaseModel):
    invoice_id: str
    reason: str

class BillingSettingsPayload(BaseModel):
    default_provider: str  # "stripe" or "razorpay"
    billing_email: str
    auto_renew: bool

# Mock Database for Invoices & Settings
MOCK_INVOICES_DB = [
    {
        "id": "INV-2026-001",
        "service": "Meta Ads Setup + Ad Account Audit",
        "amount": "₹9,999",
        "date": "Jan 02, 2026",
        "status": "Paid",
        "refund_status": "None"
    },
    {
        "id": "INV-2026-002",
        "service": "AI WhatsApp Chatbot Subscription",
        "amount": "₹14,999",
        "date": "Jan 15, 2026",
        "status": "Paid",
        "refund_status": "None"
    },
    {
        "id": "INV-2026-003",
        "service": "Meta Ads Management (Feb cycle)",
        "amount": "₹9,999",
        "date": "Feb 02, 2026",
        "status": "Pending",
        "refund_status": "None"
    }
]

MOCK_BILLING_SETTINGS = {
    "default_provider": "stripe",
    "billing_email": "director@iitpune.com",
    "auto_renew": True
}

@app.post("/api/payment/create-session")
def create_checkout_session(payload: CreateCheckoutSessionPayload):
    # Simulated validation of provider
    if payload.provider not in ["stripe", "razorpay"]:
        raise HTTPException(status_code=400, detail="Unsupported payment provider")
    
    # In a real integration, Stripe or Razorpay SDKs would be called here to register order:
    # Stripe: stripe.checkout.Session.create(...)
    # Razorpay: razorpay_client.order.create(...)
    
    session_id = f"sess_{hash(payload.plan_name + str(payload.amount))}"
    
    if payload.provider == "stripe":
        # Mock Stripe URL
        checkout_url = f"https://checkout.stripe.com/pay/{session_id}"
        return {
            "status": "success",
            "provider": "stripe",
            "session_id": session_id,
            "checkout_url": checkout_url,
            "message": "Stripe checkout session initialized successfully."
        }
    else:
        # Mock Razorpay Order configuration
        return {
            "status": "success",
            "provider": "razorpay",
            "order_id": f"order_{session_id[:12]}",
            "key": "rzp_test_MOCK_KEY",
            "amount": int(payload.amount * 100), # in paisa
            "currency": "INR",
            "message": "Razorpay order created. Please trigger the Razorpay Standard Checkout SDK."
        }

@app.post("/api/payment/stripe-webhook")
def stripe_payment_webhook():
    # Webhook validator checks Stripe headers, decrypts event signatures:
    # event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    return {
        "status": "handled",
        "message": "Stripe event received and processed in the database."
    }

@app.post("/api/payment/razorpay-webhook")
def razorpay_payment_webhook():
    # Verify signature:
    # razorpay_client.utility.verify_webhook_signature(body, signature, webhook_secret)
    return {
        "status": "handled",
        "message": "Razorpay event webhook resolved."
    }

@app.post("/api/payment/request-refund")
def request_refund(payload: RefundRequestPayload):
    invoice = next((inv for inv in MOCK_INVOICES_DB if inv["id"] == payload.invoice_id), None)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice record not found")
    
    if invoice["status"] != "Paid":
        raise HTTPException(status_code=400, detail="Only paid invoices can be refunded")
        
    invoice["refund_status"] = "Pending"
    return {
        "status": "success",
        "message": f"Refund request received for invoice {payload.invoice_id}. Under engineering review.",
        "invoice_id": payload.invoice_id,
        "refund_status": "Pending"
    }

@app.post("/api/payment/save-billing-settings")
def save_billing_settings(payload: BillingSettingsPayload):
    MOCK_BILLING_SETTINGS["default_provider"] = payload.default_provider
    MOCK_BILLING_SETTINGS["billing_email"] = payload.billing_email
    MOCK_BILLING_SETTINGS["auto_renew"] = payload.auto_renew
    return {
        "status": "success",
        "message": "Billing settings saved successfully."
    }

@app.get("/api/payment/billing-details")
def get_billing_details():
    return {
        "invoices": MOCK_INVOICES_DB,
        "settings": MOCK_BILLING_SETTINGS
    }


# ──────────────────────────────────────────
# Pydantic AI Assistant Schemas & Router
# ──────────────────────────────────────────

class ChatMessagePayload(BaseModel):
    message: str
    file_attached: Optional[str] = None

@app.post("/api/ai/chat")
def ai_assistant_chat(payload: ChatMessagePayload):
    msg = payload.message.lower().strip()
    
    # Simple keyword routing for responses
    if "predict" in msg or "rank" in msg or "mht-cet" in msg or "college" in msg:
        response_text = (
            "To predict your college admission chances, please navigate to our MHT-CET College Predictor "
            "link on the navigation bar. Input your percentile, category, and home university region to run our ML model!"
        )
    elif "price" in msg or "pricing" in msg or "charges" in msg or "cost" in msg:
        response_text = (
            "We offer premium growth plans for coaching institutes: Meta Ads Management (₹9,999/mo) "
            "and AI WhatsApp chatbot setup (₹14,999/mo). Check out the Pricing page for full details!"
        )
    elif "refund" in msg:
        response_text = (
            "Refunds can be requested directly inside your Client Dashboard. Go to the 'Billing & Invoices' tab, "
            "find your Paid invoices ledger, and click 'Request Refund'. Our team will review it within 24 hours."
        )
    elif "upload" in msg or "requirement" in msg:
        response_text = (
            "Clients can upload campaign requirements by navigating to the Client Dashboard under the "
            "'Upload Requirements' tab. You can drag and drop your PDFs or images directly."
        )
    else:
        response_text = (
            "Hello! I am the EngineeringPath AI Assistant. I can guide you through our MHT-CET Rank prediction models, "
            "B2B agency campaigns setup, billing refund logs, or developer task trackers. How can I help you today?"
        )
        
    if payload.file_attached:
        response_text += f" (I have received your uploaded file asset: '{payload.file_attached}' for review.)"

    return {
        "status": "success",
        "response": response_text
    }


# ──────────────────────────────────────────
# Pydantic Careers Schemas & Router
# ──────────────────────────────────────────

class JobApplyPayload(BaseModel):
    role: str
    fullName: str
    email: str
    phone: str
    college: str
    degree: str
    year: str
    portfolio: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    skills: List[str]
    experience: str
    coverLetter: str
    resume_name: str

class UpdateAppStatusPayload(BaseModel):
    email: str
    status: str

class ScheduleInterviewPayload(BaseModel):
    email: str
    datetime: str
    meet_link: str

class SendEmailPayload(BaseModel):
    email: str
    subject: str
    body: str

class EditProfilePayload(BaseModel):
    email: str
    fullName: str
    phone: str
    college: str
    degree: str
    year: str
    github: Optional[str] = None
    linkedin: Optional[str] = None

class WithdrawPayload(BaseModel):
    email: str

MOCK_APPLICATIONS_DB = [
    {
        "id": "app_1",
        "name": "Abhi Patil",
        "email": "abhi@gmail.com",
        "phone": "+91 9998887770",
        "role": "ai-ml-intern",
        "college": "COEP",
        "degree": "B.Tech CSE",
        "year": "2026",
        "status": "Pending",
        "skills": ["Python", "PyTorch", "scikit-learn"],
        "experience": "Built linear regression solvers for MHT-CET scores.",
        "coverLetter": "Excited to join the engineering path squad.",
        "resume_name": "abhi_coep_resume.pdf",
        "portfolio": "https://abhipatil.dev",
        "github": "https://github.com/abhipatil",
        "linkedin": "https://linkedin.in/abhipatil",
        "interview_date": None,
        "interview_link": None,
        "emails_sent": []
    },
    {
        "id": "app_2",
        "name": "Rajesh Shinde",
        "email": "rajesh@outlook.com",
        "phone": "+91 9998887771",
        "role": "frontend-dev",
        "college": "VJTI",
        "degree": "B.Tech IT",
        "year": "2025",
        "status": "Interviewing",
        "skills": ["React", "CSS Modules", "Next.js"],
        "experience": "Designed landing pages for coaching groups in Mumbai.",
        "coverLetter": "Fascinated by high fidelity web styling details.",
        "resume_name": "rajesh_vjti_dev.docx",
        "portfolio": "",
        "github": "https://github.com/rajeshshinde",
        "linkedin": "https://linkedin.in/rajesh",
        "interview_date": "2026-07-22T14:30",
        "interview_link": "https://meet.google.com/abc-def-ghi",
        "emails_sent": [
            {"subject": "Interview Invitation", "body": "Your interview is scheduled for July 22nd at 2:30 PM."}
        ]
    },
    {
        "id": "app_3",
        "name": "Nisha Kulkarni",
        "email": "nisha@gmail.com",
        "phone": "+91 9998887772",
        "role": "react-dev",
        "college": "VIT Pune",
        "degree": "B.Tech CSE",
        "year": "2025",
        "status": "Hired",
        "skills": ["TypeScript", "Redux", "Vanilla CSS"],
        "experience": "React developer intern at an edtech startup.",
        "coverLetter": "Want to optimize the predictive CET rank predictor tool.",
        "resume_name": "nisha_vit_resume.pdf",
        "portfolio": "",
        "github": "https://github.com/nishak",
        "linkedin": "https://linkedin.in/nisha",
        "interview_date": None,
        "interview_link": None,
        "emails_sent": []
    }
]

@app.get("/api/careers/applications")
def get_applications(email: Optional[str] = None):
    if email:
        # Filter for specific student application
        student_app = next((app for app in MOCK_APPLICATIONS_DB if app["email"].lower() == email.lower()), None)
        if not student_app:
            raise HTTPException(status_code=404, detail="No active application found for this email address.")
        return {"status": "success", "application": student_app}
    return {"status": "success", "applications": MOCK_APPLICATIONS_DB}

@app.post("/api/careers/apply")
def submit_job_application(payload: JobApplyPayload):
    # Check if application already exists for this email
    existing = next((app for app in MOCK_APPLICATIONS_DB if app["email"].lower() == payload.email.lower()), None)
    if existing:
        raise HTTPException(status_code=400, detail="An application with this email address already exists.")

    new_app = {
        "id": f"app_{len(MOCK_APPLICATIONS_DB) + 1}",
        "name": payload.fullName,
        "email": payload.email,
        "phone": payload.phone,
        "role": payload.role,
        "college": payload.college,
        "degree": payload.degree,
        "year": payload.year,
        "status": "Pending",
        "skills": payload.skills,
        "experience": payload.experience,
        "coverLetter": payload.coverLetter,
        "resume_name": payload.resume_name,
        "portfolio": payload.portfolio or "",
        "github": payload.github or "",
        "linkedin": payload.linkedin or "",
        "interview_date": None,
        "interview_link": None,
        "emails_sent": []
    }
    MOCK_APPLICATIONS_DB.append(new_app)
    return {
        "status": "success",
        "message": "Application submitted successfully.",
        "application": new_app
    }

@app.post("/api/careers/update-status")
def update_application_status(payload: UpdateAppStatusPayload):
    app_record = next((app for app in MOCK_APPLICATIONS_DB if app["email"].lower() == payload.email.lower()), None)
    if not app_record:
        raise HTTPException(status_code=404, detail="Application record not found")
    
    app_record["status"] = payload.status
    return {
        "status": "success",
        "message": f"Candidate status updated to {payload.status}.",
        "application": app_record
    }

@app.post("/api/careers/schedule-interview")
def schedule_candidate_interview(payload: ScheduleInterviewPayload):
    app_record = next((app for app in MOCK_APPLICATIONS_DB if app["email"].lower() == payload.email.lower()), None)
    if not app_record:
        raise HTTPException(status_code=404, detail="Application record not found")
    
    app_record["status"] = "Interviewing"
    app_record["interview_date"] = payload.datetime
    app_record["interview_link"] = payload.meet_link
    
    # Auto-add notification log email
    app_record["emails_sent"].append({
        "subject": "Interview Scheduled Invitation",
        "body": f"Your interview has been scheduled for {payload.datetime} via link: {payload.meet_link}"
    })
    
    return {
        "status": "success",
        "message": "Interview scheduled and invitation logged successfully.",
        "application": app_record
    }

@app.post("/api/careers/send-email")
def send_candidate_email(payload: SendEmailPayload):
    app_record = next((app for app in MOCK_APPLICATIONS_DB if app["email"].lower() == payload.email.lower()), None)
    if not app_record:
        raise HTTPException(status_code=404, detail="Application record not found")
    
    app_record["emails_sent"].append({
        "subject": payload.subject,
        "body": payload.body
    })
    
    return {
        "status": "success",
        "message": "Candidate email message dispatched successfully."
    }

@app.post("/api/careers/edit-profile")
def edit_student_careers_profile(payload: EditProfilePayload):
    app_record = next((app for app in MOCK_APPLICATIONS_DB if app["email"].lower() == payload.email.lower()), None)
    if not app_record:
        raise HTTPException(status_code=404, detail="Application record not found")
    
    app_record["name"] = payload.fullName
    app_record["phone"] = payload.phone
    app_record["college"] = payload.college
    app_record["degree"] = payload.degree
    app_record["year"] = payload.year
    app_record["github"] = payload.github or ""
    app_record["linkedin"] = payload.linkedin or ""
    
    return {
        "status": "success",
        "message": "Student profile updated successfully.",
        "application": app_record
    }

@app.post("/api/careers/withdraw")
def withdraw_student_application(payload: WithdrawPayload):
    global MOCK_APPLICATIONS_DB
    app_record = next((app for app in MOCK_APPLICATIONS_DB if app["email"].lower() == payload.email.lower()), None)
    if not app_record:
        raise HTTPException(status_code=404, detail="Application record not found")
    
    # Simple withdraw removes or updates status to Withdrawn
    app_record["status"] = "Withdrawn"
    return {
        "status": "success",
        "message": "Your job application has been withdrawn successfully."
    }


# ──────────────────────────────────────────
# Pydantic Blogs Schemas & Router
# ──────────────────────────────────────────

class BlogCommentPayload(BaseModel):
    author: str
    content: str

class BlogPostPayload(BaseModel):
    title: str
    content: str
    category: str
    tags: List[str]
    excerpt: str
    author: str
    status: str  # "Published" or "Draft"
    featured_image: str
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

# Mock Database for Blogs
MOCK_BLOGS_DB = [
    {
        "slug": "mht-cet-choice-filling-guide-cap-rounds",
        "title": "MHT-CET Choice Filling: The Ultimate Guide to CAP Rounds",
        "content": "# MHT-CET Choice Filling: The Ultimate Guide to CAP Rounds\n\nLearn the exact strategy to sequence your option forms, optimize safe vs dream choices, and avoid common allocation pitfalls.\n\n## 1. Understand CAP Round Mechanics\nAdmission rounds in Maharashtra are highly structured. Sequencing your options properly is the difference between securing COEP or getting stuck in a lower-tier college.\n\n## 2. Sequence Strategy\n- **Safe Options**: Colleges where your percentile exceeds the past 3-year cutoff by 2.5% or more.\n- **Moderate Options**: Within a range of -1.5% to +2.5% of past cutoffs.\n- **Dream Options**: Up to +6.0% above your percentile.",
        "category": "CAP Admissions",
        "tags": ["MHT-CET", "CAP Rounds", "Admissions"],
        "excerpt": "Learn the exact strategy to sequence your option forms, optimize safe vs dream choices, and avoid common allocation pitfalls.",
        "author": "Shubham Narute",
        "status": "Published",
        "views": 2482,
        "featured_image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
        "seo_title": "MHT-CET Choice Filling Guide 2026 | CAP Rounds Strategy",
        "seo_description": "Master the option form sequencing for MHT-CET 2026. Step-by-step strategies for VJTI, COEP, and SPIT admission allocation.",
        "date": "July 15, 2026",
        "comments": [
            {"author": "Nitin Sawant", "content": "This sequencing strategy really helped me understand how to place SPIT in my option list. Thanks!", "date": "July 16, 2026"}
        ]
    },
    {
        "slug": "top-5-engineering-branches-maharashtra",
        "title": "Top 5 Engineering Branches in Maharashtra: Placement & Stats",
        "content": "# Top 5 Engineering Branches in Maharashtra: Placement & Stats\n\nAn objective review comparing Computer Science, AI/ML, E&TC, and core branches across COEP, VJTI, and SPIT.\n\n## Comparison Overview\n1. **Computer Science & Engineering**: Average package around 15 LPA. Peak cutoffs.\n2. **AI & Data Science**: Rising demands, average 14 LPA.\n3. **Electronics & Telecommunication**: Good core and tech prospects, average 10 LPA.",
        "category": "Career Guide",
        "tags": ["Engineering", "Placements", "COEP"],
        "excerpt": "An objective review comparing Computer Science, AI/ML, E&TC, and core branches across COEP, VJTI, and SPIT.",
        "author": "Snehal Patil",
        "status": "Published",
        "views": 839,
        "featured_image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
        "seo_title": "Top Maharashtra Engineering Branches: Fees & Placements",
        "seo_description": "Discover the best engineering fields in Maharashtra. Placement comparisons, salary trends, and top college insights.",
        "date": "July 12, 2026",
        "comments": []
    },
    {
        "slug": "btech-to-ai-engineer-roadmap",
        "title": "B.Tech to AI Engineer: A Practical 2026 Development Roadmap",
        "content": "# B.Tech to AI Engineer: A Practical 2026 Development Roadmap\n\nSkip outdated theoretical college courses. Here is a step-by-step path to master Python, Scikit-Learn, Deep Learning, and LangChain.\n\n## Roadmap Stages\n- **Stage 1**: Master Python Foundations & Scikit-Learn for ML pipelines.\n- **Stage 2**: Deep Dive into Deep Learning & PyTorch.\n- **Stage 3**: LLMs, Agentic Frameworks, and Vector Databases (Pinecone, ChromaDB).",
        "category": "AI Roadmaps",
        "tags": ["Artificial Intelligence", "Roadmap", "Machine Learning"],
        "excerpt": "Skip outdated theoretical college courses. Here is a step-by-step path to master Python, Scikit-Learn, Deep Learning, and LangChain.",
        "author": "Swapnil Shinde",
        "status": "Draft",
        "views": 0,
        "featured_image": "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60",
        "seo_title": "How to Become an AI Engineer from B.Tech | 2026 Roadmap",
        "seo_description": "The ultimate roadmap for engineering students to break into artificial intelligence and machine learning engineering in 2026.",
        "date": "July 08, 2026",
        "comments": []
    }
]

@app.get("/api/blogs")
def get_blogs(category: Optional[str] = None, status: Optional[str] = None):
    results = MOCK_BLOGS_DB
    if category and category != "ALL":
        results = [b for b in results if b["category"].lower() == category.lower()]
    if status:
        results = [b for b in results if b["status"].lower() == status.lower()]
    return {"status": "success", "blogs": results}

@app.get("/api/blogs/{slug}")
def get_blog_by_slug(slug: str):
    blog = next((b for b in MOCK_BLOGS_DB if b["slug"] == slug), None)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    # Increment views
    blog["views"] += 1
    return {"status": "success", "blog": blog}

@app.post("/api/blogs")
def create_blog(payload: BlogPostPayload):
    # Generate unique slug from title
    import re
    slug = re.sub(r'[^a-z0-9]+', '-', payload.title.lower().strip()).strip('-')
    if any(b["slug"] == slug for b in MOCK_BLOGS_DB):
        slug = f"{slug}-{len(MOCK_BLOGS_DB)}"
        
    new_post = {
        "slug": slug,
        "title": payload.title,
        "content": payload.content,
        "category": payload.category,
        "tags": payload.tags,
        "excerpt": payload.excerpt,
        "author": payload.author,
        "status": payload.status,
        "views": 0,
        "featured_image": payload.featured_image or "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
        "seo_title": payload.seo_title or payload.title,
        "seo_description": payload.seo_description or payload.excerpt,
        "date": datetime.now().strftime("%B %d, %Y"),
        "comments": []
    }
    MOCK_BLOGS_DB.append(new_post)
    return {"status": "success", "message": "Blog post created successfully", "blog": new_post}

@app.put("/api/blogs/{slug}")
def update_blog(slug: str, payload: BlogPostPayload):
    blog = next((b for b in MOCK_BLOGS_DB if b["slug"] == slug), None)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
        
    blog["title"] = payload.title
    blog["content"] = payload.content
    blog["category"] = payload.category
    blog["tags"] = payload.tags
    blog["excerpt"] = payload.excerpt
    blog["author"] = payload.author
    blog["status"] = payload.status
    blog["featured_image"] = payload.featured_image
    blog["seo_title"] = payload.seo_title or payload.title
    blog["seo_description"] = payload.seo_description or payload.excerpt
    
    return {"status": "success", "message": "Blog post updated successfully", "blog": blog}

@app.delete("/api/blogs/{slug}")
def delete_blog(slug: str):
    global MOCK_BLOGS_DB
    blog = next((b for b in MOCK_BLOGS_DB if b["slug"] == slug), None)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    MOCK_BLOGS_DB.remove(blog)
    return {"status": "success", "message": "Blog post deleted successfully"}

@app.post("/api/blogs/{slug}/comment")
def add_blog_comment(slug: str, payload: BlogCommentPayload):
    blog = next((b for b in MOCK_BLOGS_DB if b["slug"] == slug), None)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
        
    new_comment = {
        "author": payload.author,
        "content": payload.content,
        "date": datetime.now().strftime("%B %d, %Y")
    }
    blog["comments"].append(new_comment)
    return {"status": "success", "message": "Comment posted successfully", "comment": new_comment}


# ──────────────────────────────────────────
# Pydantic Notifications Schemas & Router
# ──────────────────────────────────────────

class NotificationCreate(BaseModel):
    title: str
    message: str
    type: str  # "in-app", "email", "push"
    channel: str  # "admissions", "payments", "leads", "system"

class NotificationReadUpdate(BaseModel):
    read: bool

# Mock Database for Notifications
MOCK_NOTIFICATIONS_DB = [
    {
        "id": "notif_1",
        "title": "New Job Application Received",
        "message": "Abhi Patil has applied for the AI/ML Intern role.",
        "type": "in-app",
        "channel": "admissions",
        "read": False,
        "date": "July 18, 2026 19:15"
    },
    {
        "id": "notif_2",
        "title": "Meta Ads Invoice Paid",
        "message": "IIT Academy Pune successfully paid invoice INV-2026-001 (₹9,999).",
        "type": "email",
        "channel": "payments",
        "read": True,
        "date": "July 18, 2026 12:30"
    },
    {
        "id": "notif_3",
        "title": "New Lead Captured",
        "message": "Neha Joshi inquired about Meta Ads Management.",
        "type": "push",
        "channel": "leads",
        "read": False,
        "date": "July 18, 2026 09:45"
    }
]

@app.get("/api/notifications")
def get_notifications():
    return {"status": "success", "notifications": MOCK_NOTIFICATIONS_DB}

@app.post("/api/notifications")
def create_notification(payload: NotificationCreate):
    new_notif = {
        "id": f"notif_{len(MOCK_NOTIFICATIONS_DB) + 1}",
        "title": payload.title,
        "message": payload.message,
        "type": payload.type,
        "channel": payload.channel,
        "read": False,
        "date": datetime.now().strftime("%B %d, %Y %H:%M")
    }
    MOCK_NOTIFICATIONS_DB.insert(0, new_notif)  # Add to top
    return {"status": "success", "notification": new_notif}

@app.patch("/api/notifications/{id}/read")
def update_notification_read(id: str, payload: NotificationReadUpdate):
    notif = next((n for n in MOCK_NOTIFICATIONS_DB if n["id"] == id), None)
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    notif["read"] = payload.read
    return {"status": "success", "notification": notif}

@app.delete("/api/notifications/{id}")
def delete_notification(id: str):
    global MOCK_NOTIFICATIONS_DB
    notif = next((n for n in MOCK_NOTIFICATIONS_DB if n["id"] == id), None)
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    MOCK_NOTIFICATIONS_DB.remove(notif)
    return {"status": "success", "message": "Notification deleted successfully"}


# ──────────────────────────────────────────
# Connected Modules Integration API
# ──────────────────────────────────────────

# 1. CRM Leads
class LeadCreatePayload(BaseModel):
    name: str
    company: str
    email: str
    phone: str
    source: str
    serviceInterested: str
    status: str
    assignedEmployee: str
    notes: str
    dealSize: str

MOCK_LEADS_DB = [
    { "id": "LD-001", "name": "Ritesh Patil", "company": "Chate Classes Pune", "email": "ritesh@chate.edu", "phone": "+91 98220 12345", "source": "Website Predictor", "serviceInterested": "AI Automation", "status": "Contacted", "assignedEmployee": "Swapnil Shinde", "notes": "Interested in integrating MHT-CET predictor widget on main page.", "dealSize": "₹14,999/mo" },
    { "id": "LD-002", "name": "Neha Joshi", "company": "IIT Academy Pune", "email": "neha@iitpune.com", "phone": "+91 98901 88888", "source": "Referral", "serviceInterested": "Meta Ads", "status": "Won", "assignedEmployee": "Swapnil Shinde", "notes": "Closed growth plan package. Ad account audits scheduled.", "dealSize": "₹9,999/mo" },
    { "id": "LD-003", "name": "Sanket Kadam", "company": "Kadam Tutorials", "email": "sanket@kadam.in", "phone": "+91 88888 12345", "source": "Google Ads", "serviceInterested": "Web Dev", "status": "Meeting Scheduled", "assignedEmployee": "Snehal Patil", "notes": "Meeting tomorrow at 4 PM to discuss multi-page Next.js app.", "dealSize": "₹24,999/mo" },
    { "id": "LD-004", "name": "Amit Desai", "company": "Desai Chemistry Acad", "email": "amit@desai.com", "phone": "+91 90110 55555", "source": "Cold Email", "serviceInterested": "Reel Editing", "status": "New", "assignedEmployee": "Unassigned", "notes": "Sent intro pitch. Awaiting reply.", "dealSize": "₹8,999/mo" },
    { "id": "LD-005", "name": "Priyanjali Shahu", "company": "Shahu Science Coaching", "email": "priya@shahu.edu", "phone": "+91 95522 34343", "source": "Website Predictor", "serviceInterested": "AI Automation", "status": "Proposal Sent", "assignedEmployee": "Snehal Patil", "notes": "Sent custom proposals with chatbot samples.", "dealSize": "₹14,999/mo" }
]

@app.get("/api/leads")
def get_leads():
    return {"status": "success", "leads": MOCK_LEADS_DB}

@app.post("/api/leads")
def create_lead(payload: LeadCreatePayload):
    new_lead = {
        "id": f"LD-00{len(MOCK_LEADS_DB) + 1}",
        "name": payload.name,
        "company": payload.company,
        "email": payload.email,
        "phone": payload.phone,
        "source": payload.source,
        "serviceInterested": payload.serviceInterested,
        "status": payload.status,
        "assignedEmployee": payload.assignedEmployee,
        "notes": payload.notes,
        "dealSize": payload.dealSize
    }
    MOCK_LEADS_DB.append(new_lead)
    
    # If Lead status is Won, automatically sync to B2B Clients
    if payload.status == "Won":
        sync_lead_to_client(new_lead)
        
    return {"status": "success", "lead": new_lead}

@app.put("/api/leads/{id}")
def update_lead(id: str, payload: LeadCreatePayload):
    lead = next((l for l in MOCK_LEADS_DB if l["id"] == id), None)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    old_status = lead["status"]
    
    lead["name"] = payload.name
    lead["company"] = payload.company
    lead["email"] = payload.email
    lead["phone"] = payload.phone
    lead["source"] = payload.source
    lead["serviceInterested"] = payload.serviceInterested
    lead["status"] = payload.status
    lead["assignedEmployee"] = payload.assignedEmployee
    lead["notes"] = payload.notes
    lead["dealSize"] = payload.dealSize
    
    # Trigger client auto-creation when advanced to Won
    if payload.status == "Won" and old_status != "Won":
        sync_lead_to_client(lead)
        
    return {"status": "success", "lead": lead}


# 2. B2B Clients
class ClientCreatePayload(BaseModel):
    company: str
    contact: str
    plan: str
    status: str

MOCK_CLIENTS_DB = [
    { "id": "cli-1", "company": "IIT Academy Pune", "contact": "director@iitpune.com", "plan": "Scale Plus Plan", "status": "Active" },
    { "id": "cli-2", "company": "Chate Classes Group", "contact": "management@chate.edu", "plan": "Growth Tier Plan", "status": "Active" },
    { "id": "cli-3", "company": "Pinnacle Mentors", "contact": "pinnaclepune@gmail.com", "plan": "Starter Setup Plan", "status": "Pending" }
]

def sync_lead_to_client(lead: dict):
    # Check if client already exists
    exists = next((c for c in MOCK_CLIENTS_DB if c["company"].lower() == lead["company"].lower()), None)
    if not exists:
        new_client = {
            "id": f"cli-{len(MOCK_CLIENTS_DB) + 1}",
            "company": lead["company"],
            "contact": lead["email"] or "contact@client.com",
            "plan": f"{lead['serviceInterested']} {lead['dealSize']}",
            "status": "Active"
        }
        MOCK_CLIENTS_DB.append(new_client)

@app.get("/api/clients")
def get_clients():
    return {"status": "success", "clients": MOCK_CLIENTS_DB}

@app.post("/api/clients")
def create_client(payload: ClientCreatePayload):
    new_client = {
        "id": f"cli-{len(MOCK_CLIENTS_DB) + 1}",
        "company": payload.company,
        "contact": payload.contact,
        "plan": payload.plan,
        "status": payload.status
    }
    MOCK_CLIENTS_DB.append(new_client)
    return {"status": "success", "client": new_client}


# 3. Career Openings
class OpeningCreatePayload(BaseModel):
    title: str
    type: str
    location: str
    status: str

MOCK_OPENINGS_DB = [
    { "id": "car-1", "title": "AI/ML Intern", "type": "Internship", "location": "Remote", "status": "Active" },
    { "id": "car-2", "title": "Frontend Developer", "type": "Full-time", "location": "Hybrid", "status": "Active" },
    { "id": "car-3", "title": "Backend Developer", "type": "Full-time", "location": "Hybrid", "status": "Active" },
    { "id": "car-4", "title": "React Developer", "type": "Full-time", "location": "Remote", "status": "Active" },
    { "id": "car-5", "title": "Video Editor", "type": "Internship", "location": "Remote", "status": "Closed" }
]

@app.get("/api/careers/openings")
def get_openings():
    return {"status": "success", "openings": MOCK_OPENINGS_DB}

@app.post("/api/careers/openings")
def create_opening(payload: OpeningCreatePayload):
    new_op = {
        "id": f"car-{len(MOCK_OPENINGS_DB) + 1}",
        "title": payload.title,
        "type": payload.type,
        "location": payload.location,
        "status": payload.status
    }
    MOCK_OPENINGS_DB.append(new_op)
    return {"status": "success", "opening": new_op}

@app.delete("/api/careers/openings/{id}")
def delete_opening(id: str):
    global MOCK_OPENINGS_DB
    op = next((o for o in MOCK_OPENINGS_DB if o["id"] == id), None)
    if not op:
        raise HTTPException(status_code=404, detail="Opening not found")
    MOCK_OPENINGS_DB.remove(op)
    return {"status": "success", "message": "Opening removed successfully"}


# 4. Invoices & Payments Sync
class InvoiceCreatePayload(BaseModel):
    client: str
    email: str
    plan: str
    amount: str
    status: str

class RefundRequestPayload(BaseModel):
    invoice_id: str
    reason: str

class RefundApprovalPayload(BaseModel):
    status: str

class BillingSettingsPayload(BaseModel):
    default_provider: str
    billing_email: str
    auto_renew: bool

MOCK_INVOICES_DB = [
    { "id": "INV-2026-001", "client": "IIT Academy Pune", "email": "director@iitpune.com", "plan": "Scale Plus Plan", "amount": "₹19,999", "date": "Jul 15, 2026", "status": "Paid", "refundStatus": "None", "refundReason": "" },
    { "id": "INV-2026-002", "client": "Chate Classes Group", "email": "management@chate.edu", "plan": "Growth Tier Plan", "amount": "₹9,999", "date": "Jul 16, 2026", "status": "Paid", "refundStatus": "None", "refundReason": "" },
    { "id": "INV-2026-003", "client": "Modern Coaching", "email": "modern@coaching.com", "plan": "Starter Setup Plan", "amount": "₹4,999", "date": "Jul 17, 2026", "status": "Pending", "refundStatus": "None", "refundReason": "" }
]

@app.get("/api/payments/invoices")
def get_invoices(email: Optional[str] = None):
    if email:
        filtered = [inv for inv in MOCK_INVOICES_DB if inv["email"].lower() == email.lower()]
        return {"status": "success", "invoices": filtered}
    return {"status": "success", "invoices": MOCK_INVOICES_DB}

@app.post("/api/payments/invoices")
def create_invoice(payload: InvoiceCreatePayload):
    new_inv = {
        "id": f"INV-2026-00{len(MOCK_INVOICES_DB) + 1}",
        "client": payload.client,
        "email": payload.email,
        "plan": payload.plan,
        "amount": payload.amount,
        "date": datetime.now().strftime("%b %d, %Y"),
        "status": payload.status,
        "refundStatus": "None",
        "refundReason": ""
    }
    MOCK_INVOICES_DB.insert(0, new_inv)
    return {"status": "success", "invoice": new_inv}

@app.post("/api/payment/request-refund")
def request_refund(payload: RefundRequestPayload):
    inv = next((i for i in MOCK_INVOICES_DB if i["id"] == payload.invoice_id), None)
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    inv["refundStatus"] = "Pending"
    inv["refundReason"] = payload.reason
    return {"status": "success", "message": "Refund requested successfully", "invoice": inv}

@app.patch("/api/payments/invoices/{id}/refund-approval")
def approve_refund(id: str, payload: RefundApprovalPayload):
    inv = next((i for i in MOCK_INVOICES_DB if i["id"] == id), None)
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    inv["refundStatus"] = payload.status
    if payload.status == "Approved":
        inv["status"] = "Refunded"
    return {"status": "success", "invoice": inv}

@app.post("/api/payment/save-billing-settings")
def save_billing_settings(payload: BillingSettingsPayload):
    return {"status": "success", "message": "Billing settings saved successfully"}


# 5. Aggregated Analytics Endpoint
@app.get("/api/analytics/dashboard")
def get_analytics_dashboard():
    # Dynamic counts aggregation
    students_count = len([u for u in USERS_DB if u.get("role") == "Student"])
    employees_count = len([u for u in USERS_DB if u.get("role") == "Employee"])
    clients_count = len(MOCK_CLIENTS_DB)
    
    total_users = len(USERS_DB)
    total_leads = len(MOCK_LEADS_DB)
    total_applications = len(MOCK_APPLICATIONS_DB)
    
    # Calculate sum of paid invoices
    paid_sum = 0
    for inv in MOCK_INVOICES_DB:
        if inv["status"] == "Paid":
            try:
                # parse numeric value from ₹9,999
                clean_str = inv["amount"].replace("₹", "").replace(",", "")
                paid_sum += int(clean_str)
            except Exception:
                pass
                
    formatted_paid_sum = f"₹{paid_sum:,}"

    return {
        "status": "success",
        "counts": {
            "students": students_count,
            "employees": employees_count,
            "clients": clients_count,
            "total_users": total_users,
            "total_leads": total_leads,
            "total_applications": total_applications,
            "total_revenue": formatted_paid_sum
        },
        "revenue": {
            "total": formatted_paid_sum,
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            "points": "M 0 160 L 80 140 L 160 150 L 240 110 L 320 90 L 400 70 L 500 50",
            "fill": "M 0 160 L 80 140 L 160 150 L 240 110 L 320 90 L 400 70 L 500 50 L 500 200 L 0 200 Z"
        },
        "users": {
            "students": f"M 0 {200 - students_count * 10} L 250 110 L 500 60",
            "staff": f"M 0 {200 - employees_count * 20} L 250 160 L 500 120"
        },
        "traffic": {
            "views": "M 0 120 L 100 80 L 200 130 L 300 90 L 400 70 L 500 40",
            "visitors": "M 0 150 L 100 120 L 200 160 L 300 130 L 400 110 L 500 80"
        },
        "sales": [45, 60, 55, 75, 90, 85, 110],
        "leads": f"M 0 180 L 125 {200 - total_leads * 15} L 375 110 L 500 70",
        "growth": {
            "current": "M 0 160 L 125 140 L 250 110 L 375 80 L 500 45",
            "previous": "M 0 180 L 125 165 L 250 140 L 375 115 L 500 90"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)



