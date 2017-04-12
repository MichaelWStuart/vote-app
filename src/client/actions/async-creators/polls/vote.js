import fetch from 'isomorphic-fetch';
import error from '../../sync-creators/error';
import edit from '../../sync-creators/polls/edit';

export default (poll, pollIndex, optionIndex, voterId) =>
  dispatch =>
    fetch(`/polls/${poll._id}/vote`, {
      method: 'PUT',
      body: JSON.stringify({ pollIndex, optionIndex, voterId }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then((response) => {
      if (response.success) {
        dispatch(edit(response.data));
        dispatch(error(''));
      } else {
        dispatch(error(response.message));
      }
    });
