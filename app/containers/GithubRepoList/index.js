/*
 *
 * GithubUserContainer
 *
 */

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectError, makeSelectLoading, makeSelectItems } from './selectors';
import RepoListItem from '../../components/RepoListItem';
import ListWithMessages from '../../components/ListWithMessages';
import { userRepoSelected } from './actions';

export class GithubUserContainer extends PureComponent {
  onRepoClick = (repoId) => {
    const { onRepoClick, items } = this.props;
    const repository = items.find((repo) => repo.id === repoId);
    const { userName, name } = repository;
    onRepoClick(userName, name);
  };

  render() {
    const { items, loading, error } = this.props;
    return (
      <ListWithMessages
        loading={loading}
        listItemType={RepoListItem}
        error={error}
        items={items}
        defaultMessage={'Type something...'}
        onItemClick={this.onRepoClick}
      />
    );
  }
}

GithubUserContainer.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]).isRequired,
  onRepoClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectItems(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRepoClick: (userName, repoName) => dispatch(userRepoSelected(userName, repoName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubUserContainer);
