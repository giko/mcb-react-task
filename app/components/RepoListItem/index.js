/**
*
* ListItem
*
*/

import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
// import styled from 'styled-components';


class RepoListItem extends React.PureComponent {
  onClick = () => {
    const { onItemClick, item } = this.props;
    onItemClick(item.id);
  };

  render() {
    const { item } = this.props;
    return (
      <ListItem onClick={this.onClick}>
        {item.name}
      </ListItem>
    );
  }
}

RepoListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onItemClick: PropTypes.func,
};
RepoListItem.defaultProps = {
  onItemClick: () => {},
};

export default RepoListItem;
