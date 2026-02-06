import dotenv from "dotenv"
import express from "express";
import authRoutes from "./routes/Auth.route.js"

dotenv.config()

const app = express();

const port = process.env.PORT;

app.use("/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
