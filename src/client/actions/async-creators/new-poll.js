import fetch from 'isomorphic-fetch';
import newPoll from '../sync-creators/new-poll';

export default data =>
  dispatch =>
    fetch('/new-poll', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(json => dispatch(newPoll(json)));
