import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Satellite, Camera, Star } from 'lucide-react'

const LoadingSpinner = ({ size = 'default', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  const iconSizes = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8'
  }

  const icons = [Rocket, Satellite, Camera, Star]

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      {/* Animated Icons */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} relative`}
        >
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            >
              <Icon 
                className={`${iconSizes[size]} text-blue-400`}
                style={{
                  transform: `rotate(${index * 90}deg) translateY(-${size === 'small' ? '12px' : size === 'large' ? '24px' : '16px'})`
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Center dot */}
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"
        />
      </div>

      {/* Loading text */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-center"
      >
        <p className="text-slate-400 font-medium">{text}</p>
        <div className="flex justify-center mt-2 space-x-1">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Orbital rings */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-500/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-purple-500/20 rounded-full"
        />
      </div>
    </div>
  )
}

// Full screen loading overlay
export const LoadingOverlay = ({ isVisible, text = 'Loading NASA Data...' }) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <LoadingSpinner size="large" text={text} />
      </div>
    </motion.div>
  )
}

// Inline loading spinner
export const InlineSpinner = ({ size = 'small' }) => (
  <div className="flex items-center justify-center p-4">
    <LoadingSpinner size={size} text="" />
  </div>
)

// Skeleton loading component
export const SkeletonLoader = ({ className = "h-4 bg-slate-700 rounded" }) => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className={`${className} animate-pulse`}
  />
)

export default LoadingSpinner 