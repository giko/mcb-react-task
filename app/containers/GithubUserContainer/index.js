/*
 *
 * GithubUserContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withState } from 'recompose';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Container from './Container';
import SearchInput from './SearchInput';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import RepoList from './RepoList';
import CommitList from './CommitList';
import makeSelectGithubUserContainer from './selectors';
import * as actions from './actions';

injectTapEventPlugin();

const SearchComponentStateless = ({ searchText, setSearchText, loadUser }) =>
  <SearchBar>
    <MuiThemeProvider>
      <SearchInput name="Github account" type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <FlatButton onClick={() => loadUser(searchText)}>Search</FlatButton>
    </MuiThemeProvider>
  </SearchBar>
;

const SearchComponent = withState('searchText', 'setSearchText', 'giko')(SearchComponentStateless);

export class GithubUserContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <SearchComponent loadUser={this.props.loadUser} />
        <MuiThemeProvider>
          <SearchResults>
            <RepoList>
              {this.props.githubUserContainer.userRepos &&
                this.props.githubUserContainer.userRepos.map((repo) =>
                  <ListItem
                    key={repo.id}
                    onClick={() => this.props.loadCommits(repo.owner.login, repo.name)}
                  >
                    {repo.name}
                  </ListItem>)}
            </RepoList>

            <CommitList>
              {this.props.githubUserContainer.userCommits &&
                this.props.githubUserContainer.userCommits.map((commit) =>
                  <ListItem key={commit.sha}>
                    {commit.commit.message}
                  </ListItem>)}
            </CommitList>
          </SearchResults>
        </MuiThemeProvider>
      </Container>
    );
  }
}

GithubUserContainer.propTypes = {
  githubUserContainer: PropTypes.object,
  loadUser: PropTypes.func.isRequired,
  loadCommits: PropTypes.func.isRequired,
};

SearchComponentStateless.propTypes = {
  loadUser: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func.isRequired,
};

SearchComponent.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  githubUserContainer: makeSelectGithubUserContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUser: (userName) => dispatch(actions.loadUser(userName)),
    loadCommits: (userName, repoName) => dispatch(actions.loadCommits(userName, repoName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubUserContainer);
