import { combineReducers } from 'redux';

import {
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  CLEAR_ERROR,
} from './actions';

const initialUserState = {
  username: '',
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      return { username: action.payload.username };
    case LOGOUT:
      return initialUserState;
    default: {
      return state;
    }
  }
};

const initialErrorState = {
  error: '',
};

const errorReducer = (state = initialErrorState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return { error: action.payload };
    case CLEAR_ERROR:
      return initialErrorState;
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
});

export default rootReducer;
