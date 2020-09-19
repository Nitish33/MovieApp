import {createStore} from 'redux';
import RootReducer from './Reducer';

let store = createStore(RootReducer);

export default store;
