// Desafio 1
function compareTrue(booleano1, booleano2) {
  return (booleano1 && booleano2);
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(string) {
  return string.split(' ');
}

// Desafio 4
function concatName(arrayDeStrings) {
  return `${arrayDeStrings[arrayDeStrings.length - 1]}, ${arrayDeStrings[0]}`;
}

// Desafio 5
function footballPoints(wins, ties) {
  return (wins * 3) + ties;
}

// Desafio 6

const maiorNumeroArray = (arrayNumeros) => {
  let maiorNumero = arrayNumeros[0];
  for (const numero in arrayNumeros) {
    if (arrayNumeros[numero] > maiorNumero) {
      maiorNumero = arrayNumeros[numero];
    }
  }
  return maiorNumero;
};

function highestCount(arrayNumeros) {
  let maiorNumero = maiorNumeroArray(arrayNumeros);
  let contagem = 0;
  for (const contador in arrayNumeros) {
    if (arrayNumeros[contador] === maiorNumero) {
      contagem += 1;
    }
  }
  return contagem;
}

// // Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  if (Math.abs(cat1 - mouse) < Math.abs(cat2 - mouse)) {
    return 'cat1';
  } if (Math.abs(cat2 - mouse) < Math.abs(cat1 - mouse)) {
    return 'cat2';
  }
  return 'os gatos trombam e o rato foge';
}

const analiseNumero = (numero) => {
  if (numero % 15 === 0) {
    return 'fizzBuzz';
  } if (numero % 3 === 0) {
    return 'fizz';
  } if (numero % 5 === 0) {
    return 'buzz';
  }
  return 'bug!';
};

// Desafio 8
function fizzBuzz(arrayNumeros) {
  const arrayDeStrings = [];
  for (let index = 0; index < arrayNumeros.length; index += 1) {
    arrayDeStrings.push(analiseNumero(arrayNumeros[index]));
  }
  return arrayDeStrings;
}

// Desafio 9
function encode(string) {
  let stringCodificada = [];
  for (let index = 0; index < string.length; index += 1) {
    switch (string[index]) {
    case 'a':
      stringCodificada.push('1');
      break;
    case 'e':
      stringCodificada.push('2');
      break;
    case 'i':
      stringCodificada.push('3');
      break;
    case 'o':
      stringCodificada.push('4');
      break;
    case 'u':
      stringCodificada.push('5');
      break;
    default:
      stringCodificada.push(string[index]);
      break;
    }
  }
  return stringCodificada.join('');
}

function decode(stringMista) {
  let stringDecodificada = [];
  for (let index = 0; index < stringMista.length; index += 1) {
    switch (stringMista[index]) {
    case '1':
      stringDecodificada.push('a');
      break;
    case '2':
      stringDecodificada.push('e');
      break;
    case '3':
      stringDecodificada.push('i');
      break;
    case '4':
      stringDecodificada.push('o');
      break;
    case '5':
      stringDecodificada.push('u');
      break;
    default:
      stringDecodificada.push(stringMista[index]);
      break;
    }
  }
  return stringDecodificada.join('');
}

// Desafio 10
function techList(arrayTec, name) {
  if (arrayTec.length === 0) {
    return 'Vazio!';
  }
  let arrayObjeto = [];
  arrayTec.sort();
  for (let index = 0; index < arrayTec.length; index += 1) {
    arrayObjeto.push({ name, tech: arrayTec[index] });
  }
  return arrayObjeto;
}
