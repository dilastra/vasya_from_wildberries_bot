import { Schema } from "mongoose";

const odidsSchema = new Schema({
  telegramId: Number,
  odids: Array,
});

export default odidsSchema;
