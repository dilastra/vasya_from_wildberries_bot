import { User } from "../types";
import { UserModel } from "./models";

async function addUserinDb(
  user: User,
  callback: (err: any, user: any) => void
) {
  return await UserModel.create(user, callback);
}

export default addUserinDb;
