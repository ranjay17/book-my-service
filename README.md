# 🚀 Book My Service

A Full Stack **MERN** application that connects **customers** with **local service providers** such as salons, photographers, electricians, plumbers, cleaners, and more.

Customers can discover and book services, while vendors can create, manage, and receive booking requests through a secure role-based platform.

> 🚧 **Project Status:** Under Active Development

---

# ✨ Features

## 👤 Customer

* ✅ User Registration
* ✅ User Login
* ✅ JWT Authentication
* ✅ Frontend Authentication
* ✅ Persistent Login using localStorage
* ✅ Browse Available Services
* ✅ View Service Details
* ✅ Book a Service
* ✅ Prevent Duplicate Slot Booking
* ✅ Cancel Booking
* ✅ View My Bookings
* 🚧 AI Chat Assistant

---

## 🏪 Vendor

* ✅ Vendor Registration
* ✅ Vendor Login
* ✅ Vendor Dashboard (Frontend)
* ✅ Dedicated Vendor Header
* ✅ Create Service
* ✅ View Created Services
* ✅ Update Service API
* ✅ Delete Service API
* ✅ View Booking Requests
* ✅ Confirm Booking Requests
* ✅ Cancel Booking Requests
* 🚧 Dynamic Vendor Dashboard Analytics

---

# 📧 Email Notifications

Powered by **Nodemailer**

* ✅ Vendor receives an email when a new booking request is created
* ✅ User receives an email when a booking is confirmed
* ✅ User receives an email when a booking is cancelled by the vendor

---

# 🔐 Authentication & Authorization

* ✅ JWT Authentication
* ✅ Role-Based Authorization
* ✅ Protected Routes
* ✅ Password Hashing using bcrypt
* ✅ Frontend Authentication Integration
* ✅ Redux User State
* ✅ Persistent Login using localStorage
* ✅ Dynamic UI based on User Role

---

# ⚙️ Backend Features

## User APIs

* Register User
* Login User

---

## Service APIs

* Create Service
* Get All Services
* Get Particular Service
* Update Service
* Delete Service

---

## Booking APIs

* Create Booking
* Get User Bookings
* Cancel Booking
* Get Vendor Bookings
* Confirm Booking
* Cancel Booking (Vendor)
* Slot Availability Validation

---

# 🎨 Frontend Features

## Home Page

* Responsive Hero Section
* Popular Services Section
* Modern UI

---

## Authentication Module

* ✅ Signup Page
* ✅ Login Page
* ✅ Redux User State
* ✅ localStorage Persistence
* ✅ Auto Login After Refresh
* ✅ Dynamic Header (Login/Signup ↔ Logout)

---

## Vendor Module

* ✅ Dedicated Vendor Header
* ✅ Static Vendor Dashboard UI
* ✅ Create Service Form
* ✅ Vendor Services Page
* ✅ Fetch Vendor Services using Redux
* 🚧 Dynamic Dashboard Statistics

---

## Service Module

* ✅ Service Creation
* ✅ View Vendor Services
* 🚧 Dynamic Public Services Page
* 🚧 Service Details Page
* 🚧 Booking Interface
* 🚧 Date Selection
* 🚧 Time Slot Selection

---

## State Management

* Redux Toolkit

### User Slice

* Add User
* Remove User
* Persistent Session

### Service Slice

* Add Service
* Get All Services
* Update Service
* Remove Service

### Booking Slice

* Booking Management

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router DOM
* Redux Toolkit
* Tailwind CSS
* Axios

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Nodemailer

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

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js

├── .gitignore

└── README.md
```

---

# 🗄 Database Models

## User

* name
* email
* phone
* password
* role (user/vendor)

---

## Service

* title
* description
* price
* image
* category
* vendorId
* location

---

## Booking

* userId
* vendorId
* serviceId
* serviceTitle
* price
* bookingDate
* bookingTime
* location
* status (pending, confirmed, cancelled)

---

# 🔄 Booking Flow

```text
Vendor Creates Service
          │
          ▼
   Service Database
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
      └── Cancel
          │
          ▼
 Email Notification Sent
```

---

# 🎯 Project Vision

Book My Service aims to simplify the process of discovering and booking local services while providing vendors with an easy platform to manage services and booking requests through a secure and scalable architecture.

---

# 🚀 Current Progress

* ✅ Authentication Module
* ✅ JWT Authorization
* ✅ Role-Based Access Control
* ✅ Service CRUD APIs
* ✅ Booking Module
* ✅ Vendor Booking Management
* ✅ Slot Validation Logic
* ✅ Email Notifications
* ✅ Frontend Authentication Integration
* ✅ Redux User Management
* ✅ Persistent Login (localStorage)
* ✅ Vendor Dashboard UI
* ✅ Vendor Create Service
* ✅ Vendor View Services
* 🚧 Dynamic Service Integration
* 🚧 Dynamic Dashboard Analytics
* 🚧 AI Chat Assistant

---

# 🔮 Upcoming Features

* Dynamic Services Page
* Service Details Integration
* Customer Dashboard
* Dynamic Vendor Dashboard
* Reviews & Ratings
* Search & Filters
* AI Chat Assistant
* Service Categories
* Deployment
* Responsive UI Improvements

---

## ⭐ If you found this project interesting, consider giving it a star and following its development.
