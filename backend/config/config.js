import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
  },
});

export const connectDB = async () => {
  await client.connect();
  console.log("MongoDB Connected");
  return client;
};

export default client;
