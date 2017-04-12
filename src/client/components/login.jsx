import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import login from '../actions/async-creators/user/login';

const Login = props =>
  <div>
    {props.error &&
      <p>{props.error}</p>}
    <form onSubmit={props.handleClick}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <input type="submit" />
    </form>
  </div>;

Login.propTypes = {
  handleClick: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
