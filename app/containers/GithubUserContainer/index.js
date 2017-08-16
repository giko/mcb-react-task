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

import CommitContainer from '../CommitContainer';

const SearchComponentStateless = ({ searchText, setSearchText, loadUser }) => <div>
  <input type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
  <button onClick={() => loadUser(searchText)}>Search</button>
</div>;

const SearchComponent = withState('searchText', 'setSearchText', 'giko')(SearchComponentStateless);

export class GithubUserContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      commits: [],
    };
  }

  getCommits(title) {
    fetch(
      `https://api.github.com/repos/${this.user.state.stateValue}/${title}/commits`
    )
    .then((response) => response.json())
    .then((result) =>
    this.setState({ commits: result.slice(0, 10) }));
  }
  render() {
    return (
      <div>
        <SearchComponent
          ref={(inputUser) => {
            this.user = inputUser;
          }}
          loadUser={this.props.loadUser}
        />
        {this.props.githubUserContainer.userRepos &&
          this.props.githubUserContainer.userRepos.map((repo) =>
            <div key={repo.id}>
              <button onClick={() => this.getCommits(repo.name)}>
                {repo.name}
              </button>
            </div>)}
        <CommitContainer commits={this.state.commits} />
      </div>
    );
  }
}

SearchComponentStateless.propTypes = {
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  loadUser: PropTypes.func,
};

GithubUserContainer.propTypes = {
  loadUser: PropTypes.func.isRequired,
  githubUserContainer: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(GithubUserContainer);
