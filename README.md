<div align="center">

# 📡 Unified Communication Service

### One Platform. Every Channel.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

A production-ready **full-stack web application** for sending **Emails** and **SMS messages** from a unified interface — featuring intelligent contact-type detection, persistent MongoDB logging, real-time delivery tracking, and a polished dual-theme UI.

[🚀 Get Started](#-quick-start) · [📖 API Docs](#-api-reference) · [🏗️ Architecture](#%EF%B8%8F-system-architecture) · [🐛 Troubleshooting](#-troubleshooting)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📧 **Email Delivery** | Send richly formatted emails via SMTP using Nodemailer with Gmail App Password support |
| 📱 **SMS Delivery** | Send SMS messages worldwide through Twilio with E.164 number formatting |
| 🔍 **Smart Detection** | Automatically identifies whether a contact is an email address or phone number |
| 🗃️ **Message Logging** | Every message — sent or failed — is persisted to MongoDB with full metadata |
| 📊 **Delivery Tracking** | Real-time status tracking (`sent` / `failed`) with error details for diagnostics |
| 📜 **Message History** | Filterable, paginated history page with statistics dashboard |
| ✅ **Dual Validation** | Client-side (TypeScript) and server-side (Express) input validation |
| 🎨 **Dual Theme UI** | Toggle between Modern and Professional views with persistent preference |
| 🔒 **Security Headers** | `X-Content-Type-Options`, `X-Frame-Options`, and `X-XSS-Protection` enforced |
| 🩺 **Health Check** | Built-in `/health` endpoint for uptime monitoring and load balancer integration |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose | Version |
|:----------:|---------|:-------:|
| ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white) | React framework (App Router) | `16.1.6` |
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) | UI library | `19.x` |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Type safety | `5.7` |
| ![CSS](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Custom design system | — |

### Backend

| Technology | Purpose | Version |
|:----------:|---------|:-------:|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | Runtime environment | `18+` |
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white) | HTTP server & routing | `4.x` |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | NoSQL database | — |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat-square&logoColor=white) | ODM / schema modeling | — |

### Services & Tools

| Technology | Purpose |
|:----------:|---------|
| ![Nodemailer](https://img.shields.io/badge/-Nodemailer-0F9DCE?style=flat-square&logoColor=white) | SMTP email delivery (Gmail) |
| ![Twilio](https://img.shields.io/badge/-Twilio-F22F46?style=flat-square&logo=twilio&logoColor=white) | SMS delivery |
| ![Nodemon](https://img.shields.io/badge/-Nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=white) | Development auto-restart |
| ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) | Code linting |
| ![dotenv](https://img.shields.io/badge/-dotenv-ECD53F?style=flat-square&logoColor=black) | Environment management |

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **Node.js** | `18.x` | `20.x+` |
| **npm** | `9.x` | `10.x+` |
| **MongoDB** | `6.x` | `7.x+` (or Atlas) |
| **Gmail Account** | — | With [App Password](https://support.google.com/accounts/answer/185833) enabled |
| **Twilio Account** | — | For SMS functionality |

### Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/communication-service.git
cd communication-service
```

### Step 2 — Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

### Step 3 — Configure Environment Variables

**Backend** — Create `backend/.env`:

```env
# Server
PORT=5000
MONGO_URI=mongodb://localhost:27017/communication-service
FRONTEND_URL=http://localhost:3000

# Gmail SMTP
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password        # 16-char App Password (NOT your login password)

# Twilio SMS
TWILIO_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+1234567890
```

**Frontend** — Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> 💡 **Tip:** For Gmail, enable 2FA and generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

### Step 4 — Start MongoDB

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (set MONGO_URI to your Atlas connection string)
```

### Step 5 — Launch the Application

```bash
# Terminal 1 — Start the backend
cd backend
npm run dev
# ✅ Server running on http://localhost:5000

# Terminal 2 — Start the frontend
npm run dev
# ✅ App running on http://localhost:3000
```

---

## 📡 API Reference

Base URL: `http://localhost:5000`

### `POST /api/send`

Send an email or SMS message. The contact type is auto-detected.

---

### API Summary

| Method | Endpoint | Description | Status Codes |
|:------:|----------|-------------|:------------:|
| `POST` | `/api/send` | Send email or SMS | `200` `400` `502` |
| `GET` | `/api/messages` | Get message history | `200` `500` |
| `GET` | `/health` | Server health check | `200` |
| `*` | `*` | Not found | `404` |

---

## 📜 Scripts

### Frontend (Project Root)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server with hot reload (`localhost:3000`) |
| `npm run build` | Create optimized production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint across the codebase |

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with Nodemon (auto-restart on changes) |
| `npm start` | Start in production mode (`node server.js`) |

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Made with ❤️ using Next.js, Express, MongoDB, Nodemailer & Twilio

</div>
