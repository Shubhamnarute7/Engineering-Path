# EngineeringPath AI — Project Overview

> **An AI-powered MHT-CET Rank Predictor & College Recommender with a full B2B agency management CRM for Maharashtra engineering coaching institutes.**

---

## Table of Contents
1. [Project Vision](#1-project-vision)
2. [Folder Structure](#2-folder-structure)
3. [Tech Stack](#3-tech-stack)
4. [Backend Architecture & Logic](#4-backend-architecture--logic)
5. [Frontend Architecture & Logic](#5-frontend-architecture--logic)
6. [API Endpoints](#6-api-endpoints)
7. [Frontend Pages & Components](#7-frontend-pages--components)
8. [User Roles & Auth Flow](#8-user-roles--auth-flow)
9. [Deployment Status](#9-deployment-status)
10. [How to Run Locally](#10-how-to-run-locally)

---

## 1. Project Vision

EngineeringPath AI serves **two audiences**:

- **Students** — Predict MHT-CET ranks using ML, get college recommendations (Safe / Moderate / Dream tiers), compare with similar students, read blogs, apply for internships.
- **Coaching Institutes (B2B)** — Full agency CRM: lead tracking, client management, invoice/payment processing, employee task management, notification center, and dashboard analytics.

---

## 2. Folder Structure

```
EngineeringPath AI/
├── backend/
│   ├── main.py                          # FastAPI server (1508 lines) — all API routes
│   ├── preprocess.py                    # Data cleaning, normalization, sklearn ColumnTransformer
│   ├── train_model.py                   # DecisionTreeRegressor training script
│   ├── model.pkl                        # Trained ML pipeline (joblib)
│   ├── PH2025_MH_MeritList_Clean.csv    # MHT-CET 2025 merit list dataset
│   ├── requirements.txt                 # Python dependencies
│   └── venv/                            # Python virtual environment
│
├── frontend/
│   ├── src/
│   │   ├── app/                         # Next.js App Router pages (24 routes)
│   │   │   ├── about/                   # /about
│   │   │   ├── admin/                   # /admin (Admin Dashboard + CRM)
│   │   │   ├── ai-solutions/            # /ai-solutions
│   │   │   ├── apply/                   # /apply (job application)
│   │   │   ├── blog/                    # /blog (list + [slug] detail)
│   │   │   ├── careers/                 # /careers (openings + apply)
│   │   │   ├── checkout/                # /checkout
│   │   │   ├── client/                  # /client (Client Dashboard)
│   │   │   ├── contact/                 # /contact
│   │   │   ├── employee/                # /employee (Employee Dashboard)
│   │   │   ├── forgot-password/         # /forgot-password
│   │   │   ├── login/                   # /login
│   │   │   ├── meta-ads/                # /meta-ads
│   │   │   ├── predictor/               # /predictor (Core ML Predictor UI)
│   │   │   ├── pricing/                 # /pricing
│   │   │   ├── reel-editing/            # /reel-editing
│   │   │   ├── register/                # /register
│   │   │   ├── reset-password/          # /reset-password
│   │   │   ├── services/                # /services
│   │   │   ├── social-media/            # /social-media
│   │   │   ├── verify-email/            # /verify-email
│   │   │   ├── globals.css              # Global styles (dark glassmorphic theme)
│   │   │   ├── layout.tsx               # Root layout (Navbar, Footer, AiAssistant, AuthProvider)
│   │   │   ├── page.tsx                 # Homepage (HeroSection → ContactCTA)
│   │   │   └── page.module.css          # Homepage styles
│   │   │
│   │   ├── components/                  # 17 reusable React components
│   │   │   ├── Navbar.tsx               # Navigation with auth state, theme toggle, notification center
│   │   │   ├── Footer.tsx               # Site footer
│   │   │   ├── AiAssistant.tsx          # Floating AI chatbot widget
│   │   │   ├── NotificationCenter.tsx   # Bell icon + dropdown
│   │   │   ├── HeroSection.tsx          # Landing hero
│   │   │   ├── TrustedBy.tsx            # Social proof
│   │   │   ├── ServicesOverview.tsx     # Services grid
│   │   │   ├── WhyChoose.tsx            # Differentiators
│   │   │   ├── AIFeatures.tsx           # Feature cards
│   │   │   ├── EmbeddedPredictor.tsx    # Inline mini predictor demo on homepage
│   │   │   ├── CoursesSection.tsx       # Course offerings
│   │   │   ├── MentorSection.tsx        # Mentor profiles (Ayush, Harsh, Shubham)
│   │   │   ├── Testimonials.tsx         # Student testimonials
│   │   │   ├── BlogPreview.tsx          # Latest 3 blog posts
│   │   │   ├── CareerCTA.tsx            # Call-to-action for careers
│   │   │   ├── ContactCTA.tsx           # Contact form CTA
│   │   │   ├── FeaturesSection.tsx       # Feature highlights
│   │   │   ├── IntroSection.tsx         # Introductory section
│   │   │   └── *.module.css             # CSS Modules for each component
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx           # React Context for auth state + cookie management
│   │   │
│   │   └── middleware.ts                # Edge middleware — route protection + role guards
│   │
│   ├── public/                          # Static assets (images, favicon, GLB 3D model)
│   ├── package.json                     # Next.js 16, React 19, GSAP 3.15, Three.js 0.185
│   ├── next.config.ts                   # Next.js configuration
│   ├── tsconfig.json                    # TypeScript config
│   ├── eslint.config.mjs               # ESLint flat config
│   ├── AGENTS.md                        # Next.js 16 agent instructions
│   ├── CLAUDE.md                        # Project-level AI instructions
│   └── README.md                        # Frontend README
│
├── .git/
├── .idea/                               # JetBrains IDE config
├── README.md                            # Root project README
└── Project_Overview.md                  # This file
```

---

## 3. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Backend Framework** | FastAPI (Python) | 0.115.0 |
| **ML / Data** | scikit-learn, pandas, numpy | 1.5.2 / 2.2.3 / 2.1.3 |
| **Model** | DecisionTreeRegressor (max_depth=12) | — |
| **Auth** | JWT (PyJWT) + SHA-256 password hashing | 2.8.0 |
| **ASGI Server** | Uvicorn | 0.30.6 |
| **Frontend Framework** | Next.js (App Router) | 16.2.10 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript | 5.x |
| **Animations** | GSAP | 3.15.0 |
| **3D Graphics** | Three.js | 0.185.1 |
| **Styling** | Vanilla CSS (CSS Modules) + Glassmorphic design | — |

---

## 4. Backend Architecture & Logic

### 4.1 ML Predictor Core (`backend/train_model.py`)

The model is a **DecisionTreeRegressor** (max_depth=12, random_state=42) trained on the **PH2025 MH Merit List Clean dataset**.

**Features used for training:**
- `merit_percentile` (numeric) — normalized
- `hsc_total_percent` (numeric) — normalized
- `category` (categorical) — OneHotEncoded (Open, OBC, SC, ST, SEBC, NT, DT/VJ, SBC, etc.)
- `gender` (categorical) — OneHotEncoded (Male, Female, Others)
- `is_ews`, `is_tfws`, `is_pwd_def` (binary categorical) — OneHotEncoded
- `minority_type` (categorical) — OneHotEncoded (-/-, -/RM, LM/-, LM/RM)

**Target:** `merit_no` (MHT-CET merit rank)

**Performance (80/20 split):**
- MAE: ~20 ranks
- R²: ~0.99

The pipeline is a `sklearn.Pipeline` (`ColumnTransformer` → `DecisionTreeRegressor`), serialized as `model.pkl`.

### 4.2 Prediction Logic (`backend/main.py:204-222`)

When a user inputs their MHT-CET percentile, category, gender, and other parameters:
1. Features are normalized through `preprocess.py` mappers
2. A pandas DataFrame is constructed matching the training schema
3. The pipeline predicts the estimated merit rank
4. If the model is unavailable, a fallback linear approximation is used: `int(52466 * (1 - percentile / 100))`

### 4.3 College Recommendation Engine (`backend/main.py:225-402`)

20 top Maharashtra engineering colleges are stored in `COLLEGES_DB` with their:
- `base_cutoff` (historical percentile cutoff)
- Location, type (Government / Private / Aided)

**Branch Offset Logic (`get_branch_offset`, line 185-202):**
- Computer Science / AI / Data Science: +1.5 (highest demand)
- IT: +0.8
- E&TC / Electronics: -1.0
- Mechanical: -4.0
- Civil: -6.0
- Chemical: -3.0

**Tier Calculation (Safe / Moderate / Dream):**
- **Safe**: cutoff <= percentile - 2.5 → Very High chance
- **Moderate**: percentile - 2.5 < cutoff <= percentile + 1.5 → Moderate chance
- **Dream**: percentile + 1.5 < cutoff <= percentile + 6.0 → Aspirational
- Beyond +6.0: excluded

The engine also computes **percentile ranges** (Safe / Moderate / Dream) with corresponding rank boundaries by re-feeding adjusted percentiles into the model.

### 4.4 Similar Students (`get_similar_students`, line 225-260)

Filters the actual merit list by same category + gender, finds the 5 closest percentile matches, and returns their details (name, rank, percentile, HSC %, EWS/TFWS/PWD status).

### 4.5 Authentication System

- **Password Hashing**: SHA-256 (via `hashlib`)
- **JWT Tokens**: PyJWT with HS256, 120-min expiry
- **In-Memory DB**: `USERS_DB` dict with roles: Admin, Student, Client, Employee
- **OTP System**: In-memory `OTP_DB` for email verification & password reset (mock: "123456" for verify, "654321" for reset)

### 4.6 CRM / B2B Agency System

The backend implements a full mock CRM as in-memory databases:

| Module | Endpoints | Data |
|--------|-----------|------|
| **Leads** | GET/POST `/api/leads`, PUT `/api/leads/{id}` | 5 mock leads with status pipeline (New → Contacted → Meeting Scheduled → Proposal Sent → Won) |
| **Clients** | GET/POST `/api/clients` | Auto-synced from Won leads; 3 mock clients |
| **Invoices** | GET/POST `/api/payments/invoices`, PATCH refund-approval | 3 mock invoices with refund workflow |
| **Payments** | POST `/api/payment/create-session` (Stripe/Razorpay), webhooks, billing settings | Mock checkout sessions |
| **Notifications** | GET/POST `/api/notifications`, PATCH read status, DELETE | In-app / email / push notifications |
| **Analytics** | GET `/api/analytics/dashboard` | Aggregated counts, SVG chart paths for revenue, traffic, leads, growth |
| **Careers** | GET/POST `/api/careers/applications`, apply, update-status, schedule-interview, send-email, edit-profile, withdraw | 3 mock applications with full lifecycle |
| **Blogs** | CRUD `/api/blogs` + comments | 3 mock blog posts (2 published, 1 draft) |
| **AI Assistant** | POST `/api/ai/chat` | Keyword-routed chatbot responses |

### 4.7 CORS

Allowed origins: `http://localhost:3000`, `http://127.0.0.1:3000`

### 4.8 Data Preprocessing (`backend/preprocess.py`)

**Category normalization** maps user input (e.g., "obc", "nt-c", "vj") to canonical dataset values. Handles 15+ category variants. Same for gender (Male/Female/Others) and minority type.

**`ColumnTransformer` pipeline:**
- Numeric: `StandardScaler` on `merit_percentile`, `hsc_total_percent`
- Categorical: `OneHotEncoder(handle_unknown='ignore')` on category, gender, is_ews, is_tfws, is_pwd_def, minority_type

---

## 5. Frontend Architecture & Logic

### 5.1 App Router Structure (24 routes)

All routes use Next.js App Router with `page.tsx` files:

| Route | Purpose | Auth Required |
|-------|---------|:---:|
| `/` | Homepage (Hero → Contact CTA) | No |
| `/about` | About page | No |
| `/services` | Services listing | No |
| `/ai-solutions` | AI solutions page | No |
| `/meta-ads` | Meta Ads service page | No |
| `/reel-editing` | Reel editing service page | No |
| `/social-media` | Social media service page | No |
| `/pricing` | Pricing plans | No |
| `/blog` | Blog listing & detail | No |
| `/careers` | Job openings + apply | No (apply needs auth) |
| `/contact` | Contact form | No |
| `/login` | Login page | No (redirects if authed) |
| `/register` | Registration page | No |
| `/forgot-password` | Password reset request | No |
| `/reset-password` | Reset password with OTP | No |
| `/verify-email` | Email verification with OTP | No (after register) |
| `/predictor` | **MHT-CET Rank Predictor** (core tool) | Yes |
| `/apply` | Job application form | Yes |
| `/checkout` | Payment checkout | Yes |
| `/admin` | Admin Dashboard + full CRM | Yes (Admin only) |
| `/client` | Client Dashboard (billing, invoices) | Yes (Client/Admin) |
| `/employee` | Employee Dashboard (tasks, leads) | Yes (Employee/Admin) |

### 5.2 State Management

**AuthContext** (`frontend/src/context/AuthContext.tsx`):
- Manages JWT token in cookies (7-day expiry)
- Decodes JWT client-side to extract user name, email, role
- Provides `login`, `logout`, `user`, `role`, `isAuthenticated` globally via React Context
- Cookie helpers: `setCookie()`, `getCookie()`, `deleteCookie()`

### 5.3 Route Protection (`middleware.ts`)

Next.js Edge Middleware intercepts requests to:
- `/predictor`, `/apply`, `/admin`, `/client`, `/employee`

Logic:
1. If no `token` cookie → redirect to `/login?callbackUrl=...`
2. If token expired → delete cookie, redirect to `/login`
3. **Role Guards**:
   - `/admin` → only `Admin` role
   - `/client` → `Client` or `Admin`
   - `/employee` → `Employee` or `Admin`

### 5.4 Components (17 total)

| Component | Description |
|-----------|-------------|
| **Navbar** | Responsive nav with theme toggle (dark/light), auth state (Login/Logout/Sign Up), role-based Admin Panel link, NotificationCenter bell icon, mobile drawer with user badge |
| **Footer** | Site footer with links |
| **AiAssistant** | Floating chat widget (bottom-right), communicates with `POST /api/ai/chat` |
| **NotificationCenter** | Bell icon dropdown showing unread notifications from `GET /api/notifications` with mark-as-read |
| **HeroSection** | Main landing hero with headline, CTA buttons, animated background |
| **TrustedBy** | Social proof section (logos, stats) |
| **ServicesOverview** | Grid showcasing: AI Automation, Meta Ads, Reel Editing, Social Media, Web Dev |
| **WhyChoose** | Differentiators section |
| **AIFeatures** | Feature cards with icons |
| **EmbeddedPredictor** | Mini predictor form on homepage — inputs percentile, category, gender, branch; fetches `POST /api/predict` and renders results inline |
| **CoursesSection** | Course listing cards |
| **MentorSection** | Mentor profiles with images (Ayush, Harsh, Shubham) + 3D model (`text_riding_a_roller_coaster.glb`) |
| **Testimonials** | Student testimonials carousel |
| **BlogPreview** | Latest 3 blog posts from `GET /api/blogs` |
| **CareerCTA** | Call-to-action banner for careers |
| **ContactCTA** | Contact form CTA section |
| **FeaturesSection** | Feature highlight blocks |
| **IntroSection** | Introductory content section |

### 5.5 Styling Approach

- **Vanilla CSS with CSS Modules** (`.module.css` files per component)
- **Dark Glassmorphic Theme** — frosted glass effects (`backdrop-filter: blur()`, semi-transparent backgrounds, subtle borders)
- **CSS Custom Properties** for theming (`--text-main`, `--bg-primary`, etc.)
- **Liquid Blob Animations** — floating background blobs in `globals.css` with continuous rotation/scale keyframes
- **Data attribute theming**: `<html data-theme="dark|light">` toggled via Navbar

### 5.6 Animation & 3D

- **GSAP** (GreenSock Animation Platform) v3.15.0 — scroll-triggered animations, stagger reveals
- **Three.js** v0.185.1 — 3D scene with a roller coaster GLB model on mentor section
- **@tweenjs/tween.js** — supplementary tweening

---

## 6. API Endpoints Summary

### Core ML
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check, model & dataset status |
| POST | `/api/predict` | Rank prediction + college recommendations |
| POST | `/api/enquire` | Course enquiry form submission |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| POST | `/api/auth/verify-email` | Verify email with OTP |
| POST | `/api/auth/forgot-password` | Request password reset OTP |
| POST | `/api/auth/reset-password` | Reset password with OTP |

### Payment
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/create-session` | Create Stripe/Razorpay checkout session |
| POST | `/api/payment/stripe-webhook` | Stripe webhook handler |
| POST | `/api/payment/razorpay-webhook` | Razorpay webhook handler |
| POST | `/api/payment/request-refund` | Request refund for invoice |
| POST | `/api/payment/save-billing-settings` | Save billing preferences |
| GET | `/api/payment/billing-details` | Get invoices + settings |
| GET | `/api/payments/invoices` | List invoices (optionally by email) |
| POST | `/api/payments/invoices` | Create invoice |
| PATCH | `/api/payments/invoices/{id}/refund-approval` | Approve/reject refund |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/chat` | AI assistant chatbot |

### Careers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/careers/applications` | List applications (optionally by email) |
| POST | `/api/careers/apply` | Submit job application |
| POST | `/api/careers/update-status` | Update application status |
| POST | `/api/careers/schedule-interview` | Schedule interview |
| POST | `/api/careers/send-email` | Send email to candidate |
| POST | `/api/careers/edit-profile` | Edit student profile |
| POST | `/api/careers/withdraw` | Withdraw application |
| GET | `/api/careers/openings` | List job openings |
| POST | `/api/careers/openings` | Create opening |
| DELETE | `/api/careers/openings/{id}` | Delete opening |

### Blogs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | List blogs (filter by category/status) |
| GET | `/api/blogs/{slug}` | Get blog by slug |
| POST | `/api/blogs` | Create blog post |
| PUT | `/api/blogs/{slug}` | Update blog post |
| DELETE | `/api/blogs/{slug}` | Delete blog post |
| POST | `/api/blogs/{slug}/comment` | Add comment |

### CRM — Leads, Clients, Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | List all leads |
| POST | `/api/leads` | Create lead |
| PUT | `/api/leads/{id}` | Update lead |
| GET | `/api/clients` | List B2B clients |
| POST | `/api/clients` | Create client |
| GET | `/api/notifications` | List notifications |
| POST | `/api/notifications` | Create notification |
| PATCH | `/api/notifications/{id}/read` | Mark notification read/unread |
| DELETE | `/api/notifications/{id}` | Delete notification |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/dashboard` | Aggregated dashboard data |

---

## 7. User Roles & Auth Flow

### Roles
| Role | Access |
|------|--------|
| **Admin** | Full access — Admin Dashboard (CRM, leads, clients, invoices, blogs, careers, analytics), Predictor, Client Dashboard, Employee Dashboard |
| **Client** | Client Dashboard (billing, invoices, refund requests, requirements upload) |
| **Employee** | Employee Dashboard (tasks, leads management) |
| **Student** | Predictor, Apply, Careers, Blog |

### Flow
1. User registers → `POST /api/auth/register` → JWT returned (unverified)
2. Email verification → `POST /api/auth/verify-email` with OTP `123456` → JWT returned (verified)
3. Login → `POST /api/auth/login` → JWT stored in cookie
4. Middleware checks cookie on protected routes → decodes JWT → enforces role guard
5. Logout → cookie deleted

### Mock Default Accounts
| Email | Password | Role |
|-------|----------|------|
| `admin@engineeringpath.ai` | `admin123` | Admin |
| `student@engineeringpath.ai` | `student123` | Student |

---

## 8. Deployment Status

| Component | Status | Notes |
|-----------|:------:|-------|
| **Backend (FastAPI)** | 🔴 Not Deployed | Only runs locally via `uvicorn` on port 8000 |
| **Frontend (Next.js)** | 🔴 Not Deployed | Only runs locally via `npm run dev` on port 3000 |
| **Docker** | ❌ Not Configured | No Dockerfile or docker-compose.yml |
| **Production URL** | ❌ None | No Vercel, Render, or Railway deployment |
| **Database** | ⚠️ In-Memory Mock | No PostgreSQL, SQLite, or other persistent DB |
| **CI/CD** | ❌ Not Configured | No GitHub Actions or other pipelines |

### Deployment Recommendations
- **Backend**: Deploy to Render / Railway / fly.io as a Uvicorn ASGI service
- **Frontend**: Deploy to Vercel (native Next.js support)
- **Database**: Migrate from in-memory mock DBs to PostgreSQL (via SQLAlchemy + Alembic)
- **Containerization**: Add Dockerfile for backend + docker-compose.yml for full stack
- **Environment Variables**: Move `SECRET_KEY` and CORS origins to `.env`
- **File Storage**: Replace hardcoded images with cloud storage (S3 / Cloudinary)

---

## 9. How to Run Locally

### Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate    # Windows
# source venv/bin/activate # macOS/Linux
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
# API docs: http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App: http://localhost:3000
```

---

*Generated on July 20, 2026*
