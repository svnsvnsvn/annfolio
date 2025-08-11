import { research } from '../data/research'
import BlinkingCursor from '../components/BlinkingCursor'
import { motion } from 'framer-motion'

function Research() {
  return (
    <div className="font-mono max-w-6xl mx-auto">
      <motion.div 
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl text-light-pink dark:text-brand-pink mb-2 font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200, damping: 15 }}
        >
          research
        </motion.h1>
        <motion.p 
          className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 150 }}
        >
            <span className="text-brand-blue">svn@localhost</span>
            <span className="mx-1 text-light-text-muted dark:text-dark-text-muted">❯</span>
            <span className="text-light-pink dark:text-brand-pink">~/annfolio/research</span>
            <span className="mx-1 text-light-text-muted dark:text-dark-text-muted">❯</span>
            ls -la <BlinkingCursor />
        </motion.p>
      </motion.div>

      <div className="space-y-4 sm:space-y-6">
        {research.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.6 + (index * 0.1),
              type: "spring",
              stiffness: 150,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.02,
              y: -4,
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 15
              }
            }}
            className="bg-light-card dark:bg-dark-card border border-light-hover dark:border-dark-surface p-4 sm:p-6 hover:border-light-pink dark:hover:border-brand-pink transition-colors duration-300 rounded-2xl hover:shadow-lg"
          >
            <div className="mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl text-light-pink dark:text-brand-pink mb-1 font-medium">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                {`Research ${index + 1}`}
              </p>
            </div>

            <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary mb-2 sm:mb-3 leading-relaxed">
              {item.description}
            </p>

            <p className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary italic mb-3 sm:mb-4">
              {item.venue}
            </p>

            <div className="mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mb-2 block">tags:</span>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-light-blue/20 dark:bg-brand-blue/20 text-light-blue dark:text-brand-blue rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {item.link && (
              <motion.a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-light-purple/20 dark:bg-brand-blue/20 text-light-purple dark:text-brand-blue hover:bg-light-purple/30 dark:hover:bg-brand-blue/30 transition-all duration-300 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Research →
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Research
