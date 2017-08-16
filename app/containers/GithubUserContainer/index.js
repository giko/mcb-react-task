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
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import makeSelectGithubUserContainer from './selectors';
import * as actions from './actions';

const SearchComponentStateless = ({ searchText, setSearchText, loadUser }) => (
  <div className="github-menu__search-field search-field">
    <TextField
      className="search-field__input"
      style={{ width: '70%' }}
      type="text"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
      name="search-field"
    />
    <RaisedButton
      className="search-field__button"
      backgroundColor={'#d84315'}
      labelStyle={{ color: '#fff' }}
      onClick={() => loadUser(searchText)}
      label="Search"
    />
  </div>
);

const SearchComponent = withState('searchText', 'setSearchText', 'giko')(SearchComponentStateless);

export class GithubUserContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="github">
        <Paper className="github__menu github-menu" zDepth={2}>
          <SearchComponent loadUser={this.props.loadUser} />
          <List
            className="github-menu__repo-list"
            style={{ paddingRight: '1rem' }}
          >
            {this.props.githubUserContainer.userRepos && this.props.githubUserContainer.userRepos.map((repo) =>
              <div
                key={repo.id}
                className="github-menu__repo-item"
              >
                <ListItem onClick={() => (this.props.loadCommits(repo.full_name))}>
                  {repo.name}
                </ListItem>
                <Divider />
              </div>
            )}
          </List>
        </Paper>
        <main className="github__content">
          <Paper className="commit-tab" zDepth={1}>
            <List className="commit-tab__list">
              <Subheader>
                Commit list
              </Subheader>
              {this.props.githubUserContainer.repoCommits && this.props.githubUserContainer.repoCommits.map((commit) =>
                <div
                  key={commit.sha}
                  className="commit-tab__item commit"
                >
                  <ListItem innerDivStyle={{ lineHeight: 1.4, padding: '1rem' }}>
                    <div className="commit__date">
                      Date:<span>{commit.commit.author.date}</span>
                    </div>
                    <Divider />
                    <div className="commit__name">
                      Author:<span>{commit.commit.author.name}</span>
                    </div>
                    <Divider />
                    <div className="commit__message">
                      Message:<span>{commit.commit.message}</span>
                    </div>
                    <Divider />
                  </ListItem>
                </div>
              )}
            </List>
          </Paper>
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
  loadCommits: PropTypes.func.isRequired,
  githubUserContainer: PropTypes.shape({
    userRepos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        full_name: PropTypes.string,
      })
    ),
    repoCommits: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.shape({
          date: PropTypes.string,
          name: PropTypes.name,
        }),
        message: PropTypes.string,
      }),
    ),
  }),
};

const mapStateToProps = createStructuredSelector({
  githubUserContainer: makeSelectGithubUserContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUser: (userName) => dispatch(actions.loadUser(userName)),
    loadCommits: (repoName) => dispatch(actions.loadCommits(repoName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubUserContainer);
