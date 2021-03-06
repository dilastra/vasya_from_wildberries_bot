import { OdidsModel } from "./models";

async function editOdidsInDB(filterOptions = {}, newValues: object) {
  return await OdidsModel.updateOne(filterOptions, newValues, {});
}

export default editOdidsInDB;
