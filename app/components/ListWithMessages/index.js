/* eslint-disable no-nested-ternary */
/**
*
* ListWithMessages
*
*/

import React, { PropTypes } from 'react';
import List from '../List';
// import styled from 'styled-components';


function ListWithMessages({ listItemType, items, loading, error, onLoadingMessage, onErrorMessage, defaultMessage, ...props }) {
  if (items) {
    return (
      <List ListItem={listItemType} items={items} {...props} />
    );
  }
  const message = loading ? onLoadingMessage : error ? onErrorMessage : defaultMessage;

  return (
    <div>{message}</div>
  );
}

ListWithMessages.propTypes = {
  listItemType: PropTypes.func.isRequired,
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onLoadingMessage: PropTypes.string,
  onErrorMessage: PropTypes.string,
  defaultMessage: PropTypes.string,
};

ListWithMessages.defaultProps = {
  onLoadingMessage: 'Loading..',
  onErrorMessage: 'Something went wrong..',
  defaultMessage: '',
};

export default ListWithMessages;
