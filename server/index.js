import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import quranRoutes from './routes/quran.js';
import hadithRoutes from './routes/hadith.js';
import prayerRoutes from './routes/prayer.js';
import locationRoutes from './routes/location.js';
import dailyContentService from './services/dailyContent.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/quran', quranRoutes);
app.use('/api/hadith', hadithRoutes);
app.use('/api/prayer', prayerRoutes);
app.use('/api/location', locationRoutes);

// Daily content endpoint (combined)
app.get('/api/daily-content', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const content = await dailyContentService.getDailyContent(lat, lng);
    res.json(content);
  } catch (error) {
    console.error('Error fetching daily content:', error);
    res.status(500).json({ error: 'Failed to fetch daily content' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// CRON JOBS FOR AUTOMATION

// Update daily ayah at midnight (00:00)
cron.schedule('0 0 * * *', async () => {
  console.log('[CRON] Updating daily ayah...');
  try {
    await dailyContentService.rotateDailyAyah();
    console.log('[CRON] Daily ayah updated successfully');
  } catch (error) {
    console.error('[CRON] Error updating daily ayah:', error);
  }
});

// Update daily hadith at midnight (00:00)
cron.schedule('0 0 * * *', async () => {
  console.log('[CRON] Updating daily hadith...');
  try {
    await dailyContentService.rotateDailyHadith();
    console.log('[CRON] Daily hadith updated successfully');
  } catch (error) {
    console.error('[CRON] Error updating daily hadith:', error);
  }
});

// Update prayer times daily at 1:00 AM
cron.schedule('0 1 * * *', async () => {
  console.log('[CRON] Updating prayer times...');
  try {
    await dailyContentService.updatePrayerTimes();
    console.log('[CRON] Prayer times updated successfully');
  } catch (error) {
    console.error('[CRON] Error updating prayer times:', error);
  }
});

// Initialize daily content on server start
dailyContentService.initialize().then(() => {
  console.log('[INIT] Daily content initialized');
}).catch(err => {
  console.error('[INIT] Error initializing daily content:', err);
});

app.listen(PORT, () => {
  console.log(`🕌 HalalIslampro Server running on port ${PORT}`);
  console.log(`📅 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
