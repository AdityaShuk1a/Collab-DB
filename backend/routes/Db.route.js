import express from "express"

const router = express.Router();

 
router.post("/create-database", (req, res) => {
    const db = new Database(req.body.dbName);
})