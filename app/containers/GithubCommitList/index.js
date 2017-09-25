/*
 *
 * GithubCommitList
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectError, makeSelectLoading, makeSelectItems } from './selectors';
import CommitListItem from '../../components/CommitListItem';
import ListWithMessages from '../../components/ListWithMessages';

export function GithubCommitList({ items, loading, error, className }) {
  return (
    <ListWithMessages
      loading={loading}
      listItemType={CommitListItem}
      error={error}
      items={items}
      defaultMessage={'Click on a repository to see commits'}
      onNoItemsMessage={'This repository have no commits'}
      className={className}
    />
  );
}

GithubCommitList.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  className: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  items: makeSelectItems(),
  error: makeSelectError(),
});

export default connect(mapStateToProps)(GithubCommitList);
