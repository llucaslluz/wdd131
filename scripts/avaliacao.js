const reviewCountElement = document.querySelector("#review-count");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

function updateReviewCounter() {
  let reviewCount = Number(
    localStorage.getItem("reviewCount")
  );

  reviewCount += 1;

  localStorage.setItem(
    "reviewCount",
    reviewCount
  );

  reviewCountElement.textContent = reviewCount;
}

function updateFooter() {
  const today = new Date();

  currentYear.textContent = today.getFullYear();
  lastModified.textContent = document.lastModified;
}

updateReviewCounter();
updateFooter();