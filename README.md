# Personality Development

A full-stack web application for personal growth — track development goals, maintain a reflection journal, and take personality assessments powered by the Big Five model.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React, Vite, Redux Toolkit, React Router |
| Backend  | Node.js, Express.js                 |
| Database | MongoDB (Mongoose)                  |
| Auth     | JWT + bcrypt                        |

## Features

- **User Authentication** — Register, login, and secure JWT-based sessions
- **Dashboard** — Overview of goals, journal entries, and personality profile
- **Development Goals** — Create, track progress, and manage personal growth goals
- **Reflection Journal** — Daily journaling with mood tracking and tags
- **Personality Assessment** — Big Five personality quiz with visual results

## Project Structure

```
personality-development/
├── backend/
│   └── src/
│       ├── config/       # Database connection
│       ├── controllers/  # Route handlers
│       ├── middleware/   # Auth & error handling
│       ├── models/       # Mongoose schemas
│       ├── routes/       # API routes
│       └── server.js     # Entry point
└── frontend/
    └── src/
        ├── components/   # Reusable UI components
        ├── pages/        # Route pages
        ├── services/     # API client
        └── store/        # Redux slices & store
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection string

## Getting Started

### 1. Start MongoDB

Make sure MongoDB is running on your machine:

```bash
# Default local connection
mongodb://localhost:27017/personality_development
```

Or update `MONGODB_URI` in `backend/.env` with your Atlas connection string.

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The API runs at **http://localhost:5000**

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at **http://localhost:5173**

## API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | `/api/auth/register`        | Register new user        |
| POST   | `/api/auth/login`           | Login user               |
| GET    | `/api/auth/profile`         | Get user profile         |
| GET    | `/api/goals`                | List user goals          |
| POST   | `/api/goals`                | Create a goal            |
| PUT    | `/api/goals/:id`            | Update a goal            |
| DELETE | `/api/goals/:id`            | Delete a goal            |
| GET    | `/api/journal`              | List journal entries     |
| POST   | `/api/journal`              | Create journal entry     |
| DELETE | `/api/journal/:id`          | Delete journal entry     |
| GET    | `/api/assessments/questions`| Get assessment questions |
| POST   | `/api/assessments`          | Submit assessment        |

## Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/personality_development
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:5000/api
```

## License

ISC
