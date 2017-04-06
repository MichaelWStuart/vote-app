import { combineReducers } from 'redux';

import {
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  ADD_POLL,
  VIEW_POLL,
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
    default: {
      return state;
    }
  }
};

const initialPollsState = {
  polls: [],
};

const pollsReducer = (state = initialPollsState, action) => {
  switch (action.type) {
    case ADD_POLL:
      return { polls: Object.assign({}, state).polls.concat(action.payload) };
    default: {
      return state;
    }
  }
};

const initialPollIdState = {
  title: '',
  id: '',
};

const currentPollReducer = (state = initialPollIdState, action) => {
  switch (action.type) {
    case VIEW_POLL:
      // eslint-disable-next-line
      return { title: action.payload.title, id: action.payload._id };
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  polls: pollsReducer,
  currentPoll: currentPollReducer,
});

export default rootReducer;
