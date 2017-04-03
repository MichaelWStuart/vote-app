import 'isomorphic-fetch';

import { createAction } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

export function fetchUserData() {
  console.log('pre-fetch');
  return function (dispatch) {
    console.log('fetching');
    return fetch('/magic')
    .then(res => res.json())
    .then(json => dispatch(login({ username: json.username, password: json.password })));
  };
};
