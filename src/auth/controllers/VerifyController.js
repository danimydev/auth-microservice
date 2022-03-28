class SignController {

  #authStrategy;

  constructor(authStrategy) {
    this.#authStrategy = authStrategy;
  }

  async execute(httpRequest) {
    try {
      const { authorization } = httpRequest.headers;
      if (!authorization) {
        throw new Error('No authorization header passed');
      }
      const token = authorization.split(' ')[1];
      const user = this.#authStrategy.verify({ token });
      if (!user) {
        return {
          statusCode: 401,
        }
      }
      return {
        statusCode: 201,
        body: {
          user,
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      }
    }
  }

}

module.exports = SignController;