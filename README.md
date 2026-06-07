# 🚀 Book My Service

A Full Stack **MERN** application that connects **customers** with **local service providers** such as salons, photographers, electricians, plumbers, and more. Customers can book services while vendors can create and manage their own offerings through a secure role-based system.

> 🚧 **Project Status:** Under Active Development

---

# ✨ Features

## 👤 Customer

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Browse Available Services
- ✅ View Service Details
- ✅ Book a Service
- ✅ Prevent Duplicate Slot Booking
- ✅ Cancel Booking
- 🚧 View My Bookings
- 🚧 AI Chat Assistant

---

## 🏪 Vendor

- ✅ Vendor Registration
- ✅ Vendor Login
- ✅ Create Service
- ✅ Update Service
- ✅ Delete Service
- 🚧 View Booking Requests
- 🚧 Confirm Booking
- 🚧 Reject Booking
- 🚧 Mark Booking as Completed

---

# 🔐 Authentication & Authorization

- JWT Authentication
- Role-Based Authorization
- Protected Routes
- User & Vendor Separation
- Password Hashing using **bcrypt**

---

# ⚙️ Backend Features

## User APIs

- Register User
- Login User

---

## Service APIs

- Create Service
- Get All Services
- Get Particular Service
- Update Service
- Delete Service

---

## Booking APIs

- Create Booking
- Get User Bookings
- Cancel Booking
- Slot Availability Validation

---

# 🎨 Frontend Features

## Home Page

- Responsive Hero Section
- Popular Services Section
- Modern UI

---

## Service Module

- Service Cards
- Service Details Page
- Booking Interface
- Date Selection
- Time Slot Selection

---

## State Management

- Redux Store
- Booking Slice
- Add Booking
- Cancel Booking

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Redux Toolkit
- Tailwind CSS

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

# 📂 Project Structure

```text
Book-My-Service/

├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── routing/

├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js

├── .gitignore

└── README.md
```

---

# 🗄 Database Models

## User

- name
- email
- phone
- password
- role (user/vendor)

---

## Service

- title
- description
- price
- image
- category
- vendorId
- location

---

## Booking

- userId
- vendorId
- serviceId
- serviceTitle
- price
- bookingDate
- bookingTime
- location
- status

---

# 🔄 Booking Flow

```text
Vendor
      │
      │ Creates Service
      ▼
 Service Database
      │
      │
      ▼
Customer Selects Service
      │
      ▼
Booking Request
      │
      ▼
Status = Pending
      │
      ▼
Vendor Action
      ├── Confirm
      ├── Reject
      └── Complete
```

---

# 🎯 Project Vision

Book My Service aims to simplify the process of discovering and booking local services while providing vendors with an easy platform to manage their services and booking requests through a secure and scalable architecture.

---

# 🚀 Current Progress

- ✅ Authentication Module
- ✅ JWT Authorization
- ✅ Role-Based Access
- ✅ Service CRUD APIs
- ✅ Booking Module
- ✅ Slot Validation Logic
- 🚧 Frontend Integration
- 🚧 Vendor Booking Management
- 🚧 AI Chat Assistant
- 🚧 Email Notifications

---

# 🔮 Upcoming Features

- AI Chatbot
- Nodemailer Integration
- Booking Confirmation Emails
- Customer Dashboard
- Vendor Dashboard
- Reviews & Ratings
- Search & Filters
- Deployment

---

## ⭐ If you found this project interesting, consider giving it a star and following its development.
