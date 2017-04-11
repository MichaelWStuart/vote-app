import fetch from 'isomorphic-fetch';
import editPoll from '../../sync-creators/polls/edit';

export default data =>
  dispatch =>
    fetch(`/polls/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(poll => dispatch(editPoll(poll)));
