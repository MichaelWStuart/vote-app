import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const AllPolls = props =>
  <div>
    <ul>
      {props.polls.map(poll =>
        <NavLink key={poll.title} to={`/polls/${poll._id}`}>
          <li>{poll.title}</li>
        </NavLink>,
      )}
    </ul>
    {props.user &&
      <NavLink to={'/polls/create'}>
        <button>New Poll</button>
      </NavLink>}
  </div>;

AllPolls.propTypes = {
  polls: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  polls: state.polls,
  user: state.user.username,
});

export default connect(mapStateToProps)(AllPolls);
