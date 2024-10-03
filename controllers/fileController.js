const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage }).single('file');

// File upload
exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ message: 'File upload failed' });
        res.status(201).json({ message: 'File uploaded', file: req.file });
    });
};

// File read
exports.readFile = (req, res) => {
    const file = path.join(__dirname, `../uploads/${req.params.filename}`);
    res.sendFile(file);
};

// File delete
exports.deleteFile = (req, res) => {
    const file = path.join(__dirname, `../uploads/${req.params.filename}`);
    fs.unlink(file, (err) => {
        if (err) return res.status(400).json({ message: 'File not found or delete failed' });
        res.json({ message: 'File deleted' });
    });
};
