import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import edit from '../actions/async-creators/polls/edit';
import destroy from '../actions/async-creators/polls/destroy';

class ViewPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'view' };
  }

  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        <h1>hello</h1>
      </div>
    );
  }
}

ViewPoll.propTypes = {
  dispatchUpdate: PropTypes.func.isRequired,
  dispatchDelete: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  polls: state.polls,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  dispatchEdit: poll => dispatch(edit(poll)),
  dispatchDestroy: _id => dispatch(destroy(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoll);
