const express = require('express');
const { registerUser, loginUser, authMiddleware, getUserProfile, updateUserProfile } = require('../controllers/userController');
const { uploadFile, readFile, deleteFile } = require('../controllers/FileController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

// File upload, read, delete routes
router.post('/upload', authMiddleware, uploadFile);
router.get('/file/:filename', readFile);
router.delete('/file/:filename', authMiddleware, deleteFile);

module.exports = router;
