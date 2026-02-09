import axios from 'axios';

const ALADHAN_API_BASE = 'https://api.aladhan.com/v1';

// Cache for prayer times
let prayerCache = {};

class PrayerService {
  // Get prayer times by coordinates
  async getPrayerTimesByCoords(latitude, longitude, method = 2) {
    const cacheKey = `${latitude},${longitude},${method}`;
    
    // Check cache (valid for 1 day)
    if (prayerCache[cacheKey]) {
      const cacheAge = Date.now() - prayerCache[cacheKey].timestamp;
      if (cacheAge < 24 * 60 * 60 * 1000) {
        return prayerCache[cacheKey].data;
      }
    }

    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      const response = await axios.get(
        `${ALADHAN_API_BASE}/timings/${dateStr}`,
        {
          params: {
            latitude,
            longitude,
            method, // Calculation method
            school: 1, // Hanafi
            adjustment: 0
          }
        }
      );

      const timings = response.data.data.timings;
      const meta = response.data.data.meta;

      const result = {
        timings: {
          Fajr: timings.Fajr,
          Sunrise: timings.Sunrise,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
          Imsak: timings.Imsak,
          Midnight: timings.Midnight
        },
        date: response.data.data.date,
        meta: {
          timezone: meta.timezone,
          method: meta.method,
          latitude: meta.latitude,
          longitude: meta.longitude
        }
      };

      // Cache result
      prayerCache[cacheKey] = {
        data: result,
        timestamp: Date.now()
      };

      return result;
    } catch (error) {
      console.error('Error fetching prayer times:', error.message);
      throw error;
    }
  }

  // Get prayer times by city
  async getPrayerTimesByCity(city, country, method = 2) {
    const cacheKey = `${city},${country},${method}`;
    
    // Check cache
    if (prayerCache[cacheKey]) {
      const cacheAge = Date.now() - prayerCache[cacheKey].timestamp;
      if (cacheAge < 24 * 60 * 60 * 1000) {
        return prayerCache[cacheKey].data;
      }
    }

    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      const response = await axios.get(
        `${ALADHAN_API_BASE}/timingsByCity/${dateStr}`,
        {
          params: {
            city,
            country,
            method,
            school: 1
          }
        }
      );

      const timings = response.data.data.timings;
      const meta = response.data.data.meta;

      const result = {
        timings: {
          Fajr: timings.Fajr,
          Sunrise: timings.Sunrise,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
          Imsak: timings.Imsak,
          Midnight: timings.Midnight
        },
        date: response.data.data.date,
        meta: {
          timezone: meta.timezone,
          method: meta.method,
          city,
          country
        }
      };

      // Cache result
      prayerCache[cacheKey] = {
        data: result,
        timestamp: Date.now()
      };

      return result;
    } catch (error) {
      console.error('Error fetching prayer times by city:', error.message);
      throw error;
    }
  }

  // Get prayer times by address
  async getPrayerTimesByAddress(address) {
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      const response = await axios.get(
        `${ALADHAN_API_BASE}/timingsByAddress/${dateStr}`,
        {
          params: {
            address,
            method: 2,
            school: 1
          }
        }
      );

      return {
        timings: response.data.data.timings,
        date: response.data.data.date,
        meta: response.data.data.meta
      };
    } catch (error) {
      console.error('Error fetching prayer times by address:', error.message);
      throw error;
    }
  }

  // Get current prayer
  getCurrentPrayer(timings) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
      { name: 'Fajr', nameUrdu: 'فجر', time: timings.Fajr },
      { name: 'Dhuhr', nameUrdu: 'ظہر', time: timings.Dhuhr },
      { name: 'Asr', nameUrdu: 'عصر', time: timings.Asr },
      { name: 'Maghrib', nameUrdu: 'مغرب', time: timings.Maghrib },
      { name: 'Isha', nameUrdu: 'عشاء', time: timings.Isha }
    ];

    let current = null;
    let next = null;

    for (let i = 0; i < prayers.length; i++) {
      const [hours, minutes] = prayers[i].time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;

      if (currentTime < prayerTime) {
        next = prayers[i];
        current = prayers[i - 1] || prayers[prayers.length - 1];
        break;
      }
    }

    if (!next) {
      current = prayers[prayers.length - 1];
      next = prayers[0];
    }

    return { current, next };
  }

  // Get time until next prayer
  getTimeUntilNextPrayer(nextPrayerTime) {
    const now = new Date();
    const [hours, minutes] = nextPrayerTime.split(':').map(Number);
    
    let nextTime = new Date();
    nextTime.setHours(hours, minutes, 0);
    
    if (nextTime < now) {
      nextTime.setDate(nextTime.getDate() + 1);
    }
    
    const diff = nextTime - now;
    const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
    const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours: hoursUntil, minutes: minutesUntil };
  }

  // Get Hijri date
  async getHijriDate() {
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      const response = await axios.get(
        `${ALADHAN_API_BASE}/gToH/${dateStr}`
      );

      return response.data.data.hijri;
    } catch (error) {
      console.error('Error fetching Hijri date:', error.message);
      throw error;
    }
  }

  // Get Islamic calendar for month
  async getIslamicCalendar(year, month) {
    try {
      const response = await axios.get(
        `${ALADHAN_API_BASE}/calendarByCity`,
        {
          params: {
            city: 'Mecca',
            country: 'Saudi Arabia',
            method: 2,
            month,
            year
          }
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error fetching Islamic calendar:', error.message);
      throw error;
    }
  }

  // Clear cache
  clearCache() {
    prayerCache = {};
  }
}

export default new PrayerService();
