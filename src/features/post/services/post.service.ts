import { IPostDocument } from "../interfaces/post.interface";
import { PostModel } from "../models/post.model";

class PostService {
  public async createPost({
    title,
    image,
    content,
    description,
  }: IPostDocument | any): Promise<IPostDocument> {
    const post: any = new PostModel({ title, image, content, description });
    await post.save();

    const res = post.extra(content);

    return { ...res };
  }

  public async read(): Promise<IPostDocument[]> {
    const post = await PostModel.find();
    // console.log(post);
    // @ts-ignore
    // .cache({ key: "Order" });
    return post;
  }

  public async read5(): Promise<IPostDocument[]> {
    const post = await PostModel.find().sort({ createdAt: -1 }).limit(5);
    // console.log(post);
    // @ts-ignore
    // .cache({ key: "Order" });
    return post;
  }

  public async findBlog(id: string): Promise<IPostDocument[]> {
    const post = await PostModel.findOne({ _id: id });
    // @ts-ignore
    // .cache({ key: id });
    return post;
  }

  public async delete(id: string): Promise<void> {
    const post = await PostModel.findByIdAndDelete(id);
  }
}

export const postService: PostService = new PostService();
