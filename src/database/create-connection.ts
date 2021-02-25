import * as mongoose from "mongoose";

function createConnection() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    dbName: "vasya_from_wildberries_test",
    serverSelectionTimeoutMS: 5000,
  };
  return mongoose.connect(process.env.MONGO_DB_URI, options);
}

export default createConnection;
