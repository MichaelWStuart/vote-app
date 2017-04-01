import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LOGIN_PAGE_ROUTE,
  SIGN_UP_PAGE_ROUTE,
  POLLS_PAGE_ROUTE,
} from '../../shared/routes';

const Nav = () =>
  <nav>
    <ul>
      {[
        { route: POLLS_PAGE_ROUTE, label: 'Home' },
        { route: LOGIN_PAGE_ROUTE, label: 'Login' },
        { route: SIGN_UP_PAGE_ROUTE, label: 'Sign Up' },
      ].map(link => (
        <li key={link.route}>
          <NavLink to={link.route} activeStyle={{ color: 'limegreen' }} exact>{link.label}</NavLink>
        </li>
      ))}
    </ul>
  </nav>;

export default Nav;
