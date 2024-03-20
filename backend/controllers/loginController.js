const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const generateAccessToken = require('../helpers/generateAccessToken');
const generateRefreshToken = require('../helpers/generateRefreshToken.js');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No user found with this email address',
      });
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Password is invalid',
      });
    }

    // Prepare user data for token generation
    const userData = user.toObject();
    delete userData.password;

    // Generate access token and refresh token
    const accessToken = generateAccessToken(userData);

    // Save the user
    // await user.save();

    res.json({
      success: true,
      message: 'User logged in successfully',
      data: {
        id: user._id,
        name: user.name,
        location: user.location,
        email: user.email,
        user_type: user.user_type,
        chatHistory:user.chatHistory,
        access_token: accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = login;
