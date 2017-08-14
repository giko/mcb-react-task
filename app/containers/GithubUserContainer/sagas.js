import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { request, postRequest } from 'utils/request';

import * as actions from './actions';

// Individual exports for testing
export function* loadUserSaga(action) {
  const result = yield call(request, `users/${action.payload.userName}/repos`);
  yield put(actions.userLoaded(result));
}

export function* defaultSaga() {
  while (true) {
    const action = yield take(actions.loadUser);
    yield call(loadUserSaga, action);
  }
}

// All sagas to be loaded
export default [defaultSaga];
