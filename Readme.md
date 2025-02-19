# InsureEase Backend API Documentation

## Overview
This document outlines the API endpoints and their responsibilities across the three backend technologies used for InsureEase:

- **Node.js** (Authentication, Payments, API Gateway)
- **Spring Boot (Java)** (Policy, User Policies, Claims)
- **MS .NET** (Orders Management, CRUD Operations for Orders)

Each service will handle its respective domain while ensuring seamless integration via APIs.

---

## **1. Node.js (Authentication & Payments)**

### **Authentication APIs**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user and return JWT |
| POST | `/api/auth/google-login` | Login using Google OAuth |
| POST | `/api/auth/github-login` | Login using GitHub OAuth |
| POST | `/api/auth/forgot-password` | Send OTP for password reset |
| POST | `/api/auth/reset-password` | Reset password using OTP |
| GET | `/api/auth/profile` | Fetch logged-in user profile |
| PUT | `/api/auth/profile/update` | Update user profile |

### **Payment APIs (Stripe Integration)**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/payment/checkout` | Process insurance policy payment |
| GET | `/api/payment/status/:id` | Retrieve payment status |

### **API Gateway (Proxy to Other Backends)**
| Method | Endpoint | Description |
|--------|---------|-------------|
| ANY | `/api/*` | Route requests to appropriate backend |

---

## **2. Spring Boot (Policy, User Policies & Claims Management)**

### **Policy APIs**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/policies` | Fetch all insurance policies |
| GET | `/api/policies/:id` | Fetch policy details by ID |
| POST | `/api/policies` | Create a new policy (Admin Only) |
| PUT | `/api/policies/:id` | Update a policy (Admin Only) |
| DELETE | `/api/policies/:id` | Delete a policy (Admin Only) |

### **User Policies APIs**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/user-policies` | Fetch all policies owned by a user |
| GET | `/api/user-policies/:id` | Fetch specific user policy |
| POST | `/api/user-policies` | Purchase a new policy |
| DELETE | `/api/user-policies/:id` | Cancel a purchased policy |

### **Claims APIs**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/claims` | Fetch all claims of a user |
| GET | `/api/claims/:id` | Fetch claim details by ID |
| POST | `/api/claims` | Submit a new insurance claim |
| PUT | `/api/claims/:id` | Update claim status (Admin Only) |
| DELETE | `/api/claims/:id` | Delete a claim (Admin Only) |

---

## **3. MS .NET (Orders Management)**

### **Orders APIs**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/orders` | Fetch all orders |
| GET | `/api/orders/:id` | Fetch order details by ID |
| POST | `/api/orders` | Create a new order |
| PUT | `/api/orders/:id` | Update order details |
| DELETE | `/api/orders/:id` | Cancel an order |

---

## **Technology Distribution Summary**

| Service | Technology |
|---------|------------|
| Authentication | Node.js (Passport.js, JWT) |
| Payments | Node.js (Stripe API) |
| API Gateway | Node.js (Express.js Middleware) |
| Policy Management | Spring Boot (Java) |
| User Policies | Spring Boot (Java) |
| Claims Management | Spring Boot (Java) |
| Orders Management | MS .NET (C#) |
| CRUD APIs (Orders) | MS .NET (C#) |

---

## **Next Steps**
1. **Set Up Individual Backend Projects**:
   - Create `insureease-auth-service` (Node.js) for authentication & payments.
   - Create `insureease-policy-service` (Spring Boot) for policies, user policies, and claims.
   - Create `insureease-order-service` (MS .NET) for order management.

2. **Develop API Endpoints Step-by-Step**:
   - Implement authentication APIs in Node.js.
   - Implement policy and claims APIs in Spring Boot.
   - Implement order management APIs in MS .NET.

3. **Integrate with Frontend & Test APIs**:
   - Ensure Redux slices align with backend APIs.
   - Perform end-to-end testing using Postman.
   - Deploy services and integrate API Gateway.

---
# 📌 InsureEase Database Schema & Backend Models

## 1⃣ Database Overview
We are using **MySQL** as the database. The schema consists of multiple tables, each responsible for different aspects of the insurance platform.

---

## 2⃣ Tables & Schema

### **Users Table**
Stores user information and login credentials.

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE,
    gender ENUM('Male', 'Female', 'Other'),
    phone VARCHAR(15),
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(10),
    profile_picture VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Policies Table**
Stores details of different insurance policies.

```sql
CREATE TABLE policies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    premium DECIMAL(10,2) NOT NULL,
    coverage TEXT NOT NULL,
    benefits TEXT,
    terms TEXT,
    duration VARCHAR(50),
    provider VARCHAR(100),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **User Policies Table**
Tracks which users have purchased which policies.

```sql
CREATE TABLE user_policies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    policy_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('Active', 'Expired', 'Cancelled') DEFAULT 'Active',
    payment_status ENUM('Paid', 'Pending') DEFAULT 'Paid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (policy_id) REFERENCES policies(id) ON DELETE CASCADE
);
```

### **Claims Table**
Stores insurance claims submitted by users.

```sql
CREATE TABLE claims (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    policy_id INT NOT NULL,
    claim_amount DECIMAL(10,2) NOT NULL,
    claim_reason TEXT NOT NULL,
    claim_status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    filed_date DATE NOT NULL,
    processed_date DATE NULL,
    approved_amount DECIMAL(10,2) NULL,
    insurer_remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (policy_id) REFERENCES policies(id) ON DELETE CASCADE
);
```

### **Orders Table**
Tracks policy purchases and payments.

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    policy_id INT NOT NULL,
    policy_name VARCHAR(255) NOT NULL,
    premium_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('Completed', 'Pending') DEFAULT 'Pending',
    purchase_date DATE NOT NULL,
    renewal_date DATE NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (policy_id) REFERENCES policies(id) ON DELETE CASCADE
);
```

### **Admins Table**
Stores admin users and their permissions.

```sql
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    permissions TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 3⃣ Backend Models & Responsibilities

### **📌 Node.js (Authentication & Payments)**
- **Users Model:** Define user authentication models.
- **Payment Model:** Store transaction details.
- **Middleware:** Handle authentication (JWT, OAuth).
- **Stripe Integration:** Process payments.

### **📌 Spring Boot (Policies, User Policies, Claims)**
- **Entities:** `Policy`, `UserPolicy`, `Claim`
- **Service Layer:** Handle business logic.
- **JPA Repository:** Data persistence.
- **Controller Layer:** Expose REST APIs.

### **📌 MS .NET (Orders Management)**
- **Entity Models:** Define `Order` class.
- **Repository Layer:** CRUD operations.
- **Service Layer:** Business logic.
- **API Controller:** Expose order APIs.

---

## 4⃣ Next Steps

### **Set Up Backend Projects:**
- `insureease-auth-service` (Node.js)
- `insureease-policy-service` (Spring Boot)
- `insureease-order-service` (MS .NET)

### **Create Models & Entities**
- Define **models** in **Node.js**.
- Define **entities** in **Spring Boot**.
- Define **classes** in **MS .NET**.

### **Start with Node.js Authentication Service**
- Install **Express.js, JWT, Passport.js**.
- Set up `auth.routes.js`, `user.model.js`.
- Implement **login, register, forgot password**.

---

