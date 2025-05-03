# 🛒 E-commerce Platform

An end-to-end e-commerce web application built with **Next.js**, **React**, **Tailwind CSS**, and **prisma**. This platform offers a seamless shopping experience with features like user authentication, product management, and a shopping cart system.

---

## 🚀 Features

- **User Authentication**: Secure login and registration using Kinde Auth.
- **Product Management**: Add, edit, and delete products with ease.
- **Shopping Cart**: Users can add products to their cart and manage quantities.
- **Responsive Design**: Optimized for all devices using Tailwind CSS and Shadcn .
- **RESTful API**: Backend built with Next.js and Prisma 

---

## 🛠 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS , Shadcn 
- **Backend**: Next.js , Uploadthing , stripe
- **Database**: prisma
- **Authentication**: Kinde Auth

---

## 🧑‍💻 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**:
   git clone https://github.com/En-mohammed-hassan/E-commerce.git
   cd E-commerce
   
Install dependencies:
npm install

Set up environment variables:
Create a .env file in the root directory and add the following:
# Kinde Authentication
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your-app.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/creation
# UploadThing (File Upload Service)
UPLOADTHING_TOKEN=your_uploadthing_token
# Database
DATABASE_URL=your_postgresql_connection_string
# Stripe Payments
STRIPE_API_KEY=your_stripe_api_key
STRIPE_SECRET_WEBHOOK=your_stripe_webhook_secret
# Admin
ADMIN_EMAIL=admin@example.com

Run the application:
npm run dev
The application will start on http://localhost:5000.

📦 Deployment
To deploy this application:
Deploy the Next.js frontend using platforms like Vercel
Ensure that environment variables are properly set on the deployment platforms.


📜 License
This project is licensed under the MIT License.
