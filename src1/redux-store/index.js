import { createStore } from 'redux';
import rootReducer from '../reducers'

const configStore = (initialState) => createStore(rootReducer, initialState);

export default configStore;

