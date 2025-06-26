# Selenium React Testing Tutorial

This project demonstrates how to build, test, and automate a React + TypeScript application using Selenium, Node.js API, and Python-based testing.

---

## 📦 Project Structure

```
selenium-tutorial/
├── api/           # Node.js + TypeScript mock API
├── client/        # React + TypeScript frontend
├── selenium/      # Selenium tests in Python
```

---

## ⚙️ Requirements

* Node.js ≥ 16
* Python ≥ 3.10
* Chrome + chromedriver (included in selenium/driver/)
* Git

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/selenium-react-tutorial.git
cd selenium-react-tutorial
```

### 2. Run Backend

```bash
cd api
npm install
npm run dev
```

### 3. Run Frontend

```bash
cd ../client
npm install
npm start
```

Frontend runs at [http://localhost:3002](http://localhost:3002)

### 4. Run Selenium Test

```bash
cd ../selenium
python tests/login_test.py
```

✅ Login test will open browser, input credentials and assert success.

---

## 🔐 Auth Flow

* Login/Register (token-based)
* Protected routes: `/dashboard`, `/settings`
* Token stored in context
* Logout clears session

---

## 🧪 Frontend Features

* Bootstrap UI (United offline theme)
* Page routes: Login, Register, Dashboard, Settings
* Toasts for actions
* Icons with `react-icons`
* Theme switcher (light/dark toggle)

---

## 🔬 Selenium

* Uses `selenium` Python package
* Chrome WebDriver placed in `selenium/driver`
* Designed to scale (additional tests via `pytest` or Jenkins later)

---

## 📌 Project Goal

This is a **learning project**:

* Build full-stack app with clean structure
* Practice Selenium test automation
* Prepare for Jenkins + Docker usage

---

## 📝 License

MIT
