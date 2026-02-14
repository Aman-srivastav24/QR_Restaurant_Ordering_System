# QR Restaurant Ordering System -- Backend

Backend service for the QR-based restaurant ordering system.

## Tech Stack

-   Node.js
-   Express.js
-   PostgreSQL
-   Prisma ORM
-   JWT Authentication

## Setup

Create `.env` file:

``` env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=5000
```

Install dependencies:

``` bash
npm install
```

Run migrations:

``` bash
npx prisma migrate dev
```

Start server:

``` bash
npm run dev
```

## Documentation

-   See `API.md` for API reference

## Status

Backend MVP complete.
