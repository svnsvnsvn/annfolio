import Link from '../components/Link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlinkingCursor from '../components/BlinkingCursor'

const interests = [
  "crocheting... I'm working on a blanket for my bed.",
  'watching 1–3 hour commentary videos on YouTube.',
  'music (currently obsessed with WILLOW).',
  'computer vision.',
  'secure AI.',
  'ML-enforced intrusion detection.',
  'security research.'
]

function RotatingInterest() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % interests.length)
    }, 2000)
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

function Home() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center font-mono">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
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
          className="bg-light-bg/50 dark:bg-dark-surface/30 p-6 sm:p-8 rounded-2xl border border-light-hover dark:border-dark-hover space-y-4 sm:space-y-6 mb-8 sm:mb-12 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed" 
          aria-labelledby="bio-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 120, damping: 15 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 id="bio-heading" className="sr-only">About Ann Ubaka</h2>
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
              My name is <span className="text-light-pink dark:text-brand-pink font-medium">/Ann Ubaka/</span>.<br />
              I'm a computer science student @ Jacksonville University.
            </p>
            <p>
              I'm interested in the places where <span className="text-light-blue dark:text-brand-blue font-semibold">security</span> and <span className="text-light-blue dark:text-brand-blue font-semibold">machine learning</span> collide — especially when it makes things safer for people.
            </p>
            <p className="flex gap-2 items-center">
              <span>I like</span> <RotatingInterest />
            </p>
          </motion.div>
        </motion.section>

        {/* Buttons */}
        <motion.nav 
          className="flex flex-col sm:flex-row gap-3" 
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