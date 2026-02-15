import express from "express";
import { DB } from "../state/db.state..js";
import { Database } from "../database/Database.js";
import {
  verifyRow,
  verifyTable,
} from "../middlewares/verification.middlewares.js";

const router = express.Router();

router.post("/create-database", (req, res) => {
  const { dbName } = req.body;

  if (!dbName) {
    return res.status(400).json({ msg: "Database name is required" });
  }

  if (DB[dbName]) {
    return res.json({ msg: "Database is already created" });
  }

  const db = new Database(dbName);
  DB[dbName] = db;

  return res.json({ msg: "Database created" });
});

router.post("/create-table", verifyTable, (req, res) => {
  const { dbName, tableName, Columns } = req.body;

  DB[dbName].createTable(tableName, ...Columns);

  res.json({ msg: "table has been created" });
});

router.post("/insert-row", verifyRow, (req, res) => {
  const { dbName, tableName, row } = req.body;

  DB[dbName].insertData(tableName, row);

  res.json({ msg: "Data inserted sucessfully" });
});

router.get("/get-database", (req, res) => {
  res.json(DB);
});

export default router;
