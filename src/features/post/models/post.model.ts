import { Model, Schema, model } from "mongoose";
import { IPostDocument } from "../interfaces/post.interface";
import moment from "moment";
import readingTime from "reading-time";

const postSchema = new Schema(
  {
    title: { type: String },
    image: { type: String },
    content: { type: String },
    date: { type: String },
    length: { type: String },
  },
  { timestamps: true }
);

postSchema.methods.extra = async function (text: string) {
  const post = this;
  post.date = moment().format("MMMM DD, YYYY");
  post.length = readingTime(text).text;
  console.log(post.length);
  const res = await post.save();
  return { res };
};

postSchema.pre("save", function () {});

const PostModel: Model<IPostDocument> = model<IPostDocument>(
  "Post",
  postSchema
);

export { PostModel };
