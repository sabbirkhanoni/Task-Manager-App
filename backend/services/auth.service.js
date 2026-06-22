import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";

export const signUpService = async (payload) => {
  const { name, email, password } = payload;

  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const passwordRegexNumberCriteria = /^.{6,26}$/;
  if (!passwordRegexNumberCriteria.test(password)) {
    throw new Error(
      "Password must be 6-26 characters long",
    );
  }

  const passwordRegexCharCriteria = /^(?=.*[a-zA-Z]).+$/;
  if (!passwordRegexCharCriteria.test(password)) {
    throw new Error(
      "Password must contain at least one uppercase letter or lowercase letter",
    );
  }

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