import React from 'react';
import { connect } from 'react-redux';

import { fetchUserData } from '../actions';

const Test = Props =>
  <div>
    <button onClick={Props.handleClick}>Make Magic</button>
  </div>;

const mapDispatchToProps = () => ({
  handleClick: () => fetchUserData(),
});

export default connect(null, mapDispatchToProps)(Test);
