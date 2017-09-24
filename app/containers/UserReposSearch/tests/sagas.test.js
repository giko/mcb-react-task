/**
 * Test  sagas
 */

import { take, call, put } from 'redux-saga/effects';
import { searchUserReposSaga, WatchSearchingUserRepos } from '../sagas';
import { searchRepos } from '../actions';
import { invalidateRepoCommits } from '../../GithubCommitList/actions';
import { invalidateUserRepos, loadUserRepos } from '../../GithubRepoList/actions';


describe('searchUserReposSaga', () => {
  let generator;
  let action;
  beforeEach(() => {
    action = searchRepos({ userName: 'userName' });
    generator = searchUserReposSaga(action);
  });

  it('should dispatch invalidateRepoCommits actions before first yield', () => {
    const expectedEffect = put(invalidateRepoCommits());
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should dispatch invalidateUserRepos actions before second yield', () => {
    const expectedEffect = put(invalidateUserRepos());
    generator.next();
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should dispatch loadUserRepos actions before third yield', () => {
    const { userName } = action.payload;
    generator.next();
    generator.next();
    const expectedEffect = put(loadUserRepos(userName));
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should finish on forth yield', () => {
    generator.next();
    generator.next();
    generator.next();
    expect(generator.next().done).toBeTruthy();
  });
});


describe('WatchSearchingUserRepos', () => {
  let generator;
  let action;
  beforeEach(() => {
    generator = WatchSearchingUserRepos();
    action = searchRepos.getType();
  });

  it('should start task to watch for searchRepos action', () => {
    const expectedEffect = take(action);
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should call searchUserReposSaga when searchRepos action happens', () => {
    const expectedEffect = call(searchUserReposSaga, action);
    generator.next();
    expect(generator.next(action).value).toEqual(expectedEffect);
  });
});
