# FoodCode Application

## Overview
FoodCode is a full-stack application designed for managing a restaurant's menu, user authentication, cart, payments, and admin functionalities. It is built using Node.js, Express.js, MongoDB, and JWT authentication. The application ensures secure transactions and a seamless user experience.

## Deploying Live

To deploy your backend server live, you can use platforms like Vercel, Heroku, AWS, Google Cloud, or Digital Ocean.

**Vercel Live Link:** [Live](https://food-code-server.vercel.app/).

## Features
- **User Authentication**: Users can register, log in, and receive JWT tokens for secure authentication.
- **Admin Role Management**: Admins can promote users, manage the menu, and view order statistics.
- **Menu Management**: Users can browse the menu, and admins can add, update, or delete menu items.
- **Cart System**: Users can add items to their cart and proceed to checkout.
- **Payments**: Integrated with Stripe for secure payment processing.
- **Review System**: Users can leave reviews on menu items.
- **Email Notifications**: Users receive payment confirmation emails via Resend API.

## Challenges & Difficulties Faced
- **Database Security**: Ensuring that database credentials remain secure and protected.
- **JWT Authentication**: Implementing token-based authentication and managing access control.
- **Role Management**: Assigning and toggling roles between users and admins efficiently.
- **Stripe Integration**: Handling payment processing and sending transaction confirmations.
- **Efficient Querying**: Optimizing MongoDB queries for performance improvements.

## Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB database setup (Cloud-based or local)
- Environment variables configured (.env file)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/kaiyumdev/FoodCode-server
   cd FoodCode-server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   DB_NAME=<your-db-name>
   DB_PASS=<your-db-password>
   PORT=5001
   ACCESS_TOKEN_SECRET=<your-secret>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   RESEND_API_KEY=<your-resend-api-key>
   ```
4. Start the server:
   ```sh
   npm start
   ```
5. The application will run on `http://localhost:5001`

## API Endpoints

### Authentication
- `POST /auth/jwt` - Generate JWT Token

### Users
- `GET /users` - Get all users (Admin only)
- `GET /users/admin/:email` - Get admin status of a user
- `POST /users` - Create a new user
- `PATCH /users/admin/:id` - Toggle user role (Admin only)
- `DELETE /users/:id` - Delete a user

### Menu
- `GET /menu` - Get all menu items
- `POST /menu` - Add a menu item (Admin only)
- `PATCH /menu/:id` - Update menu item (Admin only)
- `DELETE /menu/:id` - Remove menu item (Admin only)

### Cart
- `GET /carts` - Get user's cart
- `POST /carts` - Add item to cart
- `DELETE /carts/:id` - Remove item from cart

### Payments
- `POST /payments/create-payment-intent` - Generate Stripe payment intent
- `GET /payments/:email` - Get user's payment history
- `POST /payments` - Process a payment

### Admin
- `GET /admin/admin-stats` - Retrieve admin dashboard statistics
- `GET /admin/order-stats` - Get order statistics

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m 'Added new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
