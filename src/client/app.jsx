import React, { PropTypes } from 'react';
import { Switch, withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './components/nav';
import Polls from './components/polls';
import Login from './components/login';
import Register from './components/register';
import NotFound from './components/not-found';
import NewPoll from './components/new-poll';
import ViewPoll from './components/view-poll';

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    const userJustLoggedIn = !!(this.props.user !== nextProps.user);
    const newPollWasCreated = !!(this.props.polls.length !== nextProps.polls.length);
    if (userJustLoggedIn || newPollWasCreated) {
      this.props.history.push('/polls');
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route path={'/polls/new'} component={NewPoll} />
          <Route path={'/polls/:id'} component={ViewPoll} />
          <Route path={'/polls'} exact component={Polls} />
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={Register} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.string.isRequired,
  polls: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.username,
  polls: state.polls,
});

export default connect(mapStateToProps)(withRouter(App));
