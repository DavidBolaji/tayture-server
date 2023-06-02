import { Model, Schema, model } from "mongoose";
import { IUserDocument } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    picture: { type: String },
    role: { type: [String] },
    phone: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.genAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET!);
  return token;
};

const UserModel: Model<IUserDocument> = model<IUserDocument>(
  "User",
  userSchema
);

export { UserModel };
