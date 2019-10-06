import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducer,
  enhancer
);

export default store;
