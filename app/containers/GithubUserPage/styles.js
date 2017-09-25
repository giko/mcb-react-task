import styled from 'styled-components';
import GithubRepoList from '../GithubRepoList';
import GithubCommitList from '../GithubCommitList';

export const Lists = styled.div`
  display: flex;
`;

export const Wrapper = styled.div`
  padding: 30px;
`;

export const StyledGithubRepoList = styled(GithubRepoList)`
  flex-shrink: 0;
  width: 300px;
`;

export const StyledGithubCommitList = styled(GithubCommitList)`
  min-width: 350px;
`;

