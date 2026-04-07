# Karim Industries Backend

This backend implements the authentication service for the website.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI` to your MongoDB connection string.
3. Set `JWT_SECRET` to a strong secret string.

## Install

```bash
cd backend
npm install
```

## Run

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

## Endpoints

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login existing user
- `GET /api/auth/me` - get the current logged-in user (requires Bearer token)
