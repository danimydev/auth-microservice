class OAuthStrategy {

  #config;

  constructor({ config }){
    this.#config = config;
  }

  getRequestUrl({path, scope = 'user:email'}){
    const { requestBaseUrl, clientId, redirectUrl } = this.#config;
    return `${requestBaseUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}?path=${path}&scope=${scope}`;
  }

}

module.exports = OAuthStrategy;