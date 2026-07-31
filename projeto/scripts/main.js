const growthAreas = [
  {
    name: "Espiritual",
    icon: "✦",
    description:
      "Desenvolver fé, testemunho, valores e a capacidade de transmitir mensagens edificantes por meio da arte.",
    color: "#a61b2b"
  },
  {
    name: "Intelectual",
    icon: "💡",
    description:
      "Estimular criatividade, planejamento, estudo, escrita, organização e aprendizado de novas habilidades.",
    color: "#1f2a44"
  },
  {
    name: "Social",
    icon: "🤝",
    description:
      "Fortalecer amizades, comunicação, cooperação, respeito e trabalho em equipe.",
    color: "#2f6f4e"
  },
  {
    name: "Física",
    icon: "★",
    description:
      "Desenvolver expressão corporal, movimento, coordenação, dança e participação ativa nas apresentações.",
    color: "#7d1420"
  }
];

const schedulePreview = [
  {
    time: "19h00",
    activity: "Abertura espiritual e oração",
    detail: "Início oficial do festival",
    color: "#1f2a44"
  },
  {
    time: "19h10",
    activity: "Apresentação 1",
    detail: "Ala definida posteriormente por sorteio",
    color: "#a61b2b"
  },
  {
    time: "19h40",
    activity: "Apresentação 2",
    detail: "Ala definida posteriormente por sorteio",
    color: "#a61b2b"
  },
  {
    time: "20h10",
    activity: "Apresentação 3",
    detail: "Ala definida posteriormente por sorteio",
    color: "#a61b2b"
  },
  {
    time: "20h40",
    activity: "Apresentação 4",
    detail: "Ala definida posteriormente por sorteio",
    color: "#a61b2b"
  },
  {
    time: "21h10",
    activity: "Apresentação 5",
    detail: "Ala definida posteriormente por sorteio",
    color: "#a61b2b"
  },
  {
    time: "21h30",
    activity: "Mensagem final e oração",
    detail: "Encerramento espiritual do evento",
    color: "#2f6f4e"
  }
];

const festivalDate = new Date("2026-11-07T19:00:00-03:00");

function initializeNavigation() {
  const menuButton = document.querySelector("#menu-button");
  const navigation = document.querySelector("#main-navigation");

  if (!menuButton || !navigation) {
    return;
  }

  const navigationLinks = navigation.querySelectorAll("a");

  function closeMenu() {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu de navegação");
    menuButton.innerHTML = `<span aria-hidden="true">☰</span>`;
  }

  function toggleMenu() {
    const menuIsOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", `${menuIsOpen}`);
    menuButton.setAttribute(
      "aria-label",
      `${menuIsOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}`
    );
    menuButton.innerHTML = `
      <span aria-hidden="true">${menuIsOpen ? "✕" : "☰"}</span>
    `;
  }

  menuButton.addEventListener("click", toggleMenu);

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 850) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function renderGrowthAreas() {
  const container = document.querySelector("#growth-areas");

  if (!container) {
    return;
  }

  container.innerHTML = growthAreas
    .map(
      (area) => `
        <article class="growth-card" style="--area-color: ${area.color};">
          <span class="growth-icon" aria-hidden="true">${area.icon}</span>
          <h3>${area.name}</h3>
          <p>${area.description}</p>
        </article>
      `
    )
    .join("");
}

function renderSchedulePreview() {
  const container = document.querySelector("#schedule-preview");

  if (!container) {
    return;
  }

  container.innerHTML = schedulePreview
    .map(
      (item) => `
        <article class="schedule-item" style="--item-color: ${item.color};">
          <time class="schedule-time">${item.time}</time>
          <div class="schedule-info">
            <span class="schedule-dot" aria-hidden="true"></span>
            <div>
              <strong>${item.activity}</strong>
              <span>${item.detail}</span>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function formatCountdownNumber(value) {
  return `${value}`.padStart(2, "0");
}

function updateCountdownStatus(daysRemaining, distance) {
  const status = document.querySelector("#event-status");

  if (!status) {
    return;
  }

  if (distance <= 0) {
    status.textContent =
      `O Festival de Artes já aconteceu. Obrigado a todos que participaram!`;
  } else if (daysRemaining === 0) {
    status.textContent =
      `É hoje! Prepare-se para uma noite especial de arte e união.`;
  } else if (daysRemaining === 1) {
    status.textContent = `Falta apenas 1 dia para o Festival de Artes!`;
  } else if (daysRemaining <= 7) {
    status.textContent =
      `Está chegando! Faltam apenas ${daysRemaining} dias para o festival.`;
  } else if (daysRemaining <= 30) {
    status.textContent =
      `Estamos na reta final: faltam ${daysRemaining} dias para o evento.`;
  } else {
    status.textContent =
      `Ainda temos ${daysRemaining} dias para nos preparar juntos.`;
  }
}

function updateCountdown() {
  const daysElement = document.querySelector("#countdown-days");
  const hoursElement = document.querySelector("#countdown-hours");
  const minutesElement = document.querySelector("#countdown-minutes");
  const secondsElement = document.querySelector("#countdown-seconds");

  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return false;
  }

  const distance = festivalDate.getTime() - Date.now();

  if (distance <= 0) {
    daysElement.textContent = `00`;
    hoursElement.textContent = `00`;
    minutesElement.textContent = `00`;
    secondsElement.textContent = `00`;
    updateCountdownStatus(0, distance);
    return false;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  daysElement.textContent = `${formatCountdownNumber(days)}`;
  hoursElement.textContent = `${formatCountdownNumber(hours)}`;
  minutesElement.textContent = `${formatCountdownNumber(minutes)}`;
  secondsElement.textContent = `${formatCountdownNumber(seconds)}`;

  updateCountdownStatus(days, distance);
  return true;
}

function initializeCountdown() {
  const countdownExists = document.querySelector("#countdown");

  if (!countdownExists) {
    return;
  }

  const eventIsActive = updateCountdown();

  if (!eventIsActive) {
    return;
  }

  const intervalId = window.setInterval(() => {
    const stillActive = updateCountdown();

    if (!stillActive) {
      window.clearInterval(intervalId);
    }
  }, 1000);
}

function updateFooter() {
  const yearElements = document.querySelectorAll(".current-year");
  const modifiedElements = document.querySelectorAll(".last-modified");
  const modificationDate = new Date(document.lastModified);

  yearElements.forEach((element) => {
    element.textContent = `${new Date().getFullYear()}`;
  });

  modifiedElements.forEach((element) => {
    element.textContent = `${modificationDate.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    })}`;
  });
}

function initializePage() {
  initializeNavigation();
  renderGrowthAreas();
  renderSchedulePreview();
  initializeCountdown();
  updateFooter();
}

document.addEventListener("DOMContentLoaded", initializePage);
