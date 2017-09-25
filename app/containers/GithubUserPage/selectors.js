import { createSelector } from 'reselect';

/**
 * Direct selector to the githubUserContainer state domain
 */
const selectGithubUserPageDomain = () => (state) => state.get('GithubUserPage');

/**
 * Other specific selectors
 */


const makeSelectorShouldShowCommitList = () => createSelector(
  selectGithubUserPageDomain(),
  (substate) => {
    const data = substate.userRepos.get('data');
    return !!data && !!data.length;
  }
);


/**
 * Default selector used by GithubUserPage
 */


const makeSelectGithubUserPage = () => createSelector(
  selectGithubUserPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectGithubUserPage;
export {
  selectGithubUserPageDomain,
  makeSelectorShouldShowCommitList,
};
