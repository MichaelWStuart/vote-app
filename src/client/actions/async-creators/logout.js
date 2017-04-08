import fetch from 'isomorphic-fetch';
import logout from '../sync-creators/logout';

export default () =>
  dispatch =>
    fetch('/logout', {
      method: 'POST',
      credentials: 'same-origin',
    })
    .then(() => dispatch(logout()));
