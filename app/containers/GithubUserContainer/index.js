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

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {ListItem} from 'material-ui/List';
import ResultField from './ResultField';
import LeftListCol from './LeftListCol';
import RightListCol from './RightListCol';

const SearchComponentStateless = ({ searchText, setSearchText, loadUser }) => 
<div>  
<MuiThemeProvider>
    <TextField name="gitUserName"type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} /> 
</MuiThemeProvider>
<MuiThemeProvider>
    <RaisedButton  primary={true} onClick={() => loadUser(searchText)}>Search</RaisedButton>
</MuiThemeProvider>
</div>

const SearchComponent = withState('searchText', 'setSearchText', 'giko')(SearchComponentStateless);

export class GithubUserContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
        <MuiThemeProvider>
        <ResultField>
        
<SearchComponent loadUser={this.props.loadUser} />

<LeftListCol>
{this.props.githubUserContainer.userRepos && this.props.githubUserContainer.userRepos.map((repo) => <ListItem key={repo.id} onClick={()=> this.props.loadCommits(repo.owner.login, repo.name)}>
{repo.name}
</ListItem>)}
</LeftListCol>

<RightListCol>
{this.props.githubUserContainer.userCommits && this.props.githubUserContainer.userCommits.map((commit) =>
<ListItem key={commit.sha}>
{commit.commit.message}
</ListItem>)}     
</RightListCol>
      
      </ResultField>
      </MuiThemeProvider>
    );
  }
}

GithubUserContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadCommits: PropTypes.func.isRequired,
};

SearchComponentStateless.propTypes = {
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
}
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
