let percentShirts = document.querySelector(".percent-shirts");
let percentAccessories = document.querySelector(".percent-accessories");
let percentShoes = document.querySelector(".percent-shoes");
let percentShorts = document.querySelector(".percent-shorts");

let minimumPercentShirts = document.querySelector(".minimum-percent-shirts");
let minimumPercentAcc = document.querySelector(".minimum-percent-acc");
let minimumPercentShoes = document.querySelector(".minimum-percent-shoes");
let minimumPercentShorts = document.querySelector(".minimum-percent-shorts");

let totalProducts = document.querySelector(".total-products");

let productInput = document.querySelector(".product-input");
let categorySelect = document.querySelector(".category-select");
let quantityInput = document.querySelector(".quantity-input");

let selectInputStock = document.querySelector(".select-input");
let editName = document.querySelector(".edit-name");
let editQuantity = document.querySelector(".edit-quantity");

const exportBtn = document.getElementById("exportBtn");

const languageSelector = document.querySelector("selector-lang");

const miniValuePercent = 10;

let shirtsTotal = 0;
let accTotal = 0;
let shoesTotal = 0;
let shortsTotal = 0;
let totalItens = 0;

let arrayProdutos = [];

const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");
const editBtn = document.querySelector(".edit-button");
const deleteBtn = document.querySelector(".delete-button");

let index = 0;
let indexArr = 0;

submitBtn.addEventListener("click", readItem);
editBtn.addEventListener("click", editItem);
deleteBtn.addEventListener("click", deleteItem);

categorySelect.addEventListener("change", () => {
  index = categorySelect.selectedIndex;
});

function readItem() {
  let produto = {
    nome: productInput.value,
    quantidade: parseInt(quantityInput.value),
    categoria: categorySelect[index].value,
    id: Math.random().toString(36).substr(2, 9),
  };

  if (arrayProdutos.find(({ nome }) => nome === produto.nome)) {
    for (let i = 0; i < arrayProdutos.length; i++) {
      if (arrayProdutos[i].nome == produto.nome) {
        arrayProdutos[i].quantidade += produto.quantidade;
        break;
      }
    }
  } else {
    arrayProdutos.push(produto);
  }

  updateTotal(produto);
  addItens(produto, 0);
}

function updateTotal(prod) {
  totalItens += prod.quantidade;
  totalProducts.innerHTML = totalItens;
}

//Função para adicionar os itens assim que o botão é pressionado
//A função chama as outras dentro dela mesma
function addItens(obj, qtdAntiga) {
  if (obj.categoria == "shirts" && obj.nome != "") {
    shirtsTotal -= qtdAntiga;
    shirtsTotal += obj.quantidade;
  } else if (obj.categoria == "accessories" && obj.nome != "") {
    accTotal -= qtdAntiga;
    accTotal += obj.quantidade;
  } else if (obj.categoria == "shoes" && obj.nome != "") {
    shoesTotal -= qtdAntiga;
    shoesTotal += obj.quantidade;
  } else if (obj.categoria == "shorts" && obj.nome != "") {
    shortsTotal -= qtdAntiga;
    shortsTotal += obj.quantidade;
  } else {
    window.alert("Preencha todos os campos");
  }

  productInput.value = "";
  quantityInput.value = "";
  updateTexts();
  saveDataToLocalStorage();
  selectAdd();
  percentShirts.innerHTML = percentageUpdates(shirtsTotal) + "%";
  percentAccessories.innerHTML = percentageUpdates(accTotal) + "%";
  percentShoes.innerHTML = percentageUpdates(shoesTotal) + "%";
  percentShorts.innerHTML = percentageUpdates(shortsTotal) + "%";
}

//Atualiza os textos, como total de produtos e a cor dos valores mínimos
function updateTexts() {
  totalItens = shirtsTotal + accTotal + shoesTotal + shortsTotal;
  totalProducts.innerHTML = totalItens;

  updatePercentageColors();
}

//Função especializada em atualizar as cores dos spans de valores mínimos
function updatePercentageColors() {
  let percentageShirts = percentageUpdates(shirtsTotal);
  let percentageAccessories = percentageUpdates(accTotal);
  let percentageShoes = percentageUpdates(shoesTotal);
  let percentageShorts = percentageUpdates(shortsTotal);

  percentShirts.innerHTML = percentageShirts + "%";
  percentAccessories.innerHTML = percentageAccessories + "%";
  percentShoes.innerHTML = percentageShoes + "%";
  percentShorts.innerHTML = percentageShorts + "%";

  setPercentageColor(percentageShirts, minimumPercentShirts);
  setPercentageColor(percentageAccessories, minimumPercentAcc);
  setPercentageColor(percentageShoes, minimumPercentShoes);
  setPercentageColor(percentageShorts, minimumPercentShorts);
}

//Função especializada em mudar a cor, recebendo dois parâmetros
function setPercentageColor(percentage, element) {
  if (percentage < miniValuePercent) {
    element.style.color = "red";
  } else {
    element.style.color = ""; // Reset color to default
  }
}

//Função que retorna o novo valor de porcentagem que será aplicado no HTML
function percentageUpdates(toUpdate) {
  let newPercentage = 0;
  newPercentage = Math.floor((toUpdate * 100) / totalItens);

  if (isNaN(newPercentage)) {
    return 0;
  } else {
    return newPercentage;
  }
}

// Salvar no local storage
function saveDataToLocalStorage() {
  const dataToSave = {
    shirtsTotal,
    accTotal,
    shoesTotal,
    shortsTotal,
    totalItens,
    arrayProdutos,
  };

  localStorage.setItem("inventoryData", JSON.stringify(dataToSave));
}

// Carregar no local storage
function loadDataFromLocalStorage() {
  const savedData = localStorage.getItem("inventoryData");

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    shirtsTotal = parsedData.shirtsTotal || 0;
    accTotal = parsedData.accTotal || 0;
    shoesTotal = parsedData.shoesTotal || 0;
    shortsTotal = parsedData.shortsTotal || 0;
    totalItens = parsedData.totalItens || 0;
    arrayProdutos = parsedData.arrayProdutos || [];

    updateTexts();
    selectAdd();
    updatePercentageColors();
  }
}

// Chama quando carrega a página
window.addEventListener("load", loadDataFromLocalStorage);

function showAddMessage() {
  successMessage.classList.add("show-message");
  setTimeout(() => {
    successMessage.classList.remove("show-message");
  }, 3000);
}

const editContainer = document.querySelector(".edit-container");
const openEditButton = document.getElementById("submitBtn2");
const mainContainer = document.querySelector(".container");

openEditButton.addEventListener("click", () => {
  editContainer.style.display = "block";
  mainContainer.style.display = "none";
});

// Seletor do botão "Voltar"
const backButton = document.getElementById("backBtn");

// Adicione um ouvinte de evento para esconder a div.edit-container quando o botão "Voltar" é clicado
backButton.addEventListener("click", () => {
  mainContainer.style.display = "block";
  editContainer.style.display = "none";
});

function mostrarMensagem() {
  document.getElementById("message-box").style.display = "block";
}

function excluir() {
  // Aqui você pode adicionar a lógica para excluir o item
  alert("Item excluído!");
  fecharMensagem();
}

function fecharMensagem() {
  document.getElementById("message-box").style.display = "none";
}

function selectAdd() {
  selectInputStock.options.length = 0;

  for (let i = 0; i < arrayProdutos.length; i++) {
    let newElement = document.createElement("option");
    let content = arrayProdutos[i].nome + " x" + arrayProdutos[i].quantidade;
    newElement.textContent = content;
    newElement.value = arrayProdutos[i].id;
    selectInputStock.appendChild(newElement);
  }
}

selectInputStock.addEventListener("change", () => {
  indexArr = selectInputStock.selectedIndex;
});

function editItem() {
  let qtd = arrayProdutos[indexArr].quantidade;

  if (editName.value == "" && editQuantity.value == "") {
    window.alert("Escreva o nome ou a quantidade.");
  } else if (editName.value != "" && editQuantity.value != "") {
    arrayProdutos[indexArr].nome = editName.value;
    arrayProdutos[indexArr].quantidade = parseInt(editQuantity.value);
    addItens(arrayProdutos[indexArr], qtd);
  } else if (editName.value != "") {
    arrayProdutos[indexArr].nome = editName.value;
    addItens(arrayProdutos[indexArr]);
  } else if (editQuantity.value != "") {
    totalItens -= arrayProdutos[indexArr].quantidade;
    arrayProdutos[indexArr].quantidade = parseInt(editQuantity.value);
    addItens(arrayProdutos[indexArr], qtd);
  }
}

function deleteItem() {
  let novaQtd = arrayProdutos[indexArr].quantidade;
  let obejeto = arrayProdutos[indexArr];
  if (obejeto.categoria == "shirts") {
    shirtsTotal -= novaQtd;
  } else if (obejeto.categoria == "accessories") {
    accTotal -= novaQtd;
  } else if (obejeto.categoria == "shoes") {
    shoesTotal -= novaQtd;
  } else {
    shortsTotal -= novaQtd;
  }
  arrayProdutos.splice(indexArr, 1);
  selectAdd();
  updateTexts();
}

exportBtn.addEventListener("click", () => {
  exportToCSV();
});

function exportToCSV() {
  const dataToExport = [
    { Categoria: "Camisetas", Quantidade: shirtsTotal },
    { Categoria: "Acessórios", Quantidade: accTotal },
    { Categoria: "Calçados", Quantidade: shoesTotal },
    { Categoria: "Shorts", Quantidade: shortsTotal },
  ];

  const csvHeader = "Categoria,Quantidade\n";

  const csvData = dataToExport
    .map((item) => {
      return `${item.Categoria},${item.Quantidade}`;
    })
    .join("\n");

  const csvContent = csvHeader + csvData;
  const blob = new Blob([csvContent], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "relatorio_estoque.csv";
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
