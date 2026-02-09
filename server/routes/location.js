import express from 'express';
import locationService from '../services/locationService.js';

const router = express.Router();

// Get location from IP
router.get('/', async (req, res) => {
  try {
    const location = await locationService.getLocationFromRequest(req);
    res.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

// Search for city
router.get('/search', async (req, res) => {
  try {
    const { city, country } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter required' });
    }

    const result = await locationService.searchCity(city, country);
    
    if (!result) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error searching city:', error);
    res.status(500).json({ error: 'Failed to search city' });
  }
});

// Get location by specific IP
router.get('/:ip', async (req, res) => {
  try {
    const { ip } = req.params;
    const location = await locationService.getLocationByIP(ip);
    res.json(location);
  } catch (error) {
    console.error('Error fetching location by IP:', error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

export default router;
