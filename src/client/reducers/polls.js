import { CREATE_POLL, EDIT_POLL, DESTROY_POLL } from '../actions/constants';

const initial = [];

export default (state = initial, action) => {
  switch (action.type) {
    case CREATE_POLL:
      return [...state].concat(action.payload);
    case EDIT_POLL: {
      const newState = [...state];
      newState.splice(action.payload.pollIndex, 1, action.payload.updatedPoll);
      return newState;
    }
    case DESTROY_POLL:
      return [...state].filter(poll => poll._id !== action.payload);
    default: {
      return state;
    }
  }
};
