import jwt from "jsonwebtoken";
import { findUserById } from "../services/user.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
      return status(401).json({
        message: "No Token is Provided",
      });
    }
    if (!authHeader.startsWith("Bearer")) {
      return status(401).json({
        message: "Invalid token formate provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await findUserById(decode.id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User is not found.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
