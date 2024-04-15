import { StatusCodes } from "http-status-codes";

const profile = (req, res) => {
  res.status(StatusCodes.OK).json({ ...req.user });
};

export default profile;
