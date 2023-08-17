(function () {
  // ELELEMT REFERENCES
  const searchInput = document.getElementById("searchMovie");
  const moviesList = document.getElementById("movieList");
  const favLists = document.getElementById("favLists");

  let movieList = [];
  let favList = [];
  let movieId = null;

  // HANDLING THE KEYPRESS
  function searchHandler(e) {
    const text = searchInput.value;
    searchTitle(text);
    moviesList.innerHTML = "";
    renderList();
  }

  // FOR SEARCHING THE TYPED RESULT
  async function searchTitle(title) {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=544ed2e1&s=${title}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      movieList = await data.Search;
    }
  }

  // TO RENDER THE LIST IN SUGGESTED AREA
  function renderList() {
    for (let i = 0; i < movieList.length; i++) {
      addToSuggestedDOM(movieList[i]);
    }
  }

  // RENDERING THE movieList ARRAY IN THE DOM
  function addToSuggestedDOM(movie) {
    let div = document.createElement("div");
    let searchType = parseSearchType(movie.Type);
    div.innerHTML = `
    <img src="${movie.Poster}" id="poster" />
    <div id="detailsContanier">
        <h3 id="movieTitle"  data-id=${movie.imdbID}>
            ${movie.Title}
        </h3>

        <h3 id="type">Type: ${searchType}</h3>
        <div id="movieYear">${movie.Year}</div>
        <button id ="addToFav" class="btn btn-outline-danger" data-id="${movie.imdbID}" type="button">
            ADD TO FAVOURITE
            </button>
            </div>`;

    div.classList.add("col");
    div.classList.add("movieItem");
    // <i class="bi bi-heart-fill" id="addToFavIcon"></i>
    moviesList.append(div);
  }

  // PARSE THE SEARCH TYPE
  function parseSearchType(type) {
    if (type === "series") {
      return "TV Series";
    } else if (type === "movie") {
      return "Movie";
    } else {
      return type;
    }
  }
  // HANDLE ALL THE CLICKS
  function handleClick(e) {
    const target = e.target;
    // CLICKED ON SEARCH
    if (target.id === "search") {
      const text = searchInput.value;
      if (text.length !== 0) {
        searchHandler(text);
      } else {
        alert("Movie/TV Series Name can not be empty");
      }
    }

    // CLICKED ON MOVIE TITLE
    else if (target.id === "movieTitle") {
      movieId = target.dataset.id;
      localStorage.setItem("movieId", JSON.stringify(movieId));
      window.open("./movieDetails/movieDetails.html", "_blank");
    }

    // CLICKED ON ADD TO FAV BUTTON
    else if (target.id === "addToFav" || target.id === "addToFavIcon") {
      addToFavourite(target);
    }

    // CLICKED ON DELETE BUTTON
    else if (target.id === "delete" || target.id === "deleteIcon") {
      deleteFav(target.dataset.id);
    }
  }

  // ADD TO FAVOURITE
  function addToFavourite(target) {
    favMovie = target.dataset.id;
    for (i of favList) {
      if (i.imdbID === favMovie) {
        alert("This Movie/Tv Series is already added to the Favourite List");
        return;
      }
    }
    fetchFavourite(favMovie);
  }

  // FETCH FAVOURITE MOVIE
  async function fetchFavourite(id) {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=544ed2e1&i=${id}`
    );
    const data = await response.json();
    favList.push(data);
    localStorage.setItem("favList", JSON.stringify(favList));
    // renderFavList();
    addToFavouriteDOM(data);
  }

  // ADD TO FAV DOM
  function addToFavouriteDOM(title) {
    let li = document.createElement("li");
    li.innerHTML = `
        <img
            src="${title.Poster}"
            id="favPoster"
        />
        <div id="favDetailsCotanier">
            <h3 id="favMovieTitle">${title.Title}</h3>
            <div id="favMovieYear">${title.Year}</div>
            <button class="btn btn-outline-danger" type="button" id ="delete" data-id="${title.imdbID}">
            Remove
            </button>
        </div>
    `;
    favLists.append(li);
  }

  // DELETE MOVIE FROM FAV LIST
  function deleteFav(target) {
    const newFavList = favList.filter((fav) => {
      return fav.imdbID !== target;
    });
    favList = newFavList;
    localStorage.setItem("favList", JSON.stringify(favList));

    favLists.innerHTML = "";
    for (i of favList) {
      addToFavouriteDOM(i);
    }
  }

  // FOR RENDERING THE LIST PRESENT IN LOCALSTORAGE
  var localList = JSON.parse(localStorage.getItem("favList"));
  function localListRender() {
    favList = localList;
    for (i of localList) {
      addToFavouriteDOM(i);
    }
  }

  function appInitialize() {
    document.addEventListener("click", handleClick);
    document.addEventListener("keyup", searchHandler);
    // IF ANY FAV MOVIE WAS ADDED THEN RENDER THE LIST
    if (localList != null) {
      localListRender();
    }
  }
  appInitialize();
})();
