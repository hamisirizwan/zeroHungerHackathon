const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { name, email, password, location,user_type  } = req.body;

    if (!name || !email || !password || !location || !user_type) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all fields',
      });
    }

    const validDonorTypes = ["donor", "recipient"]

    if(!validDonorTypes.includes(user_type)){
      console.log(user_type)
      return res.status(400).json({
        success: false,
        message: 'Invalid recipient type',
      });
    }
    // find user
    const existingUser = await User.findOne({ email });

    // check if user exists
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = new User({
      name,
      location,
      email,
      user_type,
      password: hashedPassword,
    });

    // save the user
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        location: user.location,
        email: user.email,
        user_type: user.user_type,
      },
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

module.exports = signup;
