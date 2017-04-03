import { combineReducers } from 'redux';

import { LOGIN, LOGOUT } from './actions';

const initialUserState = {
  username: '',
  password: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      return { username: action.payload.username, password: action.payload.password };
    case LOGOUT:
      return initialUserState;
    default: {
      console.log('default');
      return state;
    }
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
