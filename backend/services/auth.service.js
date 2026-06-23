import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";

export const signUpService = async (payload) => {
  const { name, email, password } = payload;

  const user = await UserModel.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }

  // Hash the password before saving to the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();
};

export const loginService = async (payload) => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  
  // Return user data without hashed password
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export const getMeService = async (userId) => {
  // Exclude password field
  const user = await UserModel.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
