import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const configureStore = (persistedState) => {
 return createStore(
   rootReducer,
   persistedState,
   applyMiddleware(thunk)
 );
}

export default configureStore;