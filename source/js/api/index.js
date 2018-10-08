const API_URL = 'https://swapi.co/api';

function ApiError(message, data, status) {
  let response = null;
  let isObject = false;

  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }

  return {
    response,
    message,
    status,
    toString: () => {
      return `${ this.message } \nResponse:\n${ isObject ? JSON.stringify(this.response, null, 2) : this.response }`;
    },
  };
}

const fetchResource = (path, userOptions = {}) => {
  const defaultOptions = {};
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const options = {
    ...defaultOptions,
    ...userOptions,
    headers: {
      ...defaultHeaders,
      ...userOptions.headers,
    },
  };

  const url = `${ API_URL }/${ path }`;
  const isFile = typeof window !== 'undefined' && options.body instanceof File;

  if (options.body && typeof options.body === 'object' && !isFile) {
    options.body = JSON.stringify(options.body);
  }

  let response = null;

  return fetch(url, options)
    .then(responseObject => {
      // savings response for later use in lower scopes
      response = responseObject;
      if (response.status === 401) {
        // what will happen if there are unauthorized requests
      }

      // check other http error codes
      if (response.status < 200 || response.status >= 300) {
        return response.text();
      }
      return response.json();
    })
    .then(parsedResponse => {
      if (response.status < 200 || response.status >= 300) {
        throw parsedResponse;
      }
      return parsedResponse;
    })
    .catch(error => {
      // throw error
      if (response) {
        throw ApiError(`Request failed with status ${ response.status }.`, error, response.status);
      } else {
        throw ApiError(error.toString(), null, 'REQUEST_FAILED');
      }
    });
};

function getPeople() {
  return fetchResource('people/');
}

export default {
  getPeople,
};
