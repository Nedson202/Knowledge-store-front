import React from 'react';

import {
  render, fireEvent, AllProviders, waitForTime, cleanup
} from 'test-utils';

import UserProfile from '..';
import {
  CHANGE_PASSWORD_MOCK, PASWWORD_UPDATE_FORM_CASE, UPDATE_PASSWORD,
  EDIT_PROFILE_MOCK, UPDATE_PROFILE, ACCOUNT_UPDATE_FORM_CASE,
  VALIDATION_GROUP_CASE
} from './contants';

afterEach(cleanup);

describe('UserProfile', () => {
  it('should trigger form validation error on change', async () => {
    const { getByLabelText, getByText, } = render(
      <AllProviders>
        <UserProfile />
      </AllProviders>
    );

    VALIDATION_GROUP_CASE.forEach(async ({ name, value, fieldError }) => {
      fireEvent.change(getByLabelText(name), { target: { value } });

      await waitForTime(1001);

      getByText(fieldError);
    });
  });

  it('should update user account details', async () => {
    const {
      container, asFragment, getByLabelText, getByText,
    } = render(
      <AllProviders apolloMocks={EDIT_PROFILE_MOCK}>
        <UserProfile />
      </AllProviders>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();

    ACCOUNT_UPDATE_FORM_CASE.forEach(({ name, value }) => {
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    const updateButton = getByText(UPDATE_PROFILE);
    fireEvent.click(updateButton);

    await waitForTime(10);
  });

  it('should update user password', async () => {
    const { getByLabelText, getByText } = render(
      <AllProviders apolloMocks={CHANGE_PASSWORD_MOCK}>
        <UserProfile />
      </AllProviders>
    );

    PASWWORD_UPDATE_FORM_CASE.forEach(({ name, value }) => {
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    const updateButton = getByText(UPDATE_PASSWORD);
    fireEvent.click(updateButton);

    await waitForTime(10);
  });

  it('should trigger image select', () => {
    const { getByTestId } = render(
      <AllProviders>
        <UserProfile />
      </AllProviders>
    );

    fireEvent.change(getByTestId('image-upload'), {
      target: {
        files: [new File(['(⌐□_□)'], 'bookstore.png', { type: 'image/png' })],
      }
    });
  });
});
