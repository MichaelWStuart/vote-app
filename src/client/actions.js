import fetch from 'isomorphic-fetch';

import { createAction } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const loginError = createAction(LOGIN_ERROR);
export const clearError = createAction(CLEAR_ERROR);

export const signUp = credentials =>
  dispatch =>
    fetch('/sign-up', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 1) {
        dispatch(loginError('Duplicate Username'));
      } else {
        dispatch(login({ username: json.username }));
      }
    });

export const logIn = credentials =>
  dispatch =>
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 2) {
        dispatch(loginError('User Not Found'));
      } else if (json.code === 3) {
        dispatch(loginError('Incorrect Password'));
      } else {
        dispatch(login({ username: json.username }));
      }
    });
