const temperature = 24;
const windSpeed = 18;

const temperatureElement = document.querySelector("#temperature");
const windSpeedElement = document.querySelector("#wind-speed");
const windChillElement = document.querySelector("#wind-chill");
const currentYearElement = document.querySelector("#current-year");
const lastModifiedElement = document.querySelector("#last-modified");

function calcularSensacaoTermica(temperatura, velocidadeVento) {
  return 13.12 + 0.6215 * temperatura - 11.37 * velocidadeVento ** 0.16 + 0.3965 * temperatura * velocidadeVento ** 0.16;
}

temperatureElement.textContent = temperature;
windSpeedElement.textContent = windSpeed;

if (temperature <= 10 && windSpeed > 4.8) {
  const windChill = calcularSensacaoTermica(temperature, windSpeed);
  windChillElement.textContent = `${windChill.toFixed(1)} °C`;
} else {
  windChillElement.textContent = "N/A";
}

currentYearElement.textContent = new Date().getFullYear();

const modifiedDate = new Date(document.lastModified);
const formattedModifiedDate = modifiedDate.toLocaleString("pt-BR", {
  dateStyle: "short",
  timeStyle: "medium"
});

lastModifiedElement.textContent = `Última modificação: ${formattedModifiedDate}`;
