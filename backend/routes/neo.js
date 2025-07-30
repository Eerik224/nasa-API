const express = require('express');
const router = express.Router();
const neoService = require('../services/neoService');

/**
 * @route GET /api/neo
 * @desc Get Near Earth Objects data with optional filtering
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const {
      start_date,
      end_date,
      page = 1,
      size = 20
    } = req.query;

    // Validate date parameters
    if (!start_date || !end_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing date parameters',
        message: 'Both start_date and end_date are required (YYYY-MM-DD format)'
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format',
        message: 'Dates must be in YYYY-MM-DD format'
      });
    }

    // Validate date range (max 7 days for free API)
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 7) {
      return res.status(400).json({
        success: false,
        error: 'Date range too large',
        message: 'Date range cannot exceed 7 days for free API tier'
      });
    }

    if (startDate > endDate) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date range',
        message: 'Start date must be before or equal to end date'
      });
    }

    // Validate pagination parameters
    const pageNum = parseInt(page);
    const sizeNum = parseInt(size);
    
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid page number',
        message: 'Page must be a positive integer'
      });
    }

    if (isNaN(sizeNum) || sizeNum < 1 || sizeNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid size parameter',
        message: 'Size must be between 1 and 100'
      });
    }

    const neoData = await neoService.getNEOData({
      start_date,
      end_date,
      page: pageNum,
      size: sizeNum
    });

    res.json({
      success: true,
      data: neoData,
      filters: { start_date, end_date, page: pageNum, size: sizeNum },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('NEO Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NEO data',
      message: error.message
    });
  }
});

/**
 * @route GET /api/neo/feed
 * @desc Get NEO feed data (simplified version)
 * @access Public
 */
router.get('/feed', async (req, res) => {
  try {
    const {
      start_date,
      end_date,
      detailed = 'false'
    } = req.query;

    // Validate date parameters
    if (!start_date || !end_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing date parameters',
        message: 'Both start_date and end_date are required (YYYY-MM-DD format)'
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format',
        message: 'Dates must be in YYYY-MM-DD format'
      });
    }

    const feedData = await neoService.getNEOFeed({
      start_date,
      end_date,
      detailed: detailed === 'true'
    });

    res.json({
      success: true,
      data: feedData,
      filters: { start_date, end_date, detailed: detailed === 'true' },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('NEO Feed Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NEO feed data',
      message: error.message
    });
  }
});

/**
 * @route GET /api/neo/lookup/:asteroid_id
 * @desc Get detailed information about a specific asteroid
 * @access Public
 */
router.get('/lookup/:asteroid_id', async (req, res) => {
  try {
    const { asteroid_id } = req.params;

    if (!asteroid_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing asteroid ID',
        message: 'Asteroid ID is required'
      });
    }

    const asteroidData = await neoService.getAsteroidDetails(asteroid_id);
    res.json({
      success: true,
      data: asteroidData,
      asteroid_id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('NEO Lookup Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch asteroid details',
      message: error.message
    });
  }
});

/**
 * @route GET /api/neo/browse
 * @desc Browse NEOs with pagination
 * @access Public
 */
router.get('/browse', async (req, res) => {
  try {
    const {
      page = 0,
      size = 20
    } = req.query;

    // Validate pagination parameters
    const pageNum = parseInt(page);
    const sizeNum = parseInt(size);
    
    if (isNaN(pageNum) || pageNum < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid page number',
        message: 'Page must be a non-negative integer'
      });
    }

    if (isNaN(sizeNum) || sizeNum < 1 || sizeNum > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid size parameter',
        message: 'Size must be between 1 and 100'
      });
    }

    const browseData = await neoService.browseNEOs({
      page: pageNum,
      size: sizeNum
    });

    res.json({
      success: true,
      data: browseData,
      pagination: { page: pageNum, size: sizeNum },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('NEO Browse Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to browse NEOs',
      message: error.message
    });
  }
});

module.exports = router; 