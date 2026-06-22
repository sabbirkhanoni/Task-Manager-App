import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  let token;

  // Check header
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  // No token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token found"
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
      success: false,
      message: "Token invalid or expired"
    });
  }
};

export default isAuthenticated;
