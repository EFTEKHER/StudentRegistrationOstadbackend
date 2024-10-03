# **Student Registration API (Backend)**

This is a backend API for a student registration system built with **Node.js** and **Express.js**. It supports user authentication using **JWT (JSON Web Tokens)**, profile management, and file upload functionality using **Multer** middleware.

---

## **Features**

- **Student Registration**: Allows new users to register.
- **Student Login**: Allows users to login and receive a JWT for authentication.
- **JWT Token Authentication**: Protects routes using JWT tokens stored in cookies.
- **Profile Read/Update**: Fetch and update the logged-in user's profile.
- **File Upload**: Upload files (e.g., profile pictures) via multipart/form-data.
- **File Read**: Retrieve uploaded files.
- **File Delete**: Delete a previously uploaded file.

---

## **Getting Started**

### **Prerequisites**
Ensure you have the following installed:

- **Node.js** (v12 or higher)
- **MongoDB** (Local or MongoDB Atlas)

### **Installation**

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/student-registration-api.git
    cd student-registration-api
    ```

2. **Initialize the project**:
    ```bash
    npm init -y
    ```

3. **Install dependencies**:
    ```bash
    npm install express mongoose dotenv jsonwebtoken cookie-parser multer
    ```

4. **Create a `.env` file** in the root directory and add the following environment variables:
    ```bash
    MONGO_URI="mongodb://localhost:27017/studentRegistration"  # Replace with your MongoDB URI
    PORT=5000
    JWT_SECRET="your_jwt_secret_key"  # Replace with your JWT secret key
    ```

5. **Ensure MongoDB is running**:
    - On **macOS** or **Linux**:
      ```bash
      sudo service mongod start
      ```
    - On **Windows**:
      ```bash
      net start MongoDB
      ```

6. **Run the server**:
    ```bash
    npm start
    ```

   The API will be running on `http://localhost:5000`.

---

## **API Endpoints**

### **Authentication Endpoints**

#### **POST /api/users/register**
- **Description**: Registers a new student.
- **Body (JSON)**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
- **Response (JSON)**:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "name": "John Doe",
        "email": "john@example.com",
        "id": "1234abcd"
      }
    }
    ```

#### **POST /api/users/login**
- **Description**: Logs in a student and provides a JWT token in a cookie.
- **Body (JSON)**:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
- **Response (JSON)**:
    ```json
    {
      "message": "Logged in successfully",
      "token": "jwt-token-here"
    }
    ```

---

### **Profile Management Endpoints**

#### **GET /api/users/profile**
- **Description**: Fetches the logged-in student’s profile.
- **Headers**: Requires JWT token in cookies.
- **Response (JSON)**:
    ```json
    {
      "id": "1234abcd",
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```

#### **PUT /api/users/profile**
- **Description**: Updates the logged-in student’s profile.
- **Headers**: Requires JWT token in cookies.
- **Body (JSON)**:
    ```json
    {
      "name": "John Updated",
      "email": "john.updated@example.com"
    }
    ```
- **Response (JSON)**:
    ```json
    {
      "message": "Profile updated successfully"
    }
    ```

---

### **File Upload Endpoints**

#### **POST /api/users/upload**
- **Description**: Uploads a file (e.g., profile picture).
- **Headers**: Requires JWT token in cookies.
- **Form-Data**:
  - **Key**: `file` (Type: File)
  - **Value**: Upload a file (e.g., `bng.png`).
- **Response (JSON)**:
    ```json
    {
      "message": "File uploaded successfully",
      "file": {
        "originalname": "bng.png",
        "filename": "1696357600814-bng.png",
        "path": "uploads/1696357600814-bng.png"
      }
    }
    ```

#### **GET /api/users/file/:filename**
- **Description**: Retrieve a file by its filename.
- **Headers**: Requires JWT token in cookies.
- **Response**: Returns the file.

#### **DELETE /api/users/file/:filename**
- **Description**: Delete a specific uploaded file.
- **Headers**: Requires JWT token in cookies.
- **Response (JSON)**:
    ```json
    {
      "message": "File deleted successfully"
    }
    ```

---

## **Project Structure**




student-registration-api/
│
├── controllers/
│   ├── userController.js        # Handles user authentication and profile
│   ├── fileController.js        # Handles file uploads, reading, and deleting
│

├── routes/
│   └── userRoutes.js            # API routes for users and file operations
│
├── uploads/                     # Directory to store uploaded files
│
├── .env                         # Environment variables
├── app.js                       # Main application entry point
├── package.json                 # Project metadata and dependencies
└── README.md                    # Project documentation


---

## **Dependencies**

- **Express.js**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js.
- **jsonwebtoken**: For generating and verifying JWT tokens.
- **Multer**: Middleware for handling file uploads.
- **dotenv**: Loads environment variables from `.env` file.
- **cookie-parser**: For parsing cookies.

---

## **Running Tests**

You can use **Postman** or any other API client to test the endpoints. Ensure that:
- You send the JWT token in cookies for protected routes.
- You use `multipart/form-data` for file uploads.

---

## **License**

This project is licensed under **https://eftekheralieftecom.vercel.app**.

---

