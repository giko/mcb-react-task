import { take, call, put } from 'redux-saga/effects';
import { request } from 'utils/request';
import * as actions from './actions';
import { invalidateRepoCommits, loadRepoCommits } from '../GithubCommitList/actions';


// Individual exports for testing
export function* loadReposSaga(action) {
  try {
    const { userName } = action.payload;
    const result = yield call(request, `users/${userName.trim()}/repos`);
    yield put(actions.userReposLoaded(result));
  } catch (e) {
    yield put(actions.userReposLoadingError(e));
  }
}

export function* userRepoSelectedSaga(action) {
  const { userName, repoName } = action.payload;
  yield put(invalidateRepoCommits(invalidateRepoCommits()));
  yield put(loadRepoCommits(userName, repoName));
}

export function* loadReposWatcher() {
  while (true) {
    const action = yield take(actions.loadUserRepos.getType());
    yield call(loadReposSaga, action);
  }
}

export function* userRepoSelectedWatcher() {
  while (true) {
    const action = yield take(actions.userRepoSelected.getType());
    yield call(userRepoSelectedSaga, action);
  }
}

export default [loadReposWatcher, userRepoSelectedWatcher];
