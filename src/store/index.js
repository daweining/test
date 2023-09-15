import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import testStore from './testStore/reducer';

const reducer = combineReducers({
  testStore,
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
