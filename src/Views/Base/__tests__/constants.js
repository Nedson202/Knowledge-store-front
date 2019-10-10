import { verifyEmail } from 'queries/auth';

export const LOGIN = 'Login to get started';
export const SIGNUP = 'Signup';
export const EXPLORE = 'Explore';
export const BACKGROUND_LAYOUT = 'background-layout';

export const LOGIN_TEST_ID = 'index-login-button';
export const SIGNUP_TEST_ID = 'index-signup-button';

export const verifyEmailData = {
  token,
  message: 'Email verification complete'
};

export const VERIFY_EMAIL_MOCK = [
  {
    request: {
      query: verifyEmail,
      variables: {
        token: `Bearer ${token}`,
      },
    },
    result: { data: { verifyEmail: verifyEmailData } }
  },
];
