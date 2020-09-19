import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './Reducer';

let store = createStore(RootReducer, applyMiddleware(thunk));

export default store;
