import { IslamicArticle, KnowledgeArticle } from '../types';

export type { KnowledgeArticle };

export const ISLAMIC_ARTICLES: IslamicArticle[] = [
  {
    id: 'pillars-of-islam-iman',
    title: 'The Five Pillars of Islam & Six Articles of Faith',
    titleEn: 'The Five Pillars of Islam & Six Articles of Faith',
    titleAr: 'أركان الإسلام وأركان الإيمان',
    category: 'Aqeedah',
    readTime: '6 min',
    readTimeMinutes: 6,
    summary: 'A definitive overview of the fundamental outward deeds (Arkan al-Islam) and inward spiritual convictions (Arkan al-Iman) that define a Muslim.',
    authorOrSource: 'Based on Hadith of Jibreel (Sahih Muslim 8)',
    references: ['Sahih Muslim 8', 'Sahih al-Bukhari 50'],
    content: `Islam comprises both external actions (Islam) and internal convictions of the heart (Iman), harmonized through Ihsan (spiritual excellence).\n\n### The Five Pillars of Islam (Arkan al-Islam)\n1. **Shahadah (Declaration of Faith):** Bearing witness that there is no god worthy of worship except Allah and that Muhammad ﷺ is His final Messenger.\n2. **Salah (The Five Daily Prayers):** The direct spiritual lifeline between the creature and the Creator, performed at dawn, noon, afternoon, sunset, and night.\n3. **Zakat (Obligatory Almsgiving):** A 2.5% annual contribution on eligible surplus wealth, purifying wealth and fostering community social welfare.\n4. **Sawm (Fasting Ramadan):** Abstaining from food, drink, and marital relations from dawn till dusk for spiritual purification and empathy.\n5. **Hajj (Pilgrimage to Makkah):** A once-in-a-lifetime obligation for those physically and financially able, symbolizing universal human equality before Allah.\n\n### The Six Articles of Faith (Arkan al-Iman)\n- Belief in **Allah**: In His existence, rububiyyah (lordship), uluhiyyah (worship), and beautiful names and lofty attributes.\n- Belief in **His Angels**: Noble spiritual beings created from light who carry out divine orders without disobedience.\n- Belief in **His Revealed Books**: The original Torah, Psalms (Zabur), Gospel (Injeel), and the final preserved Qur'an.\n- Belief in **His Messengers**: From Adam, Nuh, Ibrahim, Musa, and Isa to the seal of Prophethood, Muhammad ﷺ.\n- Belief in **The Last Day (Yawm al-Qiyamah)**: Resurrection, reckoning, scales of justice, Paradise, and Hellfire.\n- Belief in **Al-Qadar (Divine Decree)**: That Allah's eternal knowledge, decree, will, and creation encompass all that happens, with man possessing real moral accountability.`
  },
  {
    id: 'khushu-in-prayer',
    title: 'Achieving Khushu (Inner Tranquility & Presence) in Salah',
    titleEn: 'Achieving Khushu (Inner Tranquility & Presence) in Salah',
    titleAr: 'الخشوع في الصلاة',
    category: 'Salah',
    readTime: '5 min',
    readTimeMinutes: 5,
    summary: 'Practical spiritual steps to eliminate mind-wandering and experience the sublime peace of conversing directly with Allah in prayer.',
    authorOrSource: 'Ibn al-Qayyim (Asrar al-Salah); Imam al-Ghazali (Ihya)',
    references: ['Surah Al-Mu\'minun 23:1-2', 'Sahih Muslim', 'Sunan Ibn Majah'],
    content: `Salah is described by the Prophet ﷺ as "the cooling of my eyes." Yet many struggle with distractions and wandering thoughts during prayer. True success is tied to Khushu: "Certainly will the believers have succeeded: They who are during their prayer humbly submissive" (Surah Al-Mu'minun 23:1-2).\n\n### Practical Keys to Cultivating Khushu:\n1. **Intentional Preparation:** Begin during Wudu by reflecting on sins washing away with each drop of water. Walk calmly to prayer and pause momentarily before the opening Takbir to orient your heart.\n2. **Understanding What You Recite:** Reflect deeply on the meaning of Surah Al-Fatihah, knowing that Allah replies to each verse: "My servant has praised Me... My servant has glorified Me" (Sahih Muslim).\n3. **Visual Focus:** Keep eyes fixed on the spot of prostration (Sujud), preventing gaze and thoughts from drifting.\n4. **Physical Stillness (Tuma'ninah):** Give each posture its full right—stand upright, bow until your spine settles, and rest calmly in Sujud before rising. Hasty prayers rob the soul of peace.\n5. **Pray as if it is Your Farewell Prayer:** The Prophet ﷺ advised: "When you stand up to pray, pray as if it is your last prayer" (Sunan Ibn Majah).`
  },
  {
    id: 'zakat-social-justice',
    title: 'Zakat: Divine Equilibrium & The Philosophy of Wealth',
    titleEn: 'Zakat: Divine Equilibrium & The Philosophy of Wealth',
    titleAr: 'فلسفة الزكاة والعدالة الاجتماعية',
    category: 'Zakat',
    readTime: '5 min',
    readTimeMinutes: 5,
    summary: 'How Zakat purifies individual wealth, eliminates poverty, and bridges social inequality in the Islamic economic framework.',
    authorOrSource: 'Dr. Yusuf al-Qaradawi: Fiqh az-Zakat; Quranic Principles',
    references: ['Surah At-Tawbah 9:60', 'Surah An-Nur 24:33', 'Sahih Muslim'],
    content: `In Islamic theology, human beings are custodians rather than absolute original owners of wealth: "And give them from the wealth of Allah which He has given you" (Surah An-Nur 24:33). Zakat literally means both 'purification' and 'growth'.\n\n### Core Insights on Zakat:\n- **Purification (Taharah):** Cleanses the heart of the payer from greed, hoarding, and callousness toward others.\n- **Economic Circulation:** Prevents money from being concentrated solely among the rich (Surah Al-Hashr 59:7), stimulating shared community dignity.\n- **The Eight Quranic Beneficiaries:** Outlined clearly in Surah At-Tawbah 9:60: the poor (fuqara), the needy (masakin), administrators of zakat, those whose hearts are to be reconciled, freeing captives, those burdened by debt, in the cause of Allah, and the stranded wayfarer.\n- **Spiritual Assurance:** The Prophet ﷺ guaranteed: "Charity does not decrease wealth" (Sahih Muslim); rather, it invites divine barakah (blessing) and divine protection.`
  },
  {
    id: 'islamic-business-ethics',
    title: 'Business Ethics, Honesty & The Prohibition of Exploitation (Riba)',
    titleEn: 'Business Ethics, Honesty & The Prohibition of Exploitation (Riba)',
    titleAr: 'أخلاقيات التجارة في الإسلام',
    category: 'Ethics',
    readTime: '6 min',
    readTimeMinutes: 6,
    summary: 'The timeless Islamic principles governing marketplace transactions, contracts, consumer fairness, and halal earnings.',
    authorOrSource: 'Majlis al-Fiqh al-Islami; Classical Fiqh Treatises',
    references: ['Jami\' at-Tirmidhi 1209', 'Sunan Ibn Majah 2443', 'Surah Al-Baqarah 2:275'],
    content: `The Prophet Muhammad ﷺ was a celebrated merchant known throughout Arabia for trustworthiness. He taught that honest commerce is one of the highest avenues of worship:\n\n"The truthful and trustworthy merchant will be with the prophets, the truthful, and the martyrs on the Day of Resurrection" (Jami' at-Tirmidhi 1209).\n\n### Cardinal Principles of Halal Commerce:\n1. **Full Transparency & Disclosure:** It is forbidden to conceal defects in goods or mislead buyers with deceptive marketing or manipulated weights.\n2. **Mutual Consent (Taradi):** Every transaction must be entered into freely without coercion, ambiguity (Gharar), or predatory conditions.\n3. **Prohibition of Usury (Riba):** Exploitative interest-bearing loans are strictly prohibited, encouraging risk-sharing and asset-backed enterprise instead of speculative debt burdens.\n4. **Timely Compensation:** The Prophet ﷺ said: "Pay the laborer his wages before his sweat dries" (Sunan Ibn Majah 2443).\n5. **Fulfilling Contracts:** Muslims are bound by their covenants and ethical promises (Surah Al-Ma'idah 5:1).`
  }
];

export const KNOWLEDGE_ARTICLES = ISLAMIC_ARTICLES;
