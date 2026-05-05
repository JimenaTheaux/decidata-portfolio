module.exports = function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const callbackUrl = 'https://decidata-portfolio.vercel.app/api/callback';
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=repo`;
  res.redirect(301, url);
};
