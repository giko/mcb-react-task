/*
 *
 * GithubUserContainer actions
 *
 */
import { createAction } from 'redux-act';

export const loadUser = createAction('Load user', (userName) => ({ userName }));
export const userLoaded = createAction('User loaded');
