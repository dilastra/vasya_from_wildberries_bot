import { UserModel } from "./models";

async function editUserInDB(
  filterOptions = {},
  newValues: object,
  callback: (err: any, res: any) => void
) {
  return await UserModel.updateOne(filterOptions, newValues, {}, callback);
}

export default editUserInDB;
