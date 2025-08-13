import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import spotifyService from '../services/spotifyService'

function SpotifyWidget() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dominantColor, setDominantColor] = useState(null)

  const fetchCurrentTrack = async () => {
    try {
      const track = await spotifyService.getCurrentTrack()
      setCurrentTrack(track)
      
      // Extract dominant color from album art
      if (track?.albumArt) {
        extractDominantColor(track.albumArt)
      } else {
        setDominantColor(null)
      }
    } catch (error) {
      console.error('Error fetching Spotify data:', error)
      setCurrentTrack(null)
      setDominantColor(null)
    }
  }

  // Extract dominant color from album artwork
  const extractDominantColor = (imageUrl) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        
        let r = 0, g = 0, b = 0, count = 0
        
        // Sample every 10th pixel for performance
        for (let i = 0; i < data.length; i += 40) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count++
        }
        
        r = Math.floor(r / count)
        g = Math.floor(g / count)
        b = Math.floor(b / count)
        
        setDominantColor(`${r}, ${g}, ${b}`)
      } catch (error) {
        // CORS error or other issue, fall back to default
        setDominantColor(null)
      }
    }
    img.src = imageUrl
  }

  // Initialize and set up polling
  useEffect(() => {
    const init = async () => {
      setIsLoading(false)
      await fetchCurrentTrack()
    }

    init()

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchCurrentTrack, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  // Don't show widget if no track or still loading
  if (isLoading || !currentTrack) {
    return null
  }

  // Creative branding messages
  const brandingMessages = {
    playing: [
      "ann's listening to",
      "in the headphones rn",
      "soundtrack to coding",
      "audio.currentlyPlaying()",
      "vibing to",
      "ears = busy"
    ],
    paused: [
      "ann recently listened to",
      "last played frequency",
      "previous wavelength",
      "recent audio.cache",
      "echoes of",
      "memory.lastPlayed"
    ]
  }

  const getBrandingMessage = () => {
    const messages = currentTrack.isPlaying ? brandingMessages.playing : brandingMessages.paused
    return messages[Math.floor(Date.now() / (1000 * 60 * 5)) % messages.length] // Changes every 5 minutes
  }

  // Dynamic color scheme
  const getColorScheme = () => {
    if (dominantColor) {
      return {
        accent: `rgba(${dominantColor}, 0.8)`,
        accentLight: `rgba(${dominantColor}, 0.3)`,
        accentGlow: `rgba(${dominantColor}, 0.1)`
      }
    }
    return {
      accent: 'rgb(236, 72, 153)', 
      accentLight: 'rgba(236, 72, 153, 0.3)',
      accentGlow: 'rgba(236, 72, 153, 0.1)'
    }
  }

  const colors = getColorScheme()

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 font-mono"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Compact floating indicator */}
        <motion.div
          className="w-14 h-14 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border border-light-hover/50 dark:border-dark-hover/50 rounded-2xl flex items-center justify-center shadow-xl"
          style={{
            borderColor: dominantColor ? `rgba(${dominantColor}, 0.3)` : undefined,
            boxShadow: `0 8px 32px rgba(0,0,0,0.1), 0 0 20px ${colors.accentGlow}`
          }}
          whileHover={{ 
            scale: 1.1, 
            y: -4,
            transition: { type: "spring", stiffness: 400, damping: 15 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="text-xl"
            style={{ color: colors.accent }}
            animate={currentTrack.isPlaying ? { 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1] 
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ♪
          </motion.span>
        </motion.div>

        {/* Status dot */}
        {currentTrack.isPlaying && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.accent }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Expanded track info */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-16 right-0 backdrop-blur-md bg-light-card/90 dark:bg-dark-card/90 border border-light-hover/50 dark:border-dark-hover/50 rounded-3xl p-5 shadow-2xl min-w-[320px]"
              style={{
                borderColor: dominantColor ? `rgba(${dominantColor}, 0.3)` : undefined,
                background: dominantColor 
                  ? `linear-gradient(135deg, rgba(${dominantColor}, 0.1) 0%, rgba(0,0,0,0.8) 100%)`
                  : undefined
              }}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Creative header */}
              <motion.div 
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                  animate={currentTrack.isPlaying ? { 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary tracking-wide">
                  {getBrandingMessage()}
                </span>
              </motion.div>

              <div className="flex gap-4 items-start">
                {/* Album art - clickable */}
                <motion.div 
                  className="flex-shrink-0 cursor-pointer group relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => currentTrack.spotifyUrl && window.open(currentTrack.spotifyUrl, '_blank')}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentTrack.albumArt ? (
                    <>
                      <motion.img 
                        src={currentTrack.albumArt} 
                        alt={`${currentTrack.album} album cover`}
                        className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: colors.accentLight }}
                    >
                      <span className="text-white text-3xl">♪</span>
                    </div>
                  )}
                </motion.div>
                
                {/* Track details */}
                <div className="min-w-0 flex-1">
                  <motion.div 
                    className="text-light-text-primary dark:text-dark-text-primary font-medium text-base mb-1 truncate"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentTrack.name}
                  </motion.div>
                  
                  <motion.div 
                    className="text-light-blue dark:text-brand-blue text-sm mb-2 truncate"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    by {currentTrack.artist}
                  </motion.div>
                  
                  <motion.div 
                    className="text-light-text-secondary dark:text-dark-text-secondary text-xs truncate"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {currentTrack.album}
                  </motion.div>

                  {/* Status with audio visualizer */}
                  <motion.div 
                    className="flex items-center gap-3 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex gap-1 items-end">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 rounded-full"
                          style={{ backgroundColor: colors.accent }}
                          animate={currentTrack.isPlaying ? {
                            height: [2, 8, 2],
                            opacity: [0.5, 1, 0.5]
                          } : { height: 2, opacity: 0.3 }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-light-text-muted dark:text-dark-text-muted text-xs">
                      {currentTrack.isPlaying ? 'now playing' : 'last played'}
                    </span>
                  </motion.div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default SpotifyWidget
