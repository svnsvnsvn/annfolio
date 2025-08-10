import { Link as RouterLink } from 'react-router-dom'

function Link({ 
  href, 
  to,
  children, 
  className = '', 
  isExternal = false,
  showSweep = true,
  ...props 
}) {
  const baseStyles = `
    relative
    inline-flex items-center
    text-light-text-secondary dark:text-dark-text-secondary
    transition-all duration-300
    ${showSweep && `
      after:absolute
      after:left-0
      after:bottom-0
      after:h-[1px]
      after:w-full
      after:bg-light-text-muted dark:after:bg-dark-text-muted
      after:z-[1]
      before:absolute
      before:left-0
      before:bottom-0
      before:h-[1px]
      before:w-full
      before:bg-light-pink dark:before:bg-brand-pink
      before:opacity-0
      before:z-[2]
      hover:before:opacity-100
      hover:text-light-pink dark:hover:text-brand-pink
      hover:before:[animation:sweep_1.5s_ease-in-out_infinite]
    `}
    ${className}
  `.trim()

  // External link
  if (href || isExternal) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={baseStyles}
        {...props}
      >
        {children}
      </a>
    )
  }

  // Internal router link
  return (
    <RouterLink
      to={to}
      className={baseStyles}
      {...props}
    >
      {children}
    </RouterLink>
  )
}

export default Link
