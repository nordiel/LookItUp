
const accesKey  = "7S77H6I19H94cFbNc06TAPGS9qwWjcdH10iXK4syZQI"

const formElement = document.querySelector("form")
const inputElement = document.querySelector("#input")
const searchResults = document.querySelector(".search-results")
const loadMore = document.querySelector("#show-more-btn")

let inputData = ""
let page = 1;

async function searchImages() {

    inputData = inputElement.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesKey}`

    const responses = await fetch(url)
    const data = await responses.json()

    const results = data.results

    if (page === 1) {

        searchResults.innerHTML = ""

    }

    results.map((result) => {

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    })

    page ++

    if (page > 1) {

        loadMore.style.display = "block";

    }


}

formElement.addEventListener("submit", (event) =>{

    event.preventDefault();
    page = 1;
    searchImages();

} )

loadMore.addEventListener("click", () =>{

    searchImages();

} )
