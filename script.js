//===============================================================================================================
// =========================================  Script Trybewarts =================================================
//===============================================================================================================
const btnEntra = document.getElementById('btnEntrar');
const loginEmail = document.getElementById('email');
const loginSenha = document.getElementById('senha');
const checkBox = document.getElementById('agreement');
const btnSubmit = document.getElementById('submit-btn');
const textArea = document.getElementById('textarea');
const counter = document.getElementById('counter');
const evaluationForm = document.getElementById('evaluation-form');
const formData = document.getElementById('form-data');

function transferDataSimple(id, idTextoInserir) {
  const elemento = document.getElementById(id);
  const input = document.getElementById(idTextoInserir).value;
  const aux = elemento.innerText;
  elemento.innerText = `${aux} ${input}`;
}

function transferDataRadio(id, nameTextoInserir) {
  const elemento = document.getElementById(id);
  const elementosName = document.getElementsByName(nameTextoInserir);
  let input = '';
  for (let index = 0; index < elementosName.length; index += 1) {
    const element = elementosName[index];
    if (element.checked === true) {
      input = element.value;
    }
  }
  const aux = elemento.innerText;
  elemento.innerText = `${aux} ${input}`;
}

function transferDataCheckbox(id, nameTextoInserir) {
  const elemento = document.getElementById(id);
  const elementosName = document.getElementsByClassName(nameTextoInserir);
  let input = '';
  for (let index = 0; index < elementosName.length; index += 1) {
    const element = elementosName[index];
    if (element.checked === true) {
      // let temp = input;
      input = `${input} ${element.value},`;
    }
  }
  const aux = elemento.innerText;
  elemento.innerText = `${aux} ${input}`;
}

btnEntra.addEventListener('click', (event) => {
  event.preventDefault();
  if (loginEmail.value === 'tryber@teste.com' && loginSenha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
});

checkBox.addEventListener('click', () => {
  if (checkBox.checked === true) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
});

// Contador de caracteres
textArea.addEventListener('keyup', () => { // utiliza o evento keyup, para rodar apenas quando levantar a tecla (no keydown estava bugando)
  let counterTemp = 500; // cria uma váriável com o valor máximo de caracteres (poderia usar o textarea.length para ficar dinâmico)
  counterTemp = 500 - (textArea.value.length); // atualiza a váriável diminuindo de seu valor total o length do textarea
  counter.innerText = counterTemp; // insere no contador o novo valor da contagem
});

btnSubmit.addEventListener('click', (event) => { // insere o evento click no botão de enviar
  event.preventDefault(); // retira as configurações padrões do botão
  evaluationForm.style.display = 'none'; // altera o display do form para none, de maneira que ele desapareça da página (o requisito 21 pede isso)
  transferDataSimple('form-data-nome', 'input-name');
  transferDataSimple('form-data-nome', 'input-lastname');
  transferDataSimple('form-casa', 'house');
  transferDataSimple('form-email', 'input-email');
  transferDataRadio('form-familia', 'family');
  transferDataCheckbox('form-materias', 'subject');
  transferDataRadio('form-avaliacao', 'rate');
  transferDataSimple('form-observacoes', 'textarea');
  formData.style.display = 'flex'; // Altera o display do form-data, inicialmente none, para flex
});

//===============================================================================================================
// =========================================  Script ToDoList ===================================================
//===============================================================================================================
// Criação das constantes dos elementos
const criarTarefa = document.getElementById('criar-tarefa');
const removerFinalizados = document.getElementById('remover-finalizados');
const moverParaCima = document.getElementById('mover-cima');
const moverParaBaixo = document.getElementById('mover-baixo');
const removerSelecionado = document.getElementById('remover-selecionado');
const apagarTudo = document.getElementById('apaga-tudo');
const input = document.getElementById('texto-tarefa');
const ol = document.getElementById('lista-tarefas');
const classeSelected2 = document.querySelector('.selected');
const salvarTarefas = document.getElementById('salvar-tarefas');
let arrayDeLi = [];

const criaLi = (textoInput) => {
  const elemento = document.createElement('li');
  ol.appendChild(elemento);
  elemento.innerText = textoInput;
  arrayDeLi.push(elemento.innerHTML);
};

function localStorageOl() {
  localStorage.setItem('lista', ol.innerHTML);
  localStorage.setItem('arrayDeLi2', JSON.stringify(arrayDeLi));
}

criarTarefa.addEventListener('click', () => {
  criaLi(input.value);
  input.value = null;
});

ol.addEventListener('click', (event) => {
  const classeSelected = document.getElementsByClassName('selected')[0];
  if (classeSelected) {
    classeSelected.classList.remove('selected');
  }
  const itemClicado = event.target;
  itemClicado.classList.add('selected');
});

ol.addEventListener('dblclick', (event) => {
  const itemClicado = event.target;
  itemClicado.classList.toggle('completed');
});

apagarTudo.addEventListener('click', () => {
  ol.innerText = '';
  arrayDeLi = [];
});

removerFinalizados.addEventListener('click', () => {
  const finalizados = document.getElementsByClassName('completed');
  for (let index = finalizados.length - 1; index >= 0; index -= 1) {
    const element = finalizados[index];
    element.remove();
  }
});

salvarTarefas.addEventListener('click', () => {
  localStorageOl();
});

removerSelecionado.addEventListener('click', () => {
  document.getElementsByClassName('selected')[0].remove();
});

window.onload = () => {
  ol.innerHTML = localStorage.getItem('lista');
  for (let index = 0; index < ol.childElementCount - 1; index += 1) {
    arrayDeLi[index] = ol.children[index].innerText;
  }
};

moverParaCima.addEventListener('click', () => {
  if (classeSelected2 !== undefined) { // Se houver alguma LI selecionada
    const classeSelected = document.getElementsByClassName('selected')[0]; // Salve essa LI em classSelected
    const indiceArray = arrayDeLi.indexOf(classeSelected.innerHTML); // indiceArray recebe o índice do arrayDeLi referente ao LI selecionado
    if (classeSelected !== undefined && indiceArray > 0) { // Se houve LI selecionada e ela não for a primeira
      const temporarioChildren2 = classeSelected.outerHTML; // Salve o html da LI selecionada
      classeSelected.remove(); // Remova a LI selecionada
      ol.children[indiceArray - 1].insertAdjacentHTML('beforebegin', temporarioChildren2); // Adicione a cópia da LI removida antes da LI anterior a ela antes de ser removida
      const temporario = arrayDeLi[indiceArray - 1];
      arrayDeLi[indiceArray - 1] = arrayDeLi[indiceArray];
      arrayDeLi[indiceArray] = temporario;
    }
  }
});

moverParaBaixo.addEventListener('click', () => {
  if (classeSelected2 !== undefined) {
    const classeSelected = document.getElementsByClassName('selected')[0];
    const indiceArray = arrayDeLi.indexOf(classeSelected.innerHTML);
    if (indiceArray < (arrayDeLi.length) - 1) {
      const temporarioChildren2 = classeSelected.outerHTML;
      classeSelected.remove();
      ol.children[indiceArray].insertAdjacentHTML('afterend', temporarioChildren2);
      const temporario = arrayDeLi[indiceArray + 1];
      arrayDeLi[indiceArray + 1] = arrayDeLi[indiceArray];
      arrayDeLi[indiceArray] = temporario;
    }
  }
});


//===============================================================================================================
// =========================================  Script Pixels Art =================================================
//===============================================================================================================

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
const input2 = document.getElementById('board-size');
const buttonTamanho = document.getElementById('generate-board');
const ul = document.getElementsByTagName('ul')[0];

// Configuração extras de elementos
input2.setAttribute('type', 'number');
input2.setAttribute('min', 1);

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
  if (input2.value.length > 0) {
    for (let index = pixelClasse.length - 1; index >= 0; index -= 1) {
      pixelClasse[index].remove();
    }
    localStorage.removeItem('pixelBoard');
    criadorDePixel(range(input2.value));
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
