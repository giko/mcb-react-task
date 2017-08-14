import React from 'react';

import Commit from './Commit';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <h3>Last 10 commits:</h3>
        <ul>
          {this.props.commits &&
            this.props.commits.map((commit, index) =>
              <Commit key={index} message={commit.commit.message} />
            )}
        </ul>
      </div>
    );
  }
}
