import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers/rootReducer';
import { setCurrentUser } from './redux/actions/userActions';
import Routes from './Routes';
import tokenDecoder from './utils/tokenDecoder';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducer,
  enhancer
);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const { token } = localStorage;

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql'
// });

if (token) {
  store.dispatch(setCurrentUser(tokenDecoder(token)));
}

ReactDOM.render(
  (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  ), document.getElementById('root')
);
