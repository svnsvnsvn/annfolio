import { useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ProjectSearch from '../components/ProjectSearch'
import BlinkingCursor from '../components/BlinkingCursor'
import { motion } from 'framer-motion'

function Projects() {
  const [filteredProjects, setFilteredProjects] = useState(projects)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="font-mono"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-light-pink dark:text-brand-pink mb-2">
          ## projects
        </h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          <span className="text-brand-blue">svn@localhost</span>
          <span className="mx-1 text-light-text-muted dark:text-dark-text-muted">❯</span>
          <span className="text-light-pink dark:text-brand-pink">~/annfolio/projects</span>
          <span className="mx-1 text-light-text-muted dark:text-dark-text-muted">❯</span>
          ls -la <BlinkingCursor />
        </p>
      </div>

      {/* Search and Filter */}
      <ProjectSearch 
        projects={projects}
        onFilteredProjects={setFilteredProjects}
      />

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <p className="text-light-text-muted dark:text-dark-text-muted mb-2">
            {`// No projects found matching your criteria`}
          </p>
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
            Try adjusting your search terms or filters
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Projects
