# iTicket Clone

## 📌 Description

This is a project that allows users to explore events, book seats, make payments, and more. It includes an admin panel for managing events, users, payments, and promotions. The project integrates Google and Facebook login using Passport.js and Stripe for payments. The frontend is built with React and styled with Tailwind CSS and Material UI.

## 🔧 Tech Stack

- **Frontend**:
  - React, Axios, React-Router, Redux-Toolkit
  - CSS, Styled Components, Tailwind CSS
  - React Icons, React Toastify
  - @mui/material, @mui/x-date-pickers for UI components
  - Swiper for carousel/slider components
  - Formik and Yup for form handling and validation
  - React Leaflet for maps
  - StripeJS for payment integration
  - JWT for token-based authentication

- **Backend**:
  - Node.js, Express.js, MongoDB
  - Passport.js (Google and Facebook login integration)
  - StripeJS for payment system
  - Multer for file uploads
  - Cookie-Session and JWT for session handling and authentication
  - Mongoose for MongoDB interactions
  - Cors for enabling cross-origin requests
  - nodemailer

## 🚀 Features

- **Frontend**:
  - User Registration/Login (Google and Facebook login via Passport.js)
  - Event search, sorting, and pagination
  - Event details page with seat selection and booking functionality
  - Admin Panel:
    - Manage Events (CRUD operations)
    - Manage Users and Payments
    - Promo Codes and Gift Cards
  - Seat Booking and Payment:
    - Select seats for events
    - Stripe payment integration
  - Profile management for users
  - Favorites functionality to save preferred events
  - Responsive layout (Mobile and Desktop)

- **Backend**:
  - API for handling user authentication, event management, and payments
  - Stripe integration for handling payments
  - Multer integration for file uploads (event images, user profile images)
  - Session management using cookies and JWT tokens
  - Admin routes for managing events, users, and payments