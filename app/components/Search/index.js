/**
*
* Search
*
*/

import React, { PropTypes, PureComponent } from 'react';
// import styled from 'styled-components';

class Search extends PureComponent {
  onSubmit = (e) => {
    const { searchText, onSearch } = this.props;
    e.preventDefault();
    onSearch(searchText);
  };
  onChange = (e) => {
    const { setSearchText } = this.props;
    setSearchText(e.target.value);
  };
  render() {
    const { searchText } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <input required type="text" value={searchText} onChange={this.onChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}


Search.propTypes = {
  searchText: PropTypes.string,
  setSearchText: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
};

Search.defaultProps = {
  onSearch: () => {},
};

export default Search;
