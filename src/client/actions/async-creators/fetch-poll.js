import fetch from 'isomorphic-fetch';
import viewPoll from '../sync-creators/view-poll';

export default id =>
  dispatch =>
    fetch(`/polls/${id}`)
    .then(response => response.json())
    .then(poll => dispatch(viewPoll(poll)));
