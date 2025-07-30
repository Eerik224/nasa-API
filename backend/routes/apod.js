const express = require('express');
const router = express.Router();
const apodService = require('../services/apodService');

/**
 * @route GET /api/apod
 * @desc Get today's Astronomy Picture of the Day
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const apod = await apodService.getAPOD();
    res.json({
      success: true,
      data: apod,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('APOD Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch APOD',
      message: error.message
    });
  }
});

/**
 * @route GET /api/apod/:date
 * @desc Get APOD for a specific date (YYYY-MM-DD format)
 * @access Public
 */
router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format',
        message: 'Date must be in YYYY-MM-DD format'
      });
    }

    // Validate date range (NASA API has data from 1995-06-16 to today)
    const requestedDate = new Date(date);
    const minDate = new Date('1995-06-16');
    const today = new Date();
    
    if (requestedDate < minDate || requestedDate > today) {
      return res.status(400).json({
        success: false,
        error: 'Date out of range',
        message: 'Date must be between 1995-06-16 and today'
      });
    }

    const apod = await apodService.getAPODByDate(date);
    res.json({
      success: true,
      data: apod,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('APOD Date Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch APOD for specified date',
      message: error.message
    });
  }
});

/**
 * @route GET /api/apod/range/:start_date/:end_date
 * @desc Get APOD for a date range
 * @access Public
 */
router.get('/range/:start_date/:end_date', async (req, res) => {
  try {
    const { start_date, end_date } = req.params;
    
    // Validate date formats
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format',
        message: 'Dates must be in YYYY-MM-DD format'
      });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    if (startDate > endDate) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date range',
        message: 'Start date must be before or equal to end date'
      });
    }

    const apods = await apodService.getAPODRange(start_date, end_date);
    res.json({
      success: true,
      data: apods,
      count: apods.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('APOD Range Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch APOD range',
      message: error.message
    });
  }
});

module.exports = router; 