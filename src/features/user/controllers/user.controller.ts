import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { IUserDocument } from "../interfaces/user.interface";
import { userService } from "../services/user.service";
import { log } from "../../../utils/Logger";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const loger = log.Log("usercontroller");

export class UserController {
  public async googleRegister(req: Request, res: Response) {
    const { token, role, phone } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { given_name, family_name, email, picture } =
      ticket.getPayload() as unknown as any;

    const result: IUserDocument = (await userService.createUser({
      name: `${given_name} ${family_name}`,
      email,
      picture,
      role,
      phone,
    })) as unknown as IUserDocument;

    // req.session = {}

    res.status(200).send({ message: "user created succesfully", data: result });
  }
}
