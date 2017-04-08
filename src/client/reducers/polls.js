import { NEW_POLL } from '../actions/constants';

const initialPollsState = { polls: [] };

export default (state = initialPollsState, action) => {
  switch (action.type) {
    case NEW_POLL:
      return { polls: Object.assign({}, state).polls.concat(action.payload) };
    default: {
      return state;
    }
  }
};
