import isEmpty from 'lodash/isEmpty';
import { SET_LOGGEDIN_USER } from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGEDIN_USER: {
      return {
        ...state,
        isAuthenticated: action.user.id && !isEmpty(action.user),
        user: action.user
      };
    }

    default: return state;
  }
};