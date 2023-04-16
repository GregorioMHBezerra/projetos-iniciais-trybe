// Função para criar elementos com Id, Class e texto
function criaElementoById(tagCriada, idTagPai, nomeId, nomeClass, texto) {
  const criaElemento = document.createElement(tagCriada);
  const tagPai = document.getElementById(idTagPai);
  // Se não for passado o parâmetro nada ocorre
  if (nomeId !== undefined) {
    criaElemento.id = nomeId;
  }
  if (nomeClass !== undefined) {
    criaElemento.classList.add(nomeClass);
  }
  if (texto !== undefined) {
    criaElemento.innerText = texto;
  }
  tagPai.appendChild(criaElemento);
}

// Constantes de strings e objetos

const sectionButton = 'section-button'; // ID da Section dos botões e input
const pixelBoard = 'pixel-board'; // ID da Section dos elementos pintáveis
const article = 'article-project'; // ID do Article do projeto
let objetoPaleta = {}; // Objeto para guardar no LocalStorage as cores da paleta
let objetoPixel = {}; // Objeto para guardar no LocalStorage as cores dos elementos pintáveis
let tamanho = 25; // Variável para guardar a quantidade de elementos escolhidos
const cores = []; // Array para guardar as cores, de maneira a não ficarem repetidas

// Criação de elementos
criaElementoById('section', article, 'section-palette'); // Cria a Section onde ficará a paleta de cores e a insere no article
criaElementoById('section', article, sectionButton); // Cria a Section onde ficarão os botões e o input e a insere no article
criaElementoById('section', article, 'section-quadro'); // Cria a Section onde ficarão os elementos pintáveis e a insere no article
criaElementoById('section', 'section-quadro', pixelBoard); // Cria a Section que limitará o espaço onde se localizarão os elementos pintáveis
criaElementoById('ul', 'section-palette', 'color-palette'); // Cria uma UL para conter as LIs da paleta de cores e a insere na Section da paleta
criaElementoById('button', sectionButton, 'button-random-color', 'button', 'Cores aleatórias'); // Cria botão para alterar as cores disponíveis na paleta, excetuando a primeira
criaElementoById('button', sectionButton, 'clear-board', 'button', 'Limpar'); // Cria botão para limpar as cores dos elementos pintáveis
criaElementoById('input', sectionButton, 'board-size', 'input'); // Cria espaço input para se digitar o tamanho lateral de elementos pintáveis
criaElementoById('button', sectionButton, 'generate-board', 'button', 'VQV'); // Cria botão para enviar o texto do input

// Cria os elementos pintáveis
const criadorDePixel = (lado) => {
  tamanho = lado * lado;
  for (let index = 0; index < tamanho; index += 1) {
    criaElementoById('div', pixelBoard, `pixel${index}`, 'pixel');
    const pixel = document.getElementById(`pixel${index}`);
    objetoPixel[`pixel${index}`] = 'white';
    pixel.style.width = '40px';
    pixel.style.height = '40px';
    pixel.style.border = 'black solid 1px';
    pixel.style.display = 'inline-block';
  }
  document.getElementById(pixelBoard).style.width = `${44 * lado}px`;
  document.getElementById(pixelBoard).style.height = `${44 * lado}px`;
};

// Atualiza a variável tamanho e armazena no LocalStorage
const tamanhoDoStorage = localStorage.getItem('boardSize');
if (tamanhoDoStorage) {
  tamanho = JSON.parse(tamanhoDoStorage);
  criadorDePixel(Math.sqrt(tamanho));
} else {
  criadorDePixel(Math.sqrt(tamanho));
}

// constantes de elementos
const buttonRandom = document.getElementById('button-random-color');
const buttonLimpar = document.getElementById('clear-board');
const liColor = document.getElementsByClassName('color');
const sectionPixel = document.getElementById(pixelBoard);
const pixelClasse = document.getElementsByClassName('pixel');
const input = document.getElementById('board-size');
const buttonTamanho = document.getElementById('generate-board');
const ul = document.getElementsByTagName('ul')[0];

// Configuração extras de elementos
input.setAttribute('type', 'number');
input.setAttribute('min', 1);

// Criaçao da paleta de cores
const criaLiPaleta = () => {
  for (let index = 0; index < 4; index += 1) {
    criaElementoById('li', 'color-palette', `li${[index]}`, 'color');
    const liDaPaleta = document.getElementById(`li${[index]}`);
    if (liDaPaleta.id === `li${0}`) {
      liDaPaleta.style.backgroundColor = 'rgb(0,0,0)';
      liDaPaleta.classList.add('selected');
      cores.push(liDaPaleta.style.backgroundColor);
    }
    if (liDaPaleta.id !== `li${0}`) {
      liDaPaleta.style.backgroundColor = `rgb(${250 + index},250,250)`;
    }
  }
};
criaLiPaleta();

// Cria cores aleatórias, excetuando o branco
const criaCor = () => {
  const r = (Math.floor(Math.random() * 254)) + 1;
  const g = (Math.floor(Math.random() * 254)) + 1;
  const b = (Math.floor(Math.random() * 254)) + 1;
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
};

// Configura botão para alterar as cores da paleta
buttonRandom.addEventListener('click', () => {
  for (let index = 1; index < liColor.length; index += 1) {
    let coral = criaCor();
    while (cores.includes(coral)) {
      coral = criaCor();
    }
    cores[index] = coral;
    cores.push(`${coral}`);
    liColor[index].style.backgroundColor = coral;
    objetoPaleta[liColor[index].id] = coral;
  }
  localStorage.setItem('colorPalette', JSON.stringify(objetoPaleta));
});

// Altera a cor da paleta selecionada
ul.addEventListener('click', (evento) => {
  if (evento.target !== ul) {
    const selected = document.getElementsByClassName('selected')[0];
    selected.classList.remove('selected');
    evento.target.classList.add('selected');
  }
});

// Pinta os quadrados com a cor selecionada
sectionPixel.addEventListener('click', (evento) => {
  const corSelected = document.getElementsByClassName('selected')[0].style.backgroundColor;
  if (evento.target !== sectionPixel) {
    const eventoX = evento.target;
    eventoX.style.backgroundColor = corSelected;
    objetoPixel[evento.target.id] = corSelected;
    localStorage.setItem('pixelBoard', JSON.stringify(objetoPixel));
  }
});

// Limpa as cores dos quadrados
buttonLimpar.addEventListener('click', () => {
  for (let index = 0; index < pixelClasse.length; index += 1) {
    pixelClasse[index].style.backgroundColor = 'white';
    objetoPixel[`pixel${[index]}`] = 'white';
  }
  localStorage.setItem('pixelBoard', JSON.stringify(objetoPixel));
});

// Retorna um número entre 5 e 50
const range = (valor) => {
  if (valor < 5) {
    return 5;
  }
  if (valor > 50) {
    return 50;
  }
  return valor;
};

// Altera a quantidade de linhas e colunas de quadrados pintáveis, de maneira que os tamanhos dos lados sejam sempre iguais
buttonTamanho.addEventListener('click', () => {
  if (input.value.length > 0) {
    for (let index = pixelClasse.length - 1; index >= 0; index -= 1) {
      pixelClasse[index].remove();
    }
    localStorage.removeItem('pixelBoard');
    criadorDePixel(range(input.value));
    localStorage.setItem('boardSize', JSON.stringify(tamanho));
  } else {
    alert('Board inválido!');
  }
});

// Carrega o localStorage nos objetos
const resgataCores = () => {
  const colorPaletteInit = localStorage.getItem('colorPalette');
  if (colorPaletteInit) {
    objetoPaleta = JSON.parse(colorPaletteInit);
  }
  const pixelBoardInit = localStorage.getItem('pixelBoard');
  if (pixelBoardInit) {
    objetoPixel = JSON.parse(pixelBoardInit);
  }
};

resgataCores();

// aplica as cores dos objetos resgatados do LocalStorage
const aplicaCores = () => {
  for (let index = 1; index < liColor.length; index += 1) {
    const corResgatada = objetoPaleta[`li${index}`];
    document.getElementById(`li${index}`).style.backgroundColor = corResgatada;
  }
  for (let index = 0; index < pixelClasse.length; index += 1) {
    const corResgatada = objetoPixel[`pixel${index}`];
    document.getElementById(`pixel${index}`).style.backgroundColor = corResgatada;
  }
};

aplicaCores();
