/**
 * Direct selector to the githubCommitList state domain
 */
import { createSelector } from 'reselect';

const selectGithubCommitListDomain = () => (state) => state.get('GithubUserPage').repoCommits;

/**
 * Other specific selectors
 */

const makeSelectLoading = () => createSelector(
  selectGithubCommitListDomain(),
  (substate) => substate.get('loading')
);

const makeSelectItems = () => createSelector(
  selectGithubCommitListDomain(),
  (substate) => {
    const data = substate.get('data');
    return data && data.slice(0, 10).map((commit) => ({
      id: commit.sha,
      name: commit.commit.message,
      url: commit.html_url,
    }));
  }
);

const makeSelectError = () => createSelector(
  selectGithubCommitListDomain(),
  (substate) => substate.get('error')
);


/**
 * Default selector used by GithubCommitList
 */

const makeSelectGithubCommitList = () => createSelector(
  selectGithubCommitListDomain(),
  (substate) => substate.toJS()
);

export default makeSelectGithubCommitList;
export {
  selectGithubCommitListDomain,
  makeSelectLoading,
  makeSelectItems,
  makeSelectError,
};
