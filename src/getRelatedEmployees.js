const { employees } = require('../data/zoo_data');

const isManager = (id) => employees.some((employee) =>
  employee.managers.includes(id));

const verifyManager = (iD) => {
  if (isManager(iD) === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
};

const getRelatedEmployees = (managerId) => {
  verifyManager(managerId);
  const workst = employees.filter((employee) => employee.managers.includes(managerId));
  return workst.map((works) => `${works.firstName} ${works.lastName}`);
};

module.exports = { isManager, getRelatedEmployees };
