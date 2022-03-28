function expressAdapter({ controller }) {
  return async (req, res) => {
    try {
      const httpRequest = getHttpReqFromExpress(req);
      const httpResponse = await controller.execute(httpRequest);
      const { statusCode, body } = httpResponse;
      return res.status(statusCode).json(body);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

function getHttpReqFromExpress(req) {
  return {
    headers: req.headers,
    params: req.params,
    body: req.body,
  }
}

module.exports = {
  expressAdapter,
}