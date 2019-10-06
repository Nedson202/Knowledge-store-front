import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createStore } from 'redux';
import MessageBanner from '../MessageBanner';
import appStore from '../../../redux';
import auth from '../../../redux/reducers/auth';

describe('MessageBanner', () => {
  it('should render with default store', () => {
    const { container, asFragment } = render(
      <Provider store={appStore}>
        <MessageBanner />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeInTheDocument();
  });

  it('should display Message Banner if user is not verified', () => {
    const mockProps = {
      auth: {
        isAuthenticated: true,
        user: {
          isVerified: false,
        }
      }
    };

    const store = createStore(auth, mockProps);

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageBanner />
        </BrowserRouter>
      </Provider>
    );

    getByTestId('banner-message');
  });

  it('should not display Message Banner if user is verified', () => {
    const mockProps = {
      auth: {
        isAuthenticated: true,
        user: {
          isVerified: true,
        }
      }
    };

    const store = createStore(auth, mockProps);

    const { queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageBanner />
        </BrowserRouter>
      </Provider>
    );

    const banner = queryByTestId('banner-message');

    expect(banner).toBeNull();
  });
});
