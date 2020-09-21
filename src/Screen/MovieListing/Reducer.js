import R from '../../Utility/R';
import MovieModal from '../../Models/MovieModel';

function filterSavedVideos(newArray, previouslySavedVideo) {
  const filteredMovies = [];
  const newArraySize = newArray.length;
  const previousArraySize = previouslySavedVideo.length;

  let movie = null;

  for (let i = 0; i < newArraySize; i += 1) {
    movie = newArray[i];

    for (let j = 0; j < previousArraySize; j += 1) {
      const preMovie = previouslySavedVideo[j];
      if (movie.imdbId === preMovie.imdbId) {
        movie = preMovie;
      }
    }

    filteredMovies.push(movie);
  }

  console.log(
    'filter saved videos',
    newArray,
    previousArraySize,
    filteredMovies,
  );

  return filteredMovies;
}

export default function Reducer(
  state = {movies: [], totalResults: 0, error: null},
  action,
) {
  const {type, payload} = action;
  const {
    Constants: {
      Actions: {
        MovieListing: {Error, MovieLoaded, ClearMovieList},
      },
    },
  } = R;

  switch (type) {
    case MovieLoaded:
      const parsedMovie = parseMovie(payload.Search);
      const filteredNewList = filterSavedVideos(
        parsedMovie,
        payload.savedVideo,
      );

      return {
        ...state,
        movies: state.movies.concat(filteredNewList),
        totalResults: payload.totalResults,
        page: payload.page,
      };

    case ClearMovieList:
      return {
        ...state,
        totalResults: 0,
        movies: [],
      };

    case Error:
      if (state.movies.length > 0) {
        return state;
      }

      return {...state, error: payload.error};

    default:
      return state;
  }
}

function parseMovie(Search) {
  return Search.map((value) => {
    return new MovieModal(value);
  });
}
