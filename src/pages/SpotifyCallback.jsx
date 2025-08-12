import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import spotifyService from '../services/spotifyService'

function SpotifyCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const error = urlParams.get('error')

      if (error) {
        console.error('Spotify auth error:', error)
        navigate('/')
        return
      }

      if (code) {
        try {
          await spotifyService.getAccessToken(code)
          navigate('/')
        } catch (error) {
          console.error('Failed to get access token:', error)
          navigate('/')
        }
      } else {
        navigate('/')
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-light-surface dark:bg-dark-surface flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-light-pink dark:border-brand-pink mx-auto mb-4"></div>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Connecting to Spotify...
        </p>
      </div>
    </div>
  )
}

export default SpotifyCallback
