// Global Variables

const searchInput = document.getElementById("searchBar");
const resultsContainer = document.querySelector(".resultsContainer");
const cardContainer = document.querySelector(".cardsContainer");
const button = document.querySelector(".loadMore");

// Begin page count at 1 for API pagination
let pageCount = 1;

// Hide load button initially
button.hidden = true;

/**
 * Fetches API data based on user input
 * On error - inserts error HTML
 * On success - iterates through API data and creates card for each result
 *              cards are inserted into HTML
 *              if paginated data exists button is displayed to call fetchData()
 *              and pageCount is incremented
 *
 * @param {string} search user defined search value
 * @param {num} page incremented number for pagination of API
 *
 */
const fetchData = (search, page) => {
  const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`;

  fetch(apiUrl)
    //prettier ignore
    .then((response) => {
      if (response.status !== 200) {
        const html = `
            <h2>Oh no!</h2>
            <p>It looks like something went wrong!</p>
          `;
        resultsContainer.innerHTML = html;

        console.log("Status Code:" + response.status);
        return;
      }
      //prettier ignore
      response.json().then((data) => {
        const arr = data.results;

        arr.forEach((result) => {
          let html = `
              <h2>Check out your results!</h2>
              <div class="cardsContainer">
                <div class="card">
                  <img src="${result.image}" alt="" />
                  <h3>Name: ${result.name}</h3>
                  <p>Origin: ${result.origin.name}</p>
                  <p>Species: ${result.species}</p>
                </div>
              </div>
            `;

          resultsContainer.innerHTML += html;
        });

        if (data.info.next) {
          pageCount++;
          button.hidden = false;
        }
      });
    });
};

/**
 * Calls fetchData() when search is submitted with enter key,
 * resets pageCount, and resets resultsContainer
 *
 * @param {keypress} e submit search input
 *
 */
const search = (e) => {
  const searchValue = searchInput.value;

  pageCount = 1;

  if (e.code === "Enter") {
    resultsContainer.innerHTML = "";
    fetchData(searchValue, pageCount);
  }
};

// Event listeners

button.addEventListener("click", () => {
  const searchValue = searchInput.value;
  fetchData(searchValue, pageCount);
});
