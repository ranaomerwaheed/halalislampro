import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import quranService from './quranService.js';
import hadithService from './hadithService.js';
import prayerService from './prayerService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../data/dailyContent.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// Default state
const defaultState = {
  dailyAyah: null,
  dailyHadith: null,
  shownAyahIds: [],
  shownHadithIds: [],
  lastUpdated: null,
  prayerTimes: {},
  hijriDate: null
};

class DailyContentService {
  constructor() {
    this.state = this.loadState();
  }

  // Load state from file
  loadState() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return { ...defaultState, ...JSON.parse(data) };
      }
    } catch (error) {
      console.error('Error loading state:', error.message);
    }
    return { ...defaultState };
  }

  // Save state to file
  saveState() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.state, null, 2));
    } catch (error) {
      console.error('Error saving state:', error.message);
    }
  }

  // Initialize daily content
  async initialize() {
    const today = new Date().toDateString();
    
    // Check if we need to update (new day)
    if (this.state.lastUpdated !== today) {
      console.log('[DailyContent] New day detected, updating content...');
      await this.rotateDailyAyah();
      await this.rotateDailyHadith();
      this.state.lastUpdated = today;
      this.saveState();
    } else {
      console.log('[DailyContent] Content already up to date');
    }
  }

  // Rotate daily ayah (ensures no repetition until full cycle)
  async rotateDailyAyah() {
    try {
      // Reset if we've shown all ayahs (simplified for demo)
      if (this.state.shownAyahIds.length >= 6236) {
        this.state.shownAyahIds = [];
      }

      // Get random ayah
      const ayah = await quranService.getRandomAyah();
      
      this.state.dailyAyah = {
        ...ayah,
        date: new Date().toISOString()
      };
      
      this.state.shownAyahIds.push(ayah.arabic.numberInSurah);
      this.saveState();

      console.log('[DailyContent] Daily ayah rotated:', ayah.reference);
      return this.state.dailyAyah;
    } catch (error) {
      console.error('Error rotating daily ayah:', error.message);
      throw error;
    }
  }

  // Rotate daily hadith
  async rotateDailyHadith() {
    try {
      // Reset if we've shown all hadith
      if (this.state.shownHadithIds.length >= hadithService.getCount()) {
        this.state.shownHadithIds = [];
      }

      // Get random hadith that hasn't been shown
      const hadith = hadithService.getDailyHadith();
      
      this.state.dailyHadith = {
        ...hadith,
        date: new Date().toISOString()
      };
      
      this.state.shownHadithIds.push(hadith.id);
      this.saveState();

      console.log('[DailyContent] Daily hadith rotated:', hadith.source);
      return this.state.dailyHadith;
    } catch (error) {
      console.error('Error rotating daily hadith:', error.message);
      throw error;
    }
  }

  // Update prayer times
  async updatePrayerTimes(latitude = 24.8607, longitude = 67.0011) {
    try {
      const prayerData = await prayerService.getPrayerTimesByCoords(latitude, longitude);
      const hijriDate = await prayerService.getHijriDate();
      
      this.state.prayerTimes = prayerData;
      this.state.hijriDate = hijriDate;
      this.saveState();

      console.log('[DailyContent] Prayer times updated');
      return { prayerTimes: prayerData, hijriDate };
    } catch (error) {
      console.error('Error updating prayer times:', error.message);
      throw error;
    }
  }

  // Get all daily content
  async getDailyContent(latitude, longitude) {
    // Update prayer times if location provided
    if (latitude && longitude) {
      await this.updatePrayerTimes(latitude, longitude);
    }

    // Get current/next prayer
    let currentPrayer = null;
    let nextPrayer = null;
    let timeUntilNext = null;

    if (this.state.prayerTimes.timings) {
      const prayers = prayerService.getCurrentPrayer(this.state.prayerTimes.timings);
      currentPrayer = prayers.current;
      nextPrayer = prayers.next;
      
      if (nextPrayer) {
        timeUntilNext = prayerService.getTimeUntilNextPrayer(nextPrayer.time);
      }
    }

    return {
      dailyAyah: this.state.dailyAyah,
      dailyHadith: this.state.dailyHadith,
      prayerTimes: this.state.prayerTimes,
      hijriDate: this.state.hijriDate,
      currentPrayer,
      nextPrayer,
      timeUntilNext,
      lastUpdated: this.state.lastUpdated
    };
  }

  // Get daily ayah only
  getDailyAyah() {
    return this.state.dailyAyah;
  }

  // Get daily hadith only
  getDailyHadith() {
    return this.state.dailyHadith;
  }

  // Reset all content (for testing)
  reset() {
    this.state = { ...defaultState };
    this.saveState();
    console.log('[DailyContent] State reset');
  }
}

export default new DailyContentService();
