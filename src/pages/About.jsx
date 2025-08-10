import BlinkingCursor from "../components/BlinkingCursor"

function About() {
  return (
    <div className="max-w-2xl mx-auto font-mono px-6">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl text-light-pink dark:text-brand-pink mb-3 font-medium">
          ## about me
        </h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
          <span className="text-brand-blue">svn@localhost</span>
          <span className="mx-2 text-light-text-muted dark:text-dark-text-muted">❯</span>
          <span className="text-light-pink dark:text-brand-pink">~/annfolio/about</span>
          <span className="mx-2 text-light-text-muted dark:text-dark-text-muted">❯</span>
          cat README.md <BlinkingCursor />
        </p>
      </div>

      <div className="space-y-12 text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">

        {/* Intro */}
        <section>
          <h2 className="text-xl text-light-pink dark:text-brand-pink mb-6 font-medium">
            ### Introduction
          </h2>
          <p className="text-base leading-relaxed">
            I'm a computer science student minoring in data science and cybersecurity, and I'm especially interested in <span className="text-light-blue dark:text-brand-blue font-semibold">AI security</span>. Specifically in how we can make machine learning systems safer and more trustworthy. Outside of tech, I'm a big anime fan <img src="/toro_gifs/bits-8bits-3.gif" alt="Toro" className="inline w-5 h-5 mx-1 opacity-80" style={{ imageRendering: 'pixelated' }} />, I love baking, and lately I've been getting into crocheting. I like building things, whether it's code, bread, or a blanket.
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl text-light-pink dark:text-brand-pink mb-6 font-medium">
            ### Experience
          </h2>
          
          <div className="font-mono text-sm mb-6">
            <div className="text-light-text-secondary dark:text-dark-text-secondary">
              <span className="text-brand-blue">svn@localhost</span>
              <span className="mx-2 text-light-text-muted dark:text-dark-text-muted">❯</span>
              git log --oneline --graph
            </div>
          </div>
            
          <div className="space-y-8">
            {/* Break Through Tech AI Fellow */}
            <div className="border-l-2 border-light-pink/30 dark:border-brand-pink/30 pl-6 hover:border-light-pink/50 dark:hover:border-brand-pink/50 transition-colors duration-300">
              <div className="flex items-start gap-3">
                <span className="text-yellow-600 dark:text-yellow-400 text-lg">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400 font-mono text-sm">e7f2a9c</span>
                    <span className="text-light-pink dark:text-brand-pink ml-2">Break Through Tech AI Fellow</span>
                  </div>
                </div>
                <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                  Date: Jan 2025 - Dec 2026
                </div>
                <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                  Year-long ML program with industry mentorship. Completed ML Foundations and currently working on real-world AI Studio project with career coaching and technical mentorship.
                </div>
            </div>

            {/* Cybersecurity Intern */}
            <div className="border-l-2 border-light-pink/30 dark:border-brand-pink/30 pl-6 hover:border-light-pink/50 dark:hover:border-brand-pink/50 transition-colors duration-300">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400">3b4d5f2</span>
                  <span className="text-light-pink dark:text-brand-pink ml-2">Cybersecurity Intern @ Dun & Bradstreet</span>
                </div>
              </div>
              <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                Date: Summer 2025
              </div>
              <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                GRC intern working on risk management and compliance frameworks. Supporting enterprise security governance and risk assessment processes.
              </div>
            </div>

            {/* AI Researcher */}
            <div className="border-l-2 border-light-pink/30 dark:border-brand-pink/30 pl-6 hover:border-light-pink/50 dark:hover:border-brand-pink/50 transition-colors duration-300">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400">9a1c8d7</span>
                  <span className="text-light-pink dark:text-brand-pink ml-2">AI Research Intern @ Oakland University</span>
                </div>
              </div>
              <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                Date: Summer 2024
              </div>
              <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                Built adversarial attack pipelines to evaluate YOLO-P robustness in autonomous vehicle contexts. Researched ML security vulnerabilities in safety-critical systems.
              </div>
            </div>

            {/* ACM President */}
            <div className="border-l-2 border-light-pink/30 dark:border-brand-pink/30 pl-6 hover:border-light-pink/50 dark:hover:border-brand-pink/50 transition-colors duration-300">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400">5d2e9b1</span>
                  <span className="text-light-pink dark:text-brand-pink ml-2">ACM President & Technical Instructor @ JU</span>
                </div>
              </div>
              <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                Date: 2023 - present
              </div>
              <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                Lead technical workshops on FastAPI, Git, Docker, and ML concepts. Scaled chapter membership from 9 to 30+ students through engaging programming sessions and peer mentorship.
              </div>
            </div>

            {/* Student Services Coordinator */}
            <div className="border-l-2 border-light-pink/30 dark:border-brand-pink/30 pl-6 hover:border-light-pink/50 dark:hover:border-brand-pink/50 transition-colors duration-300">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">*</span>
                <div className="flex-1">
                  <span className="text-yellow-600 dark:text-yellow-400">1f4a6c8</span>
                  <span className="text-light-pink dark:text-brand-pink ml-2">Student Services Coordinator @ JU</span>
                </div>
              </div>
              <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 ml-6">
                Date: 2023 - present
              </div>
              <div className="text-light-text-secondary dark:text-dark-text-secondary mt-2 ml-6">
                Automated data reconciliation workflows using Python and Power Automate. Improved process efficiency and reduced manual errors in student record management.
              </div>
            </div>
          </div>
        </section>

        {/* Research & Projects */}
        <section>
          <h2 className="text-xl text-light-pink dark:text-brand-pink mb-4">
            ### Research Interests
          </h2>
          <div className="space-y-3">
            <p>
              My research focuses on the <span className="text-light-blue dark:text-brand-blue font-semibold">intersection of AI security and real-world applications</span>. I'm particularly interested in:
            </p>
            <ul className="ml-6 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-light-pink dark:text-brand-pink mr-2">→</span>
                <span><strong>Adversarial ML:</strong> Understanding and defending against attacks on ML systems in safety-critical domains</span>
              </li>
              <li className="flex items-start">
                <span className="text-light-pink dark:text-brand-pink mr-2">→</span>
                <span><strong>Computer Vision Security:</strong> Robustness evaluation of object detection models for autonomous systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-light-pink dark:text-brand-pink mr-2">→</span>
                <span><strong>ML-Enhanced Cybersecurity:</strong> Using machine learning for intrusion detection and anomaly identification</span>
              </li>
              <li className="flex items-start">
                <span className="text-light-pink dark:text-brand-pink mr-2">→</span>
                <span><strong>Secure AI Deployment:</strong> Building robust, reliable AI systems for production environments</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
