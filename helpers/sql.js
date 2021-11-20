const { BadRequestError } = require("../expressError");

// Function creates parts for sql-query for partial update,
// dataToUpdate - an object, containing key, value paires to update
// for example: {firstName: 'Aliya', age: 32} 
// jsToSQL - an object, containing keysql, key_database pairs if differ 
// for our example: {firstName: "first_name"}
// return an object, containing: setCols - part of sql-query with columns to update,
// values: array with new values


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
