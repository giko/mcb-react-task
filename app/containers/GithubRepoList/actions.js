/*
 *
 * GithubRepoList actions
 *
 */

import { createAction } from 'redux-act';

export const invalidateUserRepos = createAction('Invalidate user repositories');
export const loadUserRepos = createAction('Load user repositories', (userName) => ({ userName }));
export const userReposLoaded = createAction('User repositories loaded');
export const userReposLoadingError = createAction('loading user repositories fail');
export const userRepoSelected = createAction('user repository selected', (userName, repoName) => ({ userName, repoName }));

