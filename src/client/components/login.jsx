import React from 'react';
import { connect } from 'react-redux';
import asyncLogin from '../actions/async-creators/login';

const LoginPage = Props =>
  <div>
    <form onSubmit={Props.handleClick}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <input type="submit" />
    </form>
  </div>;

const mapDispatchToProps = dispatch => ({
  handleClick: (event) => {
    event.preventDefault();
    dispatch(asyncLogin(
      {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      },
    ));
  },
});

export default connect(null, mapDispatchToProps)(LoginPage);
