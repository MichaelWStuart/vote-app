import React from 'react';
import { connect } from 'react-redux';
import newPoll from '../actions/async-creators/new-poll';

const NewPollPage = Props =>
  <form onSubmit={Props.handleClick}>
    <input type="text" placeholder="title" name="title" />
    <input type="submit" />
  </form>;

const mapDispatchToProps = dispatch => ({
  handleClick: (event) => {
    event.preventDefault();
    dispatch(newPoll(
      {
        title: event.target.elements.title.value,
      },
    ));
  },
});

export default connect(null, mapDispatchToProps)(NewPollPage);
