import { Request, Response } from "express";
import { IPostDocument } from "../interfaces/post.interface";
import { postService } from "../services/post.service";
import { log } from "../../../utils/Logger";
import { Helper } from "../../../utils/Helper";

const loger = log.Log("postcontroller");

export class PostController {
  public async create(req: Request, res: Response) {
    const { image, content, title, description } = req.body;

    const result: IPostDocument = (await postService.createPost({
      title,
      image,
      content,
      description,
    })) as unknown as IPostDocument;

    res.status(200).send({ message: "Post created succesfully", data: result });
  }

  public async read(_req: Request, res: Response) {
    const posts = await postService.read();

    res.status(200).send({ message: "Post Request succesfully", data: posts });
  }

  public async read5(_req: Request, res: Response) {
    const posts = await postService.read5();

    res.status(200).send({ message: "Post Request succesfully", data: posts });
  }

  public async readOne(req: Request, res: Response) {
    //if not in cache fetch fromm db
    const post = await postService.findBlog(req.params.id);
    // and save in catch
    // productCache.saveProductToCache(req.url, product);
    //return it to user
    res.status(200).json({ message: "fetch succesfull", data: post });
  }
}
