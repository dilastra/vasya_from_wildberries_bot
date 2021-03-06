import { UserModel } from "./models";

async function findUserInDB(options = {}) {
  const user = await UserModel.findOne(options);

  return user ? user.toObject() : undefined;
}

export default findUserInDB;
