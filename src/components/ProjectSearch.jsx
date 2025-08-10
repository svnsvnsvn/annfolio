import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function ProjectSearch({ projects, onFilteredProjects }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Get all unique tags from projects
  const allTags = [...new Set(projects.flatMap(project => project.tags))].sort()

  // Filter projects based on search term and selected tags
  const filterProjects = (search, tags) => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
        (project.highlights && project.highlights.some(highlight => 
          highlight.toLowerCase().includes(search.toLowerCase())
        ))

      const matchesTags = tags.length === 0 || 
        tags.every(tag => project.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    const newSearch = e.target.value
    setSearchTerm(newSearch)
    const filtered = filterProjects(newSearch, selectedTags)
    onFilteredProjects(filtered)
  }

  // Handle tag selection
  const toggleTag = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    setSelectedTags(newTags)
    const filtered = filterProjects(searchTerm, newTags)
    onFilteredProjects(filtered)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTags([])
    onFilteredProjects(projects)
  }

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute top-3 left-3 h-4 w-4 text-light-text-muted dark:text-dark-text-muted" />
        <input
          type="text"
          placeholder="search projects, technologies, or keywords..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full py-3 px-10 border border-light-hover dark:border-dark-surface rounded-lg bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted focus:outline-none focus:border-light-pink dark:focus:border-brand-pink focus:ring-1 focus:ring-light-pink/20 dark:focus:ring-brand-pink/20 transition-all duration-200 font-mono"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute top-2 right-2 p-1.5 rounded-lg text-light-text-muted dark:text-dark-text-muted hover:bg-light-hover dark:hover:bg-dark-surface transition-colors"
          title="Toggle filters"
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* Active Filters Summary */}
      {(searchTerm || selectedTags.length > 0) && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-light-text-muted dark:text-dark-text-muted">
            {`// Filters active:`}
          </span>
          {searchTerm && (
            <span className="px-2 py-1 bg-light-blue/10 dark:bg-brand-blue/10 text-light-blue dark:text-brand-blue rounded-lg text-xs">
              search: "{searchTerm}"
            </span>
          )}
          {selectedTags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-light-pink/10 dark:bg-brand-pink/10 text-light-pink dark:text-brand-pink rounded-lg text-xs flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => toggleTag(tag)}
                className="hover:bg-light-pink/20 dark:hover:bg-brand-pink/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            onClick={clearFilters}
            className="text-light-text-muted dark:text-dark-text-muted hover:text-light-text-secondary dark:hover:text-dark-text-secondary transition-colors"
          >
            clear all
          </button>
        </div>
      )}

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border border-light-hover dark:border-dark-surface rounded-lg p-4 bg-light-card dark:bg-dark-card"
          >
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                Filter by Technology
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-xs rounded-lg transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-light-pink dark:bg-brand-pink text-white'
                        : 'bg-light-hover dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-pink/20 dark:hover:bg-brand-pink/20 hover:text-light-pink dark:hover:text-brand-pink'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default ProjectSearch
