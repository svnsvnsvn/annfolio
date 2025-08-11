import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

function ProjectCard({ project, index }) {
  return (
    <motion.div
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
      className="group bg-light-card dark:bg-dark-card border border-light-hover dark:border-dark-surface p-4 sm:p-6 hover:border-light-pink dark:hover:border-brand-pink transition-all duration-300 font-mono hover:shadow-lg relative overflow-hidden rounded-lg h-full flex flex-col"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-pink/5 via-transparent to-light-blue/5 dark:from-brand-pink/5 dark:to-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl text-light-pink dark:text-brand-pink mb-1 group-hover:text-light-pink dark:group-hover:text-brand-pink transition-colors">
              ### {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
              {`// Project ${index + 1}`}
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary mb-3 sm:mb-4 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && (
          <div className="mb-3 sm:mb-4">
            <p className="text-xs text-light-text-muted dark:text-dark-text-muted mb-2">{`// Key highlights:`}</p>
            <div className="flex flex-wrap gap-1">
              {project.highlights.map((highlight, highlightIndex) => (
                <motion.span
                  key={highlight}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index * 0.1) + (highlightIndex * 0.05) }}
                  className="px-2 py-1 bg-light-blue/10 dark:bg-brand-blue/10 text-light-blue dark:text-brand-blue rounded-lg text-xs border border-light-blue/20 dark:border-brand-blue/20"
                >
                  {highlight}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index * 0.1) + (tagIndex * 0.03) }}
              className="px-2 sm:px-3 py-1 bg-light-pink/20 dark:bg-brand-pink/20 text-light-pink dark:text-brand-pink rounded-full text-xs sm:text-sm hover:bg-light-pink/30 dark:hover:bg-brand-pink/30 transition-colors cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Bottom Action - Now at bottom due to flex layout */}
        <div className="flex items-center justify-between pt-3 sm:pt-2 border-t border-light-hover dark:border-dark-surface mt-auto">
          <div className="flex gap-3 sm:gap-4 text-sm">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-text-muted dark:text-dark-text-muted hover:text-light-pink dark:hover:text-brand-pink transition-colors flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-text-muted dark:text-dark-text-muted hover:text-light-blue dark:hover:text-brand-blue transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
