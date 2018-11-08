import { SET_LOGGEDIN_USER } from '../constants/actionTypes';

const setCurrentUser = user => ({
  type: SET_LOGGEDIN_USER,
  user
});

const logOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('previousLocation');
  dispatch(setCurrentUser({}));
};

export { setCurrentUser, logOutUser };