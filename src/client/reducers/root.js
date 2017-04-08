import { combineReducers } from 'redux';

import userReducer from './user';
import pollsReducer from './polls';
import pollReducer from './poll';
import errorReducer from './error';

export default combineReducers({
  user: userReducer,
  polls: pollsReducer,
  poll: pollReducer,
  error: errorReducer,
});
