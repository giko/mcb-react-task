/**
*
* CommitListItem
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';


function CommitListItem({ item }) {
  const { name, url } = item;
  return (
    <li>
      <a href={url} target="_blank">{name}</a>
    </li>
  );
}

CommitListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommitListItem;
