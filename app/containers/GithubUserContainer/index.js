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

const SearchComponentStateless = ({ searchText, setSearchText, loadUser }) => <div>
  <input type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
  <button onClick={() => loadUser(searchText)}>Search</button>
</div>

const SearchComponent = withState('searchText', 'setSearchText', 'giko')(SearchComponentStateless);

export class GithubUserContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <SearchComponent loadUser={this.props.loadUser} />
        {this.props.githubUserContainer.userRepos && this.props.githubUserContainer.userRepos.map((repo) => <div key={repo.id}>{repo.name}</div>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(GithubUserContainer);
