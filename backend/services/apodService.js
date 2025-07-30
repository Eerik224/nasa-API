const axios = require('axios');

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov';

class APODService {
  constructor() {
    this.apiKey = NASA_API_KEY;
    this.baseURL = NASA_BASE_URL;
  }

  /**
   * Get today's Astronomy Picture of the Day
   */
  async getAPOD() {
    try {
      const response = await axios.get(`${this.baseURL}/planetary/apod`, {
        params: {
          api_key: this.apiKey,
          hd: true // Request high definition image if available
        },
        timeout: 10000
      });

      return this.transformAPODData(response.data);
    } catch (error) {
      console.error('APOD API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch APOD: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Get APOD for a specific date
   */
  async getAPODByDate(date) {
    try {
      const response = await axios.get(`${this.baseURL}/planetary/apod`, {
        params: {
          api_key: this.apiKey,
          date: date,
          hd: true
        },
        timeout: 10000
      });

      return this.transformAPODData(response.data);
    } catch (error) {
      console.error('APOD Date API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch APOD for date ${date}: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Get APOD for a date range
   */
  async getAPODRange(startDate, endDate) {
    try {
      const response = await axios.get(`${this.baseURL}/planetary/apod`, {
        params: {
          api_key: this.apiKey,
          start_date: startDate,
          end_date: endDate,
          hd: true
        },
        timeout: 15000
      });

      // Transform array of APOD data
      return response.data.map(item => this.transformAPODData(item));
    } catch (error) {
      console.error('APOD Range API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch APOD range: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Transform APOD data to a consistent format
   */
  transformAPODData(data) {
    return {
      date: data.date,
      title: data.title,
      explanation: data.explanation,
      url: data.url,
      hdurl: data.hdurl,
      media_type: data.media_type,
      service_version: data.service_version,
      copyright: data.copyright,
      // Add computed fields
      is_video: data.media_type === 'video',
      is_image: data.media_type === 'image',
      // Format date for display
      formatted_date: new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      // Extract year for filtering
      year: new Date(data.date).getFullYear()
    };
  }

  /**
   * Get random APOD from a date range
   */
  async getRandomAPOD(startDate, endDate) {
    try {
      const apods = await this.getAPODRange(startDate, endDate);
      if (apods.length === 0) {
        throw new Error('No APOD data found for the specified date range');
      }
      
      const randomIndex = Math.floor(Math.random() * apods.length);
      return apods[randomIndex];
    } catch (error) {
      console.error('Random APOD Error:', error);
      throw error;
    }
  }

  /**
   * Search APOD by title or explanation (simulated since NASA API doesn't support search)
   */
  async searchAPOD(query, startDate, endDate) {
    try {
      const apods = await this.getAPODRange(startDate, endDate);
      const searchTerm = query.toLowerCase();
      
      return apods.filter(apod => 
        apod.title.toLowerCase().includes(searchTerm) ||
        apod.explanation.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('APOD Search Error:', error);
      throw error;
    }
  }

  /**
   * Get APOD statistics for a date range
   */
  async getAPODStats(startDate, endDate) {
    try {
      const apods = await this.getAPODRange(startDate, endDate);
      
      const stats = {
        total_count: apods.length,
        image_count: apods.filter(apod => apod.is_image).length,
        video_count: apods.filter(apod => apod.is_video).length,
        years: [...new Set(apods.map(apod => apod.year))].sort(),
        copyright_holders: [...new Set(apods.filter(apod => apod.copyright).map(apod => apod.copyright))],
        date_range: {
          start: startDate,
          end: endDate
        }
      };

      return stats;
    } catch (error) {
      console.error('APOD Stats Error:', error);
      throw error;
    }
  }
}

module.exports = new APODService(); 