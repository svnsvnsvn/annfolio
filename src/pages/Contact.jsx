import { useState } from 'react'
import BlinkingCursor from "../components/BlinkingCursor"

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState([])
  const [showSuccessToro, setShowSuccessToro] = useState(false)

  // Replace with your Formspree endpoint
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xanozzro" 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setShowOutput(true)
    setTerminalOutput([])
    
    // Start terminal animation
    const outputs = [
      { type: 'command', text: `mail -s "Portfolio Contact" -r ${formData.email}` },
      { type: 'info', text: 'Connecting to mail server...' },
      { type: 'info', text: 'Authenticating...' },
    ]

    // Show initial terminal output
    for (let i = 0; i < outputs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setTerminalOutput(prev => [...prev, outputs[i]])
    }

    try {
      // Actually send the email via Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact from ${formData.name}`,
          _gotcha: "" // Honeypot field
        })
      })

      const data = await response.json()

      if (response.ok) {
        // SUCCESS! Show success Toro
        setShowSuccessToro(true)
        
        // Success terminal output
        const successOutputs = [
          { type: 'info', text: `From: ${formData.name} <${formData.email}>` },
          { type: 'info', text: 'Subject: Portfolio Contact' },
          { type: 'info', text: '---' },
          { type: 'message', text: formData.message },
          { type: 'info', text: '---' },
          { type: 'success', text: 'Message sent successfully!' },
          { type: 'info', text: 'Email delivered to inbox.' },
          { type: 'info', text: 'Closing connection...' }
        ]

        for (let i = 0; i < successOutputs.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300))
          setTerminalOutput(prev => [...prev, successOutputs[i]])
        }

        // Reset form
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' })
          // Hide success Toro after celebration
          setTimeout(() => setShowSuccessToro(false), 3000)
        }, 2000)

      } else {
        // Error handling
        throw new Error(data.error || 'Failed to send message')
      }

    } catch (error) {
      // Error terminal output
      const errorOutputs = [
        { type: 'error', text: 'ERROR: Failed to connect to mail server' },
        { type: 'error', text: `Details: ${error.message}` },
        { type: 'info', text: 'Message saved to draft.' }
      ]

      for (let i = 0; i < errorOutputs.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setTerminalOutput(prev => [...prev, errorOutputs[i]])
      }

      // Still save to localStorage as backup
      const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]')
      messages.push({
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now(),
        status: 'draft'
      })
      localStorage.setItem('portfolio_messages', JSON.stringify(messages))
    }

    setIsSubmitting(false)
  }

  const resetTerminal = () => {
    setShowOutput(false)
    setTerminalOutput([])
  }

  return (
    <div className="max-w-4xl mx-auto font-mono">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-light-pink dark:text-brand-pink mb-2">
          ## contact
        </h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          <span className="text-brand-blue">svn@localhost</span>
          <span className="mx-1 text-light-text-muted dark:text-dark-text-muted">❯</span>
          <span className="text-light-pink dark:text-brand-pink">~/annfolio/contact</span>
          <span className="mx-1 text-light-text-muted dark:text-dark-text-muted">❯</span>
          mail <BlinkingCursor />
        </p>
      </div>

      {/* Terminal Output */}
      {showOutput && (
        <div className="mb-8 bg-light-surface dark:bg-dark-bg border border-light-hover dark:border-dark-surface rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-light-hover dark:bg-dark-surface border-b border-light-hover dark:border-dark-hover">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
            </div>
            <span className="text-xs text-light-text-muted dark:text-dark-text-muted">
              mail — zsh — 80×24
            </span>
          </div>
          <div className="p-4 space-y-1 max-h-96 overflow-y-auto">
            {terminalOutput.map((output, index) => (
              <div key={index} className="leading-relaxed">
                {output.type === 'command' && (
                  <>
                    <span className="text-light-purple dark:text-brand-blue font-medium">ann@localhost</span>
                    <span className="mx-1 text-light-text-muted dark:text-dark-text-muted">%</span>
                    <span className="text-light-text-primary dark:text-dark-text-primary">{output.text}</span>
                  </>
                )}
                {output.type === 'info' && (
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">{output.text}</span>
                )}
                {output.type === 'message' && (
                  <div className="text-light-text-primary dark:text-dark-text-primary whitespace-pre-wrap pl-4 border-l-2 border-light-pink/30 dark:border-brand-pink/30">
                    {output.text}
                  </div>
                )}
                {output.type === 'success' && (
                  <span className="text-green-600 dark:text-green-400 font-medium">✓ {output.text}</span>
                )}
                {output.type === 'error' && (
                  <span className="text-red-600 dark:text-red-400 font-medium">✗ {output.text}</span>
                )}
              </div>
            ))}
            {isSubmitting && (
              <span className="text-light-text-primary dark:text-dark-text-primary">
                <BlinkingCursor />
              </span>
            )}
          </div>
          {!isSubmitting && terminalOutput.length > 0 && (
            <div className="px-4 pb-4">
              <button
                onClick={resetTerminal}
                className="text-xs text-light-text-muted dark:text-dark-text-muted hover:text-light-pink dark:hover:text-brand-pink"
              >
                [ clear terminal ]
              </button>
            </div>
          )}
        </div>
      )}

      {/* Form */}
      <div className="relative">
        {/* Success Toro - appears on successful submission */}
        {showSuccessToro && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
            <div className="bg-light-card/90 dark:bg-dark-card/90 backdrop-blur-sm border border-light-hover dark:border-dark-surface rounded-lg p-6 text-center animate-bounce">
              <img 
                src="/toro_gifs/bits-8bits-7.gif" 
                alt="Success Toro" 
                className="w-16 h-16 mx-auto mb-2"
                style={{ imageRendering: 'pixelated' }}
              />
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm font-mono">
                🎉 Message sent!
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-light-text-secondary dark:text-dark-text-secondary mb-2">
            <span className="text-light-blue dark:text-brand-blue">const</span> name = 
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-hover dark:border-dark-surface text-light-text-primary dark:text-dark-text-primary font-mono focus:outline-none focus:border-light-pink dark:focus:border-brand-blue transition-colors rounded-lg"
            placeholder='"Your Name"'
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-light-text-secondary dark:text-dark-text-secondary mb-2">
            <span className="text-light-blue dark:text-brand-blue">const</span> email = 
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-hover dark:border-dark-surface text-light-text-primary dark:text-dark-text-primary font-mono focus:outline-none focus:border-light-pink dark:focus:border-brand-blue transition-colors rounded-lg"
            placeholder='"you@example.com"'
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-light-text-secondary dark:text-dark-text-secondary mb-2">
            <span className="text-light-blue dark:text-brand-blue">const</span> message = 
          </label>
          <div className="relative">
            <span className="absolute left-4 top-2 text-light-text-muted dark:text-dark-text-muted pointer-events-none">
              `
            </span>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full pl-8 pr-8 py-2 bg-light-bg dark:bg-dark-bg border border-light-hover dark:border-dark-surface text-light-text-primary dark:text-dark-text-primary font-mono focus:outline-none focus:border-light-pink dark:focus:border-brand-blue resize-none transition-colors rounded-lg"
              placeholder="Write your message here..."
              required
              disabled={isSubmitting}
            ></textarea>
            <span className="absolute right-4 bottom-2 text-light-text-muted dark:text-dark-text-muted pointer-events-none">
              `
            </span>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-light-pink dark:border-brand-blue text-light-pink dark:text-brand-blue py-3 hover:bg-light-pink/10 dark:hover:bg-brand-blue/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
        >
          {isSubmitting ? '[ sending... ]' : '[ execute: send_message() ]'}
        </button>
        </form>
      </div>
    </div>
  )
}

export default Contact