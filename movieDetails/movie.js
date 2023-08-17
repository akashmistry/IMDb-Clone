(function () {
  // ELEMENT REFERENCES
  const poster = document.getElementById("poster");
  const title = document.getElementById("title");
  const year = document.getElementById("year");
  const releaseDate = document.getElementById("releaseDate");
  const genre = document.getElementById("genre");
  const plot = document.getElementById("plot");
  const awards = document.getElementById("awards");
  const imdbRating = document.getElementById("imdbRating");
  const boxOffice = document.getElementById("boxOffice");

  // MOVIE ID STORED IN LOCALSTORAGE ON GETTING CLICKED
  let movieId = JSON.parse(localStorage.getItem("movieId"));

  // FETCH THE SELECTED MOVIE
  async function fetchMovie() {
    const response = await fetch(
      `http://www.omdbapi.com/?&apikey=544ed2e1&i=${movieId}`
    );
    const data = await response.json();
    console.log(data);

    poster.setAttribute("src", data.Poster);
    title.innerHTML += `${data.Title}`;
    year.innerHTML += `${data.Year}`;
    releaseDate.innerHTML += `${data.Released}`;
    genre.innerHTML += `${data.Genre}`;
    plot.innerHTML += `${data.Plot}`;
    awards.innerHTML += `${data.Awards}`;
    imdbRating.innerHTML += `${data.imdbRating}`;
    boxOffice.innerHTML += `${data.BoxOffice}`;
  }

  fetchMovie();
})();
