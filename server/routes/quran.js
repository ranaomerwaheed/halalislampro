import express from 'express';
import quranService from '../services/quranService.js';
import dailyContentService from '../services/dailyContent.js';

const router = express.Router();

// Get daily ayah
router.get('/daily', async (req, res) => {
  try {
    const dailyAyah = dailyContentService.getDailyAyah();
    if (!dailyAyah) {
      // Generate if not exists
      const newAyah = await dailyContentService.rotateDailyAyah();
      return res.json(newAyah);
    }
    res.json(dailyAyah);
  } catch (error) {
    console.error('Error fetching daily ayah:', error);
    res.status(500).json({ error: 'Failed to fetch daily ayah' });
  }
});

// Get all surahs
router.get('/surahs', async (req, res) => {
  try {
    const surahs = await quranService.getAllSurahs();
    res.json(surahs);
  } catch (error) {
    console.error('Error fetching surahs:', error);
    res.status(500).json({ error: 'Failed to fetch surahs' });
  }
});

// Get specific surah
router.get('/surah/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const surah = await quranService.getSurah(number);
    res.json(surah);
  } catch (error) {
    console.error('Error fetching surah:', error);
    res.status(500).json({ error: 'Failed to fetch surah' });
  }
});

// Get specific ayah
router.get('/ayah/:surah/:ayah', async (req, res) => {
  try {
    const { surah, ayah } = req.params;
    const ayahData = await quranService.getAyah(surah, ayah);
    res.json(ayahData);
  } catch (error) {
    console.error('Error fetching ayah:', error);
    res.status(500).json({ error: 'Failed to fetch ayah' });
  }
});

// Search Quran
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter required' });
    }
    const results = await quranService.search(q);
    res.json(results);
  } catch (error) {
    console.error('Error searching Quran:', error);
    res.status(500).json({ error: 'Failed to search Quran' });
  }
});

// Get audio for ayah
router.get('/audio/:surah/:ayah', async (req, res) => {
  try {
    const { surah, ayah } = req.params;
    const { reciter } = req.query;
    const audioUrl = await quranService.getAudio(surah, ayah, reciter);
    res.json({ audioUrl });
  } catch (error) {
    console.error('Error fetching audio:', error);
    res.status(500).json({ error: 'Failed to fetch audio' });
  }
});

// Get random ayah
router.get('/random', async (req, res) => {
  try {
    const ayah = await quranService.getRandomAyah();
    res.json(ayah);
  } catch (error) {
    console.error('Error fetching random ayah:', error);
    res.status(500).json({ error: 'Failed to fetch random ayah' });
  }
});

export default router;
