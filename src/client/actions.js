import fetch from 'isomorphic-fetch';

import { createAction } from 'redux-actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const ADD_POLL = 'ADD POLL';
export const VIEW_POLL = 'VIEW POLL';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const loginError = createAction(LOGIN_ERROR);
export const addPoll = createAction(ADD_POLL);
export const viewPoll = createAction(VIEW_POLL);

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

export const newPoll = data =>
  dispatch =>
    fetch('/new-poll', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => res.json())
    .then(json => dispatch(addPoll(json)));

export const fetchPoll = id =>
  dispatch =>
    fetch(`/polls/${id}`)
    .then(response => response.json())
    .then(poll => dispatch(viewPoll(poll)));
