const confirmationTitle = document.querySelector("#confirmation-title");
const confirmationMessage = document.querySelector("#confirmation-message");
const summaryContainer = document.querySelector("#confirmation-summary");
const registrationCounter = document.querySelector("#registration-counter");
const confirmationActions = document.querySelector("#confirmation-actions");

const roleLabels = {
  palco: "Apresentação no palco",
  bastidores: "Apoio nos bastidores",
  tecnologia: "Tecnologia, áudio ou projeção",
  organizacao: "Organização e apoio geral",
  figurino: "Figurino, maquiagem ou cenário",
  aindaNaoSei: "Ainda não decidiu"
};

const participantLabels = {
  jovem: "Jovem",
  lider: "Líder",
  familiar: "Familiar ou visitante"
};

function getSubmittedData() {
  const parameters = new URLSearchParams(window.location.search);

  return {
    registrationId: `${parameters.get("registrationId") || ""}`,
    name: `${parameters.get("name") || ""}`,
    ward: `${parameters.get("ward") || ""}`,
    participantType: `${parameters.get("participantType") || ""}`,
    leadershipRole: `${parameters.get("leadershipRole") || ""}`,
    preferredRole: `${parameters.get("preferredRole") || ""}`,
    availability: parameters.getAll("availability"),
    message: `${parameters.get("message") || ""}`,
    registrationDate: `${parameters.get("registrationDate") || ""}`
  };
}

function formatAvailability(values) {
  const labels = {
    semana: "Dias de semana",
    sabado: "Sábados",
    domingo: "Domingos",
    combinar: "A combinar"
  };

  if (values.length === 0) {
    return `Não informada`;
  }

  return values
    .map((value) => `${labels[value] || value}`)
    .join(", ");
}

function countUniqueRegistration(registrationId) {
  const currentCount = Number(
    localStorage.getItem("festivalRegistrationCount") || 0
  );

  let countedRegistrations = [];

  try {
    countedRegistrations = JSON.parse(
      localStorage.getItem("festivalCountedRegistrations") || "[]"
    );
  } catch (error) {
    console.error(`Não foi possível ler os registros contados: ${error.message}`);
  }

  const isNewRegistration =
    registrationId !== "" &&
    !countedRegistrations.includes(registrationId);

  if (!isNewRegistration) {
    return currentCount;
  }

  const updatedCount = currentCount + 1;
  countedRegistrations.push(registrationId);

  localStorage.setItem(
    "festivalRegistrationCount",
    `${updatedCount}`
  );
  localStorage.setItem(
    "festivalCountedRegistrations",
    JSON.stringify(countedRegistrations)
  );

  return updatedCount;
}

function renderValidConfirmation(data) {
  const displayName = data.name.trim() || "Participante";
  const participantText =
    participantLabels[data.participantType] || data.participantType;
  const preferredRoleText =
    roleLabels[data.preferredRole] || data.preferredRole;
  const leadershipText =
    data.participantType === "lider" && data.leadershipRole
      ? data.leadershipRole
      : "Não se aplica";
  const messageText = data.message.trim() || "Nenhuma observação enviada";
  const totalRegistrations = countUniqueRegistration(data.registrationId);

  confirmationTitle.textContent = `Obrigado, ${displayName}!`;
  confirmationMessage.textContent =
    `Sua manifestação de interesse foi registrada neste navegador. Procure também os líderes da sua ala para confirmar sua participação.`;

  summaryContainer.innerHTML = `
    <dl>
      <dt>Ala</dt>
      <dd>${data.ward}</dd>

      <dt>Participante</dt>
      <dd>${participantText}</dd>

      <dt>Função desejada</dt>
      <dd>${preferredRoleText}</dd>

      <dt>Função de liderança</dt>
      <dd>${leadershipText}</dd>

      <dt>Disponibilidade</dt>
      <dd>${formatAvailability(data.availability)}</dd>

      <dt>Observação</dt>
      <dd>${messageText}</dd>
    </dl>
  `;

  registrationCounter.textContent = `${totalRegistrations}`;
}

function renderInvalidConfirmation() {
  confirmationTitle.textContent = `Não encontramos um envio válido`;
  confirmationMessage.textContent =
    `Volte ao formulário e preencha os campos obrigatórios para registrar sua manifestação de interesse.`;

  summaryContainer.innerHTML = `
    <p>
      Esta página deve ser aberta após o envio do formulário de participação.
    </p>
  `;

  registrationCounter.textContent =
    `${localStorage.getItem("festivalRegistrationCount") || 0}`;

  confirmationActions.innerHTML = `
    <a class="button button-primary" href="prepare-se.html#formulario-interesse">
      Voltar ao formulário
    </a>
  `;
}

function initializeConfirmationPage() {
  const submittedData = getSubmittedData();
  const hasRequiredData =
    submittedData.registrationId !== "" &&
    submittedData.ward !== "" &&
    submittedData.participantType !== "" &&
    submittedData.preferredRole !== "";

  if (hasRequiredData) {
    renderValidConfirmation(submittedData);
  } else {
    renderInvalidConfirmation();
  }
}

document.addEventListener("DOMContentLoaded", initializeConfirmationPage);
