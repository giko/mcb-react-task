/*
 *
 * GithubUserContainer reducer
 *
 */

import { combineReducers } from 'redux';
import githubRepoListReducer from '../GithubRepoList/reducer';
import githubCommitListReducer from '../GithubCommitList/reducer';

const rootReducer = combineReducers({ userRepos: githubRepoListReducer, repoCommits: githubCommitListReducer });

export default rootReducer;
