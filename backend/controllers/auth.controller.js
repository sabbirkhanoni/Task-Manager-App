import { signUpService, loginService } from "../services/auth.service.js";
import generateJWTtoken from "../utils/generateJWTtoken.js";

export const signUpController = async (request, response) => {
  try {
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
    const user = await loginService(request.body);

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
