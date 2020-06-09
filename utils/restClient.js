class RestClient {
  constructor() { }

  get(url,headers) {
    return fetch(url,{headers}).then(response => response.json());
  }

  post(url, data) {
    const res = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json());
    return res;
  }
}
module.exports = RestClient;
