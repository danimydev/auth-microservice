class SignController {

  #authStrategy;

  constructor(authStrategy) {
    this.#authStrategy = authStrategy;
  }

  async execute(httpRequest) {
    try {
      const { data, exp } = httpRequest.body;
      const token = this.#authStrategy.sign({
        data,
        exp,
      });
      return {
        statusCode: 201,
        body: {
          token,
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
