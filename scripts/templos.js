const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

function toggleMenu() {
  const isOpen = navigation.classList.toggle("open");

  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
  );
}

function closeMenuOnLargeScreen() {
  if (window.innerWidth >= 700) {
    navigation.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu de navegação");
  }
}

menuButton.addEventListener("click", toggleMenu);
window.addEventListener("resize", closeMenuOnLargeScreen);

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Última modificação: ${document.lastModified}`;
