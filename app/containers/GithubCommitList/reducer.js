import { fromJS } from 'immutable';
import { createReducer } from 'redux-act';
import * as actions from './actions';

const initState = fromJS({
  loading: false,
  error: false,
  data: false,
});

const githubCommitListReducer = createReducer({
  [actions.invalidateRepoCommits]: (state) => state
    .set('data', false),
  [actions.loadRepoCommits]: (state) => state
    .set('loading', true)
    .set('error', false),
  [actions.repoCommitsLoaded]: (state, commits) => state
    .set('data', commits)
    .set('loading', false),
  [actions.repoCommitsLoadingError]: (state, error) => state
    .set('error', error)
    .set('loading', false),
}, initState);

export default githubCommitListReducer;
