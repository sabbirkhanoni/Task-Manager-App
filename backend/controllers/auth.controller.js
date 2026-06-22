import { signUpService } from "../services/auth.service.js";

export const signUpController = async (request, response) => {
    try {
        await signUpService(request.body);
        return response.status(201).json({
            message: 'Registration successfully',
            error: false,
            success: true,
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || 'Registration failed',
            error: false,
            success: false,
        })
    }
}