/*
 *
 * GithubUserContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withState } from 'recompose';

import makeSelectGithubUserContainer from './selectors';
import * as actions from './actions';

import CommitsContainer from './CommitsContainer';

const SearchComponentStateless = ({ searchText, setSearchText, loadUser }) =>
  <div>
    <input
      type="text"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
    />
    <button onClick={() => loadUser(searchText)}>Search</button>
  </div>;

const SearchComponent = withState('searchText', 'setSearchText', 'giko')(
  SearchComponentStateless
);

// eslint-disable-next-line react/prefer-stateless-function
export class GithubUserContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'giko',
      commits: [],
    };
  }

  getCommits(repoName) {
    fetch(
      `https://api.github.com/repos/${this.textInput.state
        .stateValue}/${repoName}/commits`
    )
      .then((response) => response.json())
      .then((result) => this.setState({ commits: result.slice(0, 10) }));
  }

  render() {
    return (
      <div>
        <CommitsContainer commits={this.state.commits} />
        <SearchComponent
          ref={(input) => {
            this.textInput = input;
          }}
          loadUser={this.props.loadUser}
        />
        {this.props.githubUserContainer.userRepos &&
          this.props.githubUserContainer.userRepos.map((repo) =>
            <div key={repo.id}>
              <button onClick={() => this.getCommits(repo.name)}>
                {repo.name}
              </button>
            </div>
          )}
      </div>
    );
  }
}

GithubUserContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  githubUserContainer: makeSelectGithubUserContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUser: (userName) => dispatch(actions.loadUser(userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  GithubUserContainer
);
