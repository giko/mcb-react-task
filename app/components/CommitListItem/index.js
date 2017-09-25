/**
*
* CommitListItem
*
*/

import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import { Link } from './styles';
// import styled from 'styled-components';


function CommitListItem({ item }) {
  const { name, url } = item;
  return (
    <Link href={url} target="_blank">
      <ListItem>
        {name}
      </ListItem>
    </Link>
  );
}

CommitListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommitListItem;
