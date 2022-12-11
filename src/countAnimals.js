const { species } = require('../data/zoo_data');

const countAnimals = (animal) => {
  if (!animal) {
    return species.reduce((acc, specie) => {
      acc[specie.name] = specie.residents.length;
      return acc;
    }, {});
  }
  const searchAnimal = species.find((specie) => specie.name === animal.species);
  if (animal.species && !animal.sex) {
    return searchAnimal.residents.length;
  }
  return searchAnimal.residents.filter((ind) => ind.sex === animal.sex).length;
};

module.exports = countAnimals;
