import { DB } from "../state/db.state..js";

export const verifyTable = (req, res, next) => {
  const { dbName, tableName, Columns } = req.body;

  if (!dbName || !tableName || !Columns) {
    res.json({ msg: "Insert all mandatory fields." });
  }

  if (!DB[dbName]) res.json({ msg: "incorrect Database" });

  if (DB[dbName].tables[tableName]) {
    res.json({ msg: "Table already initialized" });
  }

  next();
};

export const verifyRow = (req, res, next) => {
  const { dbName, tableName, row } = req.body;

  if (!dbName || !tableName || !row) {
    res.json({ msg: "Insert all mandatory fields." });
  }

  if (!DB[dbName]) res.json({ msg: "incorrect Database" });

  if (!DB[dbName].tables[tableName]) {
    res.json({ msg: "wrong table" });
  }

  next();
};
