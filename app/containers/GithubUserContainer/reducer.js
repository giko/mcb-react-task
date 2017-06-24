/*
 *
 * GithubUserContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { createReducer } from 'redux-act';

import * as actions from './actions';

const githubUserContainerReducer = createReducer((on) => {
  on(actions.userLoaded, (state, payload) => state.set('userRepos', payload));
}, fromJS({}));

export default githubUserContainerReducer;
