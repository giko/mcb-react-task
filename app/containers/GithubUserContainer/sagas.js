import { take, call, fork, put } from 'redux-saga/effects';
import { request } from 'utils/request';

import * as actions from './actions';

export function* loadUserSaga(action) {
  const result = yield call(request, `users/${action.payload.userName}/repos`);
  yield put(actions.userLoaded(result));
}

export function* loadCommitsSaga(action) {
  const result = yield call(request, `repos/${action.payload.repoName}/commits`);
  const totalCommitsPerRequest = 10;
  let totalResult = {};
  Object.keys(result).filter((i, iIndex) => (iIndex < totalCommitsPerRequest)).forEach((j) => {
    totalResult = [...totalResult, result[j]];
  });
  yield put(actions.commitsLoaded(totalResult));
}

function* watchLoadUser() {
  while (true) {
    const action = yield take('[2] Load user', actions.loadUser);
    yield fork(loadUserSaga, action);
  }
}

function* watchLoadCommits() {
  while (true) {
    const action = yield take('[4] Load commits', actions.loadCommits);
    yield fork(loadCommitsSaga, action);
  }
}

export default [
  watchLoadUser,
  watchLoadCommits,
];
