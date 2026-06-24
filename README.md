<div align="center">

# 📋 Task Manager App

**A full-stack task management web application built with React + Node.js + MongoDB**

[![React](https://img.shields.io/badge/React-19.2.6-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Latest_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9.7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.3.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [API Docs](#-api-documentation) · [Screenshots](#-screenshots)

</div>

---

## 📌 Overview

Task Manager App is a clean, functional full-stack web application that lets authenticated users manage their tasks efficiently. Built as part of the **AWTOMATIG Full Stack Intern** selection task, it covers all required CRUD operations and goes beyond with JWT authentication, real-time search & filter, task analytics, and a polished UI.

---

### Live Demo : https://pitaskapp.vercel.app
### Backend APIs Full Details: https://github.com/sabbirkhanoni/Task-Manager-App/blob/main/backend/README.md

---

## ✨ Features

- 🔐 **User Authentication** — Secure signup, login, and logout using JWT stored in HTTP-only cookies
- ✅ **Task CRUD** — Create, view, update, and delete tasks
- 🔍 **Real-time Search & Filter** — Search by title/description and filter by status instantly
- 📊 **Task Analytics** — Dashboard with Total, To Do, In Progress, and Done counts
- 🛡️ **Protected Routes** — Unauthenticated users are redirected to login automatically
- 🍞 **Toast Notifications** — Instant success/error feedback on every action
- 📱 **Responsive Design** — Works on all screen sizes
- 🎨 **Premium UI** — Colorful gradient stat cards, hover effects, progress bars

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.6 | UI component library |
| Vite | 8.0.12 | Build tool & dev server |
| Tailwind CSS | 4.3.1 | Utility-first styling |
| React Router DOM | 7.18.0 | Client-side routing |
| Axios | 1.18.1 | HTTP client for API calls |
| React Icons | 5.6.0 | Icon library |
| React Hot Toast | 2.6.0 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | Latest LTS | Runtime environment |
| Express | 5.2.1 | Web framework |
| Mongoose | 9.7.1 | MongoDB ODM |
| JSON Web Token | 9.0.3 | Authentication tokens |
| bcrypt | 6.0.0 | Password hashing |
| cookie-parser | 1.4.7 | Cookie handling |
| CORS | 2.8.6 | Cross-origin resource sharing |
| Morgan | 1.11.0 | HTTP request logger |
| dotenv | 17.4.2 | Environment variable management |

### Database
| Technology | Purpose |
|---|---|
| MongoDB | NoSQL database (local or Atlas) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or above
- [MongoDB](https://www.mongodb.com/) — local or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string
- [Git](https://git-scm.com/)
- npm (comes with Node.js)

---

### 1. Clone the Repository

```bash
git clone https://github.com/sabbirkhanoni/Task-Manager-App.git
cd Task-Manager-App
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

> 💡 You can copy `backend/.env.example` and fill in the values.

Start the backend server:

```bash
# Development (auto-restart with nodemon)
npm run dev

# Production
npm start
```

The backend will be running at: `http://localhost:5000`

---

### 3. Frontend Setup

Open a **new terminal**, then:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend dev server:

```bash
npm run dev
```

The frontend will be running at: `http://localhost:5173`

---

### 4. Open in Browser

Visit **[http://localhost:5173](http://localhost:5173)** — you'll be redirected to the login page. Sign up, log in, and start managing your tasks!

---

## 📁 Project Structure

```
Task-Manager-App/
│
├── backend/                        # Node.js + Express REST API
│   ├── config/
│   │   └── connectDB.js            # MongoDB connection setup
│   ├── controllers/
│   │   ├── auth.controller.js      # Signup, login, logout handlers
│   │   └── task.controller.js      # Task CRUD + search + analytics handlers
│   ├── middlewares/
│   │   └── isAuthenticated.js      # JWT authentication guard
│   ├── models/
│   │   ├── user.model.js           # User Mongoose schema
│   │   └── task.model.js           # Task Mongoose schema
│   ├── routes/
│   │   ├── auth.route.js           # /api/auth/* routes
│   │   └── task.route.js           # /api/tasks/* routes
│   ├── services/
│   │   ├── auth.service.js         # Auth business logic
│   │   └── task.service.js         # Task business logic
│   ├── utils/
│   │   └── generateJWTtoken.js     # JWT generation utility
│   ├── .env.example                # Environment variable template
│   ├── index.js                    # App entry point
│   ├── package.json
│   └── README.md                   # 📖 Full Backend API Documentation
│
├── frontend/                       # React + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── tasks/
│   │   │   │   ├── TaskCard.jsx            # Individual task card
│   │   │   │   ├── StatCard.jsx            # Dashboard metric card
│   │   │   │   ├── AddNewTaskForm.jsx      # Create task modal
│   │   │   │   ├── EditTaskForm.jsx        # Edit task modal
│   │   │   │   └── DeleteConfirmationModal.jsx  # Delete confirm dialog
│   │   │   ├── Header.jsx                  # Top navigation bar
│   │   │   └── Footer.jsx                  # App footer
│   │   ├── contexts/
│   │   │   └── TaskContext.jsx     # Global task state (React Context)
│   │   ├── layouts/
│   │   │   ├── ProtectRoute.jsx    # Auth guard for protected pages
│   │   │   └── Dashboard.jsx       # Shared dashboard layout
│   │   ├── pages/
│   │   │   ├── TasksPage.jsx       # Main task dashboard
│   │   │   ├── LoginPage.jsx       # Login form
│   │   │   ├── SignupPage.jsx      # Registration form
│   │   │   ├── LoadingPage.jsx     # Loading state page
│   │   │   ├── UnauthorizedPage.jsx # 401 page
│   │   │   └── NotFoundPage.jsx    # 404 page
│   │   ├── routes/
│   │   │   └── route.jsx           # React Router configuration
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # Entry point with TaskProvider
│   └── package.json
│
└── README.md                       # ← You are here
```

---

## 🔌 API Documentation

> 📖 **For complete backend API documentation with all endpoints, request/response examples, status codes, and Postman testing guide, visit:**
>
> **[📄 backend/README.md](https://github.com/sabbirkhanoni/Task-Manager-App/blob/main/backend/README.md)**

### Quick API Reference

#### Base URL
```
http://localhost:5000
```

#### Authentication Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | No | Register a new user |
| `POST` | `/api/auth/login` | No | Login and receive JWT cookie |
| `POST` | `/api/auth/logout` | Yes | Clear session and logout |
| `GET` | `/api/auth/me` | Yes | Get current logged-in user |

#### Task Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/tasks/` | Yes | Create a new task |
| `GET` | `/api/tasks/` | Yes | Get all tasks |
| `PUT` | `/api/tasks/:id` | Yes | Update a task by ID |
| `DELETE` | `/api/tasks/:id` | Yes | Delete a task by ID |
| `GET` | `/api/tasks/search` | Yes | Search & filter tasks |
| `GET` | `/api/tasks/analytics` | Yes | Get task count by status |

#### Common Response Format

```json
// Success
{
  "message": "Operation successful",
  "error": false,
  "success": true,
  "data": {}
}

// Error
{
  "message": "Error description",
  "error": true,
  "success": false
}
```

---

## 🔐 Authentication Flow

```
User submits login form
        ↓
POST /api/auth/login
        ↓
Backend verifies credentials → generates JWT
        ↓
JWT stored in HTTP-only cookie (not accessible via JS)
        ↓
Every subsequent request includes cookie automatically
        ↓
isAuthenticated middleware verifies JWT on protected routes
        ↓
Request proceeds or returns 401 Unauthorized
```

---

## 🌐 Environment Variables

### Backend (`backend/.env`)

| Variable | Example | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `MONGO_URI` | `mongodb://localhost:27017/taskdb` | MongoDB connection string |
| `JWT_SECRET` | `mysupersecretkey` | Secret for signing JWT tokens |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |
| `NODE_ENV` | `development` | Environment mode |

### Frontend (`frontend/.env`)

| Variable | Example | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:5000` | Backend base URL for Axios |

---

## 🧪 Testing the API with Postman

1. Import a new collection in Postman
2. Set base URL variable: `http://localhost:5000`
3. Run **Signup** → **Login** (cookie is set automatically)
4. All subsequent task requests will include the cookie

> Full Postman test cases are documented in [backend/README.md](https://github.com/sabbirkhanoni/Task-Manager-App/blob/main/backend/README.md)

---

## 🔒 Security Highlights

- ✅ Passwords hashed with **bcrypt** (salt rounds: 10) — never stored as plain text
- ✅ JWT stored in **HTTP-only cookies** — prevents XSS attacks
- ✅ **Secure** and **SameSite** cookie flags enabled in production
- ✅ All task routes protected by `isAuthenticated` middleware
- ✅ CORS restricted to `FRONTEND_URL` only
- ✅ Input validation on both frontend and backend

---

## 📦 Scripts

### Backend
```bash
npm run dev    # Start with nodemon (development)
npm start      # Start with node (production)
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 👨‍💻 Author

**Md Sabbir Khan Oni**
Full Stack Developer | 3rd Year CSE, AIUB | CGPA: 3.60/4.0

[![GitHub](https://img.shields.io/badge/GitHub-sabbirkhanoni-181717?style=flat-square&logo=github)](https://github.com/sabbirkhanoni)

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  Made by Md Sabbir khan Oni
</div>
