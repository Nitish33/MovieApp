import R from '../../Utility/R';
import MovieModal from '../../Models/MovieModel';

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
      return {
        ...state,
        movies: state.movies.concat(parseMovie(payload.Search)),
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
