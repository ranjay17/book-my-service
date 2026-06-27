🚀 Book My Service

A Full Stack MERN Stack platform that connects customers with trusted local service providers such as plumbers, electricians, photographers, cleaners, salon professionals, and more.

Customers can discover services, book appointments, leave reviews, and manage bookings, while vendors can create services, manage bookings, and track their business through a dedicated dashboard.

✨ Features
👤 Customer Features
✅ User Registration & Login
✅ JWT Authentication
✅ Persistent Login using localStorage
✅ Browse All Available Services
✅ Search Services
✅ View Service Details
✅ View Vendor Information
✅ Book Services with Date & Time Slot
✅ Duplicate Slot Booking Prevention
✅ Booking Status Tracking
✅ Cancel Bookings
✅ View Booking History
✅ Add Reviews & Ratings
✅ View Customer Reviews
✅ Dynamic Rating Calculation
📌 Booking Status
Pending
Confirmed
Completed
Cancelled
🏪 Vendor Features
✅ Vendor Registration & Login
✅ Dedicated Vendor Dashboard
✅ Create / Edit / Delete Services
✅ Manage Booking Requests
✅ Accept / Reject Bookings
✅ Mark Bookings as Completed
✅ View Customer Reviews
✅ Dashboard Analytics
📊 Dashboard Analytics
Total Bookings
Pending Bookings
Completed Jobs
Total Earnings
⭐ Reviews & Ratings System
✅ Customers can submit reviews after service completion
✅ Ratings stored in MongoDB
✅ Dynamic average rating calculation
✅ Reviews shown on service pages
✅ Vendors can view feedback
📧 Email Notifications System

Email notifications are integrated using SendGrid (production-ready email service).

Twilio SendGrid

Vendor receives email when:
New booking request is created
Customer cancels booking
User receives email when:
Vendor confirms booking
Vendor cancels booking
🔐 Authentication & Authorization
JWT Authentication
Role-Based Access Control (User / Vendor)
Protected Routes
Password Hashing (bcrypt)
Persistent Sessions
⚙️ Backend Features
User APIs
Register User
Login User
Service APIs
Create Service
Get All Services
Get Service by ID
Update Service
Delete Service
Booking APIs
Create Booking
Get User Bookings
Cancel Booking (User)
Get Vendor Bookings
Confirm Booking (Vendor)
Cancel Booking (Vendor)
Complete Booking
Slot Availability Validation
Review APIs
Add Review
Get Service Reviews
Get Ratings
🎨 Frontend Features
Home Page
Responsive Hero Section
Featured Services
Dynamic Ratings Display
Authentication
Signup / Login / Logout
Protected Routes
Persistent Session
Services
Service Listing
Service Details Page
Booking Interface
Reviews Display
Vendor Dashboard
Service Management
Booking Management
Analytics Dashboard
My Bookings
Booking History
Status Tracking
Cancel Booking
Add Reviews
🗂 State Management

Using Redux Toolkit

User Slice (Auth management)
Service Slice (Services data)
Booking State Handling
🛠 Tech Stack
Frontend
React.js
Redux Toolkit
React Router
Tailwind CSS
Axios
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
SendGrid (Email Service)
🚀 Current Status
✅ Completed Features
Authentication system
Role-based authorization
Service CRUD
Booking system
Vendor dashboard
Reviews & ratings
Email notification system
Slot validation
Dashboard analytics
📌 Note

This project uses a production-ready email delivery system (SendGrid) instead of traditional SMTP to ensure better scalability and reliability.

⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.