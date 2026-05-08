import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "48h",
  });

  return token;
};

export default generateToken;
