require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require("cors")
const app = express();

// Connect to the database
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());

// Routes
const chatRoute = require('./routes/chatRoute');
const authRoute = require('./routes/authRoutes');
const donationRoute = require('./routes/donationRoutes');
app.use('/api/chat', chatRoute);
app.use('/api/auth', authRoute);
app.use('/api/donations', donationRoute);

// Error handling middleware
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
