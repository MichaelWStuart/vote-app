import React, { PropTypes } from 'react';
import { Switch, withRouter } from 'react-router';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './component/nav';
import PollsPage from './component/polls';
import LoginPage from './component/login';
import SignUpPage from './component/sign-up';
import NotFoundPage from './component/not-found';
import NewPollPage from './component/new-poll';
import CurrentPollPage from './component/current-poll';

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    const userJustLoggedIn = !!(this.props.username !== nextProps.username);
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
        {this.props.username.length > 0 &&
          <NavLink to={'/new-poll'}><button>New Poll</button></NavLink>}
      </div>
    );
  }
}

App.propTypes = {
  username: PropTypes.string.isRequired,
  polls: PropTypes.array.isRequired,
  pollId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  username: state.user.username,
  polls: state.polls.polls,
  pollId: state.currentPoll.id,
});

export default connect(mapStateToProps)(withRouter(App));
