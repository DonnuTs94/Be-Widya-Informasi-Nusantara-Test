# Test for BE Widya Informasi Nusantara

## Description

This project is a backend service built with Express.js, using Prisma as the ORM and PostgreSQL as the database. It provides APIs for user management and product operations with authentication handled via JSON Web Tokens (JWT).

---

## Tech Stack

- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Environment**: Node.js

---

### Example `.env` File

```env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database-name>"
JWT_SECRETE_KEY="<your-secret-key>"
PORT="<port-number>"
```

---

## Installation and Setup

### Prerequisites

- Node.js (v22.12.0)
- PostgreSQL (v12 or higher)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Create a PostgreSQL database.
   - Update the `DATABASE_URL` in the `.env` file.
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```
4. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:8000` by default.

---

## API Documentation

### Authentication

- **JWT Bearer Token**: Include the token in the `Authorization` header for protected routes.
  ```http
  Authorization: Bearer <token>
  ```

### User Routes

| Method | Endpoint         | Description                | Middleware             |
| ------ | ---------------- | -------------------------- | ---------------------- |
| POST   | `/user/register` | Register a new user        | `validateUserRegister` |
| POST   | `/user/login`    | Login user and get a JWT   | `validateLogin`        |
| GET    | `/user/profile`  | Get logged-in user profile | `validateToken`        |

---

### Product Routes

| Method | Endpoint              | Description               | Middleware                                                     |
| ------ | --------------------- | ------------------------- | -------------------------------------------------------------- |
| GET    | `/product/`           | Get all products          | `validateToken`                                                |
| GET    | `/product/:id`        | Get product details by ID | `validateToken`, `verifyOwnerProduct`                          |
| POST   | `/product/`           | Create a new product      | `validateFileUpload`, `validateCreateProduct`, `validateToken` |
| PUT    | `/product/:id`        | Update product data       | `validateUpdateProduct`, `validateToken`, `verifyOwnerProduct` |
| PUT    | `/product/:id/delete` | Soft delete a product     | `validateToken`, `verifyOwnerProduct`                          |
| PUT    | `/product/:id/image`  | Update product image      | `validateFileUpload`, `validateToken`, `verifyOwnerProduct`    |

## Code Structure

- **/routes**: Contains route files for users and products.
- **/controllers**: Handles business logic for each API endpoint.
- **/services**: Contains service layer logic to process data and interact with the database through Prisma.
- **/middlewares**: Contains reusable middleware functions.
- **/configs**: Configuration files, including the Prisma client and API setup.
- **/prisma**: Prisma schema and migrations.

---
