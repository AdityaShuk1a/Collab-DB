import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbRoutes from "./routes/Db.route.js";
import { connectDB } from "./config/config.js";
import authRoutes from "./routes/Auth.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/db", dbRoutes);

app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

await connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
