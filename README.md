Student Registration API (Backend)
This is a backend API for a student registration system built with Node.js and Express.js. It supports user authentication using JWT (JSON Web Tokens), profile management, and file upload features using Multer middleware.

Features
Student Registration: Allows new users to register.
Student Login: Allows users to login and receive a JWT for authentication.
JWT Token Authentication: Protects routes using JWT tokens stored in cookies.
Profile Read/Update: Fetch and update the logged-in user's profile.
File Upload: Upload files (e.g., profile pictures) via multipart/form-data.
File Read: Retrieve uploaded files.
File Delete: Delete a previously uploaded file.
Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v12 or higher)
MongoDB (Local or MongoDB Atlas)
Installation
Clone the repository:

bash

git clone https://github.com/your-repo/student-registration-api.git
cd student-registration-api
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add the following environment variables:

bash
Copy code
MONGO_URI="myurlfor mongodb"
PORT=5000
JWT_SECRET="mysecretkey" 
Ensure MongoDB is running (for local MongoDB):

On macOS or Linux:



sudo service mongod start
On Windows:



net start MongoDB
Run the server:


npm start
The API will run on http://localhost:5000.

API Endpoints
Authentication Endpoints:
POST /api/users/register

Description: Registers a new student.
Body (JSON):
json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:
json

{
  "message": "User registered successfully",
  "user": { "name": "John Doe", "email": "john@example.com", "id": "1234abcd" }
}
POST /api/users/login

Description: Logs in a student and provides a JWT token in a cookie.
Body (JSON):
json

{
  "email": "john@example.com",
  "password": "password123"
}
Response:
json

{
  "message": "Logged in successfully",
  "token": "jwt-token-here"
}
Profile Management Endpoints:
GET /api/users/profile

Description: Fetches the logged-in student’s profile.
Headers: Requires JWT token in cookies.
Response:
json

{
  "id": "1234abcd",
  "name": "John Doe",
  "email": "john@example.com"
}
PUT /api/users/profile

Description: Updates the logged-in student’s profile.
Headers: Requires JWT token in cookies.
Body (JSON):
json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
Response:
json

{
  "message": "Profile updated successfully"
}
File Upload Endpoints:
POST /api/users/upload

Description: Uploads a file (e.g., profile picture).
Headers: Requires JWT token in cookies.
Form-Data:
Key: file (Type: File)
Value: Upload a file (e.g., bng.png).
Response:
json

{
  "message": "File uploaded successfully",
  "file": {
    "originalname": "bng.png",
    "filename": "1696357600814-bng.png",
    "path": "uploads/1696357600814-bng.png"
  }
}
GET /api/users/file/

Description: Retrieve a file by its filename.
Headers: Requires JWT token in cookies.
Response: Returns the file.
DELETE /api/users/file/

Description: Delete a specific uploaded file.
Headers: Requires JWT token in cookies.
Response:
json

{
  "message": "File deleted successfully"
}
Project Structure

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
