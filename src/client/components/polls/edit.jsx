import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const EditPoll = (props) => {
  const poll = props.polls.filter(item => item._id === props.match.params._id)[0];
  return (
    <h1>{poll.title}</h1>
  );
};

EditPoll.propTypes = {
  match: PropTypes.object.isRequired,
  polls: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  polls: state.polls,
});

export default connect(mapStateToProps)(EditPoll);
