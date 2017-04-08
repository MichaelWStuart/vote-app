import { LOGIN, LOGOUT } from '../actions/constants';

const initialUserState = { username: '', _id: '' };

export default (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN:
      return { username: action.payload.username, _id: action.payload._id };
    case LOGOUT:
      return initialUserState;
    default: {
      return state;
    }
  }
};
