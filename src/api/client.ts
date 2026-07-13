interface ApiFetchOptions extends RequestInit {
  jsonBody?: unknown;
}

/**
 * Merges default JSON headers with request-specific headers.
 */
const getJsonHeaders = (
  headers?: HeadersInit,
  hasJsonBody = false
) => {
  const requestHeaders = new Headers({
    accept: 'application/json',
  });

  if (hasJsonBody) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (headers) {
    new Headers(headers).forEach((value, key) => {
      requestHeaders.set(key, value);
    });
  }

  return requestHeaders;
};

/**
 * Wraps fetch with default JSON request headers for API calls.
 */
export const apiFetch = (
  endpoint: string,
  options: ApiFetchOptions = {}
) => {
  const { body, headers, jsonBody, ...requestOptions } = options;
  const hasJsonBody = jsonBody !== undefined;

  return fetch(endpoint, {
    ...requestOptions,
    headers: getJsonHeaders(headers, hasJsonBody),
    body: hasJsonBody ? JSON.stringify(jsonBody) : body,
  });
};
