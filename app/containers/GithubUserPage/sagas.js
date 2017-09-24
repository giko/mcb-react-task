import loadReposWatcher from '../GithubRepoList/sagas';
import githubCommitWatcher from '../GithubCommitList/sagas';
import searchUserReposWatcher from '../UserReposSearch/sagas';

// All sagas to be loaded
export default [
  ...loadReposWatcher,
  ...githubCommitWatcher,
  ...searchUserReposWatcher,
];
