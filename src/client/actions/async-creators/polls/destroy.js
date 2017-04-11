import fetch from 'isomorphic-fetch';
import removePoll from '../../sync-creators/polls/destroy';

export default id =>
  dispatch =>
    fetch(`/polls/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
    .then(res => res.text())
    .then(poll => dispatch(removePoll(poll)));
