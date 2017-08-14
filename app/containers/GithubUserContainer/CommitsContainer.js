import React, { PropTypes } from 'react';

import Commit from './Commit';

// eslint-disable-next-line react/prefer-stateless-function
export default class CommitsContainer extends React.PureComponent {
  render() {
    return (
      <div>
        <h3>Click on repo to see 10 last commits</h3>
        <ul>
          {this.props.commits.map((commit, index) =>
            <Commit key={index} message={commit.commit.message} />
          )}
        </ul>
      </div>
    );
  }
}

CommitsContainer.propTypes = {
  commits: PropTypes.array.isRequired,
};
