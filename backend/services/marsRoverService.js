const axios = require('axios');

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov';

class MarsRoverService {
  constructor() {
    this.apiKey = NASA_API_KEY;
    this.baseURL = NASA_BASE_URL;
    this.rovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];
  }

  /**
   * Get Mars rover photos with filtering
   */
  async getRoverPhotos({ rover, sol, earth_date, camera, page = 1 }) {
    try {
      const params = {
        api_key: this.apiKey,
        page: page
      };

      // Add date parameter (either sol or earth_date)
      if (sol) {
        params.sol = sol;
      } else if (earth_date) {
        params.earth_date = earth_date;
      }

      // Add camera filter if specified
      if (camera) {
        params.camera = camera;
      }

      const response = await axios.get(`${this.baseURL}/mars-photos/api/v1/rovers/${rover}/photos`, {
        params,
        timeout: 15000
      });

      return {
        photos: response.data.photos.map(photo => this.transformPhotoData(photo)),
        total_photos: response.data.photos.length,
        rover: rover,
        filters: { sol, earth_date, camera, page }
      };
    } catch (error) {
      console.error('Mars Rover Photos API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch Mars rover photos: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Get rover manifest (mission information)
   */
  async getRoverManifest(rover) {
    try {
      const response = await axios.get(`${this.baseURL}/mars-photos/api/v1/manifests/${rover}`, {
        params: {
          api_key: this.apiKey
        },
        timeout: 10000
      });

      return this.transformManifestData(response.data.photo_manifest);
    } catch (error) {
      console.error('Mars Rover Manifest API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch rover manifest: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Get available cameras for a rover
   */
  async getRoverCameras(rover) {
    try {
      const manifest = await this.getRoverManifest(rover);
      return manifest.cameras;
    } catch (error) {
      console.error('Mars Rover Cameras Error:', error);
      throw error;
    }
  }

  /**
   * Get latest photos from a rover
   */
  async getLatestPhotos(rover) {
    try {
      const response = await axios.get(`${this.baseURL}/mars-photos/api/v1/rovers/${rover}/latest_photos`, {
        params: {
          api_key: this.apiKey
        },
        timeout: 15000
      });

      return {
        photos: response.data.latest_photos.map(photo => this.transformPhotoData(photo)),
        total_photos: response.data.latest_photos.length,
        rover: rover
      };
    } catch (error) {
      console.error('Mars Rover Latest Photos API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch latest rover photos: ${error.response?.data?.error_message || error.message}`);
    }
  }

  /**
   * Transform photo data to a consistent format
   */
  transformPhotoData(photo) {
    return {
      id: photo.id,
      sol: photo.sol,
      camera: {
        id: photo.camera.id,
        name: photo.camera.name,
        rover_id: photo.camera.rover_id,
        full_name: photo.camera.full_name
      },
      img_src: photo.img_src,
      earth_date: photo.earth_date,
      rover: {
        id: photo.rover.id,
        name: photo.rover.name,
        landing_date: photo.rover.landing_date,
        launch_date: photo.rover.launch_date,
        status: photo.rover.status
      },
      // Add computed fields
      formatted_date: new Date(photo.earth_date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      year: new Date(photo.earth_date).getFullYear(),
      // Add image dimensions (placeholder - would need to fetch actual image metadata)
      image_metadata: {
        width: null,
        height: null,
        size: null
      }
    };
  }

  /**
   * Transform manifest data
   */
  transformManifestData(manifest) {
    return {
      name: manifest.name,
      landing_date: manifest.landing_date,
      launch_date: manifest.launch_date,
      status: manifest.status,
      max_sol: manifest.max_sol,
      max_date: manifest.max_date,
      total_photos: manifest.total_photos,
      cameras: manifest.photos.map(photo => ({
        name: photo.cameras[0],
        full_name: this.getCameraFullName(photo.cameras[0]),
        sol: photo.sol,
        earth_date: photo.earth_date,
        total_photos: photo.total_photos
      })),
      // Add computed fields
      mission_duration: this.calculateMissionDuration(manifest.landing_date, manifest.max_date),
      average_photos_per_sol: Math.round(manifest.total_photos / manifest.max_sol)
    };
  }

  /**
   * Get camera full name
   */
  getCameraFullName(cameraCode) {
    const cameraNames = {
      'FHAZ': 'Front Hazard Avoidance Camera',
      'RHAZ': 'Rear Hazard Avoidance Camera',
      'MAST': 'Mast Camera',
      'CHEMCAM': 'Chemistry and Camera Complex',
      'MAHLI': 'Mars Hand Lens Imager',
      'MARDI': 'Mars Descent Imager',
      'NAVCAM': 'Navigation Camera',
      'PANCAM': 'Panoramic Camera',
      'MINITES': 'Miniature Thermal Emission Spectrometer (Mini-TES)',
      'ENTRY': 'Entry, Descent, and Landing Camera',
      'EDL_RUCAM': 'Rover Up-Look Camera',
      'EDL_DDCAM': 'Descent Stage Down-Look Camera',
      'EDL_PUCAM1': 'Parachute Up-Look Camera A',
      'EDL_PUCAM2': 'Parachute Up-Look Camera B',
      'NAVCAM_LEFT': 'Navigation Camera - Left',
      'NAVCAM_RIGHT': 'Navigation Camera - Right',
      'MCZ_RIGHT': 'Mast Camera Zoom - Right',
      'MCZ_LEFT': 'Mast Camera Zoom - Left',
      'FRONT_HAZCAM_LEFT_A': 'Front Hazard Avoidance Camera - Left A',
      'FRONT_HAZCAM_RIGHT_A': 'Front Hazard Avoidance Camera - Right A',
      'REAR_HAZCAM_LEFT': 'Rear Hazard Avoidance Camera - Left',
      'REAR_HAZCAM_RIGHT': 'Rear Hazard Avoidance Camera - Right',
      'SKYCAM': 'MEDA Skycam',
      'SHERLOC_WATSON': 'SHERLOC WATSON Camera',
      'SUPERCAM_RMI': 'SuperCam Remote Micro Imager',
      'LCAM': 'Lander Vision System Camera'
    };

    return cameraNames[cameraCode] || cameraCode;
  }

  /**
   * Calculate mission duration in days
   */
  calculateMissionDuration(landingDate, maxDate) {
    const landing = new Date(landingDate);
    const max = new Date(maxDate);
    const diffTime = Math.abs(max - landing);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * Get photos by camera type
   */
  async getPhotosByCamera(rover, camera, sol = null, earth_date = null) {
    try {
      return await this.getRoverPhotos({
        rover,
        sol,
        earth_date,
        camera,
        page: 1
      });
    } catch (error) {
      console.error('Photos by Camera Error:', error);
      throw error;
    }
  }

  /**
   * Get rover statistics
   */
  async getRoverStats(rover) {
    try {
      const manifest = await this.getRoverManifest(rover);
      const latestPhotos = await this.getLatestPhotos(rover);

      return {
        rover: rover,
        manifest: manifest,
        latest_photos_count: latestPhotos.total_photos,
        mission_duration_days: manifest.mission_duration,
        average_photos_per_sol: manifest.average_photos_per_sol,
        cameras: manifest.cameras,
        status: manifest.status
      };
    } catch (error) {
      console.error('Rover Stats Error:', error);
      throw error;
    }
  }

  /**
   * Search photos by camera name
   */
  async searchPhotosByCamera(rover, cameraQuery, sol = null, earth_date = null) {
    try {
      const cameras = await this.getRoverCameras(rover);
      const matchingCameras = cameras.filter(camera => 
        camera.name.toLowerCase().includes(cameraQuery.toLowerCase()) ||
        camera.full_name.toLowerCase().includes(cameraQuery.toLowerCase())
      );

      const results = [];
      for (const camera of matchingCameras) {
        const photos = await this.getPhotosByCamera(rover, camera.name, sol, earth_date);
        results.push({
          camera: camera,
          photos: photos.photos
        });
      }

      return results;
    } catch (error) {
      console.error('Search Photos by Camera Error:', error);
      throw error;
    }
  }
}

module.exports = new MarsRoverService(); 