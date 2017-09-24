
import { fromJS } from 'immutable';
import githubCommitListReducer from '../reducer';

describe('githubCommitListReducer', () => {
  it('returns the initial state', () => {
    expect(githubCommitListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
