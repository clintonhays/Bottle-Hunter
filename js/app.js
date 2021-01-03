// Global Variables

const searchInput = document.getElementById("searchBar");
const button = document.querySelector(".loadMore");
let pageCount = 1;

button.hidden = true;

const fetchData = (search, page) => {
  const resultsContainer = document.querySelector(".resultsContainer");
  const cardContainer = document.querySelector(".cardsContainer");
  const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`;
  console.log("Page count:", pageCount);
  console.log("First url:", apiUrl);

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
        console.log(data);
        const arr = data.results;

        arr.forEach((result) => {
          let html = `
              <div class="card">
                <img src="${result.image}" alt="" />
                <h3>Name: ${result.name}</h3>
                <p>Origin: ${result.origin.name}</p>
                <p>Species: ${result.species}</p>
              </div>
            `;

          cardContainer.innerHTML += html;
        });

        if (data.info.next) {
          pageCount++;
          console.log("Page count:", pageCount);
          button.hidden = false;
        }
      });
    });
};

const search = (e) => {
  const searchValue = searchInput.value;
  if (e.code === "Enter") {
    fetchData(searchValue, pageCount);
  }
};

button.addEventListener("click", () => {
  const searchValue = searchInput.value;
  fetchData(searchValue, pageCount);
});
