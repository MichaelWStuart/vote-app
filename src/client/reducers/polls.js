import { NEW_POLL, REMOVE_POLL } from '../actions/constants';

const initial = [];

export default (state = initial, action) => {
  switch (action.type) {
    case NEW_POLL:
      return [...state].concat(action.payload);
    // case EDIT_POLL:
    //   return [...state].forEach((poll) => {
    //     if (poll._id === action.payload.id) {
    //       poll._options = action.payload._options;
    //     }
    //   });
    case REMOVE_POLL: {
      return [...state].filter(poll => poll._id !== action.payload);
    }
    default: {
      return state;
    }
  }
};
