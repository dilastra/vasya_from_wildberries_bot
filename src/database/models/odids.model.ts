import * as mongoose from "mongoose";
import { odidsSchema } from "../schemas";

const OdidsModel = mongoose.model("Odids", odidsSchema);

export default OdidsModel;
