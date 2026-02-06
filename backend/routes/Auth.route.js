import path from "path";
import { fileURLToPath } from "url";
import express from "express";
 
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "Auth.html"));
});

export default router;