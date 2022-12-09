const { prices } = require('../data/zoo_data');

const countEntrants = (entrants) => entrants.reduce((acc, entrant) => {
  if (entrant.age < 18) {
    acc.child += 1;
    // return acc;
  } else if (entrant.age < 50) {
    acc.adult += 1;
    // return acc;
  } else {
    acc.senior += 1;
  }
  return acc;
}, { child: 0, adult: 0, senior: 0 });

const calculateEntry = (entrants) => {
  if (!entrants || Object.keys(entrants).length <= 0) {
    return 0;
  }
  const visitantes = countEntrants(entrants); // retorna um objeto
  const teste = Object.keys(visitantes);
  return teste.reduce((acc, curr, index) => {
    const nameAux = teste[index];
    return acc + visitantes[nameAux] * prices[nameAux];
  }, 0);
};

module.exports = { calculateEntry, countEntrants };
