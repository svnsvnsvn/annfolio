// Simplified Spotify service - now calls your backend instead of Spotify directly

// For local development, you can either:
// 1. Use vercel dev (requires login)
// 2. Deploy to production and test there
// 3. Return mock data for local testing

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://svn7svn.com/api' 
  : 'https://svn7svn.com/api'; // Use production API even in dev for now

class SpotifyService {
  // Get your current track from your backend (no auth needed for visitors)
  async getCurrentTrack() {
    try {
      // For local development without backend, return mock data
      if (process.env.NODE_ENV === 'development' && !window.location.hostname.includes('svn7svn.com')) {
        return {
          name: "Mock Song",
          artist: "Test Artist", 
          album: "Development Album",
          albumArt: null,
          isPlaying: true,
          spotifyUrl: null
        };
      }

      const response = await fetch(`${API_BASE}/spotify-current`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch current track');
      }

      const data = await response.json();
      return data.track;
    } catch (error) {
      console.error('Error fetching current track:', error);
      // Return mock data as fallback
      return {
        name: "Unable to load",
        artist: "Spotify connection needed", 
        album: "Check backend setup",
        albumArt: null,
        isPlaying: false,
        spotifyUrl: null
      };
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
