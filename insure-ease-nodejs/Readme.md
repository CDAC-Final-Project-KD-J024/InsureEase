insure-ease-nodejs/
│
├── config/                     # Configuration files (DB, environment, third-party services)
│   ├── db.js                   # Database connection config
│   ├── nodemailer.js           # Nodemailer setup
│   └── env.js                  # Environment variables config
│
├── controllers/                # Route controllers (handle requests)
│   ├── authController.js       # Auth-related APIs (login, register, forgot password)
│   ├── policyController.js     # Policy-related APIs
│   ├── claimsController.js     # Claims-related APIs
│   └── ordersController.js     # Orders-related APIs
│
├── services/                   # Business logic (service layer)
│   ├── authService.js          # Auth-related logic
│   ├── policyService.js        # Policy-related logic
│   ├── claimsService.js        # Claims-related logic
│   └── ordersService.js        # Orders-related logic
│
├── repositories/               # Database interaction (SQL queries or ORM models)
│   ├── userRepository.js       # User DB interactions
│   ├── policyRepository.js     # Policy DB interactions
│   ├── claimsRepository.js     # Claims DB interactions
│   └── ordersRepository.js     # Orders DB interactions
│
├── models/                     # Sequelize models or database schemas
│   ├── User.js                 # User model
│   ├── Policy.js               # Policy model
│   ├── Claim.js                # Claim model
│   └── Order.js                # Order model
│
├── middlewares/                # Express middlewares
│   ├── authMiddleware.js       # JWT auth validation
│   ├── validationMiddleware.js # Request validation middleware
│   ├── errorMiddleware.js      # Global error handler
│   └── rateLimiter.js          # API rate limiting
│
├── routes/                     # API route definitions
│   ├── authRoutes.js           # Auth routes
│   ├── policyRoutes.js         # Policy routes
│   ├── claimsRoutes.js         # Claims routes
│   └── ordersRoutes.js         # Orders routes
│
├── utils/                      # Utility functions/helpers
│   ├── generateToken.js        # JWT token generator
│   ├── sendEmail.js            # Email sender function
│   └── logger.js               # Winston logger config
│
├── .env                        # Environment variables
├── app.js                      # Express app setup
├── server.js                   # Server entry point
└── package.json                # Node.js dependencies

## Authentication APIs (Node.js)
- **POST /api/auth/register** — Register a new user.
- **POST /api/auth/login** — User login.
- **POST /api/auth/forgot-password** — Request password reset with OTP.
- **POST /api/auth/reset-password** — Reset password with OTP.
- **GET /api/auth/me** — Get current user’s profile.
- **PUT /api/auth/update-profile** — Update user’s profile.
- **PUT /api/auth/change-password** — Change user password.

## Admin APIs (Node.js)
- **GET /api/admin/users** — Get list of all users.
- **GET /api/admin/user/:id** — Get details of a specific user.
- **PUT /api/admin/user/:id** — Update user details.
- **DELETE /api/admin/user/:id** — Delete a user.

## Policy APIs (Node.js)
- **GET /api/policies** — Get list of all policies.
- **GET /api/policies/:id** — Get details of a specific policy.
- **POST /api/policies** — Add a new policy (admin only).
- **PUT /api/policies/:id** — Update policy details (admin only).
- **DELETE /api/policies/:id** — Delete a policy (admin only).

## User Policy APIs (Node.js)
- **GET /api/user-policies** — Get policies purchased by the current user.
- **POST /api/user-policies** — Purchase a policy.
- **GET /api/user-policies/:id** — Get details of a specific purchased policy.
- **PUT /api/user-policies/:id** — Update purchased policy details (like nominee, etc.).
- **DELETE /api/user-policies/:id** — Cancel a purchased policy.

## Claims APIs (Node.js)
- **GET /api/claims** — Get claims made by the current user.
- **POST /api/claims** — File a new claim.
- **GET /api/claims/:id** — Get details of a specific claim.
- **PUT /api/claims/:id** — Update claim details.
- **DELETE /api/claims/:id** — Withdraw a claim.

## Admin Claims Management APIs (Node.js)
- **GET /api/admin/claims** — Get all claims.
- **GET /api/admin/claims/:id** — Get details of a specific claim.
- **PUT /api/admin/claims/:id/approve** — Approve a claim.
- **PUT /api/admin/claims/:id/reject** — Reject a claim.

## Orders APIs (Node.js)
- **GET /api/orders** — Get orders made by the current user.
- **POST /api/orders** — Create a new order.
- **GET /api/orders/:id** — Get details of a specific order.

## Admin Orders Management APIs (Node.js)
- **GET /api/admin/orders** — Get all orders.
- **GET /api/admin/orders/:id** — Get details of a specific order.
- **PUT /api/admin/orders/:id/status** — Update order status.

## Payment APIs (Node.js)
- **POST /api/payments/checkout** — Create a payment session (Stripe).
- **POST /api/payments/confirm** — Confirm a successful payment.

## Dashboard APIs (Node.js)
- **GET /api/dashboard/summary** — Get user dashboard data (policies, claims, orders overview).
- **GET /api/admin/dashboard/summary** — Get admin dashboard data (users, policies, claims, orders overview).

High-Level Flow of the Backend:

Request hits the route:
A client (like the frontend) sends an HTTP request to an endpoint — for example, a request to log in or create a policy.

Routes handle incoming requests:
Routes define the API endpoints and decide which controller function should handle the request.

Folder: routes
Files: authRoutes.js, claimsRoutes.js, ordersRoutes.js, policyRoutes.js, userPolicyRoutes.js
Middleware processes the request (if needed):
Middleware sits between the route and the controller — it checks if the user is authenticated, validates input, ensures rate limiting, and so on.

Folder: middlewares
Files: authMiddleware.js, adminMiddleware.js, validateRequest.js, rateLimiter.js, errorMiddleware.js, uploadMiddleware.js
Controllers handle the business logic:
Controllers take the incoming request, extract the data, and decide what needs to happen. They call the appropriate service functions and return a response.

Folder: controllers
Files: authController.js, claimsController.js, ordersController.js, policyController.js, userPolicyController.js
Services handle the actual logic and computations:
Services are where the main business logic happens — like verifying user credentials, calculating policy prices, or processing claims.

Folder: services
Files: authService.js, claimsService.js, orderService.js, policyService.js, userPolicyService.js
Repositories interact with the database:
Repositories handle all the database queries and interactions using Sequelize. They abstract away the direct DB operations from the business logic.

Folder: repositories
Files: userRepository.js, claimRepository.js, ordersRepository.js, policyRepository.js, userPolicyRepository.js
Models define the database structure:
Sequelize models map the database tables and their relationships into JavaScript objects — for users, policies, orders, claims, and user policies.

Folder: models
Files: User.js, Policy.js, Order.js, Claim.js, UserPolicy.js, associations.js
Config handles environment and third-party settings:
Centralized configuration for DB connections, environment variables, email settings, OAuth, and JWT.

Folder: config
Files: db.js, env.js, nodeMailer.js, passport.js
Example Flow (Login API):

POST /api/auth/login — hits authRoutes.js
authRoutes.js calls authController.login
authController.js calls authService.login
authService.js calls userRepository.findByEmail
userRepository.js queries the database using Sequelize
Response flows back: service → controller → route → client
Purpose of Each Folder:

routes: Defines API endpoints and maps them to controller functions.
controllers: Handles request data, calls service functions, and sends responses.
services: Contains the business logic, calculations, and decisions.
repositories: Abstracts database operations using Sequelize ORM.
models: Defines the database structure and relationships.
middlewares: Handles authentication, validation, error handling, rate limiting, etc.
config: Centralized configuration for DB, environment variables, and third-party services.
