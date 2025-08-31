import { motion } from 'framer-motion'
import { useState } from 'react'
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
        scale: 1.02,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      className="group bg-light-card dark:bg-dark-card border border-light-hover dark:border-dark-surface p-4 sm:p-6 hover:border-light-pink dark:hover:border-brand-pink transition-all duration-300 font-mono hover:shadow-xl relative overflow-hidden rounded-2xl h-full flex flex-col min-h-[420px]"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-pink/5 via-transparent to-light-blue/5 dark:from-brand-pink/5 dark:to-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Mockup SVG/Image */}
        {project.mockup && (
          <motion.div 
            className="w-full flex justify-center mb-4"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <img src={project.mockup} alt={project.title + ' mockup'} className="h-24 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" style={{ imageRendering: 'pixelated' }} />
          </motion.div>
        )}

        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl text-light-pink dark:text-brand-pink mb-1 group-hover:text-light-pink dark:group-hover:text-brand-pink transition-colors font-medium">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="mb-3 sm:mb-4 flex-1">
          <p className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        {project.highlights && (
          <div className="mb-3 sm:mb-4">
            <p className="text-xs text-light-text-muted dark:text-dark-text-muted mb-2 font-medium">Key highlights:</p>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((highlight, highlightIndex) => (
                <motion.span
                  key={highlight}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  transition={{ 
                    delay: (index * 0.1) + (highlightIndex * 0.05),
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }}
                  className="px-3 py-1.5 bg-light-blue/10 dark:bg-brand-blue/10 text-light-blue dark:text-brand-blue rounded-full text-xs border border-light-blue/20 dark:border-brand-blue/20 cursor-default"
                >
                  {highlight}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-light-pink/20 dark:bg-brand-pink/20 text-light-pink dark:text-brand-pink rounded-full text-xs hover:bg-light-pink/30 dark:hover:bg-brand-pink/30 transition-all duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify gap-4 pt-4 border-t border-light-hover dark:border-dark-surface mt-auto">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-brand-pink transition-all duration-200 rounded-full text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-light-hover dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary hover:text-light-blue dark:hover:text-brand-blue hover:bg-light-blue/10 dark:hover:bg-brand-blue/10 transition-all duration-200 rounded-full text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
