import generateToken from "../config/jwt.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

//!signup
export const signup = async (userData) => {
  const { name, email, password } = userData;
  if (!name || !email || !password) {
    throw new Error(`All fields are required`);
  }
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    throw new Error(`User is already registered with this email: ${email}`);
  }

  const hashPassword = await bcrypt.hash(password, 16);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  //! generate token
  const token = await generateToken({
    id: newUser._id,
    email: newUser.email,
  });
  return {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  };
};

//! login

export const login = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new Error(`All fields are required`);
  }
  const existUser = await User.findOne({ email: email });
  if (!existUser) {
    throw new Error(`User is not registered with this email: ${email}`);
    return;
  }

  const match = await bcrypt.compare(password, existUser.password);
  if (!match) {
    throw new Error(`Password is incorrect`);
    return;
  }

  //! generate token
  const token = await generateToken({
    id: existUser._id,
    email: existUser.email,
  });
  return {
    user: {
      id: existUser._id,
      name: existUser.name,
      email: existUser.email,
    },
    token,
  };
};

//! find user by id

export const findUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error(`User is not registered with this id: ${userId}`);
    return;
  }

  return user;
};
