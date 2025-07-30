import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Satellite, 
  Camera, 
  Calendar, 
  Filter,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { endpoints, formatDate, handleApiError } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const MarsRover = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRover, setSelectedRover] = useState('curiosity')
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [selectedCamera, setSelectedCamera] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPhotos, setTotalPhotos] = useState(0)

  const rovers = [
    { name: 'curiosity', label: 'Curiosity', color: 'from-red-500 to-orange-500' },
    { name: 'opportunity', label: 'Opportunity', color: 'from-blue-500 to-cyan-500' },
    { name: 'spirit', label: 'Spirit', color: 'from-green-500 to-emerald-500' },
    { name: 'perseverance', label: 'Perseverance', color: 'from-purple-500 to-pink-500' }
  ]

  const cameras = {
    curiosity: [
      { name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' },
      { name: 'RHAZ', full_name: 'Rear Hazard Avoidance Camera' },
      { name: 'MAST', full_name: 'Mast Camera' },
      { name: 'CHEMCAM', full_name: 'Chemistry and Camera Complex' },
      { name: 'MAHLI', full_name: 'Mars Hand Lens Imager' },
      { name: 'MARDI', full_name: 'Mars Descent Imager' },
      { name: 'NAVCAM', full_name: 'Navigation Camera' }
    ],
    opportunity: [
      { name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' },
      { name: 'RHAZ', full_name: 'Rear Hazard Avoidance Camera' },
      { name: 'NAVCAM', full_name: 'Navigation Camera' },
      { name: 'PANCAM', full_name: 'Panoramic Camera' },
      { name: 'MINITES', full_name: 'Miniature Thermal Emission Spectrometer' }
    ],
    spirit: [
      { name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' },
      { name: 'RHAZ', full_name: 'Rear Hazard Avoidance Camera' },
      { name: 'NAVCAM', full_name: 'Navigation Camera' },
      { name: 'PANCAM', full_name: 'Panoramic Camera' },
      { name: 'MINITES', full_name: 'Miniature Thermal Emission Spectrometer' }
    ],
    perseverance: [
      { name: 'EDL_RUCAM', full_name: 'Rover Up-Look Camera' },
      { name: 'EDL_DDCAM', full_name: 'Descent Stage Down-Look Camera' },
      { name: 'EDL_PUCAM1', full_name: 'Parachute Up-Look Camera A' },
      { name: 'EDL_PUCAM2', full_name: 'Parachute Up-Look Camera B' },
      { name: 'NAVCAM_LEFT', full_name: 'Navigation Camera - Left' },
      { name: 'NAVCAM_RIGHT', full_name: 'Navigation Camera - Right' },
      { name: 'MCZ_RIGHT', full_name: 'Mast Camera Zoom - Right' },
      { name: 'MCZ_LEFT', full_name: 'Mast Camera Zoom - Left' },
      { name: 'FRONT_HAZCAM_LEFT_A', full_name: 'Front Hazard Avoidance Camera - Left A' },
      { name: 'FRONT_HAZCAM_RIGHT_A', full_name: 'Front Hazard Avoidance Camera - Right A' },
      { name: 'REAR_HAZCAM_LEFT', full_name: 'Rear Hazard Avoidance Camera - Left' },
      { name: 'REAR_HAZCAM_RIGHT', full_name: 'Rear Hazard Avoidance Camera - Right' },
      { name: 'SKYCAM', full_name: 'MEDA Skycam' },
      { name: 'SHERLOC_WATSON', full_name: 'SHERLOC WATSON Camera' },
      { name: 'SUPERCAM_RMI', full_name: 'SuperCam Remote Micro Imager' },
      { name: 'LCAM', full_name: 'Lander Vision System Camera' }
    ]
  }

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const params = {
        rover: selectedRover,
        earth_date: selectedDate,
        page: currentPage
      }
      
      if (selectedCamera) {
        params.camera = selectedCamera
      }

      const response = await endpoints.marsRover.photos(params)
      const data = response.data.data
      
      setPhotos(data.photos || [])
      setTotalPhotos(data.total_photos || 0)
      
      if (data.photos && data.photos.length > 0) {
        toast.success(`Found ${data.photos.length} photos from ${selectedRover}`)
      } else {
        toast.info('No photos found for the selected criteria')
      }
    } catch (error) {
      handleApiError(error, 'Failed to fetch Mars rover photos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [selectedRover, selectedDate, selectedCamera, currentPage])

  const handleRoverChange = (rover) => {
    setSelectedRover(rover)
    setSelectedCamera('')
    setCurrentPage(1)
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    setCurrentPage(1)
  }

  const handleCameraChange = (e) => {
    setSelectedCamera(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            Mars Rover{' '}
            <span className="text-gradient">Photos</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore the Red Planet through the eyes of NASA's Mars rovers with real-time imagery.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rover Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-3">
                <Satellite className="w-4 h-4 inline mr-2" />
                Select Rover
              </label>
              <div className="grid grid-cols-2 gap-2">
                {rovers.map((rover) => (
                  <button
                    key={rover.name}
                    onClick={() => handleRoverChange(rover.name)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedRover === rover.name
                        ? `bg-gradient-to-r ${rover.color} text-white`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {rover.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                max={formatDate(new Date())}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Camera Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-3">
                <Camera className="w-4 h-4 inline mr-2" />
                Select Camera
              </label>
              <select
                value={selectedCamera}
                onChange={handleCameraChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Cameras</option>
                {cameras[selectedRover]?.map((camera) => (
                  <option key={camera.name} value={camera.name}>
                    {camera.name} - {camera.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner text="Loading Mars photos..." />
          </div>
        )}

        {/* Photos Grid */}
        {!loading && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Results Info */}
            <div className="flex items-center justify-between">
              <p className="text-slate-300">
                Showing {photos.length} photos from {selectedRover} on {selectedDate}
              </p>
              <p className="text-slate-400 text-sm">
                Total: {totalPhotos} photos
              </p>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="card p-0 overflow-hidden"
                >
                  <div className="aspect-square bg-slate-800 relative group">
                    <img
                      src={photo.img_src}
                      alt={`Mars photo ${photo.id}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-sm font-medium">{photo.camera.full_name}</p>
                        <p className="text-slate-300 text-xs">Sol: {photo.sol}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">ID: {photo.id}</span>
                      <span className="text-xs text-slate-400">Sol: {photo.sol}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{photo.camera.full_name}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <a
                        href={photo.img_src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View</span>
                      </a>
                      <a
                        href={photo.img_src}
                        download
                        className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Save</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPhotos > photos.length && (
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <span className="text-slate-300">
                  Page {currentPage}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={photos.length < 25} // Assuming 25 photos per page
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* No Photos State */}
        {!loading && photos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Camera className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Photos Found</h3>
            <p className="text-slate-400">
              Try adjusting your filters or selecting a different date.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MarsRover 