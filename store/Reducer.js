import {combineReducers} from 'redux';

import MovieListingReducer from '../src/Screen/MovieListing/Reducer';
import SavedMovieReducer from '../src/Screen/SavedMovie/Reducer';
import R from '../src/Utility/R';

const CommonReducer = (_, action) => {
  const {
    Constants: {
      Actions: {
        Common: {StartLoading, EndLoading},
      },
    },
  } = R;

  switch (action.type) {
    case StartLoading:
      return {loading: true};
    case EndLoading:
    default:
      return {loading: false};
  }
};

const AppReducer = combineReducers({
  Common: CommonReducer,
  MovieListing: MovieListingReducer,
  SavedMovie: SavedMovieReducer,
});

export default AppReducer;
