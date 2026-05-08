import { login, signup } from "../services/user.js";

export const registerUserController = async (req, res) => {
  const userData = req.body;
  try {
    const { user, token } = await signup(userData);
    return res.status(201).json({
      status: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  const userData = req.body;
  try {
    const { user, token } = await login(userData);
    return res.status(200).json({
      status: true,
      message: "User login successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `${error.message} `,
    });
  }
};
