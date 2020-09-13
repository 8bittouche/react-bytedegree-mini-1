const searchField = document.querySelector("#search-field");
const resultsContainer = document.querySelector(".autocomplete-results");

const updateAutocompleteResults = async (keyword) => {
  const response = await fetch("/autocomplete?keyword=" + keyword);

  if (response.ok) {
    const data = await response.json();
    const results = data
      .map((result) => {
        return `<li>${result}</li>`;
      })
      .join("");

    resultsContainer.innerHTML = results;
  }
};

searchField.addEventListener("keyup", (e) => {
  updateAutocompleteResults(e.target.value);
});

resultsContainer.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") return;

  const keyword = e.target.innerHTML;

  searchField.value = keyword;
  updateAutocompleteResults(keyword);
});
