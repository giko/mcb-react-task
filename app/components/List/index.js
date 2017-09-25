/**
*
* List
*
*/

import React, { PropTypes } from 'react';
import * as MaterialList from 'material-ui/List';
// import styled from 'styled-components';

function List({ className, items, ListItem, activeId, ...itemProps }) {
  return (
    <MaterialList.List className={className}>
      {items.map((item) => <ListItem item={item} key={item.id} {...itemProps} />)}
    </MaterialList.List>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  ListItem: PropTypes.func.isRequired,
  activeId: PropTypes.string,
  className: PropTypes.string,
};

export default List;
