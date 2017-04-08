import React, { PropTypes } from 'react';
import { Switch, withRouter } from 'react-router';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './components/nav';
import PollsPage from './components/polls';
import LoginPage from './components/login';
import SignUpPage from './components/sign-up';
import NotFoundPage from './components/not-found';
import NewPollPage from './components/new-poll';
import CurrentPollPage from './components/current-poll';

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    const userJustLoggedIn = !!(this.props.user !== nextProps.user);
    const newPollWasCreated = !!(this.props.polls.length !== nextProps.polls.length);
    if (userJustLoggedIn || newPollWasCreated) {
      this.props.history.push('/polls');
    }
    if (this.props.pollId !== nextProps.pollId) {
      this.props.history.push(`/polls/${nextProps.pollId}`);
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path={'/polls'} render={() => <PollsPage />} />
          <Route path={`/polls/${this.props.pollId}`} render={() => <CurrentPollPage />} />
          <Route path={'/login'} render={() => <LoginPage />} />
          <Route path={'/sign-up'} render={() => <SignUpPage />} />
          <Route path={'/new-poll'} render={() => <NewPollPage />} />
          <Route component={NotFoundPage} />
        </Switch>
        {this.props.user &&
          <NavLink to={'/new-poll'}><button>New Poll</button></NavLink>}
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.string.isRequired,
  polls: PropTypes.array.isRequired,
  pollId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.username,
  polls: state.polls.polls,
  pollId: state.poll.id,
});

export default connect(mapStateToProps)(withRouter(App));
