import axios from 'axios';

class LocationService {
  // Get location by IP address
  async getLocationByIP(ip) {
    try {
      // Use ipapi.co for IP geolocation (free tier available)
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      
      return {
        ip: response.data.ip,
        city: response.data.city,
        region: response.data.region,
        country: response.data.country_name,
        countryCode: response.data.country_code,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        timezone: response.data.timezone,
        postal: response.data.postal
      };
    } catch (error) {
      console.error('Error fetching location by IP:', error.message);
      
      // Return default location if API fails
      return {
        ip: ip,
        city: 'Karachi',
        region: 'Sindh',
        country: 'Pakistan',
        countryCode: 'PK',
        latitude: 24.8607,
        longitude: 67.0011,
        timezone: 'Asia/Karachi',
        postal: '74000'
      };
    }
  }

  // Get location from request
  async getLocationFromRequest(req) {
    // Get client IP
    const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
                     req.headers['x-real-ip'] ||
                     req.connection.remoteAddress ||
                     req.socket.remoteAddress ||
                     '127.0.0.1';

    // Remove IPv6 prefix if present
    const ip = clientIP.replace(/^::ffff:/, '');

    // Skip for localhost
    if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return {
        ip: ip,
        city: 'Karachi',
        region: 'Sindh',
        country: 'Pakistan',
        countryCode: 'PK',
        latitude: 24.8607,
        longitude: 67.0011,
        timezone: 'Asia/Karachi',
        postal: '74000',
        isLocalhost: true
      };
    }

    return await this.getLocationByIP(ip);
  }

  // Search for city coordinates
  async searchCity(city, country) {
    try {
      // Use OpenStreetMap Nominatim for geocoding
      const query = country ? `${city}, ${country}` : city;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: query,
            format: 'json',
            limit: 1
          },
          headers: {
            'User-Agent': 'HalalIslampro/1.0'
          }
        }
      );

      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        return {
          name: result.display_name,
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          type: result.type
        };
      }

      return null;
    } catch (error) {
      console.error('Error searching city:', error.message);
      return null;
    }
  }

  // Get timezone from coordinates
  async getTimezone(latitude, longitude) {
    try {
      const response = await axios.get(
        `http://api.timezonedb.com/v2.1/get-time-zone`,
        {
          params: {
            key: process.env.TIMEZONEDB_API_KEY || '',
            format: 'json',
            by: 'position',
            lat: latitude,
            lng: longitude
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching timezone:', error.message);
      return null;
    }
  }
}

export default new LocationService();
