const accessKey = "nEb0OpNDB405-UFkim_LMdcs34q47bQhWU-ogS_vuQA";

const formElements = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const loadMore = document.getElementById("load-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results; // Use data.results to access image data

    if (page === 1) {
        searchResults.innerHTML = "";
    }
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++;
    if (page > 1) {
        loadMore.style.display = "block";
    }
}

formElements.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

loadMore.addEventListener("click", () => {
    searchImages();
});
