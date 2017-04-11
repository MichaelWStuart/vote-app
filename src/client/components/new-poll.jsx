import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import newPoll from '../actions/async-creators/polls/create';

class NewPoll extends React.Component {

  static generateKey() {
    return { _id: Math.random() };
  }

  constructor(props) {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { error: '', _options: [NewPoll.generateKey()] };
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
          _options.push({ option: element.value, votes: [] });
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
      <div>
        {this.state.error &&
          <p>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input placeholder="title" name="title" />
          {this.state._options.map(option =>
            <div key={option._id}>
              <input />
              <button onClick={() => this.handleDeleteClick(option._id)}>Delete</button>
            </div>,
          )}
          <button onClick={this.handleAddClick}>Add Option</button>
          <button>Save</button>
        </form>
      </div>
    );
  }
}

NewPoll.propTypes = {
  dispatchSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchSubmit: poll => dispatch(newPoll(poll)),
});

export default connect(null, mapDispatchToProps)(NewPoll);
