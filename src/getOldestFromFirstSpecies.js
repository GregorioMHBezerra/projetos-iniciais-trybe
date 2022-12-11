const { species, employees } = require('../data/zoo_data');

const getOldestFromFirstSpecies = (id) => {
  // achar o colaborador, achar a primeira espécie, achar o mais velho
  const firstSpecie = employees.find((employee) => employee.id === id).responsibleFor[0];
  return Object.values(species.find((specie) => specie.id === firstSpecie).residents
    .sort((a, b) => b.age - a.age)[0]);
};

module.exports = getOldestFromFirstSpecies;
