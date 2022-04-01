class OAuthController {

  #oAuthStrategy;

  constructor(oAuthStrategy){
    this.#oAuthStrategy = oAuthStrategy;
  }

  execute(httpRequest){
    try {
      const { query } = httpRequest;
      const oauthProviderUrl =  this.#oAuthStrategy.getRequestUrl(query);
      return { oauthProviderUrl }
    } catch (error) {
      throw error;
    }
  }

}

module.exports = OAuthController;