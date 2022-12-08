const { species } = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) =>
  species.find((individuo) => animal).residents
    .every((indInfo) => indInfo.age >= age);

module.exports = getAnimalsOlderThan;
