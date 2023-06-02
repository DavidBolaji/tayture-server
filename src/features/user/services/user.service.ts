import { IUserDocument } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserService {
  public async createUser({
    email,
    name,
    picture,
    role,
    phone,
  }: IUserDocument | any): Promise<IUserDocument> {
    console.log(email);
    const exist: any = await UserModel.findOne({ email: email }).select(
      "_id email isAdmin picture name"
    );

    console.log(typeof exist?._id);

    if (typeof exist?._id !== "undefined") {
      console.log("entered");
      const token = exist!.genAuthToken();
      return { ...exist._doc, token } as IUserDocument;
    }
    const users: any = new UserModel({ email, name, picture, role, phone });
    await users.save();
    const token = users.genAuthToken();
    return { ...users._doc, token };
  }
}

export const userService: UserService = new UserService();
