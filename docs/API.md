# Restaurant QR Ordering System – API Contract

## Overview
This document defines the API contracts for the Restaurant QR Ordering System.
It specifies what APIs exist, who can call them, what data they accept, and what they return.
This is a design document, not implementation.

---

## Base URL
/api

All endpoints are prefixed with `/api`.

---

## Global Response Format

### Success
{
  "success": true,
  "data": {}
}

### Error
{
  "success": false,
  "message": "Error description"
}

All APIs must follow this format.

---

## Authentication

- Authentication uses JWT
- Protected APIs require a token in headers

Authorization: Bearer <JWT_TOKEN>

Rules:
- Public APIs: No authentication required
- Admin APIs: Authentication required
- Only one role exists: Admin

---

## Status Codes

200 - Success  
201 - Resource created  
400 - Bad request  
401 - Unauthorized  
404 - Resource not found  
500 - Internal server error  

---

# Auth APIs

## POST /auth/login

Purpose:
Authenticate admin and return JWT token.

Auth:
Not Required

Request Body:
{
  "email": "string",
  "password": "string"
}

Success Response (200):
{
  "success": true,
  "data": {
    "token": "string"
  }
}

Error Responses:
- 400 Invalid request body
- 401 Invalid credentials

Notes:
- Only admin login exists
- No signup, logout, or password reset APIs

---

# Menu APIs

## GET /menu

Purpose:
Fetch menu items.

Auth:
Not Required

Success Response (200):
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "price": 0,
      "imageUrl": "string | null",
      "available": true
    }
  ]
}

Notes:
- Customers see only available items
- Admin may see all items when authenticated

---

## POST /menu

Purpose:
Create a new menu item.

Auth:
Required (Admin)

Request Body:
{
  "name": "string",
  "price": 0,
  "imageUrl": "string | null"
}

Success Response (201):
{
  "success": true,
  "data": {
    "id": "string"
  }
}

---

## PUT /menu/:id

Purpose:
Update menu item.

Auth:
Required (Admin)

Request Body:
{
  "name": "string",
  "price": 0,
  "available": true
}

Success Response (200):
{
  "success": true,
  "data": {}
}

---

## DELETE /menu/:id

Purpose:
Disable a menu item (soft delete).

Auth:
Required (Admin)

Success Response (200):
{
  "success": true,
  "data": {}
}

Notes:
- Soft delete only (available = false)

---

# Order APIs

## POST /orders

Purpose:
Place a new order.

Auth:
Not Required

Request Body:
{
  "tableNumber": 0,
  "customerName": "string",
  "items": [
    {
      "menuItemId": "string",
      "quantity": 0
    }
  ]
}

Success Response (201):
{
  "success": true,
  "data": {
    "orderId": "string",
    "status": "PLACED"
  }
}

Notes:
- Order cancellation is not allowed
- Prices are snapshotted at order time

---

## GET /orders

Purpose:
View all orders (admin).

Auth:
Required (Admin)

Success Response (200):
{
  "success": true,
  "data": [
    {
      "id": "string",
      "tableNumber": 0,
      "status": "PLACED",
      "createdAt": "string"
    }
  ]
}

---

## Order Status Values

- PLACED
- ACCEPTED
- REJECTED

---

## Out of Scope

- Payments
- Customer login
- Order cancellation
- Kitchen display system
- Multiple restaurants
- Analytics
- AI features

---

This API contract is frozen for implementation.
