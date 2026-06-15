# 🚀 Book My Service

A Full Stack **MERN** application that connects **customers** with **local service providers** such as salons, photographers, electricians, plumbers, cleaners, and more.

Customers can discover and book services, while vendors can create, manage, and respond to booking requests through a secure **role-based platform**.

> 🚧 **Project Status:** Under Active Development

---

# ✨ Features

## 👤 Customer

* ✅ User Registration
* ✅ User Login
* ✅ JWT Authentication
* ✅ Frontend Authentication
* ✅ Persistent Login using localStorage
* ✅ Browse Dynamic Services
* ✅ View Dynamic Service Details
* ✅ Book a Service
* ✅ Prevent Duplicate Slot Booking
* ✅ Booking Stored in MongoDB
* ✅ View My Bookings (Fetched from Backend)
* ✅ Cancel Booking
* ✅ Real-time Booking Status

  * Pending
  * Confirmed
  * Cancelled
* ✅ Automatic Status Update after Vendor Action
* ✅ Booking Request Sent to Vendor
* 🚧 Reviews & Ratings
* 🚧 AI Chat Assistant

---

## 🏪 Vendor

* ✅ Vendor Registration
* ✅ Vendor Login
* ✅ Dedicated Vendor Dashboard
* ✅ Dedicated Vendor Header
* ✅ Create Service
* ✅ View Own Services
* ✅ Edit Service
* ✅ Delete Service
* ✅ Dynamic Service Management using MongoDB
* ✅ View Booking Requests
* ✅ Dedicated Pending Bookings Page
* ✅ Confirm Booking Requests
* ✅ Cancel Booking Requests
* ✅ Dynamic Booking Status Updates
* ✅ Dashboard Statistics

  * Total Bookings
  * Pending Bookings
  * Confirmed Jobs
  * Total Earnings
* 🚧 Advanced Dashboard Analytics

---

# 📧 Email Notifications

Powered by **Nodemailer**

* ✅ Vendor receives an email when a new booking request is created
* ✅ User receives an email when the booking is confirmed
* ✅ User receives an email when the booking is cancelled by the vendor

---

# 🔐 Authentication & Authorization

* ✅ JWT Authentication
* ✅ Role-Based Authorization
* ✅ Protected Routes
* ✅ Password Hashing using bcrypt
* ✅ Frontend Authentication Integration
* ✅ Persistent Login using localStorage
* ✅ Dynamic UI based on User Role

---

# ⚙️ Backend Features

## User APIs

* ✅ Register User
* ✅ Login User

---

## Service APIs

* ✅ Create Service
* ✅ Get All Services
* ✅ Get Particular Service
* ✅ Update Service
* ✅ Delete Service

Services are fetched dynamically from **MongoDB** instead of static frontend data.

---

## Booking APIs

* ✅ Create Booking
* ✅ Get User Bookings
* ✅ Cancel Booking (User)
* ✅ Get Vendor Bookings
* ✅ Confirm Booking (Vendor)
* ✅ Cancel Booking (Vendor)
* ✅ Slot Availability Validation

---

# 🎨 Frontend Features

## Home Page

* ✅ Responsive Hero Section
* ✅ Dynamic Featured Services
* ✅ Modern UI

---

## Authentication Module

* ✅ Signup Page
* ✅ Login Page
* ✅ Persistent Login
* ✅ Auto Login After Refresh
* ✅ Dynamic Header (Login/Signup ↔ Logout)

---

## Vendor Module

* ✅ Dedicated Vendor Header
* ✅ Dynamic Vendor Dashboard
* ✅ Create Service
* ✅ View Own Services
* ✅ Edit Service
* ✅ Delete Service
* ✅ Dynamic Service Fetching
* ✅ View Recent Bookings
* ✅ Dedicated Pending Bookings Management
* ✅ Confirm Booking
* ✅ Cancel Booking
* ✅ Dynamic Dashboard Statistics

---

## Service Module

* ✅ Dynamic Services Page
* ✅ Dynamic Service Cards
* ✅ Dynamic Service Detail Page
* ✅ Booking Interface
* ✅ Date Selection
* ✅ Time Slot Selection
* ✅ Backend Booking Integration
* ✅ Dynamic Booking Status
* 🚧 Reviews & Ratings

---

## My Bookings

* ✅ Fetch Bookings from Backend
* ✅ Display Booking Status
* ✅ Cancel Booking
* ✅ Automatic Status Updates after Vendor Actions

---

# 🗂 State Management

## Redux Toolkit

### User Slice

* ✅ Add User
* ✅ Remove User
* ✅ Persistent Session

### Service Slice

* ✅ Add Service
* ✅ Get All Services
* ✅ Update Service
* ✅ Remove Service

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

# 🚀 Current Progress

* ✅ JWT Authentication
* ✅ Role-Based Authorization
* ✅ Service CRUD APIs
* ✅ Dynamic MongoDB Services
* ✅ Dynamic Service Details
* ✅ Booking Module
* ✅ Backend Booking Storage
* ✅ User Booking Management
* ✅ Vendor Booking Management
* ✅ Vendor Dashboard
* ✅ Dedicated Pending Booking Management
* ✅ Booking Confirmation Flow
* ✅ Booking Cancellation Flow
* ✅ Real-time Booking Status Updates
* ✅ Slot Validation Logic
* ✅ Email Notifications
* ✅ Persistent Login

### 🚧 In Progress

* Dynamic Vendor Analytics
* Reviews & Ratings
* AI Chat Assistant

---

# 🔮 Upcoming Features

* Customer Dashboard
* Advanced Vendor Analytics
* Reviews & Ratings System
* Search & Filters
* AI Chat Assistant
* Service Categories
* Deployment
* Responsive UI Improvements

---

## ⭐ If you found this project interesting, consider giving it a star and following its development.
