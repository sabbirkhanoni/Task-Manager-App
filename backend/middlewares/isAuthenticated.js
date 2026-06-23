import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.token;
  
  // No token
  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token found",
      success: false,
      error: true
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalid or expired",
      success: false,
      error: true
    });
  }
};

export default isAuthenticated;
