import React from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  Code, 
  Database, 
  Globe, 
  Heart,
  ExternalLink,
  Github,
  Zap,
  Shield,
  Eye
} from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Rocket,
      title: 'Real-time Data',
      description: 'Access live data from NASA\'s extensive network of space observatories and missions.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with enterprise-grade security and reliability using NASA\'s official APIs.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Eye,
      title: 'Interactive Visualizations',
      description: 'Explore space data through beautiful charts, graphs, and interactive displays.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Modern Technology',
      description: 'Built with the latest web technologies for optimal performance and user experience.',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const nasaApis = [
    {
      name: 'Astronomy Picture of the Day (APOD)',
      description: 'Daily space images with detailed explanations from NASA astronomers.',
      url: 'https://api.nasa.gov/planetary/apod'
    },
    {
      name: 'Mars Rover Photos',
      description: 'Images from NASA\'s Mars rovers including Curiosity, Opportunity, Spirit, and Perseverance.',
      url: 'https://api.nasa.gov/mars-photos/api/v1/'
    },
    {
      name: 'Near Earth Objects (NEO)',
      description: 'Data about asteroids and comets that approach Earth.',
      url: 'https://api.nasa.gov/neo/rest/v1/'
    }
  ]

  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React 18', description: 'Modern React with hooks and functional components' },
        { name: 'Vite', description: 'Fast build tool and development server' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
        { name: 'Framer Motion', description: 'Animation library for React' },
        { name: 'Chart.js', description: 'Interactive charts and graphs' }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', description: 'JavaScript runtime environment' },
        { name: 'Express.js', description: 'Web application framework' },
        { name: 'Axios', description: 'HTTP client for API requests' },
        { name: 'CORS', description: 'Cross-origin resource sharing' },
        { name: 'Helmet', description: 'Security middleware' }
      ]
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About{' '}
            <span className="text-gradient">NASA Explorer</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            A full-stack web application that showcases NASA's vast array of space data through an interactive 
            and visually appealing interface. Built with modern web technologies and designed for the best user experience.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-16"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
              To make NASA's incredible space data accessible to everyone through an intuitive, 
              beautiful, and interactive web application. We believe that space exploration should 
              be available to all, inspiring the next generation of scientists, engineers, and space enthusiasts.
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="card"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* NASA APIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">NASA APIs We Use</h2>
          <div className="space-y-6">
            {nasaApis.map((api, index) => (
              <motion.div
                key={api.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="card"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{api.name}</h3>
                    <p className="text-slate-300 mb-4">{api.description}</p>
                  </div>
                  <a
                    href={api.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center space-x-2 ml-4"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View API</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Technology Stack</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="card"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Code className="w-6 h-6 mr-3 text-blue-400" />
                  {stack.category}
                </h3>
                <div className="space-y-4">
                  {stack.technologies.map((tech) => (
                    <div key={tech.name} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-semibold">{tech.name}</h4>
                        <p className="text-slate-400 text-sm">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Development Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Development & Deployment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Frontend</h3>
                <p className="text-slate-300">Deployed on Vercel with automatic deployments from GitHub.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Backend</h3>
                <p className="text-slate-300">Deployed on Render with environment variable management.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">API</h3>
                <p className="text-slate-300">Uses NASA's official APIs with proper rate limiting and error handling.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center mt-16"
        >
          <div className="flex items-center justify-center space-x-2 text-slate-400 mb-4">
            <span>Made with</span>
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            <span>for space exploration</span>
          </div>
          <p className="text-slate-400 mb-6">
            This project is open source and available on GitHub.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>View Source</span>
            </a>
            <a
              href="https://api.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center space-x-2"
            >
              <Globe className="w-5 h-5" />
              <span>NASA APIs</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

