// Vercel serverless function for Spotify authentication
// This handles the OAuth callback and stores your refresh token

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, error } = req.query;

  if (error) {
    return res.status(400).json({ error: `Spotify auth error: ${error}` });
  }

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI
      })
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    const tokens = await tokenResponse.json();

    // In a real app, you'd store the refresh_token in a database
    // For now, we'll log it so you can manually add it to your env vars
    console.log('IMPORTANT: Save this refresh token to your environment variables:');
    console.log('SPOTIFY_REFRESH_TOKEN=' + tokens.refresh_token);

    // Redirect to success page
    return res.redirect('/?spotify=success');

  } catch (error) {
    console.error('Spotify auth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
