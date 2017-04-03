import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () =>
  <nav>
    <NavLink to={'/sign-up'}>Sign Up</NavLink>
    <NavLink to={'/login'}>Login</NavLink>
    <NavLink to={'/test'}>Test</NavLink>
  </nav>;

export default Nav;
