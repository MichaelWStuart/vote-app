import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncLogout from '../actions/async-creators/logout';

const Nav = Props =>
  <nav>
    {Props.user ? (
      <NavLink onClick={Props.handleClick} to={'/polls'}>Logout</NavLink>
    ) : (
      <div>
        <NavLink to={'/sign-up'}>Sign Up</NavLink>
        <NavLink to={'/login'}>Login</NavLink>
      </div>
    )}
  </nav>;

const mapStateToProps = state => ({
  user: state.user.username,
});

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(asyncLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
