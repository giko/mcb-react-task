import { take, call, put } from 'redux-saga/effects';
import { request } from 'utils/request';
import * as actions from './actions';
import { invalidateRepoCommits, loadRepoCommits } from '../GithubCommitList/actions';


// Individual exports for testing
export function* loadRepos(action) {
  try {
    const { userName } = action.payload;
    const repos = yield call(request, `users/${userName.trim()}/repos`);
    yield put(actions.userReposLoaded(repos));
  } catch (e) {
    yield put(actions.userReposLoadingError(e));
  }
}

export function* removeReposAndLoadNew(action) {
  const { userName, repoName } = action.payload;
  yield put(invalidateRepoCommits());
  yield put(loadRepoCommits(userName, repoName));
}

export function* watchLoadingUserRepos() {
  while (true) {
    const action = yield take(actions.loadUserRepos.getType());
    yield call(loadRepos, action);
  }
}

export function* watchUserRepoSelected() {
  while (true) {
    const action = yield take(actions.userRepoSelected.getType());
    yield call(removeReposAndLoadNew, action);
  }
}

export default [watchLoadingUserRepos, watchUserRepoSelected];
