const { species, employees } = require('../data/zoo_data');

const verifyBe = (iD) => {
  if (iD) {
    const bool = employees.some((employee) =>
      employee.id === iD.id
  || employee.firstName === iD.name
  || employee.lastName === iD.name);
    if (bool === false) {
      throw new Error('Informações inválidas');
    }
  }
};

const getSpeciesByIds2 = (...ids) => species.filter((specie) => ids.includes(specie.id));

const findNameAnimal = (idWorker) => {
  const arrayAnimals = employees.find((employee) => employee.id === idWorker).responsibleFor;
  return getSpeciesByIds2(...arrayAnimals).reduce((acc, animal2) => {
    acc.push(animal2.name);
    return acc;
  }, []);
};

const findLocalAnimal = (idWorker) => {
  const arrayAnimals = employees.find((employee) => employee.id === idWorker).responsibleFor;
  return getSpeciesByIds2(...arrayAnimals).reduce((acc, animal2) => {
    acc.push(animal2.location);
    return acc;
  }, []);
};

const oneWorker = (objNameOrId) => employees.filter((employee) =>
  employee.firstName === objNameOrId.name
  || employee.lastName === objNameOrId.name
  || employee.id === objNameOrId.id)
  .reduce((acc, curr) => {
    acc.fullName = `${curr.firstName} ${curr.lastName}`;
    acc.id = curr.id;
    acc.locations = findLocalAnimal(curr.id);
    acc.species = findNameAnimal(curr.id);
    return acc;
  }, {});

const allWorkers = () => employees.reduce((acc, curr) => {
  const result = {
    fullName: `${curr.firstName} ${curr.lastName}`,
    id: curr.id,
    locations: findLocalAnimal(curr.id),
    species: findNameAnimal(curr.id),
  };
  acc.push(result);
  return acc;
}, []);

const getEmployeesCoverage = (obj) => {
  verifyBe(obj);
  if (!obj) {
    return allWorkers();
  }
  return oneWorker(obj);
};

module.exports = getEmployeesCoverage;
