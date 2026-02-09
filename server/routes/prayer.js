import express from 'express';
import prayerService from '../services/prayerService.js';
import dailyContentService from '../services/dailyContent.js';

const router = express.Router();

// Get prayer times (auto-detect location from IP or use provided coords)
router.get('/', async (req, res) => {
  try {
    const { lat, lng, city, country } = req.query;
    let prayerData;

    if (lat && lng) {
      // Use provided coordinates
      prayerData = await prayerService.getPrayerTimesByCoords(lat, lng);
    } else if (city && country) {
      // Use city/country
      prayerData = await prayerService.getPrayerTimesByCity(city, country);
    } else {
      // Return cached prayer times
      const content = await dailyContentService.getDailyContent();
      prayerData = content.prayerTimes;
    }

    // Get current and next prayer
    const { current, next } = prayerService.getCurrentPrayer(prayerData.timings);
    const timeUntilNext = next ? prayerService.getTimeUntilNextPrayer(next.time) : null;

    res.json({
      ...prayerData,
      currentPrayer: current,
      nextPrayer: next,
      timeUntilNext
    });
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
});

// Get prayer times by coordinates
router.get('/coords', async (req, res) => {
  try {
    const { lat, lng, method = 2 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    const prayerData = await prayerService.getPrayerTimesByCoords(lat, lng, method);
    
    // Get current and next prayer
    const { current, next } = prayerService.getCurrentPrayer(prayerData.timings);
    const timeUntilNext = next ? prayerService.getTimeUntilNextPrayer(next.time) : null;

    res.json({
      ...prayerData,
      currentPrayer: current,
      nextPrayer: next,
      timeUntilNext
    });
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
});

// Get prayer times by city
router.get('/city', async (req, res) => {
  try {
    const { city, country, method = 2 } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City required' });
    }

    const prayerData = await prayerService.getPrayerTimesByCity(city, country, method);
    
    // Get current and next prayer
    const { current, next } = prayerService.getCurrentPrayer(prayerData.timings);
    const timeUntilNext = next ? prayerService.getTimeUntilNextPrayer(next.time) : null;

    res.json({
      ...prayerData,
      currentPrayer: current,
      nextPrayer: next,
      timeUntilNext
    });
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
});

// Get Hijri date
router.get('/hijri', async (req, res) => {
  try {
    const hijriDate = await prayerService.getHijriDate();
    res.json(hijriDate);
  } catch (error) {
    console.error('Error fetching Hijri date:', error);
    res.status(500).json({ error: 'Failed to fetch Hijri date' });
  }
});

// Get Islamic calendar
router.get('/calendar', async (req, res) => {
  try {
    const { year, month } = req.query;
    const today = new Date();
    const calendar = await prayerService.getIslamicCalendar(
      year || today.getFullYear(),
      month || today.getMonth() + 1
    );
    res.json(calendar);
  } catch (error) {
    console.error('Error fetching Islamic calendar:', error);
    res.status(500).json({ error: 'Failed to fetch Islamic calendar' });
  }
});

// Get calculation methods
router.get('/methods', (req, res) => {
  const methods = [
    { id: 0, name: 'Shia Ithna-Ansari' },
    { id: 1, name: 'University of Islamic Sciences, Karachi' },
    { id: 2, name: 'Islamic Society of North America (ISNA)' },
    { id: 3, name: 'Muslim World League' },
    { id: 4, name: 'Umm Al-Qura University, Makkah' },
    { id: 5, name: 'Egyptian General Authority of Survey' },
    { id: 7, name: 'Institute of Geophysics, University of Tehran' },
    { id: 8, name: 'Gulf Region' },
    { id: 9, name: 'Kuwait' },
    { id: 10, name: 'Qatar' },
    { id: 11, name: 'Majlis Ugama Islam Singapura, Singapore' },
    { id: 12, name: 'Union Organization Islamic de France' },
    { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey' },
    { id: 14, name: 'Spiritual Administration of Muslims of Russia' }
  ];
  res.json(methods);
});

export default router;
