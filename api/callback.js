export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.send(closeWith('error', { message: 'No code received' }));
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.send(closeWith('error', { message: data.error_description || data.error }));
    }

    res.send(closeWith('success', { token: data.access_token, provider: 'github' }));
  } catch (err) {
    res.send(closeWith('error', { message: err.message }));
  }
}

function closeWith(status, payload) {
  const msg = JSON.stringify(`authorization:github:${status}:${JSON.stringify(payload)}`);
  return `<!doctype html><html><body><script>
    window.opener.postMessage(${msg}, '*');
    window.close();
  </script></body></html>`;
}
