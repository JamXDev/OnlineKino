"use strict";
const moviesContainer = document.querySelector(".movies"),
  form = document.querySelector("form"),
  search = document.querySelector(".header__search"),
  container = document.querySelector(".container");

const API_KEY = "c25b69bd-3683-471b-9c41-084bae550558",
  API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1",
  API_URL_SEARCH =
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

let moviesBaseApi = {
  topFilms: [],
  links: [
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/39715",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47191",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/27141",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/46960",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
    "https://red.uboost.one/view/d3894e13ac7867f0ea0db534fb9762fd/47183",
  ],
};

(async () => {
  moviesBaseApi.topFilms = await fetch(API_URL_POPULAR, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  }).then((data) => data.json());

  showMovies(moviesBaseApi);
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;

  (async () => {
    moviesBaseApi.topFilms = await fetch(apiSearchUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    }).then((data) => data.json());

    showMovies(moviesBaseApi);

    search.value = "";
  })();
});

function showMovies(data) {
  console.log(data);
  // Очищаем предыдущие фильмы
  moviesContainer.innerHTML = "";
  //console.log(data.links);

  data.topFilms.films.forEach((obj, index) => {
    let movie = document.createElement("div");

    movie.classList.add("movie");

    moviesContainer.appendChild(movie);

    movie.innerHTML = ` 
      <div class="movie__cover-inner" >
        <img
          src="${obj.posterUrlPreview}"
          class="movie__cover"
          alt="${obj.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      
      <div class="movie__info">
        <div class="movie__title">${obj.nameRu}</div>
        <div class="movie__category">${obj.genres.map(
          (genre) => ` ${genre.genre}`
        )}</div>

        <div class="movie__average movie__average--${
          obj.rating >= 8 ? "green" : obj.rating >= 6 ? "orange" : "red"
        }">
          ${obj.rating}
        </div>
      </div> 
      `;

    movie.addEventListener("click", () => {
      modalWindow(data.links[index]);
      window.scrollBy({
        top: -1700,
        behavior: "smooth",
      });
    });
  });
}

console.log(window.i);

function modalWindow(link) {
  const modalPlay = document.createElement("div");

  modalPlay.classList.add("playFilm");

  modalPlay.innerHTML = `
  <button class="closeModal">Close</button>
    <iframe class="videoFrame" width="660" height="315" 
      src=${link} 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; 
      autoplay; clipboard-write; 
      encrypted-media; gyroscope; 
      picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;

  container.appendChild(modalPlay);

  const closeModal = document.querySelector(".closeModal");

  closeModal.addEventListener("click", () => {
    container.removeChild(modalPlay);
  });
}
