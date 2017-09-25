/*
 *
 * GithubUserContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UserReposSearch from '../UserReposSearch';
import { makeSelectorShouldShowCommitList } from './selectors';
import { Lists, StyledGithubCommitList, StyledGithubRepoList, Wrapper } from './styles';


export function GithubUserPage({ shouldShowCommitList }) {
  return (
    <Wrapper>
      <UserReposSearch />
      <Lists>
        <StyledGithubRepoList />
        {shouldShowCommitList && <StyledGithubCommitList />}
      </Lists>
    </Wrapper>
  );
}


GithubUserPage.propTypes = {
  shouldShowCommitList: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  shouldShowCommitList: makeSelectorShouldShowCommitList(),
});

export default connect(mapStateToProps)(GithubUserPage);
