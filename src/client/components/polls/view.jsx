import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import vote from '../../actions/async-creators/polls/vote';
import destroy from '../../actions/async-creators/polls/destroy';

const ViewPoll = (props) => {
  const poll = props.polls.filter(item => item._id === props.match.params._id)[0];
  const totalVotes = poll._options.reduce((count, option) => option.votes[0] + count, 0);
  //eslint-disable-next-line
  const voteWidth = (option) => {
    return { width: `${(option.votes[0] / totalVotes) * 100}%` };
  };
  return (
    <div id="view-poll-page">
      {props.error &&
        <p className="flash-error-box">{props.error}</p>}
      <h1 id="view-poll-title">{poll.title}</h1>
      {poll._options.map((option, optionIndex) =>
        <div key={Math.random()}>
          <p className="view-poll-option-name">{option.name}</p>
          <div className="view-poll-vote-row">
            <div className="view-poll-data-placeholder">
              <div className="view-poll-data-container">
                <div className="view-poll-data" style={voteWidth(option)} />
                <div className="view-poll-vote-number">votes: {option.votes[0]}</div>
              </div>
            </div>
            {props.user.username &&
              <button
                className="view-poll-vote-button"
                onClick={() => props.handleVoteClick(poll, poll._options[optionIndex]._id, props.user._id)}
              >Vote</button>}
          </div>
        </div>,
      )}
      {poll._authorId === props.user._id &&
        <div id="view-poll-button-box">
          <NavLink to={`/polls/${props.match.params._id}/edit`}>
            <button id="view-poll-edit-button">Edit</button>
          </NavLink>
          <button id="view-poll-delete-button" onClick={() => props.handleDeleteClick(poll._id)}>Delete</button>
        </div>}
    </div>
  );
};

ViewPoll.propTypes = {
  handleVoteClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  polls: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  polls: state.polls,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  handleVoteClick: (poll, optionId, voterId) => {
    dispatch(vote(poll, optionId, voterId));
  },
  handleDeleteClick: id => dispatch(destroy(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoll);
