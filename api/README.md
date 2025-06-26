# 📘 API – Backend Server

Node.js + TypeScript + Express backend for authentication, settings, and user management.

---

## ✅ Features

- JWT-based login (`/api/auth/login`)
- Protected routes using middleware
- Settings list, create, update
- Create new users
- Hardcoded data for now – database integration planned later

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd api
npm install
```

### 2. Run the server

```bash
npm run dev
```

Server will run at: `http://localhost:3001`

---

## 🔐 Authentication

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "1234"
}
```

Returns:

```json
{
  "token": "your-jwt-token"
}
```

Use token in headers:

```http
Authorization: Bearer <token>
```

---

## 📘 API Endpoints

### Auth
- `POST /api/auth/login` – Get token

### Settings (protected)
- `GET /api/settings` – Get all settings
- `POST /api/settings` – Create setting
- `PUT /api/settings/:id` – Update setting

### Users (protected)
- `POST /api/users` – Create new user

---

## 📁 Project Structure

```
api/
├── src/
│   ├── index.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── settings.ts
│   │   └── users.ts
│   └── middleware/
│       └── auth.ts
├── tsconfig.json
├── package.json
└── .gitignore
```
