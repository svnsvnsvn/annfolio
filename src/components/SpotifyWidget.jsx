import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import spotifyService from '../services/spotifyService'

function SpotifyWidget() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch current track from Spotify
  const fetchCurrentTrack = async () => {
    try {
      // Try to get currently playing first
      let data = await spotifyService.getCurrentlyPlaying()
      
      // If nothing currently playing, get recently played
      if (!data || !data.item) {
        const recentData = await spotifyService.getRecentlyPlayed(1)
        if (recentData?.items?.[0]) {
          data = {
            item: recentData.items[0].track,
            is_playing: false // Recently played, not currently playing
          }
        }
      }

      if (data?.item) {
        const track = {
          name: data.item.name,
          artist: data.item.artists[0]?.name || 'Unknown Artist',
          album: data.item.album?.name || 'Unknown Album',
          albumArt: data.item.album?.images?.[0]?.url || null,
          isPlaying: data.is_playing || false
        }
        setCurrentTrack(track)
      } else {
        setCurrentTrack(null)
      }
    } catch (error) {
      console.error('Error fetching Spotify data:', error)
      setCurrentTrack(null)
    }
  }

  // Initialize and set up polling
  useEffect(() => {
    const init = async () => {
      setIsAuthenticated(spotifyService.isAuthenticated())
      setIsLoading(false)

      if (spotifyService.isAuthenticated()) {
        await fetchCurrentTrack()
      }
    }

    init()

    // Poll for updates every 30 seconds if authenticated
    let interval
    if (spotifyService.isAuthenticated()) {
      interval = setInterval(fetchCurrentTrack, 30000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])

  // Handle Spotify login
  const handleSpotifyLogin = () => {
    window.location.href = spotifyService.getAuthUrl()
  }

  // Don't show widget if not authenticated or no track
  if (!isAuthenticated) {
    // Show login option for testing
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50 font-mono"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={handleSpotifyLogin}
          className="w-12 h-12 bg-light-card dark:bg-dark-card border border-light-hover dark:border-dark-hover rounded-2xl flex items-center justify-center shadow-lg hover:border-light-pink dark:hover:border-brand-pink transition-all duration-300 cursor-pointer"
          whileHover={{ 
            scale: 1.1, 
            y: -2,
            transition: { type: "spring", stiffness: 400, damping: 15 }
          }}
          whileTap={{ scale: 0.95 }}
          title="Connect Spotify"
        >
          <span className="text-light-text-muted dark:text-dark-text-muted text-lg">♪</span>
        </motion.button>
      </motion.div>
    )
  }

  if (!currentTrack) {
    return null
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 font-mono"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.6, type: "spring", stiffness: 200 }}
    >
      {/* Compact indicator */}
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Small floating music note */}
        <motion.div
          className="w-12 h-12 bg-light-card dark:bg-dark-card border border-light-hover dark:border-dark-hover rounded-2xl flex items-center justify-center shadow-lg hover:border-light-pink dark:hover:border-brand-pink transition-all duration-300"
          whileHover={{ 
            scale: 1.1, 
            y: -2,
            transition: { type: "spring", stiffness: 400, damping: 15 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="text-light-pink dark:text-brand-pink text-lg"
            animate={currentTrack.isPlaying ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ♪
          </motion.span>
        </motion.div>

        {/* Expanded track info with album art */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-14 right-0 bg-light-card dark:bg-dark-card border border-light-hover dark:border-dark-hover rounded-2xl p-4 shadow-xl"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex gap-3 items-start">
                {/* Album art */}
                {currentTrack.albumArt ? (
                  <motion.img 
                    src={currentTrack.albumArt} 
                    alt={`${currentTrack.album} album cover`}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-light-hover dark:bg-dark-hover flex items-center justify-center flex-shrink-0">
                    <span className="text-light-text-muted dark:text-dark-text-muted text-2xl">♪</span>
                  </div>
                )}
                
                {/* Track details */}
                <div className="min-w-0">
                  <div className="text-xs text-light-text-muted dark:text-dark-text-muted mb-1">
                    ❯ {currentTrack.isPlaying ? 'now playing' : 'recently played'}
                  </div>
                  <div className="text-sm">
                    <div className="text-light-blue dark:text-brand-blue font-medium truncate max-w-[120px]">
                      {currentTrack.artist}
                    </div>
                    <div className="text-light-text-primary dark:text-dark-text-primary truncate max-w-[120px]">
                      {currentTrack.name}
                    </div>
                  </div>
                  <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 truncate max-w-[120px]">
                    {currentTrack.album}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle playing indicator */}
        {currentTrack.isPlaying && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-light-pink dark:bg-brand-pink rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default SpotifyWidget
