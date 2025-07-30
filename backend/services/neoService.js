const axios = require('axios');

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov';

class NEOService {
  constructor() {
    this.apiKey = NASA_API_KEY;
    this.baseURL = NASA_BASE_URL;
  }

  /**
   * Get NEO data for a date range
   */
  async getNEOData({ start_date, end_date, page = 1, size = 20 }) {
    try {
      const response = await axios.get(`${this.baseURL}/neo/rest/v1/feed`, {
        params: {
          api_key: this.apiKey,
          start_date,
          end_date,
          page,
          size
        },
        timeout: 15000
      });

      return this.transformNEOData(response.data);
    } catch (error) {
      console.error('NEO API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch NEO data: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Get NEO feed data
   */
  async getNEOFeed({ start_date, end_date, detailed = false }) {
    try {
      const response = await axios.get(`${this.baseURL}/neo/rest/v1/feed`, {
        params: {
          api_key: this.apiKey,
          start_date,
          end_date,
          detailed: detailed.toString()
        },
        timeout: 15000
      });

      return this.transformNEOFeedData(response.data);
    } catch (error) {
      console.error('NEO Feed API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch NEO feed: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Get detailed information about a specific asteroid
   */
  async getAsteroidDetails(asteroidId) {
    try {
      const response = await axios.get(`${this.baseURL}/neo/rest/v1/lookup/${asteroidId}`, {
        params: {
          api_key: this.apiKey
        },
        timeout: 10000
      });

      return this.transformAsteroidData(response.data);
    } catch (error) {
      console.error('Asteroid Details API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch asteroid details: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Browse NEOs with pagination
   */
  async browseNEOs({ page = 0, size = 20 }) {
    try {
      const response = await axios.get(`${this.baseURL}/neo/rest/v1/browse`, {
        params: {
          api_key: this.apiKey,
          page,
          size
        },
        timeout: 15000
      });

      return this.transformBrowseData(response.data);
    } catch (error) {
      console.error('NEO Browse API Error:', error.response?.data || error.message);
      throw new Error(`Failed to browse NEOs: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Transform NEO data to a consistent format
   */
  transformNEOData(data) {
    const neos = [];
    
    // Process each date in the feed
    Object.keys(data.near_earth_objects).forEach(date => {
      data.near_earth_objects[date].forEach(neo => {
        neos.push(this.transformNEORecord(neo, date));
      });
    });

    return {
      neos: neos,
      total_count: neos.length,
      date_range: {
        start: data.start_date,
        end: data.end_date
      },
      links: data.links,
      element_count: data.element_count
    };
  }

  /**
   * Transform NEO feed data
   */
  transformNEOFeedData(data) {
    const neos = [];
    
    Object.keys(data.near_earth_objects).forEach(date => {
      data.near_earth_objects[date].forEach(neo => {
        neos.push(this.transformNEORecord(neo, date));
      });
    });

    return {
      neos: neos,
      total_count: neos.length,
      date_range: {
        start: data.start_date,
        end: data.end_date
      },
      links: data.links,
      element_count: data.element_count
    };
  }

  /**
   * Transform individual NEO record
   */
  transformNEORecord(neo, date) {
    return {
      id: neo.id,
      name: neo.name,
      nasa_jpl_url: neo.nasa_jpl_url,
      absolute_magnitude_h: neo.absolute_magnitude_h,
      estimated_diameter: {
        kilometers: neo.estimated_diameter.kilometers,
        meters: neo.estimated_diameter.meters,
        miles: neo.estimated_diameter.miles,
        feet: neo.estimated_diameter.feet
      },
      is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
      close_approach_data: neo.close_approach_data.map(approach => ({
        close_approach_date: approach.close_approach_date,
        close_approach_date_full: approach.close_approach_date_full,
        epoch_date_close_approach: approach.epoch_date_close_approach,
        relative_velocity: {
          kilometers_per_second: approach.relative_velocity.kilometers_per_second,
          kilometers_per_hour: approach.relative_velocity.kilometers_per_hour,
          miles_per_hour: approach.relative_velocity.miles_per_hour
        },
        miss_distance: {
          astronomical: approach.miss_distance.astronomical,
          lunar: approach.miss_distance.lunar,
          kilometers: approach.miss_distance.kilometers
        },
        orbiting_body: approach.orbiting_body
      })),
      // Add computed fields
      date: date,
      formatted_date: new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      year: new Date(date).getFullYear(),
      // Calculate risk level based on distance and size
      risk_level: this.calculateRiskLevel(neo),
      // Format size for display
      size_category: this.getSizeCategory(neo.estimated_diameter.kilometers.estimated_diameter_max)
    };
  }

  /**
   * Transform asteroid data for lookup
   */
  transformAsteroidData(data) {
    return {
      id: data.id,
      name: data.name,
      nasa_jpl_url: data.nasa_jpl_url,
      absolute_magnitude_h: data.absolute_magnitude_h,
      estimated_diameter: data.estimated_diameter,
      is_potentially_hazardous_asteroid: data.is_potentially_hazardous_asteroid,
      close_approach_data: data.close_approach_data,
      orbital_data: data.orbital_data,
      // Add computed fields
      risk_level: this.calculateRiskLevel(data),
      size_category: this.getSizeCategory(data.estimated_diameter.kilometers.estimated_diameter_max),
      discovery_date: data.orbital_data?.first_observation_date,
      last_updated: data.orbital_data?.last_observation_date
    };
  }

  /**
   * Transform browse data
   */
  transformBrowseData(data) {
    return {
      neos: data.near_earth_objects.map(neo => this.transformBrowseRecord(neo)),
      total_count: data.near_earth_objects.length,
      page: data.page,
      links: data.links
    };
  }

  /**
   * Transform browse record
   */
  transformBrowseRecord(neo) {
    return {
      id: neo.id,
      name: neo.name,
      nasa_jpl_url: neo.nasa_jpl_url,
      absolute_magnitude_h: neo.absolute_magnitude_h,
      estimated_diameter: neo.estimated_diameter,
      is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
      // Add computed fields
      risk_level: this.calculateRiskLevel(neo),
      size_category: this.getSizeCategory(neo.estimated_diameter.kilometers.estimated_diameter_max)
    };
  }

  /**
   * Calculate risk level based on distance and size
   */
  calculateRiskLevel(neo) {
    if (!neo.close_approach_data || neo.close_approach_data.length === 0) {
      return 'Unknown';
    }

    const closestApproach = neo.close_approach_data[0];
    const missDistanceKm = parseFloat(closestApproach.miss_distance.kilometers);
    const diameterKm = neo.estimated_diameter.kilometers.estimated_diameter_max;

    // Risk calculation based on distance and size
    if (missDistanceKm < 1000000 && diameterKm > 1) { // Within 1M km and >1km diameter
      return 'High';
    } else if (missDistanceKm < 5000000 && diameterKm > 0.5) { // Within 5M km and >500m diameter
      return 'Medium';
    } else if (missDistanceKm < 10000000) { // Within 10M km
      return 'Low';
    } else {
      return 'Very Low';
    }
  }

  /**
   * Get size category based on diameter
   */
  getSizeCategory(diameterKm) {
    if (diameterKm >= 1) {
      return 'Large (>1km)';
    } else if (diameterKm >= 0.1) {
      return 'Medium (100m-1km)';
    } else if (diameterKm >= 0.01) {
      return 'Small (10m-100m)';
    } else {
      return 'Very Small (<10m)';
    }
  }

  /**
   * Get NEO statistics for a date range
   */
  async getNEOStats(startDate, endDate) {
    try {
      const neoData = await this.getNEOData({ start_date: startDate, end_date: endDate });
      
      const stats = {
        total_count: neoData.total_count,
        hazardous_count: neoData.neos.filter(neo => neo.is_potentially_hazardous_asteroid).length,
        non_hazardous_count: neoData.neos.filter(neo => !neo.is_potentially_hazardous_asteroid).length,
        risk_levels: {
          high: neoData.neos.filter(neo => neo.risk_level === 'High').length,
          medium: neoData.neos.filter(neo => neo.risk_level === 'Medium').length,
          low: neoData.neos.filter(neo => neo.risk_level === 'Low').length,
          very_low: neoData.neos.filter(neo => neo.risk_level === 'Very Low').length
        },
        size_categories: {
          large: neoData.neos.filter(neo => neo.size_category.includes('Large')).length,
          medium: neoData.neos.filter(neo => neo.size_category.includes('Medium')).length,
          small: neoData.neos.filter(neo => neo.size_category.includes('Small')).length,
          very_small: neoData.neos.filter(neo => neo.size_category.includes('Very Small')).length
        },
        date_range: neoData.date_range
      };

      return stats;
    } catch (error) {
      console.error('NEO Stats Error:', error);
      throw error;
    }
  }

  /**
   * Search NEOs by name
   */
  async searchNEOsByName(query, startDate, endDate) {
    try {
      const neoData = await this.getNEOData({ start_date: startDate, end_date: endDate });
      const searchTerm = query.toLowerCase();
      
      return neoData.neos.filter(neo => 
        neo.name.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('NEO Search Error:', error);
      throw error;
    }
  }

  /**
   * Get NEOs by risk level
   */
  async getNEOsByRiskLevel(riskLevel, startDate, endDate) {
    try {
      const neoData = await this.getNEOData({ start_date: startDate, end_date: endDate });
      
      return neoData.neos.filter(neo => neo.risk_level === riskLevel);
    } catch (error) {
      console.error('NEOs by Risk Level Error:', error);
      throw error;
    }
  }
}

module.exports = new NEOService(); 