import { Document } from "mongoose";

export interface IUserDocument extends Document {
  _id?: string;
  name: string;
  email: string;
  picture: string;
  phone: string;
  role: string[];
  token?: string;
  isAdmin: boolean;
  genAuthToken(): string;
}
