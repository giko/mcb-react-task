/*
 *
 * UserReposSearch actions
 *
 */

import { createAction } from 'redux-act';

export const searchRepos = createAction('search repos by user name', (userName) => ({ userName }));

