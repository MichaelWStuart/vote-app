import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Nav from './component/nav';
import PollsPage from './component/polls';
import LoginPage from './component/login';
import SignUpPage from './component/sign-up';
import {
  LOGIN_PAGE_ROUTE,
  SIGN_UP_PAGE_ROUTE,
  POLLS_PAGE_ROUTE,
} from '../shared/routes';

const App = () =>
  <div>
    <Nav />
    <Switch>
      <Route exact path={POLLS_PAGE_ROUTE} render={() => <PollsPage />} />
      <Route path={LOGIN_PAGE_ROUTE} render={() => <LoginPage />} />
      <Route path={SIGN_UP_PAGE_ROUTE} render={() => <SignUpPage />} />
    </Switch>
  </div>;

export default App;
