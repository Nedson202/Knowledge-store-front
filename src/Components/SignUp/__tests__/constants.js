/* istanbul ignore file */
import { addUser } from 'queries/auth';

export const USERNAME_LABEL = 'Username';
export const PASSWORD_LABEL = 'Password';
export const EMAIL_LABEL = 'Email address';

export const EMAIL_INVALID = 'The email format is invalid.';
export const PASSWORD_LENGTH_ERROR = 'The password must be at least 6 characters.';
export const PASSWORD_REQUIRED_ERROR = 'The password field is required.';

export const FORGOT_PASSWORD = 'Forgot password?';
export const VERIFY_EMAIL = 'Verify email';

export const addUserData = { token };

export const SIGNUP_MUTATION_MOCK = [
  {
    request: {
      query: addUser,
      variables: {
        username: 'Cooper AL',
        email: 'cooper.al@allcooper.com',
        password: 'cooper--al'
      },
    },
    result: { data: { addUser: addUserData } }
  },
];

export const SIGNUP_BUTTON = 'signup-button';
export const SIGNUP_MODAL = 'signup-modal';

export const TEXT = 'text';
export const PASSWORD = 'password';
export const CLOSE = 'Close';

export const MOCK_PROPS = {
  values: {
    username: '',
    email: '',
    password: '',
  },
  formErrors: {
    username: '',
    email: '',
    password: '',
  },
  handleInputChange: () => {},
  handleUserSignup: () => {},
  processing: false,
};


export const FORM_ERROR_PROPS = {
  ...MOCK_PROPS,
  formErrors: {
    username: ['Username is required'],
    email: ['Email address is required'],
    password: ['Password is required'],
  }
};

export const USERNAME_ERROR_REXP = /Username is required/i;
export const EMAIL_ERROR_REXP = /Email address is required/i;
export const PASSWORD_ERROR_REXP = /Password is required/i;

export const PASSWORD_TOGGLE = 'signup-password-icon';
