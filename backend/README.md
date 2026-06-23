# Task Manager Backend API Documentation

This document provides detailed information about the Authentication and Task management endpoints available in the backend.

---

## Common Response Format

All API endpoints follow a consistent response format:

### Success Response
```json
{
  "message": "Operation successful",
  "error": false,
  "success": true,
  "data": {} // Optional: Additional data returned by the API
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": true,
  "success": false
}
```

---

## HTTP Status Codes

| Status Code | Description | Usage |
|-------------|-------------|-------|
| **200 OK** | Request successful | GET, PUT, DELETE, POST (login) |
| **201 Created** | Resource created successfully | POST (signup, create task) |
| **400 Bad Request** | Invalid request data | Validation errors, missing required fields |
| **401 Unauthorized** | Authentication required | Invalid or missing token |
| **404 Not Found** | Resource not found | Task ID does not exist |
| **500 Server Error** | Internal server error | Database errors, unexpected failures |

---

## Authentication APIs

### 1. User Signup API

#### Overview
The User Signup API allows frontend applications to register new users in the Task Manager system. This endpoint creates a new user account with encrypted password storage and validation.

---

#### Endpoint Details

##### **POST** `/api/auth/signup`

Creates a new user account in the system.

---

#### Request

##### **URL**
```
POST http://localhost:PORT/api/auth/signup
```

##### **Request Body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

##### **Body Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `name` | string | Yes | Full name of the user | Min: 3 chars, Max: 100 chars, Trimmed |
| `email` | string | Yes | Email address of the user | Must be valid email format, Unique, Lowercase, Trimmed |
| `password` | string | Yes | User password | Required |

##### **Example Request**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

#### Response

##### **Success Response (201 Created)**
```json
{
  "message": "Registration successfully",
  "error": false,
  "success": true
}
```
##### **Error Response (500 Internal Server Error)**
```json
{
  "message": "Registration failed",
  "error": false,
  "success": false
}
```

---

### 2. User Login API

#### Overview
The User Login API allows users to authenticate themselves. Upon successful login, it returns a JWT token for accessing protected routes.

---

#### Endpoint Details

##### **POST** `/api/auth/login`

Authenticates a user and returns a token.

---

#### Request

##### **URL**
```
POST http://localhost:PORT/api/auth/login
```

##### **Request Body**
```json
{
  "email": "string",
  "password": "string"
}
```

##### **Body Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `email` | string | Yes | Email address of the user | Must be valid email format |
| `password` | string | Yes | User password | Required |

##### **Example Request**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

#### Response

##### **Success Response (200 OK)**
```json
{
  "message": "Login successfully",
  "error": false,
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
##### **Error Response (500 Internal Server Error)**
```json
{
  "message": "Login failed",
  "error": true,
  "success": false
}
```

---

## Task APIs

*Note: All task endpoints require the user to be authenticated via the `isAuthenticated` middleware.*

### 1. Create Task API

#### Overview
Allows authenticated users to create a new task.

---

#### Endpoint Details

##### **POST** `/api/tasks/`

Creates a new task.

---

#### Request

##### **URL**
```
POST http://localhost:PORT/api/tasks/
```

##### **Headers**
- `Authorization` or cookie based on `isAuthenticated` implementation.

##### **Request Body**
```json
{
  "title": "string",
  "description": "string",
  "status": "string"
}
```

##### **Body Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `title` | string | Yes | The title of the task | Trimmed |
| `description` | string | No | The details of the task | Default: "" |
| `status` | string | Yes | Current status of the task | Enum: "To Do", "In Progress", "Done". Default: "To Do" |

##### **Example Request**
```bash
curl -X POST http://localhost:5000/api/tasks/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Complete Project Proposal",
    "description": "Write and submit the project proposal document.",
    "status": "To Do"
  }'
```

---

#### Response

##### **Success Response (201 Created)**
```json
{
  "message": "Task created successfully",
  "error": false,
  "success": true
}
```
##### **Error Response (400 Bad Request)**
```json
{
  "message": "Title and status are required",
  "error": true,
  "success": false
}
```

---

### 2. Get All Tasks API

#### Overview
Retrieves a list of all tasks for the authenticated user.

---

#### Endpoint Details

##### **GET** `/api/tasks/`

Fetches all tasks.

---

#### Request

##### **URL**
```
GET http://localhost:PORT/api/tasks/
```

##### **Headers**
- `Authorization` or cookie based on `isAuthenticated` implementation.

##### **Example Request**
```bash
curl -X GET http://localhost:5000/api/tasks/ \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

#### Response

##### **Success Response (200 OK)**
```json
{
  "message": "Tasks retrieved successfully",
  "error": false,
  "success": true,
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Complete Project Proposal",
      "description": "Write and submit the project proposal document.",
      "status": "To Do",
      "createdAt": "2023-10-25T10:00:00.000Z",
      "updatedAt": "2023-10-25T10:00:00.000Z"
    }
  ]
}
```
##### **Error Response (400 Bad Request)**
```json
{
  "message": "Failed to retrieve tasks",
  "error": true,
  "success": false
}
```

---

### 3. Update Task API

#### Overview
Updates an existing task by its ID.

---

#### Endpoint Details

##### **PUT** `/api/tasks/:id`

Modifies a task's title, description, or status.

---

#### Request

##### **URL**
```
PUT http://localhost:PORT/api/tasks/:id
```

##### **Headers**
- `Authorization` or cookie based on `isAuthenticated` implementation.

##### **URL Parameters**
- `id`: The unique identifier of the task.

##### **Request Body**
```json
{
  "title": "string",
  "description": "string",
  "status": "string"
}
```

##### **Body Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `title` | string | Yes | The title of the task | Trimmed |
| `description` | string | No | The details of the task | - |
| `status` | string | Yes | Current status of the task | Enum: "To Do", "In Progress", "Done" |

##### **Example Request**
```bash
curl -X PUT http://localhost:5000/api/tasks/60d21b4667d0d8992e610c85 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "In Progress"
  }'
```

---

#### Response

##### **Success Response (200 OK)**
```json
{
  "message": "Task updated successfully",
  "error": false,
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "In Progress",
    "createdAt": "2023-10-25T10:00:00.000Z",
    "updatedAt": "2023-10-25T11:00:00.000Z"
  }
}
```
##### **Error Response (404 Not Found)**
```json
{
  "message": "Task update failed",
  "error": true,
  "success": false
}
```

---

### 4. Delete Task API

#### Overview
Deletes an existing task by its ID.

---

#### Endpoint Details

##### **DELETE** `/api/tasks/:id`

Removes a task from the system.

---

#### Request

##### **URL**
```
DELETE http://localhost:PORT/api/tasks/:id
```

##### **Headers**
- `Authorization` or cookie based on `isAuthenticated` implementation.

##### **URL Parameters**
- `id`: The unique identifier of the task.

##### **Example Request**
```bash
curl -X DELETE http://localhost:5000/api/tasks/60d21b4667d0d8992e610c85 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

#### Response

##### **Success Response (200 OK)**
```json
{
  "message": "Task deleted successfully",
  "error": false,
  "success": true
}
```
##### **Error Response (400 Bad Request)**
```json
{
  "message": "Task ID is required",
  "error": true,
  "success": false
}
```

---

### 5. Search & Filter Tasks API

#### Overview
Searches and filters tasks based on query parameters.

---

#### Endpoint Details

##### **GET** `/api/tasks/search`

Retrieves a filtered list of tasks.

---

#### Request

##### **URL**
```
GET http://localhost:PORT/api/tasks/search?search=string&status=string
```

##### **Headers**
- `Authorization` or cookie based on `isAuthenticated` implementation.

##### **Query Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `search` | string | No | Search string to filter tasks | - |
| `status` | string | No | Filter by status | "To Do", "In Progress", "Done" |

##### **Example Request**
```bash
curl -X GET "http://localhost:5000/api/tasks/search?search=Project&status=In%20Progress" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

#### Response

##### **Success Response (200 OK)**
```json
{
  "message": "Tasks retrieved successfully",
  "error": false,
  "success": true,
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Complete Project Proposal",
      "description": "Write and submit the project proposal document.",
      "status": "In Progress",
      "createdAt": "2023-10-25T10:00:00.000Z",
      "updatedAt": "2023-10-25T10:00:00.000Z"
    }
  ]
}
```
##### **Error Response (400 Bad Request)**
```json
{
  "message": "Failed to retrieve tasks",
  "error": true,
  "success": false
}
```

---

## Testing All APIs with Postman

### Collection Setup
1. Create a new Postman Collection: "Task Manager API"
2. Add Base URL: `http://localhost:5000` (or your defined PORT)

### Test Cases

#### 1. Signup
- **Method:** POST
- **URL:** `{{base_url}}/api/auth/signup`
- **Body (raw JSON):** 
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test12345"
}
```

#### 2. Login
- **Method:** POST
- **URL:** `{{base_url}}/api/auth/login`
- **Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "password": "Test12345"
}
```
*(After logging in, copy the `token` from the response to use in the Authorization header for Task APIs)*

#### 3. Create Task
- **Method:** POST
- **URL:** `{{base_url}}/api/tasks/`
- **Headers:** `Authorization: Bearer <your_token>`
- **Body (raw JSON):**
```json
{
  "title": "My First Task",
  "description": "Details about my first task.",
  "status": "To Do"
}
```

#### 4. Get All Tasks
- **Method:** GET
- **URL:** `{{base_url}}/api/tasks/`
- **Headers:** `Authorization: Bearer <your_token>`

#### 5. Update Task
- **Method:** PUT
- **URL:** `{{base_url}}/api/tasks/<task_id>`
- **Headers:** `Authorization: Bearer <your_token>`
- **Body (raw JSON):**
```json
{
  "title": "Updated Task Name",
  "description": "Updated details.",
  "status": "In Progress"
}
```

#### 6. Delete Task
- **Method:** DELETE
- **URL:** `{{base_url}}/api/tasks/<task_id>`
- **Headers:** `Authorization: Bearer <your_token>`

#### 7. Search & Filter Tasks
- **Method:** GET
- **URL:** `{{base_url}}/api/tasks/search?search=First&status=To Do`
- **Headers:** `Authorization: Bearer <your_token>`
