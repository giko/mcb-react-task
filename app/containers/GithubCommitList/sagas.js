import { take, call, put } from 'redux-saga/effects';
import { request } from 'utils/request';
import * as actions from './actions';

export function* loadRepoCommits(action) {
  const { userName, repoName } = action.payload;
  try {
    const result = yield call(request, `repos/${userName.trim()}/${repoName.trim()}/commits`);
    yield put(actions.repoCommitsLoaded(result));
  } catch (e) {
    yield put(actions.repoCommitsLoadingError(e));
  }
}
export function* watchLoadingRepoCommits() {
  while (true) {
    const action = yield take(actions.loadRepoCommits.getType());
    yield call(loadRepoCommits, action);
  }
}

export default [watchLoadingRepoCommits];
