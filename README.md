# E-commerce
This documentation explains how to set up, run, and work with the E-Commerce project available at GitHub Repository.

Getting Started

Prerequisites

Ensure the following are installed on your system:

Node.js (runtime for JavaScript)

npm or yarn (package manager)

MongoDB (database)

1. Clone the Repository

To get a local copy, run:

git clone https://github.com/En-mohammed-hassan/E-commerce.git
cd E-commerce

2. Install Dependencies

Run the following command in the project directory to install required packages:

npm install

3. Set Up Environment Variables

Create a .env file in the root directory and configure the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Replace placeholders with actual values for MongoDB and JWT secret.

4. Start the Application

Backend

To start the backend server:

npm run server

Frontend

In a separate terminal, start the frontend:

npm run client

By default, the backend runs on http://localhost:5000 and the frontend on http://localhost:3000.
