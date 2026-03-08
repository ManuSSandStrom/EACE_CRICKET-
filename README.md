# 🏏 EACE — Ekalavya Academy of Cricket Excellence

A full-stack web application for **EACE Cricket Academy**, Bengaluru — a KSCA-affiliated premium cricket training academy. Built with the **MERN stack** (MongoDB, Express, React, Node.js).

> **Live:** Frontend on [Netlify](https://netlify.com) · Backend on [Render](https://render.com)

---

## 📁 Project Structure

```
EACE_CRICKET/
├── client/          → React + Vite frontend
│   ├── src/
│   │   ├── api/         → Axios API service layer
│   │   ├── components/  → Reusable UI components
│   │   ├── context/     → Auth context provider
│   │   ├── layouts/     → Page layout wrappers
│   │   ├── pages/       → Route-level page components
│   │   └── utils/       → Animation helpers & utilities
│   ├── public/          → Static assets (images, favicon)
│   └── index.html       → Root HTML template
│
├── server/          → Express + MongoDB backend
│   ├── src/
│   │   ├── config/      → Database connection
│   │   ├── controllers/ → Route handlers
│   │   ├── middleware/  → Auth, error, upload middleware
│   │   ├── models/      → Mongoose schemas
│   │   ├── routes/      → API route definitions
│   │   └── services/    → Business logic (admin seeder)
│   └── uploads/         → User-uploaded media (gitignored)
│
├── .gitignore
├── package.json         → Workspace root (monorepo)
└── README.md
```

---

## ⚙️ Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion   |
| Backend  | Node.js, Express 4, Mongoose, JWT             |
| Database | MongoDB Atlas                                 |
| AI       | OpenAI API (via OpenRouter) — Academy chatbot |
| Hosting  | Netlify (frontend) + Render (backend)         |

---

## 🚀 Local Development

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB Atlas** cluster (or local MongoDB)

### 1. Clone & Install

```bash
git clone https://github.com/ManuSSandStrom/EACE_CRICKET-.git
cd EACE_CRICKET-
npm install
```

> This installs dependencies for root, `client/`, and `server/` workspaces.

### 2. Configure Environment Variables

```bash
# Copy example env files
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit `server/.env` with your actual values:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173,http://localhost:5174
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_jwt_secret
ADMIN_EMAIL=admin@eace.in
ADMIN_PASSWORD=your_admin_password
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_MODEL=openai/gpt-4o-mini
CONTACT_PHONE=8123149416
CONTACT_EMAIL=your_email@example.com
```

### 3. Start Development Servers

```bash
npm run dev
```

This starts both servers concurrently:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## 🌐 Deployment

### Frontend → Netlify

1. Connect your GitHub repo to Netlify
2. **Build settings:**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
3. **Environment variable:**
   - `VITE_API_URL` = `https://your-render-backend.onrender.com/api`
4. Add a `_redirects` file in `client/public/`:
   ```
   /*    /index.html   200
   ```

### Backend → Render

1. Connect your GitHub repo to Render
2. **Settings:**
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `node src/server.js`
3. **Environment variables:** Add all variables from `server/.env`
4. **Important:** Set `CLIENT_URL` and `CLIENT_URLS` to your Netlify URL

---

## 🔑 Admin Dashboard

Access the admin panel at `/admin`:

| Field    | Default Value   |
| -------- | --------------- |
| Email    | `admin@eace.in` |
| Password | Set in `.env`   |

> **⚠️ Change default credentials before deploying to production.**

### Admin Features

- Manage homepage content (hero, stats, programs)
- Upload & manage gallery images with category filters
- Add/edit/delete testimonials
- Manage YouTube video showcase
- View contact submissions

---

## ✨ Key Features

- **Premium UI** — Tailwind CSS with glassmorphism, gradients, and micro-animations
- **Framer Motion** — Smooth page transitions and scroll-triggered animations
- **Responsive Design** — Mobile-first, optimized for all screen sizes
- **Plans & Pricing** — Monthly, 6-month, and annual training packages
- **School Bundle** — St. Anthony's School + Hostel + Cricket (75% scholarship)
- **WhatsApp-First Flow** — Direct enrollment via WhatsApp CTAs
- **AI Academy Assistant** — Floating chatbot powered by OpenAI for academy queries
- **Masonry Gallery** — Filterable image gallery with lightbox viewer
- **Cricket Calendar** — Training schedule, holidays, and academy events
- **Coaches Section** — Coach profiles with expertise details
- **SEO Optimized** — React Helmet for dynamic meta tags on every page
- **JWT Authentication** — Secure admin routes with token-based auth
- **Rate Limiting** — API protection with express-rate-limit
- **Health Check** — `/api/health` endpoint for uptime monitoring

---

## 📄 API Endpoints

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| GET    | `/api/health`         | Health check              |
| GET    | `/api/public/*`       | Public content endpoints  |
| POST   | `/api/auth/login`     | Admin login               |
| GET    | `/api/admin/*`        | Protected admin endpoints |
| POST   | `/api/assistant/chat` | AI chatbot endpoint       |

---

## 📞 Contact

**Ekalavya Academy of Cricket Excellence (EACE)**

- 📱 Phone: +91 8123149416
- 📧 Email: manoharbasappagari18@gmail.com
- 📍 Bengaluru, Karnataka, India

---

## 📝 License

This project is private and proprietary. All rights reserved.
