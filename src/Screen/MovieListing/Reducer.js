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
        MovieListing: {Error, MovieLoaded},
      },
    },
  } = R;

  switch (type) {
    case MovieLoaded:
      return {
        ...state,
        movies: state.movies.concat(parseMovie(payload.Search)),
        totalResults: payload.totalResults,
      };

    case Error:
      if (state.movies) {
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
