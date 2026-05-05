module.exports = async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.send(buildPage('error', { message: 'No code received' }));
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.send(buildPage('error', { message: data.error_description || data.error }));
    }

    res.send(buildPage('success', { token: data.access_token, provider: 'github' }));
  } catch (err) {
    res.send(buildPage('error', { message: err.message }));
  }
};

/**
 * Decap CMS OAuth handshake (mirrors Netlify's api.netlify.com/auth/done):
 * 1. Popup sends  "authorizing:github"  → parent
 * 2. Parent sends "authorizing:github"  → popup  (acknowledgement)
 * 3. Popup sends  "authorization:github:success:{token}" → parent
 * 4. Popup closes
 */
function buildPage(status, payload) {
  const msg = JSON.stringify(
    'authorization:github:' + status + ':' + JSON.stringify(payload)
  );
  return `<!doctype html><html><body><script>
(function () {
  function cb(e) {
    window.removeEventListener('message', cb, false);
    e.source.postMessage(${msg}, e.origin);
    window.close();
  }
  window.addEventListener('message', cb, false);
  window.opener.postMessage('authorizing:github', '*');
})();
<\/script></body></html>`;
}
