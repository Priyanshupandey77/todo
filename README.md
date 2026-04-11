# 📝 Todo Full-Stack Application

A **production-grade full-stack Todo application** built with the MERN stack.  
It demonstrates real-world software engineering practices including authentication, authorization, REST API design, database modeling, and cloud deployment.

This project is designed as a **scalable, secure, and production-ready system**, not just a basic CRUD app.

🚀 **Live Demo:** https://todo-xi-drab.vercel.app/

---

## ⚡ Overview

This application allows users to securely manage their tasks with authentication and full CRUD functionality. It follows modern backend architecture principles with JWT-based authentication and protected API routes.

It is deployed using industry-standard cloud platforms for both frontend and backend.

---

## ✨ Features

- 🔐 Secure Authentication (JWT-based login & signup)
- 🛡️ Protected Routes (Authorization middleware)
- ➕ Create / Read / Update / Delete Todos
- ☁️ MongoDB Atlas Cloud Database Integration
- ⚙️ RESTful API architecture
- 🔄 Real-time UI state updates
- 📱 Fully responsive design (mobile + desktop)
- 🌐 Production deployment (frontend + backend)

---

## 🧠 System Design Highlights

- Stateless authentication using JWT
- Password hashing using bcrypt
- Middleware-based route protection
- Separation of concerns (frontend / backend / database layers)
- Environment-based configuration management
- Scalable REST API structure

---

## 🧰 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS / Tailwind

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Bcrypt.js
- CORS

### Database
- MongoDB Atlas

### Deployment
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Password is securely hashed using bcrypt
3. Server validates credentials
4. JWT token is generated on successful login
5. Token stored on client-side (localStorage)
6. Token attached to API requests
7. Backend middleware verifies token before granting access

---

## 📁 Project Architecture
/frontend → React application (UI layer)
/backend → Express.js API server
/models → MongoDB schemas (Mongoose)
/routes → API endpoints (auth + todos)
/middleware → JWT authentication logic
/config → Database connection setup
