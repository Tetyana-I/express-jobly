const { sqlForPartialUpdate } = require("./sql");

describe("Create sql for partial update", function () {

    test("Return correct string and array with one correct value to change", function () {
      expect(sqlForPartialUpdate({"firstName": "Aliya"}, {firstName: "first_name"})).toEqual({setCols: '"first_name"=$1',
        values: ["Aliya"]});
    });

    test("Return correct string for several columns to change and array with correct values to change", function () {
        expect(sqlForPartialUpdate({"firstName": "Aliya", "lastName": "Rostova"}, 
         {firstName: "first_name", lastName: "last_name"})).toEqual({setCols: '"first_name"=$1, "last_name"=$2',
          values: ["Aliya", "Rostova"]});
      });

    test("works: no data are sent", function () {
      expect(() => sqlForPartialUpdate({}, {})).toThrow('No data');
    })
});

