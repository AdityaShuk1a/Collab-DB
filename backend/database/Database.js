export class Database {
  constructor(name) {
    this.name = name;
    this.tables = {};
    console.log(`Database ${name} has been initialized`);
  }

  createTable(tableName, ...columns) {
    if (this.tables[tableName]) {
      throw new Error(`Table "${tableName}" already exists`);
    }

    this.tables[tableName] = {
      columns,
      rows: [],
    };

    console.log(`Table "${tableName}" created`);
  }

  insertData(tableName, row) {
    const table = this.tables[tableName];

    if (!table) {
      throw new Error(`Table "${tableName}" does not exist`);
    }

    const keys = Object.keys(row);
    for (const column of table.columns) {
      if (!keys.includes(column)) {
        throw new Error(`Missing column "${column}" in insert`);
      }
    }

    table.rows.push(row);
    console.log(`Row inserted into "${tableName}"`);
  }
}
