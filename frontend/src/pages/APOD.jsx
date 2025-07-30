import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Download, 
  ExternalLink, 
  Play, 
  Pause,
  ChevronLeft,
  ChevronRight,
  Info,
  Star
} from 'lucide-react'
import { endpoints, formatDate, formatDateForDisplay, handleApiError, validateDate } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const APOD = () => {
  const [apod, setApod] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [apodHistory, setApodHistory] = useState([])

  // Fetch APOD data
  const fetchAPOD = async (date = null) => {
    try {
      setLoading(true)
      const response = await endpoints.apod.byDate(date || selectedDate)
      const apodData = response.data.data
      
      setApod(apodData)
      
      // Add to history if not already present
      if (!apodHistory.find(item => item.date === apodData.date)) {
        setApodHistory(prev => [apodData, ...prev.slice(0, 9)]) // Keep last 10
      }
      
      toast.success(`Loaded APOD for ${formatDateForDisplay(apodData.date)}`)
    } catch (error) {
      handleApiError(error, 'Failed to load APOD')
    } finally {
      setLoading(false)
    }
  }

  // Fetch today's APOD on component mount
  useEffect(() => {
    fetchAPOD()
  }, [])

  // Handle date change
  const handleDateChange = (e) => {
    const newDate = e.target.value
    if (validateDate(newDate)) {
      setSelectedDate(newDate)
      fetchAPOD(newDate)
    } else {
      toast.error('Please select a valid date between 1995-06-16 and today')
    }
  }

  // Handle random APOD
  const handleRandomAPOD = () => {
    const randomDate = new Date()
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 10000)) // Random date within last 27 years
    const formattedDate = formatDate(randomDate)
    setSelectedDate(formattedDate)
    fetchAPOD(formattedDate)
  }

  // Handle play/pause slideshow
  const handleSlideshow = () => {
    if (apodHistory.length === 0) return
    
    setIsPlaying(!isPlaying)
  }

  // Slideshow effect
  useEffect(() => {
    if (!isPlaying || apodHistory.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % apodHistory.length
        setApod(apodHistory[nextIndex])
        return nextIndex
      })
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isPlaying, apodHistory])

  // Handle navigation
  const handlePrevious = () => {
    if (apodHistory.length === 0) return
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? apodHistory.length - 1 : prev - 1
      setApod(apodHistory[newIndex])
      return newIndex
    })
  }

  const handleNext = () => {
    if (apodHistory.length === 0) return
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % apodHistory.length
      setApod(apodHistory[newIndex])
      return newIndex
    })
  }

  if (loading && !apod) {
    return <LoadingSpinner text="Loading Astronomy Picture of the Day..." />
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Astronomy Picture of the{' '}
            <span className="text-gradient">Day</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover stunning space images with detailed explanations from NASA astronomers.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-slate-300">
              <Calendar className="w-5 h-5" />
              <span>Select Date:</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={formatDate(new Date())}
              min="1995-06-16"
              className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRandomAPOD}
              className="btn-secondary flex items-center space-x-2"
            >
              <Star className="w-4 h-4" />
              <span>Random</span>
            </button>
            
            {apodHistory.length > 0 && (
              <button
                onClick={handleSlideshow}
                className="btn-secondary flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>Slideshow</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* APOD Content */}
        <AnimatePresence mode="wait">
          {apod && (
            <motion.div
              key={`${apod.date}-${apod.title}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Image/Video Section */}
              <div className="space-y-4">
                <div className="relative group">
                  {apod.is_video ? (
                    <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden">
                      <iframe
                        src={apod.url}
                        title={apod.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden">
                      <img
                        src={apod.hdurl || apod.url}
                        alt={apod.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  )}
                  
                  {/* Navigation arrows for slideshow */}
                  {apodHistory.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
                  {!apod.is_video && (
                    <a
                      href={apod.hdurl || apod.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download HD</span>
                    </a>
                  )}
                  <a
                    href={apod.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Original</span>
                  </a>
                </div>
              </div>

              {/* Information Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{apod.title}</h2>
                  <p className="text-slate-400 text-lg">{formatDateForDisplay(apod.date)}</p>
                </div>

                <div className="card">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                        {apod.explanation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="card">
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Media Type
                    </h4>
                    <p className="text-white capitalize">{apod.media_type}</p>
                  </div>
                  
                  {apod.copyright && (
                    <div className="card">
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        Copyright
                      </h4>
                      <p className="text-white">{apod.copyright}</p>
                    </div>
                  )}
                  
                  <div className="card">
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Service Version
                    </h4>
                    <p className="text-white">{apod.service_version}</p>
                  </div>
                </div>

                {/* Slideshow progress */}
                {isPlaying && apodHistory.length > 1 && (
                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">Slideshow Progress</span>
                      <span className="text-sm text-white">
                        {currentIndex + 1} / {apodHistory.length}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / apodHistory.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Section */}
        {apodHistory.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Recent APODs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {apodHistory.slice(1).map((item, index) => (
                <motion.div
                  key={`${item.date}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedDate(item.date)
                    fetchAPOD(item.date)
                  }}
                >
                  <div className="aspect-square bg-slate-800 rounded-lg overflow-hidden">
                    {item.is_video ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-slate-400" />
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 truncate">{item.title}</p>
                  <p className="text-xs text-slate-500">{formatDateForDisplay(item.date)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default APOD 