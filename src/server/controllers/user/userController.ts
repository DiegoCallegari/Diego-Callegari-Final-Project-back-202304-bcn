import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type NextFunction, type Response } from "express";
import { type UserAccessRequest } from "../../types";
import User from "../../../database/models/user.js";
import { CustomError } from "../../../CustomError/CustomError.js";

const loginUser = async (
  req: UserAccessRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(401, "Wrong credentials access");
      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
