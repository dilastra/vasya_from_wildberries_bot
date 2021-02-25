import { Document } from "mongoose";
import { User } from "../types";
import { UserModel } from "./models";

async function getAllUsers(): Promise<User[]> {
  const users = await UserModel.find();
  if (users.length > 0) {
    return users.map((user: Document<any>) => {
      const userFromDocument = { ...user.toObject() };

      delete userFromDocument._id;
      delete userFromDocument.__v;

      return userFromDocument;
    });
  }

  return [];
}

export default getAllUsers;
