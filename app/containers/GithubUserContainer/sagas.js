import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { request, postRequest } from 'utils/request';

import * as actions from './actions';

// Individual exports for testing
export function* loadUserSaga(action) {
  const reposUrl = `users/${action.payload.userName}/repos`;

  const result = yield call(request, reposUrl);
  yield put(actions.userLoaded(result));
}

export function* loadCommitsSaga(action) {
  const commitsUrl = `repos/${action.payload.userName}/${action.payload.repoName}/commits`;

  const result = yield call(request, commitsUrl);
  yield put(actions.commitsLoaded(result.slice(0,10)));
}

export function* watchLoadUser() {
  while (true) {
    const action = yield take("[2] Load user");
    yield call(loadUserSaga, action);
  }
}

export function* watchLoadCommits() {
  while (true) {
    const action = yield take("[4] Load commits");
    yield call(loadCommitsSaga, action);
  }
}

// All sagas to be loaded
export default [
  watchLoadUser, 
  watchLoadCommits,
];
