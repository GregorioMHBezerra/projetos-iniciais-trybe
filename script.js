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
