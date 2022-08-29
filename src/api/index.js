export default class ApiRequestor {
  static defaults = {
    baseUrl: 'https://swapi.dev/api/',
  };

  constructor(options) {
    this.options = {
      ...ApiRequestor.defaults,
      ...options,
    };
  }

  request({
    method,
    path: pathname,
  }) {
    const url = `${this.options.baseUrl}${pathname}`;
    return fetch(url, {
      method,
    }).then(r =>
      r.json()
    )
  }

  get = {
    characters: ({ page = 1 }) => this.request({
      method: 'GET',
      path: `people?page=${page}`,
    }),
    characterById: ({ id = 1 }) => this.request({
      method: 'GET',
      path: `people/${id}`,
    }),
  }

  post = {}

  put = {}

  destroy = {}

  patch = {}
}

export const api = new ApiRequestor();