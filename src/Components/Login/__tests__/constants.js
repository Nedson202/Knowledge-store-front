/* istanbul ignore file */

import { loginUser } from 'queries/auth';

export const USERNAME_LABEL = 'Username';
export const PASSWORD_LABEL = 'Password';
export const PASSWORD_LENGTH_ERROR = 'The password must be at least 6 characters.';
export const PASSWORD_REQUIRED_ERROR = 'The password field is required.';

export const FORGOT_PASSWORD = 'Forgot password?';
export const VERIFY_EMAIL = 'Verify email';

export const loginUserData = { token };

export const LOGIN_MUTATION_MOCK = [
  {
    request: {
      query: loginUser,
      variables: {
        username: 'Cooper AL',
        password: 'cooper--al'
      },
    },
    result: { data: { loginUser: loginUserData } }
  },
];

export const LOGIN_BUTTON = 'login-button';
export const LOGIN_MODAL = 'login-modal';

export const TEXT = 'text';
export const PASSWORD = 'password';
export const CLOSE = 'Close';

export const MOCK_PROPS = {
  values: {
    username: '',
    password: '',
  },
  formErrors: {
    username: '',
    password: '',
  },
  handleInputChange: () => {},
  handleUserLogin: () => {},
  processing: false,
};

export const FORM_ERROR_PROPS = {
  ...MOCK_PROPS,
  formErrors: {
    username: ['Username is required'],
    password: ['Password is required'],
  }
};

export const USERNAME_ERROR_REXP = /Username is required/i;
export const PASSWORD_ERROR_REXP = /Password is required/i;

export const PASSWORD_TOGGLE = 'login-password-icon';
