export default function handler(req, res) {
  const { OAUTH_CLIENT_ID } = process.env;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const callbackUrl = `${proto}://${host}/api/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=repo`;
  res.redirect(301, url);
}
