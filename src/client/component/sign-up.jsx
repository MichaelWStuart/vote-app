import React from 'react';
import { connect } from 'react-redux';

import { signUp } from '../actions';

const SignUpPage = Props =>
  <div>
    {Props.error.length > 0 && <div>{Props.error}</div>}
    <form onSubmit={Props.handleClick}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <input type="submit" />
    </form>
  </div>;

const mapStateToProps = state => ({
  error: state.error.error,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (event) => {
    event.preventDefault();
    dispatch(signUp(
      {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      },
    ));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
