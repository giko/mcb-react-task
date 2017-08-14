import 'whatwg-fetch';
import { call } from 'redux-saga/effects';

import isEmpty from 'lodash/isEmpty';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
export const baseUrl = 'https://api.github.com/';

function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export function requestPromise(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

export function* request(url: String, options) {
  const result = yield call(
    requestPromise,
    url.startsWith('http') ? url : baseUrl.concat(url),
    { ...options, credentials: 'omit' }
  );
  if (result.err) {
    throw result.err;
  }

  return result.data;
}

export default request;

export function* postRequest(url, data) {
  return yield request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export function* postData(url, data) {
  return yield request(url, {
    method: 'POST',
    body: data,
  });
}
