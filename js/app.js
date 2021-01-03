// Global Variables

const searchInput = document.getElementById("searchBar");
const resultsContainer = document.querySelector(".resultsContainer");
const cardContainer = document.querySelector(".cardsContainer");
const button = document.querySelector(".loadMore");

// Begin page count at 1 for API pagination
let pageCount = 1;

// Hide load button and results h2 initially
button.style.display = "none";

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
          if (result.status === "Alive") {
            html = `
                <div class="card">
                  <img src="${result.image}" alt="image of ${result.name}" />
                  <div class="info">
                    <h3>Name: ${result.name}</h3>
                    <p>Origin: ${result.origin.name}</p>
                    <p>Species: ${result.species}</p>
                    <p>Status: 😃</p>
                  </div>
                </div>
            `;
          } else {
            html = `
                <div class="card">
                  <img src="${result.image}" alt="image of ${result.name}" />
                  <div class="info">
                    <h3>Name: ${result.name}</h3>
                    <p>Origin: ${result.origin.name}</p>
                    <p>Species: ${result.species}</p>
                    <p>Status: 💀</p>
                  </div>
                </div>
            `;
          }

          cardContainer.innerHTML += html;
        });

        if (data.info.next) {
          pageCount++;
          button.style.display = "block";
        } else {
          button.style.display = "hidden";
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
  pageCount = 1;

  if (e.code === "Enter") {
    const searchValue = searchInput.value;
    cardContainer.innerHTML = "";
    fetchData(searchValue, pageCount);
  }
};

// Event listeners

button.addEventListener("click", () => {
  const searchValue = searchInput.value;
  fetchData(searchValue, pageCount);
});
