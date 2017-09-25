/* eslint-disable no-nested-ternary */
/**
*
* ListWithMessages
*
*/

import React, { PropTypes } from 'react';
import List from '../List';
import {Message} from "./styles";
// import styled from 'styled-components';


function ListWithMessages({ className, listItemType, items, loading, error, onLoadingMessage, onErrorMessage, defaultMessage, onNoItemsMessage, ...props }) {
  if (items && items.length) {
    return (
      <List className={className} ListItem={listItemType} items={items} {...props} />
    );
  }
  const message = loading ? onLoadingMessage
    : error ? onErrorMessage
      : items ? onNoItemsMessage : defaultMessage;

  return (
    <Message className={className}>
      {message}
    </Message>
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
  onNoItemsMessage: PropTypes.string,
  className: PropTypes.string,
};

ListWithMessages.defaultProps = {
  onLoadingMessage: 'Loading...',
  onErrorMessage: 'Something went wrong...',
  onNoItemsMessage: '',
  defaultMessage: '',
};

export default ListWithMessages;
