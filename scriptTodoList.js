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
