import { research } from '../data/research'
import BlinkingCursor from '../components/BlinkingCursor'
import { motion } from 'framer-motion'

function Research() {
  return (
    <div className="font-mono max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-light-pink dark:text-brand-pink mb-2">
          ## research
        </h1>
        <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary">
            <span className="text-brand-blue">svn@localhost</span>
            <span className="mx-1 text-light-text-muted dark:text-dark-text-muted">❯</span>
            <span className="text-light-pink dark:text-brand-pink">~/annfolio/research</span>
            <span className="mx-1 text-light-text-muted dark:text-dark-text-muted">❯</span>
            ls -la <BlinkingCursor />
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {research.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              y: -4,
              transition: { duration: 0.2 }
            }}
            className="bg-light-card dark:bg-dark-card border border-light-hover dark:border-dark-surface p-4 sm:p-6 hover:border-light-pink dark:hover:border-brand-pink transition-colors duration-300 rounded-lg hover:shadow-lg"
          >
            <div className="mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl text-light-pink dark:text-brand-pink mb-1">
                ### {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                {`// Research ${index + 1}`}
              </p>
            </div>

            <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary mb-2 sm:mb-3 leading-relaxed">
              {item.description}
            </p>

            <p className="text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary italic mb-3 sm:mb-4">
              {item.venue}
            </p>

            <div className="mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">tags: </span>
              <div className="inline-flex flex-wrap gap-1 sm:gap-2">
                {item.tags.map((tag, i) => (
                  <span key={tag} className="inline-flex items-center">
                    <span className="text-xs sm:text-sm text-light-blue dark:text-brand-blue">
                      {tag}
                    </span>
                    {i < item.tags.length - 1 && (
                      <span className="text-light-text-muted dark:text-dark-text-muted ml-1 sm:ml-2">, </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-purple dark:text-brand-blue hover:underline text-sm"
              >
                Link: {item.link}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Research
