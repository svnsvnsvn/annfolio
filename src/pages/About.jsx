import BlinkingCursor from "../components/BlinkingCursor"
import { motion } from 'framer-motion'

function About() {
  return (
    <div className="max-w-4xl mx-auto font-mono px-4 sm:px-6">
      <motion.div 
        className="mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl text-light-pink dark:text-brand-pink mb-3 font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200, damping: 15 }}
        >
          about me
        </motion.h1>
        <motion.p 
          className="text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 150 }}
        >
          <span className="text-brand-blue">svn@localhost</span>
          <span className="mx-1 sm:mx-2 text-light-text-muted dark:text-dark-text-muted">❯</span>
          <span className="text-light-pink dark:text-brand-pink">~/annfolio/about</span>
          <span className="mx-1 sm:mx-2 text-light-text-muted dark:text-dark-text-muted">❯</span>
          cat README.md <BlinkingCursor />
        </motion.p>
      </motion.div>

      <div className="space-y-8 sm:space-y-12 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">

        {/* Intro */}
        <motion.section
          className="bg-light-bg/50 dark:bg-dark-surface/30 p-6 sm:p-8 rounded-2xl border border-light-hover dark:border-dark-hover"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 120, damping: 15 }}
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-xl text-light-pink dark:text-brand-pink mb-6 font-medium">
            Introduction
          </h2>
          <p className="text-base leading-relaxed">
            I'm a computer science student minoring in data science and cybersecurity, and I'm especially interested in <span className="text-light-blue dark:text-brand-blue font-semibold">AI security</span>. Specifically in how we can make machine learning systems safer and more trustworthy. Outside of tech, I'm a big anime fan <img src="/toro_gifs/bits-8bits-3.gif" alt="Toro" className="inline w-5 h-5 mx-1 opacity-80" style={{ imageRendering: 'pixelated' }} />, I love baking, and lately I've been getting into crocheting. I like building things, whether it's code, bread, or a blanket.
          </p>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 120, damping: 15 }}
        >
          <h2 className="text-xl text-light-pink dark:text-brand-pink mb-6 font-medium">
            Experience
          </h2>
          
          <motion.div 
            className="font-mono text-sm mb-6 bg-light-hover/20 dark:bg-dark-surface/20 p-4 rounded-2xl border border-light-hover dark:border-dark-hover"
            whileHover={{ scale: 1.01 }}
          >
            <div className="text-light-text-secondary dark:text-dark-text-secondary">
              <span className="text-brand-blue">svn@localhost</span>
              <span className="mx-2 text-light-text-muted dark:text-dark-text-muted">❯</span>
              git log --oneline --graph
            </div>
          </motion.div>
            
          <div className="space-y-8">
            {/* Break Through Tech AI Fellow */}
            <motion.div 
              className="bg-light-card dark:bg-dark-card border-l-4 border-light-pink/50 dark:border-brand-pink/50 pl-6 p-4 rounded-r-2xl hover:border-light-pink dark:hover:border-brand-pink transition-colors duration-300 hover:shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-yellow-600 dark:text-yellow-400 text-lg">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400 font-mono text-sm bg-yellow-600/10 px-2 py-1 rounded-full">e7f2a9c</span>
                    <span className="text-light-pink dark:text-brand-pink ml-2 font-medium">Break Through Tech AI Fellow</span>
                  </div>
                </div>
                <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                  Date: Jan 2025 - Dec 2026
                </div>
                <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                  Year-long ML program with industry mentorship. Completed ML Foundations and currently working on real-world AI Studio project with career coaching and technical mentorship.
                </div>
            </motion.div>

            {/* Cybersecurity Intern */}
            <motion.div 
              className="bg-light-card dark:bg-dark-card border-l-4 border-light-pink/50 dark:border-brand-pink/50 pl-6 p-4 rounded-r-2xl hover:border-light-pink dark:hover:border-brand-pink transition-colors duration-300 hover:shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400 font-mono text-sm bg-yellow-600/10 px-2 py-1 rounded-full">3b4d5f2</span>
                  <span className="text-light-pink dark:text-brand-pink ml-2 font-medium">Cybersecurity Intern @ Dun & Bradstreet</span>
                </div>
              </div>
              <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                Date: Summer 2025
              </div>
              <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                GRC intern working on risk management and compliance frameworks. Supporting enterprise security governance and risk assessment processes.
              </div>
            </motion.div>

            {/* AI Researcher */}
            <motion.div 
              className="bg-light-card dark:bg-dark-card border-l-4 border-light-pink/50 dark:border-brand-pink/50 pl-6 p-4 rounded-r-2xl hover:border-light-pink dark:hover:border-brand-pink transition-colors duration-300 hover:shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400 font-mono text-sm bg-yellow-600/10 px-2 py-1 rounded-full">9a1c8d7</span>
                  <span className="text-light-pink dark:text-brand-pink ml-2 font-medium">AI Research Intern @ Oakland University</span>
                </div>
              </div>
              <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                Date: Summer 2024
              </div>
              <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                Built adversarial attack pipelines to evaluate YOLO-P robustness in autonomous vehicle contexts. Researched ML security vulnerabilities in safety-critical systems.
              </div>
            </motion.div>

            {/* ACM President */}
            <motion.div 
              className="bg-light-card dark:bg-dark-card border-l-4 border-light-pink/50 dark:border-brand-pink/50 pl-6 p-4 rounded-r-2xl hover:border-light-pink dark:hover:border-brand-pink transition-colors duration-300 hover:shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400 font-mono text-sm bg-yellow-600/10 px-2 py-1 rounded-full">5d2e9b1</span>
                  <span className="text-light-pink dark:text-brand-pink ml-2 font-medium">ACM President & Technical Instructor @ JU</span>
                </div>
              </div>
              <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                Date: 2023 - present
              </div>
              <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                Lead technical workshops on FastAPI, Git, Docker, and ML concepts. Scaled chapter membership from 9 to 30+ students through engaging programming sessions and peer mentorship.
              </div>
            </motion.div>

            {/* Student Services Coordinator */}
            <motion.div 
              className="bg-light-card dark:bg-dark-card border-l-4 border-light-pink/50 dark:border-brand-pink/50 pl-6 p-4 rounded-r-2xl hover:border-light-pink dark:hover:border-brand-pink transition-colors duration-300 hover:shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400 font-mono text-sm bg-yellow-600/10 px-2 py-1 rounded-full">1f4a6c8</span>
                  <span className="text-light-pink dark:text-brand-pink ml-2 font-medium">Student Services Coordinator @ JU</span>
                </div>
              </div>
              <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                Date: 2023 - present
              </div>
              <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                Automated data reconciliation workflows using Python and Power Automate. Improved process efficiency and reduced manual errors in student record management.
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Research & Projects */}
        <motion.section
          className="bg-light-bg/50 dark:bg-dark-surface/30 p-6 sm:p-8 rounded-2xl border border-light-hover dark:border-dark-hover"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 120, damping: 15 }}
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-xl text-light-pink dark:text-brand-pink mb-4 font-medium">
            Research Interests
          </h2>
          <div className="space-y-3">
            <p>
              My research focuses on the <span className="text-light-blue dark:text-brand-blue font-semibold">intersection of AI security and real-world applications</span>. I'm particularly interested in:
            </p>
            <ul className="ml-6 space-y-2 text-sm">
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                <span className="text-light-pink dark:text-brand-pink mr-2">→</span>
                <span><strong>Adversarial ML:</strong> Understanding and defending against attacks on ML systems in safety-critical domains</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <span className="text-light-pink dark:text-brand-pink mr-2">→</span>
                <span><strong>Computer Vision Security:</strong> Robustness evaluation of object detection models for autonomous systems</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.9, duration: 0.5 }}
              >
                <span className="text-light-pink dark:text-brand-pink mr-2">→</span>
                <span><strong>ML-Enhanced Cybersecurity:</strong> Using machine learning for intrusion detection and anomaly identification</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.0, duration: 0.5 }}
              >
                <span className="text-light-pink dark:text-brand-pink mr-2">→</span>
                <span><strong>Secure AI Deployment:</strong> Building robust, reliable AI systems for production environments</span>
              </motion.li>
            </ul>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About
