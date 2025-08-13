// Simplified Spotify service - now calls your backend instead of Spotify directly

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://svn7svn.com/api' 
  : 'http://localhost:3000/api';

class SpotifyService {
  // Get your current track from your backend (no auth needed for visitors)
  async getCurrentTrack() {
    try {
      const response = await fetch(`${API_BASE}/spotify-current`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch current track');
      }

      const data = await response.json();
      return data.track;
    } catch (error) {
      console.error('Error fetching current track:', error);
      return null;
    }
  }

  // Admin function: Generate auth URL for you to authenticate (one-time setup)
  getAuthUrl() {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const scopes = [
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-state'
    ].join(' ');

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: `${API_BASE}/spotify-auth`,
      scope: scopes,
      show_dialog: 'true'
    });

    return `https://accounts.spotify.com/authorize?${params}`;
  }
}

export default new SpotifyService()
