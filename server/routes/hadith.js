import express from 'express';
import hadithService from '../services/hadithService.js';
import dailyContentService from '../services/dailyContent.js';

const router = express.Router();

// Get daily hadith
router.get('/daily', async (req, res) => {
  try {
    const dailyHadith = dailyContentService.getDailyHadith();
    if (!dailyHadith) {
      // Generate if not exists
      const newHadith = dailyContentService.rotateDailyHadith();
      return res.json(newHadith);
    }
    res.json(dailyHadith);
  } catch (error) {
    console.error('Error fetching daily hadith:', error);
    res.status(500).json({ error: 'Failed to fetch daily hadith' });
  }
});

// Get all hadith
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    let hadith;

    if (search) {
      hadith = hadithService.searchHadith(search);
    } else if (category) {
      hadith = hadithService.getHadithByCategory(category);
    } else {
      hadith = hadithService.getAllHadith();
    }

    // Pagination
    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    const paginatedHadith = hadith.slice(start, end);

    res.json({
      hadith: paginatedHadith,
      total: hadith.length,
      page: parseInt(page),
      totalPages: Math.ceil(hadith.length / limit)
    });
  } catch (error) {
    console.error('Error fetching hadith:', error);
    res.status(500).json({ error: 'Failed to fetch hadith' });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const categories = hadithService.getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get hadith by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const hadith = hadithService.getHadithById(id);
    if (!hadith) {
      return res.status(404).json({ error: 'Hadith not found' });
    }
    res.json(hadith);
  } catch (error) {
    console.error('Error fetching hadith:', error);
    res.status(500).json({ error: 'Failed to fetch hadith' });
  }
});

// Get hadith by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const hadith = hadithService.getHadithByCategory(category);
    res.json(hadith);
  } catch (error) {
    console.error('Error fetching hadith by category:', error);
    res.status(500).json({ error: 'Failed to fetch hadith' });
  }
});

export default router;
