import React from 'react';
import ReactDOM from 'react-dom';
// import jwt from 'jsonwebtoken';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers/rootReducer';
// import setAuthToken from './utils/setAuthToken';
// import { setCurrentUser } from './actions/userActions';
import Routes from './Routes';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducer,
  enhancer
);

// if (localStorage.accessToken) {
//   setAuthToken(localStorage.accessToken);
//   store.dispatch(setCurrentUser(jwt.decode(localStorage.accessToken)));
// }

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root')
);
