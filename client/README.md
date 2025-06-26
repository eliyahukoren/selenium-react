# Client – React App

This is the frontend for the Selenium Tutorial Project. Built with React + TypeScript and styled using Bootstrap (offline theme).

---

## 📁 Structure

```
client/
├── public/
│   ├── bootstrap/           # Offline Bootstrap theme (United)
│   └── assets/              # Background image
├── src/
│   ├── components/          # Navbar, Chart, ThemeSwitcher, Toast
│   ├── context/             # Auth context
│   ├── pages/               # Login, Register, Dashboard, Settings
│   ├── styles/              # global.css
│   ├── App.tsx              # App layout & routes
│   └── index.tsx            # Entry point
```

---

## 🛠️ Setup

```bash
cd client
npm install
npm start
```

Runs on: [http://localhost:3002](http://localhost:3002)

---

## 🔐 Auth Flow

* Token-based login
* Login/registration via backend
* Token stored in context
* Redirect to `/login` if not authenticated

---

## 📄 Pages

* `/login` – login form with background and Bootstrap card
* `/register` – register new user (with "back to login" button)
* `/dashboard` – static chart
* `/settings`

    * fetch + list settings from API
    * edit existing setting (with animation, toast)

---

## 🎨 Theme

* Bootstrap (offline United theme)
* Global background image on login
* Light fallback color if image fails
* Custom styles: `styles/global.css`

---

## ✅ Highlights

* Token-based protected routes
* Toast notifications for actions
* Theme switcher (dark/light)
* Icons with `react-icons`
* Fully compatible with Selenium tests

---

## 🔜 Future Ideas

* Save theme preference
* Full form validation & error states
* Support real user data from DB
