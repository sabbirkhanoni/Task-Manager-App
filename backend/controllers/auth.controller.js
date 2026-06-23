import { signUpService, loginService } from "../services/auth.service.js";
import generateJWTtoken from "../utils/generateJWTtoken.js";

export const signUpController = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Name, email and password are required",
        error: true,
        success: false,
      });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({
        message: "Invalid email format",
        error: true,
        success: false,
      });
    }

    const passwordRegexNumberCriteria = /^.{5,26}$/;
    if (!passwordRegexNumberCriteria.test(password)) {
      return response.status(400).json({
        message: "Password must be minimum 5 characters long",
        error: true,
        success: false,
      });
    }

    // call the service function to handle database operations
    await signUpService(request.body);

    return response.status(201).json({
      message: "Registration successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Registration failed",
      error: false,
      success: false,
    });
  }
};

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "Email and password are required",
        error: true,
        success: false,
      });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({
        message: "Invalid email format",
        error: true,
        success: false,
      });
    }

    const passwordRegexNumberCriteria = /^.{5,26}$/;
    if (!passwordRegexNumberCriteria.test(password)) {
      return response.status(400).json({
        message: "Password must be minimum 5 characters long",
        error: true,
        success: false,
      });
    }

    // Call the service function to handle database operations
    const user = await loginService({ email, password });

    // Generate JWT token
    const token = generateJWTtoken(user.user._id);

    return response.status(200).json({
      message: "Login successfully",
      error: false,
      success: true,
      token,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Login failed",
      error: true,
      success: false,
    });
  }
};

export const getMeController = async (request, response) => {
  try {
    const userId = request.userId; // from the isAuthenticated middleware
    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized, Please login to access this resource",
        error: true,
        success: false,
      });
    }

    // Call the service function to get user data from the database
    const user = await getMeService(userId);

    return response.status(200).json({
      message: "User data retrieved successfully",
      error: false,
      success: true,
      user: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Failed to authenticate user",
      error: true,
      success: false,
    });
  }
};
