import { createSelector } from 'reselect';

/**
 * Direct selector to the githubUserContainer state domain
 */
const selectGithubUserContainerDomain = () => (state) => state.get('GithubUserPage').userRepos;

/**
 * Other specific selectors
 */

const makeSelectItems = () => createSelector(
  selectGithubUserContainerDomain(),
  (substate) => {
    const data = substate.get('data');
    return data && data.map((repo) => ({
      id: repo.id.toString(),
      name: repo.name,
      userName: repo.owner.login,
    }));
  }
);

const makeSelectLoading = () => createSelector(
  selectGithubUserContainerDomain(),
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectGithubUserContainerDomain(),
  (substate) => substate.get('error')
);


/**
 * Default selector used by GithubUserPage
 */

const makeSelectGithubUserContainer = () => createSelector(
  selectGithubUserContainerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectGithubUserContainer;
export {
  selectGithubUserContainerDomain,
  makeSelectItems,
  makeSelectLoading,
  makeSelectError,
};
