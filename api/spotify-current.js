// Vercel serverless function to get your current Spotify track
// This is what your frontend will call to display your music

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get fresh access token using your stored refresh token
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      return res.status(200).json({ 
        track: null, 
        message: 'Spotify not connected' 
      });
    }

    // Get currently playing track
    let currentTrack = await getCurrentlyPlaying(accessToken);
    
    // If nothing currently playing, get recently played
    if (!currentTrack) {
      currentTrack = await getRecentlyPlayed(accessToken);
    }

    return res.status(200).json({
      track: currentTrack,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Spotify data',
      track: null 
    });
  }
}

async function getAccessToken() {
  if (!process.env.SPOTIFY_REFRESH_TOKEN) {
    return null;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
      })
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}

async function getCurrentlyPlaying(accessToken) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.status === 204 || !response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (!data || !data.item) {
      return null;
    }

    return {
      name: data.item.name,
      artist: data.item.artists[0]?.name || 'Unknown Artist',
      album: data.item.album?.name || 'Unknown Album',
      albumArt: data.item.album?.images?.[0]?.url || null,
      isPlaying: data.is_playing || false,
      spotifyUrl: data.item.external_urls?.spotify || null
    };
  } catch (error) {
    console.error('Error getting currently playing:', error);
    return null;
  }
}

async function getRecentlyPlayed(accessToken) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }

    const track = data.items[0].track;
    
    return {
      name: track.name,
      artist: track.artists[0]?.name || 'Unknown Artist',
      album: track.album?.name || 'Unknown Album',
      albumArt: track.album?.images?.[0]?.url || null,
      isPlaying: false,
      spotifyUrl: track.external_urls?.spotify || null,
      playedAt: data.items[0].played_at
    };
  } catch (error) {
    console.error('Error getting recently played:', error);
    return null;
  }
}
