import fetch from 'isomorphic-fetch';
import destroy from '../../sync-creators/polls/destroy';

export default id =>
  dispatch =>
    fetch(`/polls/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
    .then(() => dispatch(destroy(id)));
