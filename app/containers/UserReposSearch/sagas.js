import { take, call, put } from 'redux-saga/effects';
import * as actions from './actions';
import { invalidateRepoCommits } from '../GithubCommitList/actions';
import { invalidateUserRepos, loadUserRepos } from '../GithubRepoList/actions';

export function* searchUserReposSaga(action) {
  yield put(invalidateRepoCommits());
  yield put(invalidateUserRepos());
  yield put(loadUserRepos(action.payload.userName));
}

export function* searchUserReposWatcher() {
  while (true) {
    const action = yield take(actions.searchRepos.getType());
    yield call(searchUserReposSaga, action);
  }
}

export default [searchUserReposWatcher];
