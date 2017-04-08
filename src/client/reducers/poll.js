import { VIEW_POLL } from '../actions/constants';

const initialPollState = { title: '', id: '' };

export default (state = initialPollState, action) => {
  switch (action.type) {
    case VIEW_POLL:
      // eslint-disable-next-line
      return { title: action.payload.title, id: action.payload._id };
    default: {
      return state;
    }
  }
};
