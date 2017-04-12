import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncLogout from '../actions/async-creators/user/logout';

const Nav = props =>
  <nav>
    <NavLink to={'/polls'}>Polls</NavLink>
    {props.user ? (
      <div>
        <p>Logged in as {props.user}</p>
        <NavLink onClick={props.handleClick} to={'/polls'}>Logout</NavLink>
      </div>
    ) : (
      <div>
        <NavLink to={'/users/register'}>Sign Up</NavLink>
        <NavLink to={'/auth/login'}>Login</NavLink>
      </div>
    )}
  </nav>;

Nav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.username,
});

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(asyncLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
