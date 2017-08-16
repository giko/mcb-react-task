/*
 *
 * GithubUserContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withState } from 'recompose';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import makeSelectGithubUserContainer from './selectors';
import * as actions from './actions';

import CommitContainer from '../CommitContainer';

const SearchComponentStateless = ({ searchText, setSearchText, loadUser }) => (
  <div className="github-menu__search-field search-field">
    <TextField
      type="text"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
      name="search-field"
    />
    <RaisedButton
      backgroundColor={'#42aaff'}
      style={{ margin: 12 }}
      onClick={() => loadUser(searchText)}
      label="Search"
    />
  </div>
);

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
        <Paper className="repo-paper repo-paper">
          <SearchComponent
            ref={(inputUser) => {
              this.user = inputUser;
            }}
            loadUser={this.props.loadUser}
          />
          <List className="repo-list">
            {this.props.githubUserContainer.userRepos &&
              this.props.githubUserContainer.userRepos.map((repo) =>
                <div key={repo.id}>
                  <ListItem onClick={() => this.getCommits(repo.name)}>
                    {repo.name}
                  </ListItem>
                </div>
              )}
          </List>
          <Divider />
        </Paper>
        <main className="commit-list">
          <List>
            <Subheader>
              Commits list
            </Subheader>
            <ListItem>
              <CommitContainer commits={this.state.commits} />
            </ListItem>
          </List>
        </main>
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
