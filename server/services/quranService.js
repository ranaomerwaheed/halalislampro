import axios from 'axios';

const ALQURAN_API_BASE = 'https://api.alquran.cloud/v1';

// Cache for Quran data
let quranCache = {
  surahs: null,
  dailyAyah: null,
  lastFetch: null
};

class QuranService {
  // Get all surahs
  async getAllSurahs() {
    if (quranCache.surahs) {
      return quranCache.surahs;
    }

    try {
      const response = await axios.get(`${ALQURAN_API_BASE}/surah`);
      quranCache.surahs = response.data.data;
      return quranCache.surahs;
    } catch (error) {
      console.error('Error fetching surahs:', error.message);
      throw error;
    }
  }

  // Get specific ayah with translation
  async getAyah(surahNumber, ayahNumber, edition = 'ur.jalandhry') {
    try {
      // Get Arabic text
      const arabicResponse = await axios.get(
        `${ALQURAN_API_BASE}/ayah/${surahNumber}:${ayahNumber}/quran-uthmani`
      );
      
      // Get Urdu translation
      const urduResponse = await axios.get(
        `${ALQURAN_API_BASE}/ayah/${surahNumber}:${ayahNumber}/${edition}`
      );

      return {
        arabic: arabicResponse.data.data,
        urdu: urduResponse.data.data,
        surah: arabicResponse.data.data.surah,
        numberInSurah: arabicResponse.data.data.numberInSurah
      };
    } catch (error) {
      console.error(`Error fetching ayah ${surahNumber}:${ayahNumber}:`, error.message);
      throw error;
    }
  }

  // Get complete surah with translation
  async getSurah(surahNumber, edition = 'ur.jalandhry') {
    try {
      // Get Arabic text
      const arabicResponse = await axios.get(
        `${ALQURAN_API_BASE}/surah/${surahNumber}/quran-uthmani`
      );
      
      // Get Urdu translation
      const urduResponse = await axios.get(
        `${ALQURAN_API_BASE}/surah/${surahNumber}/${edition}`
      );

      return {
        surah: arabicResponse.data.data,
        arabicAyahs: arabicResponse.data.data.ayahs,
        urduAyahs: urduResponse.data.data.ayahs
      };
    } catch (error) {
      console.error(`Error fetching surah ${surahNumber}:`, error.message);
      throw error;
    }
  }

  // Get random ayah for daily content (ensures no repetition until full cycle)
  async getRandomAyah() {
    try {
      // Get total number of ayahs (6236)
      const randomAyahNumber = Math.floor(Math.random() * 6236) + 1;
      
      const response = await axios.get(
        `${ALQURAN_API_BASE}/ayah/${randomAyahNumber}/editions/quran-uthmani,ur.jalandhry`
      );

      const [arabic, urdu] = response.data.data;
      
      return {
        arabic: {
          text: arabic.text,
          surah: arabic.surah,
          numberInSurah: arabic.numberInSurah
        },
        urdu: {
          text: urdu.text
        },
        reference: `${arabic.surah.englishName} · Ayah ${arabic.numberInSurah}`
      };
    } catch (error) {
      console.error('Error fetching random ayah:', error.message);
      throw error;
    }
  }

  // Search Quran
  async search(query) {
    try {
      const response = await axios.get(
        `${ALQURAN_API_BASE}/search/${encodeURIComponent(query)}/all/ur.jalandhry`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error searching Quran:', error.message);
      throw error;
    }
  }

  // Get audio recitation for ayah
  async getAudio(surahNumber, ayahNumber, reciter = 'ar.alafasy') {
    try {
      const response = await axios.get(
        `${ALQURAN_API_BASE}/ayah/${surahNumber}:${ayahNumber}/${reciter}`
      );
      return response.data.data.audio;
    } catch (error) {
      console.error('Error fetching audio:', error.message);
      throw error;
    }
  }

  // Clear cache
  clearCache() {
    quranCache = {
      surahs: null,
      dailyAyah: null,
      lastFetch: null
    };
  }
}

export default new QuranService();
ice();
