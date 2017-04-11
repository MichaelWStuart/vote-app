import fetch from 'isomorphic-fetch';
import login from '../../sync-creators/user/login';
import error from '../../sync-creators/error';

export default data =>
  dispatch =>
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then((json) => {
      if (json.name === 'Success') {
        dispatch(login(json.credentials));
      } else {
        dispatch(error(json.message));
      }
    });
