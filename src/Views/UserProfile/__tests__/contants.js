import { changePassword, editProfile } from 'queries/auth';

export const USERNAME_LABEL = 'Username';
export const PASSWORD_LABEL = 'Password';
export const EMAIL_LABEL = 'Email address';

export const EMAIL_INVALID = 'The email format is invalid.';
export const USERNAME_LENGTH_ERROR = 'The username must be at least 3 characters.';
export const PASSWORD_LENGTH_ERROR = 'The password must be at least 6 characters.';
export const PASSWORD_REQUIRED_ERROR = 'The password field is required.';

export const VALIDATION_GROUP_CASE = [
  {
    name: USERNAME_LABEL,
    value: 'a',
    fieldError: USERNAME_LENGTH_ERROR
  },
  {
    name: EMAIL_LABEL,
    value: 'cooper',
    fieldError: EMAIL_INVALID
  },
  {
    name: 'Old Password',
    value: 'c',
    fieldError: PASSWORD_LENGTH_ERROR
  },
  {
    name: 'New Password',
    value: 'c',
    fieldError: PASSWORD_LENGTH_ERROR
  }
];

const changePasswordData = {
  token,
  message: 'Password updated'
};

export const CHANGE_PASSWORD_MOCK = [
  {
    request: {
      query: changePassword,
      variables: {
        oldPassword: 'Cooper AL',
        newPassword: 'cooper.al@allcooper',
      },
    },
    result: { data: { changePassword: changePasswordData } }
  },
];

export const PASWWORD_UPDATE_FORM_CASE = [
  {
    name: 'Old Password',
    value: '90--21-323yhhTTu'
  },
  {
    name: 'New Password',
    value: 'cLLiHG67*()'
  },
];

export const ACCOUNT_UPDATE_FORM_CASE = [
  {
    name: 'Username',
    value: 'Cooper AL'
  },
  {
    name: 'Email address',
    value: 'cooper.al@allcooper'
  },
];

export const UPDATE_PASSWORD = 'Update Password';
export const UPDATE_PROFILE = 'Update Profile';

const editProfileData = [
  {
    token,
    message: 'Account updated'
  }
];

export const EDIT_PROFILE_MOCK = [
  {
    request: {
      query: editProfile,
      variables: {
        username: 'Cooper AL',
        email: 'cooper.al@allcooper',
        picture: ''
      },
    },
    result: { data: { editProfile: editProfileData } }
  },
];
