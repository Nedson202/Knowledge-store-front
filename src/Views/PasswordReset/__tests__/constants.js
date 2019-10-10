import { resetPassword } from 'queries/auth';

export const EMAIL_LABEL = 'Email';
export const NEW_PASSWORD_LABEL = 'New Password';
export const TEXT = 'text';
export const PASSWORD = 'password';
export const PASSWORD_TOGGLE = 'reset-password-icon';
export const SAVE_BUTTON = 'Save password';
export const FORM_GROUP_CASE = [
  {
    name: 'Email',
    value: 'Cooper.AL@alcooper.al'
  },
  {
    name: 'New Password',
    value: '90huERyu22'
  },
];

export const passwordResetData = {
  token,
  message: 'Password reset complete'
};

export const PASSWORD_REST_MOCK = [
  {
    request: {
      query: resetPassword,
      variables: {
        email: 'magnolium@holla.com',
        password: '90huERyu22',
        token: `Bearer ${token}`,
        id: '2000827-091223'
      },
    },
    result: { data: { resetPassword: passwordResetData } }
  },
];
