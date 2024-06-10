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

