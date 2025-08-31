import Link from '../components/Link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlinkingCursor from '../components/BlinkingCursor'

function RotatingInterest() {
  const [index, setIndex] = useState(0)

  const interests = [
    "crocheting... I'm working on a blanket for my bed.",
    'watching cozy YouTube videos (and 3-hour commentary ones).',
    'The Sims 4 (building cute houses mostly).',
    'puppet combo horror games (but only watching others play).',
    'coconut boba slushies.',
    'baking something sweet when I need a break.'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % interests.length)
    }, 3500) // Slower than status indicator
    return () => clearInterval(interval)
  }, [])

  return (
    <span aria-live="polite" aria-label="my current interest">
      <AnimatePresence mode="wait">
        <motion.span
          key={interests[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-light-blue dark:text-brand-blue font-semibold"
        >
          {interests[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// Status indicator component (no emojis)
function StatusIndicator() {
  const [status, setStatus] = useState('coding')

  const statuses = [
    { id: 'learning', text: 'Learning ML architecture concepts' },
    { id: 'exploring', text: 'Exploring RAG and agent frameworks' },
    { id: 'researching', text: 'Researching AI security' },
    { id: 'available', text: 'Open to opportunities' }
  ]

  const currentStatus = statuses.find(s => s.id === status) || statuses[0]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => {
        const currentIndex = statuses.findIndex(s => s.id === prev)
        return statuses[(currentIndex + 1) % statuses.length].id
      })
    }, 8000) // Much slower than interests
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="flex items-center gap-2 mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      aria-label="Current status"
    >
      <motion.div
        className="text-lg text-light-pink dark:text-brand-pink"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        ♥
      </motion.div>
      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
        {currentStatus.text}
      </span>
    </motion.div>
  )
}

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 4
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-light-blue/20 dark:bg-brand-blue/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

function Home() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center font-mono relative">
      <FloatingParticles />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Terminal header */}
        <motion.header 
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl text-light-pink dark:text-brand-pink mb-3 font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200, damping: 15 }}
          >
            <span className="sr-only">Ann Ubaka's Portfolio - </span>svnsvnsvn
          </motion.h1>
          <motion.p 
            className="text-light-text-secondary dark:text-dark-text-secondary flex items-center text-xs sm:text-sm" 
            role="banner" 
            aria-label="Terminal prompt showing current location in the 'filesystem'"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 150 }}
          >
            <span className="text-brand-blue">svn@localhost</span>
            <span className="mx-1 sm:mx-2 text-light-text-muted dark:text-dark-text-muted" aria-hidden="true">❯</span>
            <span className="text-light-pink dark:text-brand-pink">~/annfolio</span>
            <span className="mx-1 sm:mx-2 text-light-text-muted dark:text-dark-text-muted" aria-hidden="true">❯</span>
            <span>welcome</span> <span aria-hidden="true"><BlinkingCursor /></span>
          </motion.p>
        </motion.header>

        {/* Bio */}
        <motion.section 
          className="bg-light-bg/50 dark:bg-dark-surface/30 p-6 sm:p-8 rounded-2xl border border-light-hover dark:border-dark-hover space-y-4 sm:space-y-6 mb-8 sm:mb-12 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed font-sans" 
          aria-labelledby="bio-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ 
            scale: 1.02,
            y: -4,
            transition: { 
              type: "spring",
              stiffness: 400,
              damping: 15
            }
          }}
        >
          <h2 id="bio-heading" className="sr-only">About Ann Ubaka</h2>
          <StatusIndicator />
          <motion.p 
            className="text-light-text-primary dark:text-dark-text-primary text-lg sm:text-xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Hello :)
          </motion.p>
          <motion.div 
            className="space-y-3 sm:space-y-4 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <p>
              My name is <span className="text-light-pink dark:text-brand-pink font-medium font-mono">Ann Ubaka</span>.<br />
              I'm a computer science student @ Jacksonville University.
            </p>
            <p>
              I'm interested in <span className="text-light-blue dark:text-brand-blue font-semibold">computer vision</span> and <span className="text-light-blue dark:text-brand-blue font-semibold">AI security</span> — how machines see and understand the world, and how to keep those systems safe and trustworthy.
            </p>
            <p className="flex gap-2 items-center">
              <span>I like</span> <RotatingInterest />
            </p>
          </motion.div>
        </motion.section>

        {/* Buttons */}
        <motion.nav 
          className="flex flex-col sm:flex-row gap-3 justify-center" 
          aria-label="Main navigation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, type: "spring", stiffness: 150 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link
              to="/projects"
              className="inline-block border border-light-pink dark:border-brand-pink text-light-pink dark:text-brand-pink px-6 sm:px-8 py-3 sm:py-4 hover:bg-light-pink/10 dark:hover:bg-brand-pink/10 transition-all duration-300 text-center hover:shadow-lg rounded-2xl text-sm sm:text-base"
              aria-label="View my projects and work portfolio"
              showSweep={false}
            >
              [ View Projects ]
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link
              to="/contact"
              className="inline-block border border-light-text-secondary dark:border-dark-text-secondary text-light-text-secondary dark:text-dark-text-secondary px-6 sm:px-8 py-3 sm:py-4 hover:bg-light-hover dark:hover:bg-dark-hover transition-all duration-300 text-center hover:shadow-lg rounded-2xl text-sm sm:text-base"
              aria-label="Contact me via email form"
              showSweep={false}
            >
              [ Get in Touch ]
            </Link>
          </motion.div>
        </motion.nav>
      </div>
    </main>
  )
}

export default Home