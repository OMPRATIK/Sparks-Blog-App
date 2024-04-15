import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ").at(1);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, username } = decoded;
    req.user = { userId, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access the route");
  }
};

export default authenticationMiddleware;
