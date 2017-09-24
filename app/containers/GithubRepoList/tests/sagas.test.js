/**
 * Test  sagas
 */

import { take, call, put } from 'redux-saga/effects';
import { request } from 'utils/request';
import * as sagas from '../sagas';
import { loadUserRepos, userRepoSelected, userReposLoaded, userReposLoadingError } from '../actions';
import { invalidateRepoCommits, loadRepoCommits } from '../../GithubCommitList/actions';


describe('loadRepos Saga', () => {
  let generator;
  beforeEach(() => {
    const action = loadUserRepos('userName');
    const { userName } = action.payload;
    const expectedEffect = call(request, `users/${userName.trim()}/repos`);
    generator = sagas.loadRepos(action);
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should dispatch the userReposLoaded action if it requests the data successfully', () => {
    const response = [{ id: 1, name: 'repository1' }, { id: 2, name: 'repository2' }, { id: 3, name: 'repository3' }];
    const expectedEffect = put(userReposLoaded(response));
    expect(generator.next(response).value).toEqual(expectedEffect);
  });

  it('should dispatch the userReposLoadingError action if the response errors', () => {
    const response = new Error('404');
    const expectedEffect = put(userReposLoadingError(response));
    expect(generator.throw(response).value).toEqual(expectedEffect);
  });
});

describe('removeReposAndLoadNew', () => {
  let generator;
  let action;
  beforeEach(() => {
    action = userRepoSelected({ userName: 'userName', repoName: 'repoName' });
    generator = sagas.removeReposAndLoadNew(action);
  });

  it('should dispatch invalidateRepoCommits actions before first yield', () => {
    const expectedEffect = put(invalidateRepoCommits());
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should dispatch loadRepoCommits actions before second yield', () => {
    const { userName, repoName } = action.payload;
    generator.next();
    const expectedEffect = put(loadRepoCommits(userName, repoName));
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should finish after second yield', () => {
    generator.next();
    generator.next();
    expect(generator.next().done).toBeTruthy();
  });
});

describe('watchLoadingUserRepos', () => {
  let generator;
  beforeEach(() => {
    generator = sagas.watchLoadingUserRepos();
  });

  it('should start task to watch for loadUserRepos action', () => {
    const action = loadUserRepos.getType();
    const expectedEffect = take(action);
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should call removeReposAndLoadNew when loadUserRepos action happens', () => {
    const action = loadUserRepos.getType();
    const expectedEffect = call(sagas.loadRepos, action);
    generator.next();
    expect(generator.next(action).value).toEqual(expectedEffect);
  });
});

describe('watchUserRepoSelected', () => {
  let generator;
  let action;
  beforeEach(() => {
    generator = sagas.watchUserRepoSelected();
    action = userRepoSelected.getType();
  });

  it('should start task to watch for userRepoSelected action', () => {
    const expectedEffect = take(action);
    expect(generator.next().value).toEqual(expectedEffect);
  });

  it('should call removeReposAndLoadNew when userRepoSelected action happens', () => {
    const expectedEffect = call(sagas.removeReposAndLoadNew, action);
    generator.next();
    expect(generator.next(action).value).toEqual(expectedEffect);
  });
});
