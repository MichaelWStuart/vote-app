import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import logout from '../actions';

const Nav = Props =>
  <nav>
    {Props.username.length > 0 ? (
      <NavLink onClick={Props.handleClick} to={'/polls'}>Logout</NavLink>
    ) : (
      <div>
        <NavLink to={'/sign-up'}>Sign Up</NavLink>
        <NavLink to={'/login'}>Login</NavLink>
      </div>
    )}
  </nav>;

const mapStateToProps = state => ({
  username: state.user.username,
});

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
