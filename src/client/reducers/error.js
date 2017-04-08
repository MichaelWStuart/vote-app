import { ERROR } from '../actions/constants';

const initialErrorState = { error: '' };

export default (state = initialErrorState, action) => {
  switch (action.type) {
    case ERROR:
      return { error: action.payload };
    default: {
      return state;
    }
  }
};
