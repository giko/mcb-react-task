import { createSelector } from 'reselect';

/**
 * Direct selector to the githubUserContainer state domain
 */
const selectGithubUserContainerDomain = () => (state) => state.get('githubUserContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GithubUserContainer
 */

const makeSelectGithubUserContainer = () => createSelector(
  selectGithubUserContainerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectGithubUserContainer;
export {
  selectGithubUserContainerDomain,
};
