import Logger from "bunyan";

// import { redisConnection } from "../services/redis/redis.connection";
import { log } from "./utils/Logger";
import mongoose from "./services/cache/cache";
// import dotenv from "dotenv";
// dotenv.config();

let server: any = process.env.MONGODB_URI_LOCAL;
let loger = log.Log("mongoose");

if (process.env.ENV === "prod") {
  server = process.env.MONGODB_URI_PROD;
}

export default () => {
  const connect = () => {
    mongoose
      .connect(server)
      .then(async () => {
        loger.info("Connected to database");
      })
      .catch((err) => {
        loger.error("Error connecting to database", err);
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on("disconnected", () => {
    loger.info("Reconnecting");
    connect();
  });
};
