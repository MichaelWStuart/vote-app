import React from 'react';
import { connect } from 'react-redux';

const CurrentPollPage = Props =>
  <div>
    <h1>{Props.poll.title}</h1>
  </div>;

const mapStateToProps = state => ({
  poll: state.currentPoll,
});

export default connect(mapStateToProps)(CurrentPollPage);
