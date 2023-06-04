import { Document } from "mongoose";

export interface IPostDocument extends Document {
  _id?: string;
  title: string;
  description: string;
  image: string;
  content: string;
  date?: string;
  length?: string;
  extra(arg: string): string;
}
