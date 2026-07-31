const produtos = [
  {
    id: "fc-1888",
    nome: "capacitor de fluxo",
    classificacaomedia: 4.5
  },
  {
    id: "fc-2050",
    nome: "fios elétricos",
    classificacaomedia: 4.7
  },
  {
    id: "fs-1987",
    nome: "circuitos de tempo",
    classificacaomedia: 3.5
  },
  {
    id: "ac-2000",
    nome: "reator de baixa tensão",
    classificacaomedia: 3.9
  },
  {
    id: "jj-1969",
    nome: "equalizador de distorção",
    classificacaomedia: 5.0
  }
];

const productSelect = document.querySelector("#produto");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

function createProductOptions() {
  produtos.forEach((produto) => {
    const option = document.createElement("option");

    option.value = produto.id;
    option.textContent = produto.nome;

    productSelect.appendChild(option);
  });
}

function updateFooter() {
  const today = new Date();

  currentYear.textContent = today.getFullYear();
  lastModified.textContent = document.lastModified;
}

createProductOptions();
updateFooter();