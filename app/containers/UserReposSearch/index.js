/*
 *
 * UserReposSearch
 *
 */

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withState } from 'recompose';

import Search from '../../components/Search';
import { searchRepos } from './actions';


const UserReposSearch = withState('searchText', 'setSearchText', 'giko')(Search);

UserReposSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (userName) => dispatch(searchRepos(userName)),
  };
}
export default connect(null, mapDispatchToProps)(UserReposSearch);
