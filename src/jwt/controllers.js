const usecases = require('./usecases');

function sign(req, res) {
  try {
    const { body } = req;
    const token = usecases.signData(body);
    if (!token) {
      throw new Error('Could not register a new token');
    }
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

function verify(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new Error('No token passed inside body');
    }
    const data = usecases.verifyToken(token);
    if (!data) {
      throw new Error('Invalid token');
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  sign,
  verify,
}