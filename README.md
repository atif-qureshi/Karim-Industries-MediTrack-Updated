# Karim Industries — MediTrack Web Platform

A full-stack MERN application for Pakistan's leading surgical dressing manufacturer.
Transforms a static product catalog into an intelligent, admin-managed digital platform
with an AI-powered chatbot, contact management, newsletter system, and JWT-secured admin dashboard.

---

## Live Features

| Feature | Status |
|---------|--------|
| React 19 Frontend (15+ pages) | ✅ Complete |
| Node.js / Express 5 REST API | ✅ Complete |
| MongoDB product & user management | ✅ Complete |
| JWT authentication & role-based access | ✅ Complete |
| AI RAG Chatbot (Gemini + vector search) | ✅ Complete |
| Admin dashboard (8 sections) | ✅ Complete |
| Contact form → MongoDB + email reply | ✅ Complete |
| Newsletter subscription & bulk notify | ✅ Complete |
| WhatsApp floating button | ✅ Complete |
| Unit test suite (Jest + Supertest) | ✅ Complete |

---

## Project Structure

```
Karim-Industries-MediTrack-Updated/
├── website-project/          # React 19 frontend
│   └── src/
│       ├── Components/       # Header, Footer, AIChatbot, WhatsAppButton
│       ├── Pages/            # Home, Products, Services, Contact, Admin, Auth ...
│       ├── hooks/            # Custom React hooks
│       └── services/         # API service layer
├── backend/                  # Node.js + Express 5 backend
│   ├── server.js             # Main Express app & MongoDB connection
│   ├── mailer.js             # Nodemailer SMTP email service
│   ├── middleware/           # auth.js (JWT), rateLimiter.js
│   ├── routes/               # ragRoutes.js (AI chatbot endpoints)
│   ├── services/             # geminiClient.js, embeddingService.js, ragService.js, jwtService.js
│   ├── utils/                # embeddingContent.js
│   ├── products/             # 24 product JSON files
│   └── tests/                # Jest unit tests (5 files, 34+ tests)
├── Requirnments/             # SRS document (v1.1)
├── Presentation.html         # Project presentation (10 slides, open in browser)
└── README.md
```

---

## Technology Stack

**Frontend**
- React 19, React Router DOM 7
- FontAwesome Icons, React Toastify
- CSS3 with responsive design (mobile / tablet / desktop)

**Backend**
- Node.js, Express 5
- MongoDB (driver v6) — collections: `products`, `users`, `contactMessages`, `productEmbeddings`
- JWT (`jsonwebtoken`), bcryptjs, express-rate-limit, CORS
- Nodemailer — Gmail SMTP

**AI / RAG Pipeline**
- Google Gemini API (`gemini-embedding-001` — 3072-dim vectors)
- `gemini-2.5-flash` for chat completions
- Cosine similarity search with MongoDB fallback
- Grounded answers — no hallucination, only catalog data used

**Testing**
- Jest 29, Supertest — all external deps mocked
- 5 test files: `api`, `products`, `contact`, `utils`, `rag`

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`)
- Google Gemini API key ([Get one here](https://aistudio.google.com/))
- Gmail account with App Password enabled

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=karim_industries

GEMINI_API_KEY=your_gemini_api_key_here
USE_GEMINI=true

JWT_SECRET=your_jwt_secret_here

ADMIN_UI_USER=admin_username
ADMIN_UI_PASS=admin_password
ADMIN_SECRET=your_admin_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_gmail_app_password_no_spaces
SMTP_FROM="Your Name <your_gmail@gmail.com>"
MAIL_RECIPIENT=your_gmail@gmail.com

PORT=5000
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords. Remove spaces from the generated password before pasting.

```bash
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd website-project
npm install
```

Create a `.env` file in the `website-project/` folder:

```env
REACT_APP_API_BASE=http://localhost:5000
```

```bash
npm start
# App runs on http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/health` | Server health check | None |
| POST | `/api/auth/login` | Admin/user login → JWT | None |
| POST | `/api/auth/register` | New user registration | None |
| GET | `/api/products` | List all products | None |
| POST | `/api/products` | Create product + auto-embed | Admin JWT |
| GET | `/api/products/:id` | Get product by ID | None |
| PUT | `/api/products/:id` | Update product + refresh embedding | Admin JWT |
| DELETE | `/api/products/:id` | Delete product + remove embedding | Admin JWT |
| GET | `/api/products/search` | Semantic vector search | None |
| POST | `/api/products/reload` | Reload from JSON + rebuild embeddings | Admin JWT |
| POST | `/api/contact` | Submit contact form (DB + email) | None |
| GET | `/api/contactmessages` | List all contact submissions | Admin JWT |
| POST | `/api/contactmessages/:id/reply` | Reply to a contact message | Admin JWT |
| POST | `/api/subscribe` | Subscribe to newsletter | None |
| GET | `/api/subscribers` | List all subscribers | None |
| DELETE | `/api/subscribers` | Remove a subscriber | Admin JWT |
| POST | `/api/notify` | Bulk email all subscribers | Admin Secret |
| POST | `/api/rag/query` | AI chatbot query | None |
| POST | `/api/rag/rebuild` | Rebuild product embeddings | Admin JWT |
| GET | `/api/rag/status` | Embedding health check | Admin JWT |
| GET | `/api/stats` | DB stats (products / users) | None |

---

## Running Tests

```bash
cd backend
npm test                  # Run all tests
npm test -- --coverage    # With coverage report
npx jest tests/rag.test.js  # RAG tests only
```

| Test File | Tests | Covers |
|-----------|-------|--------|
| `api.test.js` | ~10 | Health, products, auth, stats |
| `products.test.js` | ~12 | Full product CRUD + edge cases |
| `contact.test.js` | 3 | Contact form, admin view, reply |
| `utils.test.js` | 5 | `loadProductsFromFiles` utility |
| `rag.test.js` | 34 | Gemini client, embeddings, RAG routes |

---

## Admin Dashboard

Navigate to `/admin` in the frontend. Login with your `ADMIN_UI_USER` / `ADMIN_UI_PASS` credentials.

**Sections:**
- **Products** — CRUD, reload from JSON, auto-embedding
- **Contact Messages** — view inquiries, reply via email
- **Subscribers** — manage newsletter list
- **AI Management** — rebuild embeddings, check health
- **Users** — registered user list
- **Stats** — live product / user counts

---

## AI Chatbot — How It Works

1. User types a question in the chatbot widget (bottom-right of website)
2. Question is converted to a 3072-dim vector via `gemini-embedding-001`
3. Top 5 most similar product documents retrieved from MongoDB via cosine similarity
4. Matched product context passed to `gemini-2.5-flash` to generate a grounded answer
5. Answer returned — strictly based on catalog data, no hallucination

To rebuild embeddings after adding products: **Admin → AI Management → Rebuild Knowledge Base**

---

## Presentation

Open `Presentation.html` in any browser for a 10-slide interactive project presentation.
Navigate with arrow keys, swipe on mobile, or use the Prev/Next buttons.

---

## Author

**Muhammad Atif Qureshi**
Karim Industries MediTrack Platform — 2026
