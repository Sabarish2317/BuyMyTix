# 🎟️ BuyMyTix

**BuyMyTix** is a full-stack ticket marketplace where users can buy and sell event tickets — with confidence. Fast, secure, and optimized for last-minute finds or safe reselling.

---

## 🧰 Tech Stack

- **Frontend**: React (TypeScript), Tailwind CSS
- **Backend**: Express.js (TypeScript)
- **Database**: MongoDB
- **Cache**: Redis
- **Authentication**: JWT + OTP (Resend API)
- **Others**: Google OAuth, WebSockets, React Query

---

## 📦 Features

- 🔐 OTP-based + Google authentication
- 🏟️ Discover and search events by title, club, nation, or player
- 🛒 Buy/Sell tickets with image uploads
- 📥 Ticket history + editing interface
- 🔄 Real-time sync with WebSockets
- 💬 Clean, responsive UI with motion/animation
- ⚙️ Admin panel for jersey management
- 📈 Production-ready setup (CORS, rate limits, token refresh)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/buymytix.git
cd buymytix
```

### 2. Setup Environment Variables

Create two `.env` files:

- `frontend/.env`
- `backend/.env`

Example contents:

```env
# frontend/.env
VITE_BACKEND_URL=http://localhost:5000

# backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/buymytix
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

---

## 🖥️ Running Locally

### Option 1: Manual (no Docker)

In **two terminals**:

```bash
# Terminal 1: Frontend
cd frontend
npm install
npm run dev
```

```bash
# Terminal 2: Backend
cd backend
npm install
npm run dev
```

## 📂 Project Structure

```
frontend/       # React + Tailwind UI
backend/        # Express API

```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

[MIT](LICENSE)

---

## ✨ Credits

Made by Sabarish and contributors.
