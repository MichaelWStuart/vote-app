import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import vote from '../../actions/async-creators/polls/vote';
import destroy from '../../actions/async-creators/polls/destroy';

const ViewPoll = (props) => {
  const poll = props.polls.filter(item => item._id === props.match.params._id)[0];
  const pollIndex = props.polls.findIndex(item => item._id === poll._id);
  return (
    <div>
      {props.error &&
        <p>{props.error}</p>}
      <h1>{poll.title}</h1>
      {poll._options.map((option, optionIndex) =>
        <div key={Math.random()}>
          <p>{option.name}</p>
          <p>votes: {Number.isInteger(option.votes[0]) ? option.votes[0] : 0}</p>
          {props.user.username &&
            <button
              onClick={() => props.handleVoteClick(poll, pollIndex, optionIndex, props.user._id)}
            >Vote</button>}
        </div>,
      )}
      {poll._authorId === props.user._id &&
        <div>
          <NavLink to={`/polls/${props.match.params._id}/edit`}><button>Edit</button></NavLink>
          <button onClick={() => props.handleDeleteClick(poll._id)}>Delete</button>
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
  handleVoteClick: (poll, pollIndex, optionIndex, voterId) => {
    dispatch(vote(poll, pollIndex, optionIndex, voterId));
  },
  handleDeleteClick: id => dispatch(destroy(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoll);
