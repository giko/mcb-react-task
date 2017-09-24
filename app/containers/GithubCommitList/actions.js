/*
 *
 * GithubCommitList actions
 *
 */

import { createAction } from 'redux-act';

export const invalidateRepoCommits = createAction('Invalidate repository commits');
export const loadRepoCommits = createAction('Load repository commits', (userName, repoName) => ({ userName, repoName }));
export const repoCommitsLoaded = createAction('Repository commits loaded');
export const repoCommitsLoadingError = createAction('loading repository commits fail');

