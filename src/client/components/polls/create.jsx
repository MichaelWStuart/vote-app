import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import create from '../../actions/async-creators/polls/create';

class NewPoll extends React.Component {

  static generateKey() {
    return { _id: Math.random() };
  }

  constructor(props) {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { error: '', _options: [NewPoll.generateKey(), NewPoll.generateKey()] };
  }

  handleAddClick(event) {
    event.preventDefault();
    this.setState({ _options: this.state._options.concat(NewPoll.generateKey()) });
  }

  handleDeleteClick(optionId) {
    this.setState({ _options: this.state._options.filter(option => option._id !== optionId) });
  }

  handleSubmit(event) {
    event.preventDefault();
    let title;
    const _options = [];
    const elements = event.target.elements;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.value) {
        if (element.name === 'title') {
          title = element.value;
        } else {
          _options.push({ name: element.value, votes: [] });
        }
      }
    }
    if (title && _options.length > 1) {
      this.props.dispatchSubmit({ title, _options });
    } else {
      this.setState({ error: 'Poll must contain a title and at least two options' });
    }
  }

  render() {
    return (
      <div className="create-edit-poll-page">
        {this.state.error &&
          <p className="flash-error-box">{this.state.error}</p>}
        <h1 className="create-edit-page-title">Create Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <input id="create-edit-poll-title-input" placeholder="Title" name="title" />
          {this.state._options.map((option, index) =>
            <div className="create-edit-option-row" key={option._id}>
              <input className="create-edit-option-input" placeholder={`Option ${index + 1}`} />
              <button className="create-edit-option-delete-button" onClick={() => this.handleDeleteClick(option._id)}>X</button>
            </div>,
          )}
          <div className="create-edit-button-row">
            <button className="left-button standard-button" onClick={this.handleAddClick}>Add Option</button>
            <button className="right-button standard-button">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

NewPoll.propTypes = {
  dispatchSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchSubmit: poll => dispatch(create(poll)),
});

export default connect(null, mapDispatchToProps)(NewPoll);
