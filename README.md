# FoodCode Server

## Project Description
FoodCode Server is a RESTful API designed for managing a restaurant's menu and user authentication. It provides functionalities for user management, menu item management, and admin features.

## Features
- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **User Management**: Create, delete, and update user roles (admin/user).
- **Menu Management**: Perform CRUD operations on menu items.
- **Admin Functionalities**: Admin users can manage other users and their roles.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bistro-boss-server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bistro-boss-server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file in the root directory and adding the necessary configurations.
5. Run the server:
   ```bash
   npm run dev
   ```

## Difficulty Level
This project is suitable for intermediate developers familiar with Node.js, Express, and MongoDB.

## Change Log
- Initial project setup.
- Implemented user authentication and management features.
- Added menu management functionalities.
