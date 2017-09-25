
import { fromJS } from 'immutable';
import githubCommitListReducer from '../reducer';
import * as actions from '../actions';

describe('githubCommitListReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      data: false,
    });
  });

  it('returns the initial state', () => {
    const expectedState = state;
    expect(githubCommitListReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle the invalidateRepoCommits action correctly', () => {
    const originalState =
      state.set('data', [{ id: 1, name: 'commit1' }, { id: 2, name: 'commit2' }, { id: 3, name: 'commit3' }]);
    const expectedState = state;
    expect(githubCommitListReducer(originalState, actions.invalidateRepoCommits())).toEqual(expectedState);
  });

  it('should handle the loadRepoCommits action correctly', () => {
    const originalState = state
      .set('error', new Error());
    const expectedState = state
      .set('loading', true)
      .set('error', false);
    expect(githubCommitListReducer(originalState, actions.loadRepoCommits())).toEqual(expectedState);
  });

  it('should handle the repoCommitsLoaded action correctly', () => {
    const originalState = state
      .set('loading', true);
    const commits = [{ id: 1, name: 'commit1' }, { id: 2, name: 'commit2' }, { id: 3, name: 'commit3' }];
    const expectedState = state
      .set('loading', false)
      .set('data', commits);
    expect(githubCommitListReducer(originalState, actions.repoCommitsLoaded(commits))).toEqual(expectedState);
  });

  it('should handle the repoCommitsLoadingError action correctly', () => {
    const originalState = state
      .set('loading', true);
    const error = new Error('network problems');
    const expectedState = state
      .set('loading', false)
      .set('error', error);
    expect(githubCommitListReducer(originalState, actions.repoCommitsLoadingError(error))).toEqual(expectedState);
  });
});
