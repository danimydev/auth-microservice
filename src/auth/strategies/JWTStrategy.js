class JWTAuthStrategy {

  #jwt;
  #secretKey;
  #defaultExp;

  constructor({
    jwt,
    secretKey,
    defaultExp = '1h',
  }) {
    this.#jwt = jwt;
    this.#secretKey = secretKey;
    this.#defaultExp = defaultExp;
  }

  sign({
    data,
    exp = this.#defaultExp,
  }) {
    return this.#jwt.sign(
      data,
      this.#secretKey,
      {
        expiresIn: exp,
      }
    );
  }

  verify({ token }) {
    return this.#jwt.verify(token, this.#secretKey);
  }

}

module.exports = JWTAuthStrategy;