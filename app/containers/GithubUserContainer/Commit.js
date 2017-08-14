import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends React.PureComponent {
  render() {
    return (
      <li>
        {`${this.props.message} `}
      </li>
    );
  }
}
