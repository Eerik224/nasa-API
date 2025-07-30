import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  Camera, 
  Satellite, 
  Database, 
  ArrowRight, 
  Star,
  Globe,
  Zap,
  Shield,
  Eye
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: Camera,
      title: 'Astronomy Picture of the Day',
      description: 'Discover stunning daily space images with detailed explanations from NASA astronomers.',
      color: 'from-blue-500 to-cyan-500',
      path: '/apod',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Satellite,
      title: 'Mars Rover Photos',
      description: 'Explore the Red Planet through the eyes of NASA\'s Mars rovers with real-time imagery.',
      color: 'from-red-500 to-orange-500',
      path: '/mars-rover',
      gradient: 'bg-gradient-to-br from-red-500/20 to-orange-500/20'
    },
    {
      icon: Database,
      title: 'Near Earth Objects',
      description: 'Track asteroids and comets near Earth with comprehensive data and risk assessments.',
      color: 'from-green-500 to-emerald-500',
      path: '/neo-tracker',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
    }
  ]

  const stats = [
    { label: 'Daily Images', value: 'APOD', icon: Camera, color: 'text-blue-400' },
    { label: 'Mars Rovers', value: '4 Active', icon: Satellite, color: 'text-red-400' },
    { label: 'NEOs Tracked', value: '1000+', icon: Database, color: 'text-green-400' },
    { label: 'Data Sources', value: 'NASA APIs', icon: Globe, color: 'text-purple-400' }
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Real-time Data',
      description: 'Access live data from NASA\'s extensive network of space observatories and missions.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with enterprise-grade security and reliability using NASA\'s official APIs.'
    },
    {
      icon: Eye,
      title: 'Interactive Visualizations',
      description: 'Explore space data through beautiful charts, graphs, and interactive displays.'
    }
  ]

  if (isLoading) {
    return <LoadingSpinner text="Launching NASA Explorer..." />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Explore the{' '}
                <span className="text-gradient">Universe</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Discover NASA's vast collection of space data through an interactive and visually stunning interface. 
                From daily space images to Mars rover photos and asteroid tracking.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/apod"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-4 ${stat.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-slate-400">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore <span className="text-gradient">Space Data</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Dive into NASA's comprehensive collection of space data with our interactive tools and visualizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to={feature.path}>
                    <div className={`card card-hover ${feature.gradient} border-0 h-full`}>
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-slate-300 mb-6 leading-relaxed">{feature.description}</p>
                      <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                        <span className="font-medium">Explore Now</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-gradient">NASA Explorer</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Built with modern technology and designed for the best user experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-gradient">Explore Space</span>?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Start your journey through NASA's incredible collection of space data today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apod"
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
              >
                <Star className="w-5 h-5" />
                <span>View Today's APOD</span>
              </Link>
              <Link
                to="/mars-rover"
                className="btn-secondary text-lg px-8 py-4"
              >
                Explore Mars
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home 