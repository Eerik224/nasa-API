import React from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  Github, 
  ExternalLink, 
  Heart,
  Globe,
  Code,
  Database,
  Camera
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'NASA APIs': [
      { name: 'APOD API', url: 'https://api.nasa.gov/planetary/apod' },
      { name: 'Mars Rover API', url: 'https://api.nasa.gov/mars-photos/api/v1/' },
      { name: 'NEO API', url: 'https://api.nasa.gov/neo/rest/v1/' },
      { name: 'NASA Open APIs', url: 'https://api.nasa.gov/' }
    ],
    'Resources': [
      { name: 'NASA Official Site', url: 'https://www.nasa.gov/' },
      { name: 'Space Images', url: 'https://images.nasa.gov/' },
      { name: 'Mars Exploration', url: 'https://mars.nasa.gov/' },
      { name: 'Asteroid Watch', url: 'https://www.jpl.nasa.gov/asteroid-watch/' }
    ],
    'Technology': [
      { name: 'React', url: 'https://reactjs.org/' },
      { name: 'Node.js', url: 'https://nodejs.org/' },
      { name: 'Express.js', url: 'https://expressjs.com/' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' }
    ]
  }

  return (
    <footer className="bg-slate-900/50 border-t border-slate-700/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient font-space">
                  NASA Explorer
                </h3>
                <p className="text-sm text-slate-400">Data Portal</p>
              </div>
            </motion.div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Explore NASA's vast array of space data through an interactive and visually appealing interface. 
              Discover stunning space images, Mars rover photos, and track near-Earth objects.
            </p>
            
            <div className="flex space-x-3">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300"
              >
                <Github className="w-5 h-5 text-slate-400" />
              </motion.a>
              <motion.a
                href="https://api.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300"
              >
                <Globe className="w-5 h-5 text-slate-400" />
              </motion.a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-1 group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-slate-700/50 mb-8"
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Camera className="w-6 h-6 text-blue-400 mr-2" />
              <span className="text-2xl font-bold text-white">APOD</span>
            </div>
            <p className="text-sm text-slate-400">Daily Space Images</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Rocket className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-2xl font-bold text-white">4</span>
            </div>
            <p className="text-sm text-slate-400">Mars Rovers</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Database className="w-6 h-6 text-green-400 mr-2" />
              <span className="text-2xl font-bold text-white">NEO</span>
            </div>
            <p className="text-sm text-slate-400">Asteroid Tracking</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Code className="w-6 h-6 text-orange-400 mr-2" />
              <span className="text-2xl font-bold text-white">100%</span>
            </div>
            <p className="text-sm text-slate-400">Open Source</p>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-slate-700/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span>© {currentYear} NASA Data Explorer. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for space exploration.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/about" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                About
              </a>
              <a href="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                Privacy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                Terms
              </a>
              <a 
                href="mailto:contact@nasa-explorer.com" 
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Attribution */}
      <div className="bg-slate-900/80 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-slate-500">
            This application uses NASA's open APIs. All data and images are provided by NASA and are in the public domain.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 