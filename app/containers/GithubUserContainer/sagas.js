import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { request, postRequest } from 'utils/request';

import * as actions from './actions';

// Individual exports for testing
export function* loadUserSaga(action) {
  const result = yield call(request, `users/${action.payload.userName}/repos`);
  yield put(actions.userLoaded(result));
}

export function* loadUserCommitsSaga(action){
  const result = yield call(request, `repos/${action.payload.userName}/${action.payload.repoName}/commits`);
  yield put(actions.commitsLoaded(result.slice(0, 10)));
}

export function* watchUserLoad(){
    while (true) {
    const action = yield take('[2] Load user');
    yield call(loadUserSaga, action);
  } 
}

export function* watchCommitsLoad(){
    while (true) {
    const action = yield take('[4] Load commits');
    yield call(loadUserCommitsSaga, action);
  } 
}

// All sagas to be loaded
export default [
  watchUserLoad,
  watchCommitsLoad,
];
