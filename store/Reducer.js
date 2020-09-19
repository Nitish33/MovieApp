import {combineReducers} from 'redux';

import MovieListingReducer from '../src/Screen/MovieListing/Reducer';
import SavedMovieReducer from '../src/Screen/SavedMovie/Reducer';

const AppReducer = combineReducers({
  MovieListingReducer,
  SavedMovieReducer,
});

const RootReducer = (state, action) => {
  return AppReducer(state, action);
};

export default RootReducer;
