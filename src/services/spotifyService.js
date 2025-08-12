// Spotify API service for handling authentication and data fetching

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

// Automatically choose redirect URI based on environment
const REDIRECT_URI = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
  ? import.meta.env.VITE_SPOTIFY_REDIRECT_URI_DEV
  : import.meta.env.VITE_SPOTIFY_REDIRECT_URI_PROD

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'
const SPOTIFY_AUTH_BASE = 'https://accounts.spotify.com'

class SpotifyService {
  constructor() {
    this.accessToken = localStorage.getItem('spotify_access_token')
    this.refreshToken = localStorage.getItem('spotify_refresh_token')
    this.tokenExpiry = localStorage.getItem('spotify_token_expiry')
  }

  // Generate authorization URL for Spotify login
  getAuthUrl() {
    const scopes = [
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-state'
    ].join(' ')

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: scopes,
      show_dialog: 'true'
    })

    return `${SPOTIFY_AUTH_BASE}/authorize?${params}`
  }

  // Exchange authorization code for access token
  async getAccessToken(code) {
    const response = await fetch(`${SPOTIFY_AUTH_BASE}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      })
    })

    if (!response.ok) {
      throw new Error('Failed to get access token')
    }

    const data = await response.json()
    
    // Store tokens
    this.accessToken = data.access_token
    this.refreshToken = data.refresh_token
    const expiryTime = Date.now() + (data.expires_in * 1000)
    
    localStorage.setItem('spotify_access_token', this.accessToken)
    localStorage.setItem('spotify_refresh_token', this.refreshToken)
    localStorage.setItem('spotify_token_expiry', expiryTime.toString())
    
    this.tokenExpiry = expiryTime.toString()
    
    return data
  }

  // Refresh the access token
  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await fetch(`${SPOTIFY_AUTH_BASE}/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken
      })
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    
    this.accessToken = data.access_token
    const expiryTime = Date.now() + (data.expires_in * 1000)
    
    localStorage.setItem('spotify_access_token', this.accessToken)
    localStorage.setItem('spotify_token_expiry', expiryTime.toString())
    
    this.tokenExpiry = expiryTime.toString()
    
    return data
  }

  // Check if token needs refresh
  async ensureValidToken() {
    if (!this.accessToken) {
      return false
    }

    const now = Date.now()
    const expiry = parseInt(this.tokenExpiry || '0')
    
    // Refresh if token expires in the next 5 minutes
    if (now >= expiry - 300000) {
      try {
        await this.refreshAccessToken()
        return true
      } catch (error) {
        console.error('Token refresh failed:', error)
        return false
      }
    }
    
    return true
  }

  // Make authenticated API request
  async apiRequest(endpoint) {
    const hasValidToken = await this.ensureValidToken()
    if (!hasValidToken) {
      return null
    }

    const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    })

    if (response.status === 401) {
      // Token might be invalid, try refreshing
      try {
        await this.refreshAccessToken()
        return this.apiRequest(endpoint)
      } catch (error) {
        console.error('API request failed after token refresh:', error)
        return null
      }
    }

    if (!response.ok) {
      console.error('Spotify API error:', response.status, response.statusText)
      return null
    }

    return response.json()
  }

  // Get currently playing track
  async getCurrentlyPlaying() {
    return this.apiRequest('/me/player/currently-playing')
  }

  // Get recently played tracks (fallback if nothing currently playing)
  async getRecentlyPlayed(limit = 1) {
    return this.apiRequest(`/me/player/recently-played?limit=${limit}`)
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.accessToken
  }

  // Clear authentication
  logout() {
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_refresh_token')
    localStorage.removeItem('spotify_token_expiry')
    this.accessToken = null
    this.refreshToken = null
    this.tokenExpiry = null
  }
}

export default new SpotifyService()
