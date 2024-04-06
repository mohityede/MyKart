import mongoose from "mongoose";

const connectDB = () => {
  const connectionString: string = process.env
    .LOCAL_DB_CONNECTOIN_STRING as string;
  mongoose
    .connect(connectionString, {
      dbName: "mykartDB",
    })
    .then((conn) => {
      console.log(`Mongo DB connected to ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
