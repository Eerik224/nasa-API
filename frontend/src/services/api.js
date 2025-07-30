import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add loading indicator or other request logic here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          toast.error(data.message || 'Bad request. Please check your input.')
          break
        case 401:
          toast.error('Unauthorized. Please check your credentials.')
          break
        case 403:
          toast.error('Access forbidden.')
          break
        case 404:
          toast.error('Resource not found.')
          break
        case 429:
          toast.error('Too many requests. Please try again later.')
          break
        case 500:
          toast.error('Server error. Please try again later.')
          break
        default:
          toast.error(data.message || 'An error occurred. Please try again.')
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.')
    } else {
      // Other error
      toast.error('An unexpected error occurred.')
    }
    
    return Promise.reject(error)
  }
)

// API endpoints
export const endpoints = {
  // APOD endpoints
  apod: {
    today: () => api.get('/apod'),
    byDate: (date) => api.get(`/apod/${date}`),
    range: (startDate, endDate) => api.get(`/apod/range/${startDate}/${endDate}`),
  },
  
  // Mars Rover endpoints
  marsRover: {
    photos: (params) => api.get('/mars-rover', { params }),
    manifest: (rover) => api.get('/mars-rover/manifests', { params: { rover } }),
    cameras: (rover) => api.get('/mars-rover/cameras', { params: { rover } }),
    latest: (rover) => api.get('/mars-rover/latest', { params: { rover } }),
  },
  
  // NEO endpoints
  neo: {
    feed: (params) => api.get('/neo', { params }),
    browse: (params) => api.get('/neo/browse', { params }),
    lookup: (asteroidId) => api.get(`/neo/lookup/${asteroidId}`),
  },
  
  // Health check
  health: () => api.get('/health'),
}

// Utility functions
export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

export const formatDateForDisplay = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const validateDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return dateRegex.test(date)
}

export const getDateRange = (days = 7) => {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  }
}

// Error handling utilities
export const handleApiError = (error, customMessage = null) => {
  console.error('API Error:', error)
  
  if (customMessage) {
    toast.error(customMessage)
    return
  }
  
  if (error.response?.data?.message) {
    toast.error(error.response.data.message)
  } else if (error.message) {
    toast.error(error.message)
  } else {
    toast.error('An unexpected error occurred')
  }
}

// Success handling utilities
export const handleApiSuccess = (message = 'Operation completed successfully') => {
  toast.success(message)
}

// Loading state management
export const createLoadingState = () => {
  let loadingCount = 0
  
  return {
    start: () => {
      loadingCount++
      // You can add global loading indicator logic here
    },
    stop: () => {
      loadingCount = Math.max(0, loadingCount - 1)
      // You can add global loading indicator logic here
    },
    isLoading: () => loadingCount > 0
  }
}

export default api 