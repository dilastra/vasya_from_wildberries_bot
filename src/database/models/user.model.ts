import * as mongoose from "mongoose";
import { userSchema } from "../schemas";

const UserModel = mongoose.model("Session", userSchema);

export default UserModel;
