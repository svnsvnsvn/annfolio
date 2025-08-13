import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const NotFound = () => {
  const [toroMessage, setToroMessage] = useState(0)
  
  const toroMessages = [
    "404... even toro got lost",
    "this page wandered off somewhere",
    "oops! nothing here but pixels",
    "404: page went on vacation",
    "error 404: toro can't find this one"
  ]

  // Cycle through messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setToroMessage(prev => (prev + 1) % toroMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      {/* Animated 404 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <motion.h1 
          className="text-8xl md:text-9xl font-mono font-bold text-light-text-muted dark:text-dark-text-muted"
          animate={{ 
            scale: [1, 1.02, 1],
            rotateY: [0, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          404
        </motion.h1>
      </motion.div>

      {/* Toro-style animated message */}
      <motion.div
        className="mb-8 h-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.p
          key={toroMessage}
          className="text-xl md:text-2xl text-light-text-secondary dark:text-dark-text-secondary font-mono"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {toroMessages[toroMessage]}
        </motion.p>
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-light-blue dark:bg-brand-blue rounded-full opacity-30"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Cute cat character */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
      >
        <motion.img
          src="/confused_toro.png"
          alt="Confused toro cat"
          className="w-32 h-32 object-contain"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Navigation options */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-light-blue dark:bg-brand-blue text-white rounded-xl hover:bg-opacity-90 transition-all duration-300 font-mono text-sm tracking-wide shadow-lg hover:shadow-xl"
        >
          go home
        </Link>
        
        <Link
          to="/projects"
          className="px-6 py-3 border border-light-hover dark:border-dark-hover text-light-text-primary dark:text-dark-text-primary rounded-xl hover:bg-light-hover dark:hover:bg-dark-hover transition-all duration-300 font-mono text-sm tracking-wide"
        >
          browse projects
        </Link>
      </motion.div>

      {/* Fun footer message */}
      <motion.p
        className="mt-8 text-xs text-light-text-muted dark:text-dark-text-muted font-mono opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2 }}
      >
        maybe try the command palette? press{' '}
        <span className="px-1 py-0.5 bg-light-hover dark:bg-dark-hover rounded text-xs">
          cmd+k
        </span>
      </motion.p>
    </div>
  )
}

export default NotFound
