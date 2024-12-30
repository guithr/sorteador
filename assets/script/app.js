// Seleção de elementos
const form = document.querySelector("form");
const quantityInput = document.getElementById("quantity");
const rangeMin = document.getElementById("range-min");
const rangeMax = document.getElementById("range-max");
const formHeader = document.querySelector(".form-header");
const formHeading = document.querySelector(".form-heading");
const formSubHeading = document.querySelector(".form-subheading");

// Variável para rastrear o número do sorteio
let currentResultNumber = 1;

// Função principal: Lida com o envio do formulário
const handleSubmit = (event) => {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const quantity = sanitizeInput(quantityInput.value);
  const min = sanitizeInput(rangeMin.value);
  const max = sanitizeInput(rangeMax.value);

  if (!validateInput(min, max)) return;

  const results = generateResults(quantity, min, max);

  updateUIForResults(results);
};

// Validação dos inputs
const validateInput = (min, max) => {
  if (min > max) {
    alert("O valor mínimo não pode ser maior que o máximo.");
    return false;
  }
  return true;
};

// Limpa caracteres não numéricos do input
const sanitizeInput = (input) => Number(input.replace(/\D/g, ""));

// Gera números aleatórios dentro de um intervalo
const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Gera o array de resultados com base na quantidade e no intervalo
const generateResults = (quantity, min, max) =>
  Array.from({ length: quantity }, () => generateRandomNumber(min, max));

// Atualiza a interface para exibir os resultados
const updateUIForResults = (results) => {
  removeUnnecessaryElements();
  updateFormHeaders();
  displayResults(results);
  updateSubmitButton();
};

// Remove elementos desnecessários do formulário
// Aqui eu quero deixar eles invisivel, para quando necessário chama-los novamente.
const removeUnnecessaryElements = () => {
  const input = document.querySelector(".input-group");
  const toggleSwitch = document.querySelector(".form-toggle");

  input.style.display = "none";
  toggleSwitch.style.display = "none";
};

// Atualiza os cabeçalhos do formulário
const updateFormHeaders = () => {
  if (formHeading) {
    formHeading.textContent = "Resultado do sorteio:";
    formHeading.style.textAlign = "center";
  }

  if (formSubHeading) {
    formSubHeading.textContent = `${currentResultNumber}º resultado`;
    formSubHeading.style.textAlign = "center";
    formSubHeading.style.textTransform = "uppercase";
    formSubHeading.style.marginBottom = "2.5rem";
  }
};

// Exibe os resultados no HTML
const displayResults = (results) => {
  const resultNumbers = document.createElement("div");
  resultNumbers.classList.add("result-numbers");

  results.forEach((result, index) => {
    const numberElement = document.createElement("span");
    numberElement.textContent = `${result}`;
    numberElement.classList.add("result-item");
    resultNumbers.appendChild(numberElement);
  });

  currentResultNumber++;

  formHeader.append(resultNumbers);
};

// Atualiza o botão de envio para "Sortear novamente"
const updateSubmitButton = () => {
  const buttonSubmit = document.querySelector(".submit-button");
  buttonSubmit.innerHTML = `Sortear novamente <img src="./assets/images/icons/again.svg" alt="Ícone sortear novamente" class="again">`;
};

// Adiciona o evento ao formulário
form.onsubmit = handleSubmit;
