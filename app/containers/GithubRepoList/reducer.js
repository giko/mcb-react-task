/*
 *
 * GithubRepoList reducer
 *
 */

import { fromJS } from 'immutable';
import { createReducer } from 'redux-act';

import * as actions from './actions';

const initState = fromJS({
  loading: false,
  error: false,
  data: false,
});

const githubRepoListReducer = createReducer({
  [actions.invalidateUserRepos]: (state) => state
    .set('data', false),
  [actions.loadUserRepos]: (state) => state
    .set('loading', true)
    .set('error', false),
  [actions.userReposLoaded]: (state, commits) => state
    .set('data', commits)
    .set('loading', false),
  [actions.userReposLoadingError]: (state, error) => state
    .set('error', error)
    .set('loading', false),
}, initState);

export default githubRepoListReducer;
