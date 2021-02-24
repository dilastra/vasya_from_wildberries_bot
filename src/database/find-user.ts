import { UserModel } from "./models";

async function findUserInDB(options = {}) {
  const user = await UserModel.find(options);
  return user.length > 0 ? user[0].toObject() : undefined;
}

export default findUserInDB;
