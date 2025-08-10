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
      <div className="max-w-2xl mx-auto px-6">
        {/* Terminal header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl text-light-pink dark:text-brand-pink mb-3 font-medium">
            <span className="sr-only">Ann Ubaka's Portfolio - </span># svnsvnsvn
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary flex items-center text-sm" role="banner" aria-label="Terminal prompt showing current location in the 'filesystem'">
            <span className="text-brand-blue">svn@localhost</span>
            <span className="mx-2 text-light-text-muted dark:text-dark-text-muted" aria-hidden="true">❯</span>
            <span className="text-light-pink dark:text-brand-pink">~/annfolio</span>
            <span className="mx-2 text-light-text-muted dark:text-dark-text-muted" aria-hidden="true">❯</span>
            <span>welcome</span> <span aria-hidden="true"><BlinkingCursor /></span>
          </p>
        </header>

        {/* Bio */}
        <section className="space-y-6 mb-12 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed" aria-labelledby="bio-heading">
          <h2 id="bio-heading" className="sr-only">About Ann Ubaka</h2>
          <p className="text-light-text-primary dark:text-dark-text-primary text-xl font-light">
            Hello :)
          </p>
          <div className="space-y-4">
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
          </div>
        </section>

        {/* Buttons */}
        <nav className="flex flex-col sm:flex-row gap-3" aria-label="Main navigation">
          <Link
            to="/projects"
            className="inline-block border border-light-pink dark:border-brand-pink text-light-pink dark:text-brand-pink px-8 py-4 hover:bg-light-pink/10 dark:hover:bg-brand-pink/10 transition-all duration-300 text-center hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] rounded-lg"
            aria-label="View my projects and work portfolio"
            showSweep={false}
          >
            [ View Projects ]
          </Link>
          <Link
            to="/contact"
            className="inline-block border border-light-text-secondary dark:border-dark-text-secondary text-light-text-secondary dark:text-dark-text-secondary px-8 py-4 hover:bg-light-hover dark:hover:bg-dark-hover transition-all duration-300 text-center hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] rounded-lg"
            aria-label="Contact me via email form"
            showSweep={false}
          >
            [ Get in Touch ]
          </Link>
        </nav>
      </div>
    </main>
  )
}

export default Home