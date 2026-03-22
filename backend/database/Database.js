export class Database {
  constructor(name) {
    this.name = name;
    this.tables = {};
    console.log(`Database ${name} has been initialized`);
  }

  createTable(tableName, columns) {
    if (this.tables[tableName]) {
      throw new Error(`Table "${tableName}" already exists`);
    }
    columns["id"] = "number";
    this.tables[tableName] = {
      columns,
      id: 0,
      index: {},
      rows: [],
    };

    console.log(`Table "${tableName}" created`);
  }

  totalData(tableName) {
    const table = this.tables[tableName];
    return table.id;
  }

  searchData(tableName, id) {
    const table = this.tables[tableName];
    if (!table) {
      throw new Error(`Table ${tableName} does not exist`);
    }

    var low = 0;
    var high = table.id - 1;
    const rows = table.rows;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      if (rows[mid].id == id) {
        return rows[mid];
      } else if (rows[mid].id < id) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return -1;
  }

  matchWord(tableName, word) {
    const table = this.tables[tableName];

    if (!table.index[word]) {
      return -1;
    } else {
      return table.index[word];
    }
  }

  insertData(tableName, row) {
    const table = this.tables[tableName];
    row.id = table.id;
    if (!table) {
      throw new Error(`Table "${tableName}" does not exist`);
    }

    const schema = table.columns;

    for (const column in schema) {
      if (!(column in row)) {
        throw new Error(`Column ${column} does not exist`);
      }
    }
    for (const key of Object.keys(row)) {
      if (!schema[key]) {
        throw new Error(`Unknown column "${key}"`);
      }
    }
    for (const key in row) {
      const expectedType = schema[key];
      const actualType = typeof row[key];

      if (expectedType !== actualType) {
        throw new Error(`Type does not match`);
      }
    }

    table.rows.push(row);

    for (const key in row) {
      if (key === "id") {
        continue;
      }
      const value = String(row[key]).toLowerCase();
      if (!table.index[value]) {
        table.index[value] = [];
      }
      table.index[value].push(row.id);
    }

    table.id += 1;
    console.log(`Row inserted into "${tableName}"`);
  }
}
