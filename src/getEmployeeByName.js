const { employees } = require('../data/zoo_data');

const getEmployeeByName = (employeeName) => {
  const result = employees.reduce((acc, curr) => {
    if (curr.firstName === employeeName || curr.lastName === employeeName) {
      return curr;
    }
    return acc;
  }, {});
  return result;
};

console.log(getEmployeeByName('Nelson'));

module.exports = getEmployeeByName;
