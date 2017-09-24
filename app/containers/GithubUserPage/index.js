/*
 *
 * GithubUserContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GithubRepoList from '../GithubRepoList';
import GithubCommitList from '../GithubCommitList';
import UserReposSearch from '../UserReposSearch';
import { makeSelectorShouldShowCommitList } from './selectors';


export function GithubUserPage({ shouldShowCommitList }) {
  return (
    <div>
      <UserReposSearch />
      <GithubRepoList />
      {shouldShowCommitList && <GithubCommitList />}
    </div>
  );
}


GithubUserPage.propTypes = {
  shouldShowCommitList: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  shouldShowCommitList: makeSelectorShouldShowCommitList(),
});

export default connect(mapStateToProps)(GithubUserPage);
