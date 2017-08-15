/*
 *
 * GithubUserContainer actions
 *
 */
import { createAction } from 'redux-act';

export const loadUser = createAction('Load user', (userName) => ({ userName }));
export const userLoaded = createAction('User loaded');
export const loadCommits = createAction('Load commits', (userName, repoName) => ({ userName, repoName }));
export const commitsLoaded = createAction('Commits loaded');
