import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  Globe,
  Search,
  Filter
} from 'lucide-react'
import { endpoints, formatDate, getDateRange, handleApiError } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const NEOTracker = () => {
  const [neos, setNeos] = useState([])
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState(getDateRange(7))
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')

  const riskLevels = [
    { value: 'all', label: 'All Objects', color: 'text-slate-400' },
    { value: 'high', label: 'High Risk', color: 'text-red-400' },
    { value: 'medium', label: 'Medium Risk', color: 'text-yellow-400' },
    { value: 'low', label: 'Low Risk', color: 'text-green-400' }
  ]

  const fetchNEOs = async () => {
    try {
      setLoading(true)
      const response = await endpoints.neo.feed({
        start_date: dateRange.startDate,
        end_date: dateRange.endDate
      })
      
      const data = response.data.data
      setNeos(data.neos || [])
      
      if (data.neos && data.neos.length > 0) {
        toast.success(`Found ${data.neos.length} near-Earth objects`)
      } else {
        toast.info('No near-Earth objects found for the selected date range')
      }
    } catch (error) {
      handleApiError(error, 'Failed to fetch NEO data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNEOs()
  }, [dateRange])

  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({ ...prev, [field]: value }))
  }

  const filteredNeos = neos.filter(neo => {
    const matchesSearch = neo.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === 'all' || neo.risk_level?.toLowerCase() === riskFilter
    return matchesSearch && matchesRisk
  })

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20'
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20'
    }
  }

  const getSizeColor = (sizeCategory) => {
    if (sizeCategory?.includes('Large')) return 'text-red-400'
    if (sizeCategory?.includes('Medium')) return 'text-yellow-400'
    if (sizeCategory?.includes('Small')) return 'text-green-400'
    return 'text-slate-400'
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
            Near Earth{' '}
            <span className="text-gradient">Objects</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Track asteroids and comets near Earth with comprehensive data and risk assessments.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                max={dateRange.endDate}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                End Date
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                min={dateRange.startDate}
                max={formatDate(new Date())}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-3">
                <Search className="w-4 h-4 inline mr-2" />
                Search Objects
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Risk Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-3">
                <Filter className="w-4 h-4 inline mr-2" />
                Risk Level
              </label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {riskLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner text="Loading NEO data..." />
          </div>
        )}

        {/* NEOs Grid */}
        {!loading && filteredNeos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Results Info */}
            <div className="flex items-center justify-between">
              <p className="text-slate-300">
                Showing {filteredNeos.length} near-Earth objects
              </p>
              <p className="text-slate-400 text-sm">
                Date range: {dateRange.startDate} to {dateRange.endDate}
              </p>
            </div>

            {/* NEOs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNeos.map((neo, index) => (
                <motion.div
                  key={neo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="card"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{neo.name}</h3>
                      <p className="text-sm text-slate-400">ID: {neo.id}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(neo.risk_level)}`}>
                      {neo.risk_level || 'Unknown'}
                    </div>
                  </div>

                  {/* Size Info */}
                  <div className="mb-4">
                    <p className={`text-sm font-medium ${getSizeColor(neo.size_category)}`}>
                      {neo.size_category}
                    </p>
                    <p className="text-xs text-slate-400">
                      Magnitude: {neo.absolute_magnitude_h}
                    </p>
                  </div>

                  {/* Close Approach Data */}
                  {neo.close_approach_data && neo.close_approach_data.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h4 className="text-sm font-semibold text-slate-300">Close Approaches:</h4>
                      {neo.close_approach_data.slice(0, 2).map((approach, idx) => (
                        <div key={idx} className="text-xs text-slate-400">
                          <p>Date: {approach.close_approach_date}</p>
                          <p>Distance: {parseFloat(approach.miss_distance.kilometers).toLocaleString()} km</p>
                          <p>Velocity: {parseFloat(approach.relative_velocity.kilometers_per_second).toFixed(2)} km/s</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hazardous Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {neo.is_potentially_hazardous_asteroid ? (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      ) : (
                        <Globe className="w-4 h-4 text-green-400" />
                      )}
                      <span className={`text-xs ${neo.is_potentially_hazardous_asteroid ? 'text-red-400' : 'text-green-400'}`}>
                        {neo.is_potentially_hazardous_asteroid ? 'Potentially Hazardous' : 'Non-Hazardous'}
                      </span>
                    </div>
                    
                    <a
                      href={neo.nasa_jpl_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Details →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No NEOs State */}
        {!loading && filteredNeos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Objects Found</h3>
            <p className="text-slate-400">
              Try adjusting your search criteria or selecting a different date range.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default NEOTracker 