const express = require('express');
const router = express.Router();
const marsRoverService = require('../services/marsRoverService');

/**
 * @route GET /api/mars-rover
 * @desc Get Mars rover photos with optional filtering
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const {
      rover = 'curiosity',
      sol = null,
      earth_date = null,
      camera = null,
      page = 1
    } = req.query;

    // Validate rover name
    const validRovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];
    if (!validRovers.includes(rover.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid rover name',
        message: `Rover must be one of: ${validRovers.join(', ')}`
      });
    }

    // Validate that either sol or earth_date is provided
    if (!sol && !earth_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing date parameter',
        message: 'Either sol or earth_date must be provided'
      });
    }

    // Validate page number
    const pageNum = parseInt(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid page number',
        message: 'Page must be a positive integer'
      });
    }

    const photos = await marsRoverService.getRoverPhotos({
      rover: rover.toLowerCase(),
      sol: sol ? parseInt(sol) : null,
      earth_date,
      camera: camera ? camera.toLowerCase() : null,
      page: pageNum
    });

    res.json({
      success: true,
      data: photos,
      rover,
      filters: { sol, earth_date, camera, page: pageNum },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Mars Rover Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Mars rover photos',
      message: error.message
    });
  }
});

/**
 * @route GET /api/mars-rover/manifests
 * @desc Get rover manifests (mission information)
 * @access Public
 */
router.get('/manifests', async (req, res) => {
  try {
    const { rover = 'curiosity' } = req.query;

    const validRovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];
    if (!validRovers.includes(rover.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid rover name',
        message: `Rover must be one of: ${validRovers.join(', ')}`
      });
    }

    const manifest = await marsRoverService.getRoverManifest(rover.toLowerCase());
    res.json({
      success: true,
      data: manifest,
      rover,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Mars Rover Manifest Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch rover manifest',
      message: error.message
    });
  }
});

/**
 * @route GET /api/mars-rover/cameras
 * @desc Get available cameras for a specific rover
 * @access Public
 */
router.get('/cameras', async (req, res) => {
  try {
    const { rover = 'curiosity' } = req.query;

    const validRovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];
    if (!validRovers.includes(rover.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid rover name',
        message: `Rover must be one of: ${validRovers.join(', ')}`
      });
    }

    const cameras = await marsRoverService.getRoverCameras(rover.toLowerCase());
    res.json({
      success: true,
      data: cameras,
      rover,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Mars Rover Cameras Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch rover cameras',
      message: error.message
    });
  }
});

/**
 * @route GET /api/mars-rover/latest
 * @desc Get latest photos from all rovers
 * @access Public
 */
router.get('/latest', async (req, res) => {
  try {
    const { rover = 'curiosity' } = req.query;

    const validRovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];
    if (!validRovers.includes(rover.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid rover name',
        message: `Rover must be one of: ${validRovers.join(', ')}`
      });
    }

    const latestPhotos = await marsRoverService.getLatestPhotos(rover.toLowerCase());
    res.json({
      success: true,
      data: latestPhotos,
      rover,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Mars Rover Latest Photos Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch latest rover photos',
      message: error.message
    });
  }
});

module.exports = router; 