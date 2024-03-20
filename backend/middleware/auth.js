const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  // get Bearer token
  if (token && token.startsWith('Bearer ')) {
    req.token = token.split(' ')[1];
  } else {
    req.token = null;
  }

  // check if token is provided
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided',
    });
  }

  try {
    const decoded = jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message,
    });
  }
};

module.exports = authenticate;
