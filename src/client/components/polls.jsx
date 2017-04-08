import React from 'react';
import { connect } from 'react-redux';

import fetchPoll from '../actions/async-creators/fetch-poll';

const PollsPage = Props =>
  <ul>
    {Props.polls.map(poll =>
      // eslint-disable-next-line
      <li onClick={Props.handleClick} id={poll._id} key={poll.title}>{poll.title}</li>,
    )}
  </ul>;

const mapStateToProps = state => ({
  polls: state.polls.polls,
});

const mapDispatchToProps = dispatch => ({
  handleClick: event => dispatch(fetchPoll(event.target.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PollsPage);
