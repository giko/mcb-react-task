/**
*
* List
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

function List({ items, ListItem, ...itemProps }) {
  return (
    <ul>
      {items.map((item) => <ListItem item={item} key={item.id} {...itemProps} />)}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  ListItem: PropTypes.func.isRequired,
};

export default List;
