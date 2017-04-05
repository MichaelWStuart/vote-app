import React, { PropTypes } from 'react';
import { Switch, withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './component/nav';
import PollsPage from './component/polls';
import LoginPage from './component/login';
import SignUpPage from './component/sign-up';
import NotFoundPage from './component/not-found';

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.username !== nextProps.username) {
      this.props.history.push('/polls');
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path={'/polls'} render={() => <PollsPage />} />
          <Route path={'/login'} render={() => <LoginPage />} />
          <Route path={'/sign-up'} render={() => <SignUpPage />} />
          <Route component={NotFoundPage} />
        </Switch>
        {this.props.username.length > 0 && <button>New Poll</button>}
      </div>
    );
  }
}

App.propTypes = {
  username: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  username: state.user.username,
});

export default connect(mapStateToProps)(withRouter(App));
