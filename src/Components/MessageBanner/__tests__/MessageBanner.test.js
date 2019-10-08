import React from 'react';
import { createStore } from 'redux';

import { render, AllProviders } from 'test-utils';

import MessageBanner from '../MessageBanner';
import auth from '../../../redux/reducers/auth';

describe('MessageBanner', () => {
  it('should render with default store', () => {
    const { container, asFragment } = render(
      <AllProviders>
        <MessageBanner />
      </AllProviders>
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
      <AllProviders customStore={store}>
        <MessageBanner />
      </AllProviders>
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
      <AllProviders customStore={store}>
        <MessageBanner />
      </AllProviders>
    );

    const banner = queryByTestId('banner-message');

    expect(banner).toBeNull();
  });
});
