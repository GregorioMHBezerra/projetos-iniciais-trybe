// Desafio 11

const validadorCel = (arrayDeNumeros) => {
  if (arrayDeNumeros.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  for (const chave in arrayDeNumeros) {
    if (arrayDeNumeros[chave] < 0 || arrayDeNumeros[chave] > 9) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  return arrayDeNumeros;
};

const validadorCelRepeticao = (arrayDeNumeros) => {
  let arrayDeNumerosValidado = validadorCel(arrayDeNumeros);
  if (typeof arrayDeNumerosValidado === 'string') {
    return arrayDeNumerosValidado;
  }
  for (let index = 0; index < arrayDeNumerosValidado.length; index += 1) {
    let contador = 0;
    for (let index2 = 0; index2 < arrayDeNumerosValidado.length; index2 += 1) {
      if (arrayDeNumerosValidado[index] === arrayDeNumerosValidado[index2]) {
        contador += 1;
      }
    }
    if (contador === 3) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  return arrayDeNumeros;
};

function generatePhoneNumber(arrayDeNumeros) {
  let arrayDeNumerosValidado = validadorCelRepeticao(arrayDeNumeros);
  if (typeof arrayDeNumerosValidado === 'string') {
    return arrayDeNumerosValidado;
  }
  return `(${arrayDeNumerosValidado[0]}${arrayDeNumerosValidado[1]}) ${arrayDeNumerosValidado[2]}${arrayDeNumerosValidado[3]}${arrayDeNumerosValidado[4]}${arrayDeNumerosValidado[5]}${arrayDeNumerosValidado[6]}-${arrayDeNumerosValidado[7]}${arrayDeNumerosValidado[8]}${arrayDeNumerosValidado[9]}${arrayDeNumerosValidado[10]}`;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA >= (lineB + lineC) || lineB >= (lineA + lineC) || lineC >= (lineB + lineA)) {
    return false;
  }
  return true;
}

// Desafio 13
function hydrate(string) {
  const soNumeros = (string.replace(/[^0-9]/g, '')).split('');
  let soma = soNumeros.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10));
  return (soma === '1') ? `${soma} copo de água` : `${soma} copos de água`;
}
