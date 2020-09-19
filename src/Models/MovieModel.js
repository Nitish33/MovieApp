class MovieModal {
  poster;
  title;
  type;
  year;
  imdbId;

  constructor(data) {
    this.poster = data.Poster;
    this.title = data.Title;
    this.type = data.Type;
    this.year = data.Year;
    this.imdbId = data.imdbId;
  }
}

export default MovieModal;
