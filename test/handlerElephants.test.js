const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('Se não passar parâmetros, retorna undefined', () => {
    expect(handlerElephants()).toBeUndefined();
  });
  it('Se o parâmetro for diferente de (string) retorna (Parâmetro inválido, é necessário uma string)', () => {
    const retornoEsperado = 'Parâmetro inválido, é necessário uma string';
    expect(handlerElephants(5)).toEqual(retornoEsperado);
    expect(handlerElephants(true)).toEqual(retornoEsperado);
    expect(handlerElephants({})).toEqual(retornoEsperado);
  });
  it('Se o parâmetro passado for uma chave do objeto elephants, retorna o valor da chave', () => {
    expect(handlerElephants('name')).toBe('elephants');
    expect(handlerElephants('popularity')).toBe(5);
  });
  it('Se passar o parâmetro `count` deverá somar a quantidade de elefantes e resultar em (4)', () => {
    expect(handlerElephants('count')).toEqual(4);
  });
  it('Se passar o parâmetro `names` deverá retornar um array com os nome dos quatro(4) elefantes', () => {
    expect(handlerElephants('names')).toEqual(['Ilana', 'Orval', 'Bea', 'Jefferson']);
  });
  it('Se passar o parâmetro `averageAge` deverá retornar a média da idade dos quatro(4) elefantes', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5);
  });
  it('Se não passar uma string válida deverá retornar null', () => {
    expect(handlerElephants('string')).toBeNull();
  });
});
