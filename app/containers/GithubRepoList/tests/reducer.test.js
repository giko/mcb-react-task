
import { fromJS } from 'immutable';
import githubRepoListReducer from '../reducer';
import * as actions from '../actions';

describe('githubRepoListReducer', () => {
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
    expect(githubRepoListReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle the invalidateUserRepos action correctly', () => {
    const originalState =
      state.set('data', [{ id: 1, name: 'repository1' }, { id: 2, name: 'repository2' }, { id: 3, name: 'repository3' }]);
    const expectedState = state;
    expect(githubRepoListReducer(originalState, actions.invalidateUserRepos())).toEqual(expectedState);
  });

  it('should handle the loadRepoCommits action correctly', () => {
    const originalState = state
      .set('error', new Error());
    const expectedState = state
      .set('loading', true)
      .set('error', false);
    expect(githubRepoListReducer(originalState, actions.loadUserRepos())).toEqual(expectedState);
  });

  it('should handle the repoCommitsLoaded action correctly', () => {
    const originalState = state
      .set('loading', true);
    const repos = [{ id: 1, name: 'repository1' }, { id: 2, name: 'repository2' }, { id: 3, name: 'repository3' }];
    const expectedState = state
      .set('loading', false)
      .set('data', repos);
    expect(githubRepoListReducer(originalState, actions.userReposLoaded(repos))).toEqual(expectedState);
  });

  it('should handle the repoCommitsLoadingError action correctly', () => {
    const originalState = state
      .set('loading', true);
    const error = new Error('404');
    const expectedState = state
      .set('loading', false)
      .set('error', error);
    expect(githubRepoListReducer(originalState, actions.userReposLoadingError(error))).toEqual(expectedState);
  });
});
