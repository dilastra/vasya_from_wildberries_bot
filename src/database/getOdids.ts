import { Document } from "mongoose";
import { OdidsModel } from "./models";

async function getOdids(telegramId: number) {
  const userOdids = await OdidsModel.findOne({ telegramId });

  if (!userOdids) {
    await OdidsModel.create({ telegramId, odids: [] });

    return [];
  }
  return userOdids.toObject();
}

export default getOdids;
