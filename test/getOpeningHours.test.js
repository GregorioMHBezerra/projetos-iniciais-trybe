const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('Se não passar argumentos, deve retornar um objeto com todos os dias como chaves, cujos valores sejam os horários de funcionamento', () => {
    expect(getOpeningHours()).toMatchObject({
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    });
  });
  it('Se passar `Monday` e `09:00-AM` deve retornar a string `The zoo is closed`', () => {
    expect(getOpeningHours('Monday', '09:00-AM')).toEqual('The zoo is closed');
  });
  it('Se passar `Tuesday` e `09:00-AM` deve retornar a string `The zoo is open`', () => {
    expect(getOpeningHours('Tuesday', '09:00-AM')).toEqual('The zoo is open');
  });
  it('Se passar `Wednesday` e `09:00-PM` deve retornar a string `The zoo is closed`', () => {
    expect(getOpeningHours('Wednesday', '09:00-PM')).toEqual('The zoo is closed');
  });
  it('Se passar os argumentos com abreviação da hora incorreta deve lançar o erro `The abbreviation must be \'AM\' or \'PM\'`', () => {
    expect(() => {
      getOpeningHours('Friday', '09:00-ZM');
    }).toThrow('The abbreviation must be \'AM\' or \'PM\'');
  });
  it('Se passar os argumentos com nome do dia da semana incorreto deve lançar o erro `The day must be valid. Example: Monday`', () => {
    expect(() => {
      getOpeningHours('Fri', '09:00-PM');
    }).toThrow('The day must be valid. Example: Monday');
  });
  it('Se passar os argumentos com valores das horas ou minutos não numéricos deve lançar o erro `The hour should represent a numbe` ou `The minutes should represent a number`', () => {
    expect(() => {
      getOpeningHours('Friday', 'C9:00-PM');
    }).toThrow('The hour should represent a number');
    expect(() => {
      getOpeningHours('Friday', '09:c0-PM');
    }).toThrow('The minutes should represent a number');
  });
  it('Os valores das horas devem estar entre 0 e 12 e os valores dos minutos deve estar entre 0 e 59, caso contrário deve lançar o erro: com nome do dia da semana incorreto deve lançar respectivamente os erros `The hour must be between 0 and 12` e `The minutes must be between 0 and 59`', () => {
    expect(() => {
      getOpeningHours('Friday', '13:50-PM');
    }).toThrow('The hour must be between 0 and 12');
    expect(() => {
      getOpeningHours('Friday', '09:60-PM');
    }).toThrow('The minutes must be between 0 and 59');
  });
});
