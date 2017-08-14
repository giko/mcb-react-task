import React, { PropTypes } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class Commit extends React.PureComponent {
  render() {
    return (
      <li>
        {this.props.message}
      </li>
    );
  }
}

Commit.propTypes = {
  message: PropTypes.string.isRequired,
};
