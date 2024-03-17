import mongoose from "mongoose";

const connectDB = () => {
  const connectionString: string = process.env
    .MONGODB_CONNECTION_STRING as string;
  //   console.log("inside connectdb", connectionString, typeof process.env.MONGODB_CONNECTION_STRING);
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
