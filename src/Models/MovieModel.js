class MovieModal {
  poster;
  title;
  type;
  year;
  imdbId;
  isShortListed;

  constructor(data) {
    this.poster = data.Poster;
    this.title = data.Title;
    this.type = data.Type;
    this.year = data.Year;
    this.imdbId = data.imdbID;
    this.isShortListed = false;
  }
}

export default MovieModal;
