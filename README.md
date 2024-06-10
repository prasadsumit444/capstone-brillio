# Getting Started 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# User Service API Documentation

## Overview

The User Service API provides endpoints to manage user information, including signup, login, password management, settings, and user status. The API supports various CRUD operations on user data and ensures secure access through password and security question verification.

## Base URL

```
http://localhost:8101/user
```

## Endpoints

### Signup

#### `POST /signup`

Creates a new user account.

**Request Body:**
```json
{
  "mobileNumber": "string",
  "email": "string",
  "password": "string",
  "securityQuestion": "string",
  "securityAnswer": "string",
  "promotionalEmailNotification": "string",
  "theme": "string",
  "userStatus": "string"
}
```

**Response:**
- `200 OK`: User ID
- `404 NOT FOUND`: User creation failed

---

### Login

#### `GET /login`

Authenticates a user based on mobile number and password.

**Query Parameters:**
- `mobileNumber` (String): The user's mobile number.
- `password` (String): The user's password.

**Response:**
- `200 OK`: User ID
- `404 NOT FOUND`: Invalid credentials

---

### Change Password

#### `PATCH /{userId}/changePassword`

Changes the user's password.

**Path Parameters:**
- `userId` (Integer): The ID of the user.

**Query Parameters:**
- `newPassword` (String): The new password.

**Response:**
- `200 OK`: Password change confirmation
- `404 NOT FOUND`: Password change failed

---

### Check Password

#### `GET /{userId}/checkPassword`

Checks if the provided password matches the user's current password.

**Path Parameters:**
- `userId` (Integer): The ID of the user.

**Query Parameters:**
- `password` (String): The password to check.

**Response:**
- `200 OK`: Password check confirmation
- `404 NOT FOUND`: Password check failed

---

### Verify User

#### `GET /verifyUser`

Verifies a user based on mobile number, security question, and security answer.

**Query Parameters:**
- `mobileNumber` (String): The user's mobile number.
- `securityQuestion` (Enum): The security question.
- `securityAnswer` (String): The security answer.

**Response:**
- `200 OK`: Verified user ID
- `404 NOT FOUND`: Verification failed

---

### Save Setting

#### `PATCH /{userId}/saveSetting`

Saves user settings such as notification status and theme.

**Path Parameters:**
- `userId` (Integer): The ID of the user.

**Query Parameters:**
- `status` (Enum): Notification status.
- `theme` (Enum): Theme preference.

**Response:**
- `200 OK`: Settings saved confirmation
- `404 NOT FOUND`: Settings save failed

---

### Delete User

#### `DELETE /{userId}/deleteUser`

Deletes a user account.

**Path Parameters:**
- `userId` (Integer): The ID of the user.

**Response:**
- `200 OK`: User deletion confirmation
- `404 NOT FOUND`: User deletion failed

---

### Get User

#### `GET /{userId}/getUser`

Fetches user information based on user ID.

**Path Parameters:**
- `userId` (Integer): The ID of the user.

**Response:**
- `200 OK`: User information
- `404 NOT FOUND`: User not found

---

### Suspend Service

#### `PATCH /{userId}/suspendService`

Suspends or reactivates a user account.

**Path Parameters:**
- `userId` (Integer): The ID of the user.

**Query Parameters:**
- `userStatus` (Enum): The new user status.

**Response:**
- `200 OK`: Service suspension confirmation
- `404 NOT FOUND`: Service suspension failed

---

# Account Information Service API Documentation

## Overview
The Account Information Service API provides endpoints to manage and retrieve user account information. This includes retrieving dashboard and personal information, as well as updating user profile details. The API is designed to be accessed by a frontend application hosted at `http://localhost:3000/`.

## Base URL
```
http://localhost:8104/account
```

## Endpoints

### 1. Get Dashboard Information
**Endpoint:** `GET /dashboard/{userId}/dashboardInfo`

**Description:** Retrieves the dashboard information for a given user.

**Path Parameters:**
- `userId` (Integer): The ID of the user whose dashboard information is being retrieved.

**Response:**
- `200 OK`: Returns the dashboard information of the user.
- `Body`: A `DashboardInformation` object containing the user's dashboard data.

**Example Request:**
```
GET /account/dashboard/123/dashboardInfo
```

**Example Response:**
```json
{
    "userId": 123,
    "totalSpent": 5000,
    "totalEarned": 7000,
    "transactions": [
        // list of transactions
    ]
}
```

### 2. Get User Profile
**Endpoint:** `GET /profile/{userId}/userProfile`

**Description:** Retrieves the personal information for a given user.

**Path Parameters:**
- `userId` (Integer): The ID of the user whose personal information is being retrieved.

**Response:**
- `200 OK`: Returns the personal information of the user.
- `Body`: A `PersonalInformation` object containing the user's profile data.

**Example Request:**
```
GET /account/profile/123/userProfile
```

**Example Response:**
```json
{
    "userId": 123,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "address": "123 Main St",
    "mobileNumber": "1234567890",
    "altMobileNumber": "0987654321"
}
```

### 3. Update User Profile
**Endpoint:** `PATCH /profile/{userId}/updateProfile`

**Description:** Updates the personal information for a given user.

**Path Parameters:**
- `userId` (Integer): The ID of the user whose personal information is being updated.

**Request Parameters:**
- `address` (String): The new address of the user.
- `altMobileNumber` (String): The new alternate mobile number of the user.

**Response:**
- `200 OK`: Returns the updated personal information of the user.
- `Body`: A `UserInformation` object containing the updated profile data.

**Example Request:**
```
PATCH /account/profile/123/updateProfile?address=456 Elm St&altMobileNumber=1122334455
```

**Example Response:**
```json
{
    "userId": 123,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "address": "456 Elm St",
    "mobileNumber": "1234567890",
    "altMobileNumber": "1122334455"
}
```
