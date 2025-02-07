import bcrypt from "bcrypt";
import User from "../models/User.js";

import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";

import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const { username, password: pw } = req.body;
  const user = {};
  if (!username) {
    throw new BadRequestError("Please provide username");
  }
  user.username = username;

  if (!pw) {
    throw new BadRequestError("Please provide password");
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pw, salt);
  user.password = password;

  const userDoc = await User.create({ ...user });

  res.status(StatusCodes.CREATED).json({ success: true });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new BadRequestError("Please provide username");
  }

  if (!password) {
    throw new BadRequestError("Please provide password");
  }

  const user = await User.findOne({ username: username });

  if (!user) {
    throw new NotFoundError(`No user with username ${username}`);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UnauthenticatedError("Invalid password");
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { userId: user._id, username: user.username }, token });
};

const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ success: "ok" });
};

export { register, login, logout };
