
/*global process*/
export const request = options => function (command, module) {
  const url = `${command}`;
  options.body = typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'x-api-key':'gh35tPGO6j7nYj10RNpm69vBVAoFPBmEjtPno5Md'
  };
  options.headers = options.headers
    ? Object.assign({}, defaultHeaders, options.headers)
    : defaultHeaders;
  return fetch('https://api.shotstack.io/stage' + url, {
    ...options,
  }).then((response) => {
    if (!response.ok) {
      throw response.json().then((i) => {
        const responseStatus = i.status;
        const baseURL = localStorage.getItem('baseURL');
        if (responseStatus === "401" && baseURL) {
          localStorage.clear();
        }
        if (responseStatus === 404) return 'Something went wrong';
        if (responseStatus === 403) {
          return 'Access Denied';
        }
        if(responseStatus === 500) return 'Internal Server Error';
        if (responseStatus === 504) return 'Currently unreachable. Please Try Again Later';
        return i || 'errorStatus';
      });
    }
    return response.json();
  })
    .then(jsonData => jsonData)
    .catch((error) => {
      if (error && error.then) {
        return error.then((e) => {
          return e;
        });
      }
      return error;
    });
};
