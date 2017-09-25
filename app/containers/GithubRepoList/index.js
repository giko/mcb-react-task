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

export class GithubRepoList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onRepoClick = (repoId) => {
    const { onRepoClick, items } = this.props;
    const repository = items.find((repo) => repo.id === repoId);
    const { userName, name } = repository;
    onRepoClick(userName, name);
    this.setState({ activeItem: repoId });
  };

  render() {
    const { items, loading, error, className } = this.props;
    const { activeItem } = this.state;
    return (
      <ListWithMessages
        loading={loading}
        listItemType={RepoListItem}
        error={error}
        items={items}
        onItemClick={this.onRepoClick}
        activeId={activeItem}
        onNoItemsMessage={'This user have no repositories'}
        className={className}
      />
    );
  }
}

GithubRepoList.propTypes = {
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
  className: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(GithubRepoList);
