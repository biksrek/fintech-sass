# FinTech SaaS Application

A modern, full-stack financial SaaS application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. This application allows users to track income and expenses, view analytics, and manage their personal finances securely.

## 🚀 Features

*   **Secure Authentication**: User registration and login with JWT (JSON Web Tokens) and bcrypt password hashing.
*   **Financial Dashboard**: Real-time overview of total income, expenses, and net balance.
*   **Analytics**: Visual charts showing financial trends and categorical breakdowns.
*   **Transaction Management**: Add, view, edit, and delete income/expense transactions.
*   **Filtering**: Filter transactions by date range and type.
*   **Responsive Design**: Fully responsive UI built with Tailwind CSS.
*   **Cloud Database**: Data persistence using MongoDB Atlas.

## 🛠️ Tech Stack

### Frontend
*   **React** (Vite)
*   **TypeScript**
*   **Tailwind CSS**
*   **TanStack Query** (React Query) - State Management & Data Fetching
*   **Recharts** - Data Visualization
*   **Axios** - API requests
*   **Lucide React** - Icons

### Backend
*   **Node.js** & **Express.js**
*   **TypeScript**
*   **MongoDB** & **Mongoose** - Database & ODM
*   **JWT** - Authentication
*   **Bcrypt** - Security

## ⚙️ Prerequisites

*   Node.js (v14+ recommended)
*   npm or yarn
*   MongoDB Atlas Account (or local MongoDB installed)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/biksrek/fintech-sass.git
    cd fintech-sass
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../client
    npm install
    ```

## 🔧 Configuration

### Backend (.env)
Create a `.env` file in the `server` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend
The frontend connects to `http://localhost:5000` by default.

## 🏃‍♂️ Running the Project

1.  **Start the Backend Server**
    ```bash
    cd server
    npm run dev
    ```
    Server runs on `http://localhost:5000`.

2.  **Start the Frontend Application**
    ```bash
    cd client
    npm run dev
    ```
    Client runs on `http://localhost:5173`.

## 📂 Project Structure

```
fintech-sass/
├── client/          # React Frontend
│   ├── src/
│   │   ├── api/     # API integration
│   │   ├── components/
│   │   ├── context/ # Auth Context
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── ...
├── server/          # Express Backend
│   ├── src/
│   │   ├── config/  # DB Config
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/  # Mongoose Schemas
│   │   ├── routes/
│   │   └── ...
```

## 🛡️ Security Features

*   **Password Hashing**: Passwords are hashed using bcrypt before storage.
*   **JWT Auth**: Stateless authentication using JSON Web Tokens.
*   **Protected Routes**: Frontend routes are guarded to prevent unauthorized access.
*   **Input Validation**: Backend validation to inspect incoming data.

## 🤝 Contributing

Contributions are welcome! Please create a pull request.

## 📄 License

This project is licensed under the Bikky Gupta.
