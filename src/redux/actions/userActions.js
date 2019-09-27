import { SET_LOGGEDIN_USER } from '../constants/actionTypes';
import { PREVIOUS_LOCATION, TOKEN } from '../../settings';

const setCurrentUser = user => ({
  type: SET_LOGGEDIN_USER,
  user
});

const logOutUser = () => (dispatch) => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(PREVIOUS_LOCATION);
  dispatch(setCurrentUser({}));
};

export { setCurrentUser, logOutUser };
