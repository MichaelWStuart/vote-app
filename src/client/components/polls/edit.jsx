import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import edit from '../../actions/async-creators/polls/edit';

class EditPoll extends React.Component {
  constructor(props) {
    super(props);
    const poll = this.props.polls.filter(item => item._id === this.props.match.params._id)[0];
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: '',
      poll,
      _options: poll._options,
    };
  }

  handleAddClick(event) {
    event.preventDefault();
    this.setState({ _options: this.state._options.concat({
      _id: Math.random(),
    }) });
  }

  handleDeleteClick(optionId) {
    this.setState({ _options: this.state._options.filter(option => option._id !== optionId) });
  }

  handleSubmit(event) {
    event.preventDefault();
    const _options = [];
    const poll = this.state.poll;
    const elements = event.target.elements;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.value) {
        _options.push({ name: element.value, votes: [] });
      }
    }
    if (_options.length > 1) {
      poll._options = _options;
      this.props.dispatchSubmit(poll);
    } else {
      this.setState({ error: 'Poll must contain at least two options' });
    }
  }

  render() {
    return (
      <div className="create-edit-poll-page">
        {this.state.error &&
          <p className="flash-error-box">{this.state.error}</p>}
        <h1 className="create-edit-page-title">Edit Poll</h1>
        <h2 id="create-edit-poll-title">{this.state.poll.title}</h2>
        <form onSubmit={this.handleSubmit}>
          {this.state._options.map((option, index) =>
            <div key={option._id}>
              <input className="create-edit-option-input" defaultValue={option.name} placeholder={`Option ${index + 1}`} />
              <button className="create-edit-option-delete-button" onClick={() => this.handleDeleteClick(option._id)}>X</button>
            </div>,
          )}
          <div className="create-edit-button-row">
            <button className="create-edit-add-button" onClick={this.handleAddClick}>Add Option</button>
            <button className="create-edit-save-button">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

EditPoll.propTypes = {
  dispatchSubmit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  polls: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  polls: state.polls,
});

const mapDispatchToProps = dispatch => ({
  dispatchSubmit: poll => dispatch(edit(poll)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPoll);
