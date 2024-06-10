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


# Recharge Service API Documentation

## Overview
The `PlanManagementController` provides a RESTful API for managing and retrieving information about mobile plans and data usage for users. This controller includes endpoints for retrieving prepaid and postpaid plans, fetching plan details by plan ID, obtaining data usage by user ID, and getting the current plan for a user by the user ID.

## Base URL

```
http://localhost:8100
```

## Endpoints

### 1. Get All Prepaid Plans
**URL:** `/plans/prepaid`  
**Method:** `GET`  
**Description:** Retrieves a list of all prepaid plans.  
**Response:**  
- `200 OK`: Returns a list of prepaid plans.
```json
 {
        "planId": 1,
        "planType": "PREPAID",
        "planBenefits": "Data - 2.5 GB/Day, Free Disney + Hotstar Premium OTT Subscription for 1 Year, Unlimited 5G Data & Unlimited Local STD & Roaming Calls, Free Premium subscription for Music app. | 
                         Post daily 100 SMS limit charging will be Re.1 for local/STD",
        "planCategory": "Unlimited",
        "planPrice": 3399,
        "planData": 2.5,
        "planSms": 100,
        "planValidity": 365
 }
```

### 2. Get All Postpaid Plans
**URL:** `/plans/postpaid`  
**Method:** `GET`  
**Description:** Retrieves a list of all postpaid plans.  
**Response:**  
- `200 OK`: Returns a list of postpaid plans.
```json
{
        "planId": 17,
        "planType": "POSTPAID",
        "planBenefits": "Data with Rollover 40 GB, SMS Per Day - 100, Unlimited Local/STD & Roaming Calls.",
        "planCategory": "Postpaid Plans",
        "planPrice": 349,
        "planData": 40.0,
        "planSms": 100,
        "planValidity": 30
}
```

### 3. Get Plan by ID
**URL:** `/plans/planId/{planId}`  
**Method:** `GET`  
**Description:** Retrieves the details of a plan by its ID.  
**Path Variables:**  
- `planId` (int): The ID of the plan to be retrieved.  
**Response:**  
- `200 OK`: Returns the details of the specified plan by plan ID.
```json
{
    "planId": 2,
    "planType": "PREPAID",
    "planBenefits": "Data - 2 GB/Day, Unlimited 5G Data & Unlimited Local STD & Roaming Calls, Free Amazon Prime 3 Months OTT Subscription, Free Premium subscription for Music app. | Post daily 100 SMS 
                     limit charging will be Re.1 for local/STD",
    "planCategory": "Unlimited",
    "planPrice": 2999,
    "planData": 2.0,
    "planSms": 100,
    "planValidity": 365
}
```

### 4. Get Data Usage by User ID
**URL:** `/datausage/userId/{userId}`  
**Method:** `GET`  
**Description:** Retrieves the list of data usage details for a user in 24 hrs by their user ID.  
**Path Variables:**  
- `userId` (int): The ID of the user whose data usage details are to be retrieved.  
**Response:**  
- `200 OK`: Returns the list of data usage details of the specified user.
```json
{
    "dataRemaining": 1840.0,
    "smsRemaining": 87,
    "dataUsageList": [
        {
            "dataUsageId": 25,
            "usageDate": "2024-05-28",
            "usageHour": 0,
            "dataUsageMb": 50,
            "voiceMinutes": 5,
            "smsCount": 1,
            "user": {
                "userId": 1,
                "expiryDate": "2025-06-10",
                "plan": {
                    "planId": 1,
                    "planType": "PREPAID",
                    "planBenefits": "Data - 2.5 GB/Day, Free Disney + Hotstar Premium OTT Subscription for 1 Year, Unlimited 5G Data & Unlimited Local STD & Roaming Calls, Free Premium subscription for 
                                     Music app. | Post daily 100 SMS limit charging will be Re.1 for local/STD",
                    "planCategory": "Unlimited",
                    "planPrice": 3399,
                    "planData": 2.5,
                    "planSms": 100,
                    "planValidity": 365
                }
            }
        }
    ]
}
```

### 5. Get Current Plan for User
**URL:** `/user/{userId}/currentPlan`  
**Method:** `GET`  
**Description:** Retrieves the current plan for a user by their user ID.  
**Path Variables:**  
- `userId` (int): The ID of the user whose current plan details are to be retrieved.  
**Response:**  
- `200 OK`: Returns the details of the current plan for the specified user.
```json
{
    "planId": 1,
    "planType": "PREPAID",
    "planBenefits": "Data - 2.5 GB/Day, Free Disney + Hotstar Premium OTT Subscription for 1 Year, Unlimited 5G Data & Unlimited Local STD & Roaming Calls, Free Premium subscription for Music app. | Post 
                     daily 100 SMS limit charging will be Re.1 for local/STD",
    "planCategory": "Unlimited",
    "planPrice": 3399,
    "planData": 2.5,
    "planSms": 100,
    "planValidity": 365
}
```

## Error Handling
All endpoints return appropriate HTTP status codes in case of errors:
- `404 Not Found`: When the specified resource is not found (e.g., plan or user does not exist).
- `500 Internal Server Error`: For any server-side errors.

## CORS Configuration
This controller is configured to allow cross-origin requests using `@CrossOrigin`.

## Dependencies
- `PlanService`: Service layer for handling plan-related operations.
- `DataUsageService`: Service layer for handling data usage-related operations.
