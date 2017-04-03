import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions';

const SignUpPage = Props =>
  <form onSubmit={Props.handleClick}>
    <input type="text" placeholder="username" name="username" />
    <input type="password" placeholder="password" name="password" />
    <input type="submit" />
  </form>;

const mapDispatchToProps = dispatch => ({
  handleClick: (event) => {
    event.preventDefault();
    dispatch(login(
      {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      },
    ));
  },
});

export default connect(null, mapDispatchToProps)(SignUpPage);
