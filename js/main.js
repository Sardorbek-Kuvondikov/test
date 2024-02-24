// movies DOm render
const elResultMovies = document.querySelector(".js-movies-render-text");
const eltemplate = document.querySelector(".js-template").content;
const moviesShort = movies.slice(0, 12);

// runtime qaytaruvchi function
const handelClock = (runtime) => {
  const hour = Math.floor(runtime / 60);
  const minuts = runtime % 60;
  return `${hour} hur ${minuts} min`;
};

// movies render
const moviesRender = (array, node) => {
  node.innerHTML = "";
  const moviesDocFrg = document.createDocumentFragment();

  array.forEach((movie) => {
    const moviesClone = eltemplate.cloneNode(true);

    moviesClone.querySelector(".js-movies-img").src = movie.img_url;
    moviesClone.querySelector(".js-movies-img").alt = movie.img_alt;
    moviesClone.querySelector(".js-movies-title").textContent = movie.title
      .toString()
      .slice(0, 21);
    moviesClone.querySelector(".js-movies-rating").textContent =
      movie.imdb_rating;
    moviesClone.querySelector(".js-movies-year").textContent = movie.movie_year;
    moviesClone.querySelector(".js-film-time").textContent = movie.movie_year;
    moviesClone.querySelector(".js-movies-clock").textContent = handelClock(
      movie.runtime
    );
    moviesClone.querySelector(".js-movies-categories").textContent =
      movie.categories.toString().slice(0, 25).replaceAll(",", ", ");
    movie.runtime;

    moviesDocFrg.appendChild(moviesClone);
  });
  node.appendChild(moviesDocFrg);
};
moviesRender(moviesShort, elResultMovies);

// Search
const elForm = document.querySelector(".js-moies-form");
const elSearchInpValue = elForm.querySelector(".js-search-input");
const elNotFoundMovies = document.querySelector(".js-not-found");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const searchInpVlaue = elSearchInpValue.value.trim();
  const searchValueRex = new RegExp(searchInpVlaue, "gi");

  const searchMovies = movies.filter((item) =>
    String(item.title).match(searchValueRex)
  );
  if (searchMovies.length > 0) {
    moviesRender(searchMovies, elResultMovies);
    elNotFoundMovies.classList.remove("not__found");
  } else {
    elNotFoundMovies.classList.add("not__found");
    elResultMovies.innerHTML = "";
    elSearchInpValue.value = "";
    console.log("NOT FOUND");
  }
});
