import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { onError } from 'apollo-link-error';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './redux/reducers/rootReducer';
import { setCurrentUser } from './redux/actions/userActions';

import Routes from './Routes';
import tokenDecoder from './utils/tokenDecoder';
import { PRODUCTION, LOGOUT } from './settings/defaults';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducer,
  enhancer
);

const serverUrl = process.env.REACT_APP_NODE_ENV.match(PRODUCTION)
  ? process.env.REACT_APP_PROD_SERVER : process.env.REACT_APP_LOCAL_SERVER;

const httpLink = createHttpLink({
  uri: `${serverUrl}/graphql`,
});

const errorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ));
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const { token } = localStorage;

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  }
}));

const authFlowLink = authLink.concat(errorHandler);

const cache = new InMemoryCache();

(async () => {
  await persistCache({
    cache,
    storage: window.localStorage,
  });
})();


const client = new ApolloClient({
  link: authFlowLink.concat(httpLink),
  cache,
});

if (token) {
  window.localStorage.setItem(LOGOUT, false);
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
