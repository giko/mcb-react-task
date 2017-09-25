/**
 * Test  sagas
 */

import { put, call, take } from 'redux-saga/effects';
import { request } from 'utils/request';
import * as actions from '../actions';
import * as sagas from '../sagas';

describe('loadRepoCommits Saga', () => {
  let generator;
  beforeEach(() => {
    const action = actions.loadRepoCommits('userName', 'repoName');
    const { userName, repoName } = action.payload;
    const expectedEffect = call(request, `repos/${userName.trim()}/${repoName.trim()}/commits`);
    generator = sagas.loadRepoCommits(action);
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should dispatch the repoCommitsLoaded action if it requests the data successfully', () => {
    const commits = [{ id: 1, name: 'commit1' }, { id: 2, name: 'commit2' }, { id: 3, name: 'commit3' }];
    const expectedEffect = put(actions.repoCommitsLoaded(commits));
    expect(generator.next(commits).value).toEqual(expectedEffect);
  });

  it('should dispatch the repoCommitsLoadingError action if the response errors', () => {
    const response = new Error('404');
    const expectedEffect = put(actions.repoCommitsLoadingError(response));
    expect(generator.throw(response).value).toEqual(expectedEffect);
  });
});


describe('watchUserRepoSelected', () => {
  let generator;
  let action;
  beforeEach(() => {
    generator = sagas.watchLoadingRepoCommits();
    action = actions.loadRepoCommits.getType();
  });

  it('should start task to watch for loadRepoCommits action', () => {
    const expectedEffect = take(action);
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should call loadRepoCommits when loadRepoCommits action happens', () => {
    const expectedEffect = call(sagas.loadRepoCommits, action);
    generator.next();
    expect(generator.next(action).value).toEqual(expectedEffect);
  });
});

