import React, { PropTypes } from 'react';
import { Switch, withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './components/nav';
import AllPolls from './components/polls/all';
import Login from './components/login';
import Register from './components/register';
import NotFound from './components/not-found';
import CreatePoll from './components/polls/create';
import ViewPoll from './components/polls/view';
import EditPoll from './components/polls/edit';

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
          <Route path={'/polls/create'} component={CreatePoll} />
          <Route path={'/polls/:_id/edit'} component={EditPoll} />
          <Route path={'/polls/:_id'} component={ViewPoll} />
          <Route path={'/polls'} exact component={AllPolls} />
          <Route path={'/auth/login'} component={Login} />
          <Route path={'/users/register'} component={Register} />
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
