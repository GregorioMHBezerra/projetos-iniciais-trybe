const { employees } = require('../data/zoo_data');

const isManager = (id) => employees.some((employee) =>
  employee.managers.includes(id));

// const verifyManager = (iD) => {
//   if (isManager(iD) === false) {
//     throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
//   }
// };

const getRelatedEmployees = (managerId) => {
  // try {
    // verifyManager(managerId);
  if (isManager(iD) === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  const workst = employees.filter((employee) => employee.managers.includes(managerId));
  return workst.map((works) => `${works.firstName} ${works.lastName}`);
  // } catch (error) {
  //   return error.message;
  // }
};

// console.log(getRelatedEmployees('0e7b460e-acf4-4e17-bcb3-ee472265d83'));

module.exports = { isManager, getRelatedEmployees };
