import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ToroLoader({ isLoading }) {
  const [currentGif, setCurrentGif] = useState(0)
  
  const loadingGifs = [
    '/toro_gifs/bits-8bits-4.gif', // Active Toro
    '/toro_gifs/bits-8bits-5.gif', // Working Toro
    '/toro_gifs/bits-8bits-6.gif', // Happy Toro
  ]

  // Rotate through loading GIFs for variety
  useEffect(() => {
    if (!isLoading) return
    
    const interval = setInterval(() => {
      setCurrentGif((prev) => (prev + 1) % loadingGifs.length)
    }, 1000) // Change every second during loading
    
    return () => clearInterval(interval)
  }, [isLoading, loadingGifs.length])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-light-card dark:bg-dark-card border border-light-hover dark:border-dark-surface rounded-lg p-8 text-center shadow-2xl"
          >
            <motion.img 
              src={loadingGifs[currentGif]}
              alt="Loading..."
              className="w-16 h-16 mx-auto mb-4"
              style={{ imageRendering: 'pixelated' }}
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-mono mb-2">
                Loading...
              </p>
              <div className="flex justify-center space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-light-pink dark:bg-brand-pink rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ToroLoader
