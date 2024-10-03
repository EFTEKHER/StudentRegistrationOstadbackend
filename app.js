require('dotenv').config();  // Load .env file

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'));

// Connect to MongoDB using environment variable for the connection string
mongoose.connect(process.env.MONGO_URI, {
   
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => console.log(error));
app.get('/', (req, res) => {
    res.send('studentRegistration is running....');
});
// Use routes
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
