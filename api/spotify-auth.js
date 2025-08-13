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
    // Debug: Log environment variables (safely)
    console.log('🔧 DEBUG: Environment variables check:');
    console.log('CLIENT_ID exists:', !!process.env.SPOTIFY_CLIENT_ID);
    console.log('CLIENT_SECRET exists:', !!process.env.SPOTIFY_CLIENT_SECRET);
    console.log('REDIRECT_URI:', process.env.SPOTIFY_REDIRECT_URI);
    console.log('Authorization code received:', code.substring(0, 10) + '...');

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

    console.log('🔧 DEBUG: Token exchange response status:', tokenResponse.status);

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      console.error('🚨 Token exchange failed. Response:', errorBody);
      throw new Error(`Failed to exchange code for tokens: ${tokenResponse.status} - ${errorBody}`);
    }

    const tokens = await tokenResponse.json();

    // Debug: Log token info (safely)
    console.log('🔧 DEBUG: Token exchange successful!');
    console.log('Access token received:', !!tokens.access_token);
    console.log('Refresh token received:', !!tokens.refresh_token);
    console.log('Token expires in:', tokens.expires_in, 'seconds');

    // Log the refresh token for manual addition to env vars
    console.log('');
    console.log('🎯 IMPORTANT: Copy this refresh token to your Vercel environment variables:');
    console.log('==================================================================================');
    console.log('SPOTIFY_REFRESH_TOKEN=' + tokens.refresh_token);
    console.log('==================================================================================');
    console.log('');

    // Also show instructions
    console.log('📋 Next steps:');
    console.log('1. Go to Vercel Dashboard → Settings → Environment Variables');
    console.log('2. Add SPOTIFY_REFRESH_TOKEN with the value above');
    console.log('3. Redeploy your application');
    console.log('4. Test: https://svn7svn.com/api/spotify-current');

    // Redirect to success page
    return res.redirect('/?spotify=success');

  } catch (error) {
    console.error('🚨 Spotify auth error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
