const { species } = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => species.filter((teste) => ids.includes(teste.id));

module.exports = getSpeciesByIds;
