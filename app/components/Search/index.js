/**
*
* Search
*
*/

import React, { PropTypes, PureComponent } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { FormControl } from './styles';

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
        <FormControl required type="text" value={searchText} onChange={this.onChange} name="Search" />
        <FlatButton type="submit" label="Search" primary />
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
