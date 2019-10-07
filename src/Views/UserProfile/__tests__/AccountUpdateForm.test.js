import React from 'react';

import { AllProviders, render } from 'test-utils';

import AccountUpdateForm from '..';

describe('AccountUpdateForm', () => {
  it('should render form labels', () => {
    const {
      container, asFragment, getByText, getAllByText
    } = render(
      <AllProviders>
        <AccountUpdateForm />
      </AllProviders>
    );

    getAllByText('Username');
    getByText('Email address');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('should render action buttons', () => {
    const { getByText } = render(
      <AllProviders>
        <AccountUpdateForm />
      </AllProviders>
    );

    getByText('Update Profile');
  });
});
