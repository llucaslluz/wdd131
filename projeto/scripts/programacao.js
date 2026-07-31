const programacao = [
  {
    id: 1,
    inicio: "19h00",
    fim: "19h10",
    titulo: "Abertura espiritual e oração",
    tipo: "cerimonia",
    tipoNome: "Cerimônia",
    ala: "Organização do festival",
    duracao: 10,
    descricao:
      "Boas-vindas, breve orientação sobre o propósito do evento e oração inicial.",
    observacao:
      "Os participantes devem estar acomodados antes das 19h para que a programação comece pontualmente.",
    color: "#1f2a44"
  },
  {
    id: 2,
    inicio: "19h10",
    fim: "19h30",
    titulo: "Apresentação 1",
    tipo: "apresentacao",
    tipoNome: "Apresentação",
    ala: "A definir por sorteio",
    duracao: 20,
    descricao:
      "Primeiro bloco artístico da noite. A ala responsável será publicada após o sorteio com os bispos.",
    observacao:
      "A ala deverá estar preparada e próxima ao palco antes do término da abertura.",
    color: "#a61b2b"
  },
  {
    id: 3,
    inicio: "19h30",
    fim: "19h40",
    titulo: "Troca e preparação do palco",
    tipo: "intervalo",
    tipoNome: "Intervalo técnico",
    ala: "Equipes das apresentações 1 e 2",
    duracao: 10,
    descricao:
      "Tempo para retirada dos materiais da primeira apresentação e montagem da segunda.",
    observacao:
      "Aproximadamente 5 minutos para desmontagem e 5 minutos para preparação.",
    color: "#805d00"
  },
  {
    id: 4,
    inicio: "19h40",
    fim: "20h00",
    titulo: "Apresentação 2",
    tipo: "apresentacao",
    tipoNome: "Apresentação",
    ala: "A definir por sorteio",
    duracao: 20,
    descricao:
      "Segundo bloco artístico da noite. A ala responsável será publicada após o sorteio.",
    observacao:
      "Arquivos de áudio e vídeo deverão estar organizados e testados antecipadamente.",
    color: "#a61b2b"
  },
  {
    id: 5,
    inicio: "20h00",
    fim: "20h10",
    titulo: "Troca e preparação do palco",
    tipo: "intervalo",
    tipoNome: "Intervalo técnico",
    ala: "Equipes das apresentações 2 e 3",
    duracao: 10,
    descricao:
      "Retirada dos materiais da segunda apresentação e preparação do terceiro grupo.",
    observacao:
      "A equipe técnica deverá receber orientação clara do responsável de som de cada ala.",
    color: "#805d00"
  },
  {
    id: 6,
    inicio: "20h10",
    fim: "20h30",
    titulo: "Apresentação 3",
    tipo: "apresentacao",
    tipoNome: "Apresentação",
    ala: "A definir por sorteio",
    duracao: 20,
    descricao:
      "Terceiro bloco artístico da noite. A ala responsável será publicada após o sorteio.",
    observacao:
      "Os participantes devem permanecer juntos e preparados antes de serem chamados.",
    color: "#a61b2b"
  },
  {
    id: 7,
    inicio: "20h30",
    fim: "20h40",
    titulo: "Troca e preparação do palco",
    tipo: "intervalo",
    tipoNome: "Intervalo técnico",
    ala: "Equipes das apresentações 3 e 4",
    duracao: 10,
    descricao:
      "Organização do palco entre o terceiro e o quarto bloco artístico.",
    observacao:
      "Cenários complexos devem ser adaptados para respeitar o limite do intervalo.",
    color: "#805d00"
  },
  {
    id: 8,
    inicio: "20h40",
    fim: "21h00",
    titulo: "Apresentação 4",
    tipo: "apresentacao",
    tipoNome: "Apresentação",
    ala: "A definir por sorteio",
    duracao: 20,
    descricao:
      "Quarto bloco artístico da noite. A ala responsável será publicada após o sorteio.",
    observacao:
      "O responsável técnico da ala deverá permanecer próximo à equipe de som.",
    color: "#a61b2b"
  },
  {
    id: 9,
    inicio: "21h00",
    fim: "21h10",
    titulo: "Troca e preparação do palco",
    tipo: "intervalo",
    tipoNome: "Intervalo técnico",
    ala: "Equipes das apresentações 4 e 5",
    duracao: 10,
    descricao:
      "Retirada dos materiais da quarta apresentação e preparação da última ala.",
    observacao:
      "A última ala deverá estar totalmente preparada antes das 21h.",
    color: "#805d00"
  },
  {
    id: 10,
    inicio: "21h10",
    fim: "21h30",
    titulo: "Apresentação 5",
    tipo: "apresentacao",
    tipoNome: "Apresentação",
    ala: "A definir por sorteio",
    duracao: 20,
    descricao:
      "Quinto e último bloco artístico da programação principal.",
    observacao:
      "Após a apresentação, os materiais devem ser retirados com organização.",
    color: "#a61b2b"
  },
  {
    id: 11,
    inicio: "21h30",
    fim: "21h45",
    titulo: "Mensagem final e oração",
    tipo: "encerramento",
    tipoNome: "Encerramento",
    ala: "Organização do festival",
    duracao: 15,
    descricao:
      "Mensagem de encerramento, agradecimentos e oração final.",
    observacao:
      "O público deverá permanecer no local até a conclusão da mensagem.",
    color: "#2f6f4e"
  },
  {
    id: 12,
    inicio: "21h45",
    fim: "22h00",
    titulo: "Margem de segurança e organização",
    tipo: "organizacao",
    tipoNome: "Organização",
    ala: "Equipe do evento",
    duracao: 15,
    descricao:
      "Período reservado para pequenos atrasos, ajustes e organização final do espaço.",
    observacao:
      "Essa margem ajuda a garantir que o evento seja encerrado até as 22h.",
    color: "#34415f"
  }
];

const typeFilter = document.querySelector("#type-filter");
const searchInput = document.querySelector("#schedule-search");
const clearFiltersButton = document.querySelector("#clear-filters");
const resultsSummary = document.querySelector("#results-summary");
const programContainer = document.querySelector("#program-container");
const dialog = document.querySelector("#program-dialog");
const dialogBody = document.querySelector("#dialog-body");
const dialogCloseButton = document.querySelector("#dialog-close");

function normalizeText(value) {
  return `${value}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function filterSchedule() {
  const selectedType = `${typeFilter.value}`;
  const searchTerm = normalizeText(searchInput.value);

  return programacao.filter((item) => {
    const matchesType =
      selectedType === "todos" || item.tipo === selectedType;

    const searchableContent = normalizeText(
      `${item.titulo} ${item.tipoNome} ${item.ala} ${item.descricao}`
    );

    const matchesSearch =
      searchTerm === "" || searchableContent.includes(searchTerm);

    return matchesType && matchesSearch;
  });
}

function renderSchedule(items) {
  resultsSummary.textContent =
    `${items.length} item${items.length === 1 ? "" : "s"} encontrado${items.length === 1 ? "" : "s"}.`;

  if (items.length === 0) {
    programContainer.innerHTML = `
      <div class="empty-state">
        <h2>Nenhum item encontrado</h2>
        <p>Altere o filtro ou apague parte do texto pesquisado.</p>
      </div>
    `;
    return;
  }

  programContainer.innerHTML = items
    .map(
      (item) => `
        <article class="program-card" style="--card-color: ${item.color};">
          <div class="program-time">
            <time>${item.inicio}</time>
            <span>– ${item.fim}</span>
          </div>

          <div>
            <h2>${item.titulo}</h2>

            <div class="program-meta">
              <span>${item.tipoNome}</span>
              <span>${item.duracao} minutos</span>
              <span>${item.ala}</span>
            </div>

            <p>${item.descricao}</p>

            <button
              class="details-button"
              type="button"
              data-id="${item.id}"
            >
              Ver orientação detalhada
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function openDetails(itemId) {
  const selectedItem = programacao.find(
    (item) => item.id === Number(itemId)
  );

  if (!selectedItem) {
    return;
  }

  dialogBody.innerHTML = `
    <p class="eyebrow">${selectedItem.tipoNome}</p>
    <h2>${selectedItem.titulo}</h2>
    <p><strong>Horário:</strong> ${selectedItem.inicio}–${selectedItem.fim}</p>
    <p><strong>Responsável:</strong> ${selectedItem.ala}</p>
    <p>${selectedItem.descricao}</p>
    <div class="notice">
      <h3>Orientação</h3>
      <p>${selectedItem.observacao}</p>
    </div>
  `;

  dialog.showModal();
  dialogCloseButton.focus();
}

function updateSchedule() {
  renderSchedule(filterSchedule());
}

function clearFilters() {
  typeFilter.value = "todos";
  searchInput.value = "";
  updateSchedule();
  searchInput.focus();
}

function initializeSchedulePage() {
  renderSchedule(programacao);

  typeFilter.addEventListener("change", updateSchedule);
  searchInput.addEventListener("input", updateSchedule);
  clearFiltersButton.addEventListener("click", clearFilters);

  programContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".details-button");

    if (button) {
      openDetails(button.dataset.id);
    }
  });

  dialogCloseButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}

document.addEventListener("DOMContentLoaded", initializeSchedulePage);
