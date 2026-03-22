import express from "express";
import { DB } from "../state/db.state..js";
import { Database } from "../database/Database.js";
import {
  verifyRow,
  verifyTable,
} from "../middlewares/verification.middlewares.js";

const router = express.Router();

router.get("/search-by-word", (req, res) => {
  const { dbName, tableName, word } = req.body;

  if (!dbName || !tableName || !word) {
    return res.status(400).json({ msg: "Fields are missing!" });
  }

  if (!DB[dbName]) {
    return res.json({ msg: "Database is incorrect" });
  }

  if (!DB[dbName].tables[tableName]) {
    return res.json({ msg: "Table is incorrect" });
  }

  const data = DB[dbName].matchWord(tableName, word);

  if (data == -1) {
    res.json({ msg: "No data exist" });
  } else {
    res.json({ msg: "Your Data", data: data });
  }
});

router.get("/total-records", (req, res) => {
  const { dbName, tableName } = req.body;

  if (!dbName || !tableName) {
    return res.status(400).json({ msg: "Fields are missing!" });
  }

  if (!DB[dbName]) {
    return res.json({ msg: "Database is incorrect" });
  }

  if (!DB[dbName].tables[tableName]) {
    return res.json({ msg: "Table is incorrect" });
  }

  const db = DB[dbName];

  const totalRows = db.totalData(tableName);

  return res.json({
    msg: `Total records in ${tableName}`,
    totalRows: totalRows,
  });
});

router.get("/get-row", (req, res) => {
  const { dbName, tableName, id } = req.body;

  if (!dbName || !tableName || !id) {
    res.json({ msg: "Fields are missing!" });
  }

  if (!DB[dbName] || !DB[dbName].tables[tableName]) {
    res.json({ msg: "Incorrect data" });
  }

  const row = DB[dbName].searchData(tableName, id);

  if (row == -1) {
    res.json({ msg: `No data for this id: ${id}` });
  } else {
    res.json({ msg: "Your Data", data: row });
  }
});

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

  DB[dbName].createTable(tableName, Columns);

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
