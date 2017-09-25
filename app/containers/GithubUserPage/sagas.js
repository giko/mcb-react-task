import githubRepoListWatchers from '../GithubRepoList/sagas';
import GithubCommitListWatchers from '../GithubCommitList/sagas';
import UserReposSearchWatchers from '../UserReposSearch/sagas';

// All sagas to be loaded
export default [
  ...githubRepoListWatchers,
  ...GithubCommitListWatchers,
  ...UserReposSearchWatchers,
];
