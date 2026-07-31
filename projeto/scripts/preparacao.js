const preparationTasks = [
  {
    id: "proposito",
    text: "Conhecer o propósito do Festival de Artes."
  },
  {
    id: "lideres",
    text: "Conversar com os líderes da minha ala."
  },
  {
    id: "funcao",
    text: "Escolher uma função na apresentação."
  },
  {
    id: "ensaios",
    text: "Participar dos ensaios e reuniões de organização."
  },
  {
    id: "figurino",
    text: "Separar figurino, materiais e objetos necessários."
  },
  {
    id: "arquivos",
    text: "Confirmar músicas, vídeos e arquivos técnicos."
  },
  {
    id: "horario",
    text: "Conferir o horário e a ordem da apresentação."
  },
  {
    id: "transporte",
    text: "Organizar transporte e horário de chegada."
  }
];

const checklistContainer = document.querySelector("#preparation-checklist");
const progressBar = document.querySelector("#progress-bar");
const progressText = document.querySelector("#progress-text");
const resetChecklistButton = document.querySelector("#reset-checklist");
const participantType = document.querySelector("#participant-type");
const leadershipField = document.querySelector("#leadership-field");
const leadershipRole = document.querySelector("#leadership-role");
const interestForm = document.querySelector("#interest-form");
const registrationId = document.querySelector("#registration-id");
const registrationDate = document.querySelector("#registration-date");
const wardSelect = document.querySelector("#ward");
const restoredMessage = document.querySelector("#restored-message");

function loadCompletedTasks() {
  const storedTasks = localStorage.getItem("festivalPreparationTasks");

  if (!storedTasks) {
    return [];
  }

  try {
    const parsedTasks = JSON.parse(storedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    console.error(`Não foi possível carregar o checklist: ${error.message}`);
    return [];
  }
}

function saveCompletedTasks(taskIds) {
  localStorage.setItem(
    "festivalPreparationTasks",
    JSON.stringify(taskIds)
  );
}

function renderChecklist() {
  const completedTasks = loadCompletedTasks();

  checklistContainer.innerHTML = preparationTasks
    .map(
      (task) => `
        <li class="checklist-item ${completedTasks.includes(task.id) ? "completed" : ""}">
          <input
            type="checkbox"
            id="task-${task.id}"
            value="${task.id}"
            ${completedTasks.includes(task.id) ? "checked" : ""}
          >
          <label for="task-${task.id}">
            <span>${task.text}</span>
          </label>
        </li>
      `
    )
    .join("");

  updateProgress();
}

function getCheckedTaskIds() {
  return [...checklistContainer.querySelectorAll('input[type="checkbox"]:checked')]
    .map((checkbox) => `${checkbox.value}`);
}

function updateProgress() {
  const checkedTasks = getCheckedTaskIds();
  const percentage = Math.round(
    (checkedTasks.length / preparationTasks.length) * 100
  );

  progressBar.style.width = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", `${percentage}`);
  progressText.textContent =
    `${checkedTasks.length} de ${preparationTasks.length} tarefas concluídas (${percentage}%).`;

  checklistContainer
    .querySelectorAll(".checklist-item")
    .forEach((item) => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      item.classList.toggle("completed", checkbox.checked);
    });

  saveCompletedTasks(checkedTasks);
}

function resetChecklist() {
  const confirmed = window.confirm(
    "Deseja desmarcar todas as tarefas da lista de preparação?"
  );

  if (!confirmed) {
    return;
  }

  localStorage.removeItem("festivalPreparationTasks");
  renderChecklist();
}

function updateConditionalFields() {
  const isLeader = participantType.value === "lider";

  leadershipField.hidden = !isLeader;
  leadershipRole.required = isLeader;

  if (!isLeader) {
    leadershipRole.value = "";
  }
}

function createRegistrationId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return `${window.crypto.randomUUID()}`;
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function restoreWardPreference() {
  const savedWard = localStorage.getItem("festivalPreferredWard");

  if (!savedWard) {
    return;
  }

  const optionExists = [...wardSelect.options].some(
    (option) => option.value === savedWard
  );

  if (optionExists) {
    wardSelect.value = savedWard;
    restoredMessage.textContent =
      `Sua última ala selecionada foi restaurada neste navegador.`;
    restoredMessage.hidden = false;
  }
}

function prepareFormSubmission() {
  registrationId.value = `${createRegistrationId()}`;
  registrationDate.value = `${new Date().toISOString()}`;
}

function handleFormSubmit() {
  localStorage.setItem(
    "festivalPreferredWard",
    `${wardSelect.value}`
  );
}

function initializePreparationPage() {
  renderChecklist();
  restoreWardPreference();
  updateConditionalFields();
  prepareFormSubmission();

  checklistContainer.addEventListener("change", updateProgress);
  resetChecklistButton.addEventListener("click", resetChecklist);
  participantType.addEventListener("change", updateConditionalFields);
  interestForm.addEventListener("submit", handleFormSubmit);
}

document.addEventListener("DOMContentLoaded", initializePreparationPage);
