const usecases = require('./usecases');

function authorization(req, res) {
  try {
    const { path, scope } = req.query;
    const url = usecases.getGitHubAuthorizationUrl({ path, scope });
    res.redirect(url);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

function authorizationCallback(req, res) {
  try {
    const { code } = req.query;
    if (!code) {
      throw new Error('No code passed by github');
    }
    res.status(201).json({ code });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function accessToken(req, res) {
  try {
    const { code } = req.query;
    const user = await usecases.getGitHubUser({ code });
    if (!user) {
      throw new Error('Error creating github token');
    }
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  authorization,
  authorizationCallback,
  accessToken,
}