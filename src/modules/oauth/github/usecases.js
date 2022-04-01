const { oauth: { github } } = require('../../../../config');
const axios = require('axios');

function getGitHubAuthorizationUrl({ path, scope }) {
  const { baseUrl, clientId, redirectUrl } = github;
  return `${baseUrl}/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}?path=${path}&scope=${scope}`;
}

async function getGitHubUser({ code }) {
  try {
    const token = await getAccessToken({ code });
    console.log(token);
    const url = 'http://api.github.com/user';
    const user = await axios.get(url, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
    return user.data;
  } catch (error) {
    throw new Error('Error getting user from GitHub');
  }
}

async function getAccessToken({ code }) {
  try {
    const { baseUrl, clientId, clientSecret } = github;
    const url = `${baseUrl}/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
    console.log(url);
    const body = await axios.get(url, {
      headers:{
        'Accept': 'application/json'
      }
    });
    return body.data?.access_token;
  } catch (error) {
    throw new Error('Invalid code!');
  }
}

module.exports = {
  getGitHubAuthorizationUrl,
  getGitHubUser,
}