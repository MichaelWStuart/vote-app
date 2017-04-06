import React from 'react';
import { connect } from 'react-redux';

import { newPoll } from '../actions';

const NewPollPage = Props =>
  <form onSubmit={Props.handleClick}>
    <input type="text" placeholder="title" name="title" />
    <input type="submit" />
  </form>;

const mapStateToProps = state => ({
  username: state.user.username,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(NewPollPage);
