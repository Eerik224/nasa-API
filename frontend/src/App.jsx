import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import APOD from './pages/APOD'
import MarsRover from './pages/MarsRover'
import NEOTracker from './pages/NEOTracker'
import About from './pages/About'
import LoadingSpinner from './components/LoadingSpinner'
import { Suspense } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      
      <main className="pt-16 pb-8">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Home />
                  </motion.div>
                } 
              />
              <Route 
                path="/apod" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <APOD />
                  </motion.div>
                } 
              />
              <Route 
                path="/mars-rover" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MarsRover />
                  </motion.div>
                } 
              />
              <Route 
                path="/neo-tracker" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <NEOTracker />
                  </motion.div>
                } 
              />
              <Route 
                path="/about" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <About />
                  </motion.div>
                } 
              />
              <Route 
                path="*" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-screen flex items-center justify-center"
                  >
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
                      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                      <p className="text-slate-400 mb-8">
                        The page you're looking for doesn't exist in this galaxy.
                      </p>
                      <a 
                        href="/" 
                        className="btn-primary"
                      >
                        Return to Home
                      </a>
                    </div>
                  </motion.div>
                } 
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

export default App 