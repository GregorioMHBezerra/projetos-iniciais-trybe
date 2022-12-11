const { species, hours } = require('../data/zoo_data');

const allSchedule = () => Object.entries(hours).reduce((acc, day) => {
  const exhibition = species.filter(((specie) => specie.availability.includes(day[0])));
  if (day[0] !== 'Monday') {
    acc[day[0]] = {
      officeHour: `Open from ${day[1].open}am until ${day[1].close}pm`,
      exhibition: exhibition.map((specie) => specie.name) };
  } else if (day[0] === 'Monday') {
    acc[day[0]] = {
      officeHour: 'CLOSED',
      exhibition: 'The zoo will be closed!' };
  }
  return acc;
}, {});

const getSchedule = (scheduleTarget) => {
  const days = Object.keys(hours);
  const animals = species.reduce((acc, specie) => {
    acc.push(specie.name);
    return acc;
  }, []);
  if (animals.includes(scheduleTarget)) {
    return species.find((specie) => specie.name === scheduleTarget).availability;
  }
  if (days.includes(scheduleTarget)) {
    return Object.entries(allSchedule()).find((day) =>
      day[0] === scheduleTarget).reduce((acc, day, index, array) => {
      const [dayWeek, workHours] = array;
      acc[dayWeek] = workHours;
      return acc;
    }, {});
  }
  return allSchedule();
};

module.exports = getSchedule;
