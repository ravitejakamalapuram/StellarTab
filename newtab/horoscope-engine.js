// StellarTab — Deterministic Cosmic Horoscope Engine

export const ZODIAC_SIGNS = {
  aries: {
    name: 'Aries',
    element: 'Fire',
    planet: 'Mars',
    glyph: '♈',
    start: 'Mar 21',
    end: 'Apr 19',
    color: 'hsl(0, 85%, 65%)',
    stars: [{x: 40, y: 140}, {x: 90, y: 90}, {x: 140, y: 60}, {x: 170, y: 75}]
  },
  taurus: {
    name: 'Taurus',
    element: 'Earth',
    planet: 'Venus',
    glyph: '♉',
    start: 'Apr 20',
    end: 'May 20',
    color: 'hsl(140, 65%, 55%)',
    stars: [{x: 30, y: 50}, {x: 70, y: 65}, {x: 100, y: 90}, {x: 130, y: 110}, {x: 95, y: 140}, {x: 155, y: 150}, {x: 175, y: 130}]
  },
  gemini: {
    name: 'Gemini',
    element: 'Air',
    planet: 'Mercury',
    glyph: '♊',
    start: 'May 21',
    end: 'June 20',
    color: 'hsl(50, 90%, 60%)',
    stars: [{x: 50, y: 50}, {x: 70, y: 110}, {x: 90, y: 160}, {x: 150, y: 50}, {x: 135, y: 105}, {x: 120, y: 160}, {x: 90, y: 160}]
  },
  cancer: {
    name: 'Cancer',
    element: 'Water',
    planet: 'Moon',
    glyph: '♋',
    start: 'June 21',
    end: 'July 22',
    color: 'hsl(200, 80%, 65%)',
    stars: [{x: 100, y: 40}, {x: 100, y: 90}, {x: 65, y: 140}, {x: 100, y: 90}, {x: 135, y: 140}]
  },
  leo: {
    name: 'Leo',
    element: 'Fire',
    planet: 'Sun',
    glyph: '♌',
    start: 'July 23',
    end: 'Aug 22',
    color: 'hsl(25, 90%, 60%)',
    stars: [{x: 40, y: 160}, {x: 80, y: 140}, {x: 105, y: 105}, {x: 145, y: 80}, {x: 170, y: 100}, {x: 155, y: 135}, {x: 105, y: 105}]
  },
  virgo: {
    name: 'Virgo',
    element: 'Earth',
    planet: 'Mercury',
    glyph: '♍',
    start: 'Aug 23',
    end: 'Sept 22',
    color: 'hsl(165, 70%, 55%)',
    stars: [{x: 40, y: 70}, {x: 80, y: 85}, {x: 110, y: 65}, {x: 135, y: 100}, {x: 165, y: 110}, {x: 145, y: 145}, {x: 105, y: 155}, {x: 80, y: 125}, {x: 40, y: 70}]
  },
  libra: {
    name: 'Libra',
    element: 'Air',
    planet: 'Venus',
    glyph: '♎',
    start: 'Sept 23',
    end: 'Oct 22',
    color: 'hsl(280, 75%, 70%)',
    stars: [{x: 100, y: 40}, {x: 65, y: 90}, {x: 135, y: 90}, {x: 100, y: 145}, {x: 65, y: 90}]
  },
  scorpio: {
    name: 'Scorpio',
    element: 'Water',
    planet: 'Pluto',
    glyph: '♏',
    start: 'Oct 23',
    end: 'Nov 21',
    color: 'hsl(340, 85%, 60%)',
    stars: [{x: 40, y: 55}, {x: 75, y: 55}, {x: 110, y: 75}, {x: 110, y: 110}, {x: 90, y: 140}, {x: 65, y: 155}, {x: 85, y: 175}, {x: 110, y: 160}]
  },
  sagittarius: {
    name: 'Sagittarius',
    element: 'Fire',
    planet: 'Jupiter',
    glyph: '♐',
    start: 'Nov 22',
    end: 'Dec 21',
    color: 'hsl(35, 85%, 60%)',
    stars: [{x: 45, y: 125}, {x: 75, y: 100}, {x: 105, y: 115}, {x: 135, y: 90}, {x: 160, y: 130}, {x: 120, y: 150}, {x: 75, y: 135}]
  },
  capricorn: {
    name: 'Capricorn',
    element: 'Earth',
    planet: 'Saturn',
    glyph: '♑',
    start: 'Dec 22',
    end: 'Jan 19',
    color: 'hsl(215, 45%, 55%)',
    stars: [{x: 35, y: 75}, {x: 85, y: 50}, {x: 145, y: 75}, {x: 170, y: 120}, {x: 135, y: 160}, {x: 85, y: 155}, {x: 35, y: 115}, {x: 35, y: 75}]
  },
  aquarius: {
    name: 'Aquarius',
    element: 'Air',
    planet: 'Uranus',
    glyph: '♒',
    start: 'Jan 20',
    end: 'Feb 18',
    color: 'hsl(180, 80%, 60%)',
    stars: [{x: 40, y: 70}, {x: 75, y: 55}, {x: 100, y: 75}, {x: 120, y: 105}, {x: 155, y: 105}, {x: 175, y: 135}, {x: 135, y: 160}]
  },
  pisces: {
    name: 'Pisces',
    element: 'Water',
    planet: 'Neptune',
    glyph: '♓',
    start: 'Feb 19',
    end: 'Mar 20',
    color: 'hsl(190, 60%, 65%)',
    stars: [{x: 35, y: 160}, {x: 65, y: 135}, {x: 95, y: 125}, {x: 135, y: 125}, {x: 165, y: 95}, {x: 145, y: 65}, {x: 105, y: 75}]
  }
};

// Seeded PRNG implementation (Linear Congruential Generator)
class SeededRandom {
  constructor(seedString) {
    this.seed = this.hashString(seedString);
  }

  // Simple string hashing
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // Generate random float between 0 and 1
  next() {
    // LCG parameters
    const m = 0x80000000; // 2**31
    const a = 1103515245;
    const c = 12345;
    this.seed = (a * this.seed + c) % m;
    return this.seed / (m - 1);
  }

  // Random integer between min and max (inclusive)
  nextInt(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // Pick random element from an array
  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }
}

// Astrological vocabulary arrays
const COSMIC_OPENINGS = [
  "With your ruling planet, {planet}, radiating harmonious energies, the stellar landscape is shifting.",
  "As the celestial currents flow, {planet} aligns with distant cosmic beacons to activate your natural path.",
  "A quiet cosmic vibration stirs in the background of your chart, casting a revealing glow on your intentions.",
  "Under the guidance of {planet}, the planetary configuration points toward a period of profound expansion.",
  "The current stellar transit invites you to pause, feel the pull of {planet}, and look beyond immediate horizons.",
  "An energetic bridge forms between your element of {element} and the zenith of your chart today.",
  "Celestial shifts encourage a deeper awareness of the subtle paths unfolding directly in front of you."
];

const LOVE_INSIGHTS = [
  "In relationships, clarity is your highest ally. Expressing your true feelings will dissolve silent barriers.",
  "A spark of connection is highlighted today. Listen deeply to what remains unsaid in conversations.",
  "The stars advise you to cultivate space for gentle listening. Vulnerability is a form of deep strength.",
  "Your emotional intelligence shines. Trust the magnetic pull of your heart to guide connection.",
  "An unexpected moment of understanding brings close bonds into a warmer, clearer light.",
  "Release old expectations. Let the natural rhythm of your connections reveal itself without pressure."
];

const CAREER_INSIGHTS = [
  "Your professional sphere benefits from bold, analytical thinking. A subtle idea holds immense promise.",
  "Collaboration is key. An exchange of perspectives will open up paths that previously seemed blocked.",
  "Focus on refining your current tasks rather than seeking new horizons. Mastery lies in the details.",
  "Your element of {element} calls you to stand grounded. Your perseverance is noticed by the right eyes.",
  "An opportunity for growth presents itself through a challenging puzzle. Dive in with complete curiosity.",
  "Trust your instincts regarding a project direction. The planetary currents support structured creativity."
];

const WELLNESS_INSIGHTS = [
  "Nourish your nervous system. A few moments of quiet reflection will restore your cosmic balance.",
  "Physical movement helps ground your active mind. Connect with the natural elements around you.",
  "Prioritize restorative sleep and hydration. The celestial energies are demanding, so refuel your reservoir.",
  "Mental clarity is achieved through clearing away outer noise. Protect your personal space today.",
  "Listen to the subtle messages your body is sending. A slower, more deliberate pace is highly beneficial.",
  "Realign your energy by engaging in something that brings you pure, uncomplicated joy."
];

const LUCK_INSIGHTS = [
  "Opportunities are hidden within small coincidences. Keep your eyes open to subtle synchronicities.",
  "A favorable wind blows from your past contacts. Reach out or remain receptive to old connections.",
  "Fortune favors the patient today. Rushing will cloud the clarity that is naturally trying to find you.",
  "Your lucky compass points toward unexpected conversations. Speak your truth freely.",
  "The cosmic field is highly receptive to your intentions. Visualize clearly what you wish to attract.",
  "A small pivot in your routine will invite fresh cosmic currents and positive serendipity."
];

const COSMIC_CONCLUSIONS = [
  "Hold this stellar truth close: your authenticity is your compass in a shifting universe.",
  "The stars outline the path, but your conscious choices write the destination.",
  "Let your actions align with your highest values. The universe responds to deliberate movement.",
  "Observe, learn, and grow. Every interaction today carries a seed of cosmic wisdom.",
  "Trust the timing of your journey. You are exactly where the universe needs you to be.",
  "Step forward with courage. Your internal light is more stable than any passing planetary storm."
];

const CELestial_COLORS = [
  "Cosmic Lavender", "Nebula Teal", "Solar Gold", "Lunar Silver", "Andromeda Purple",
  "Zenith Cyan", "Stellar Amber", "Orion Crimson", "Galaxy Violet", "Eclipse Charcoal",
  "Aurora Emerald", "Astral Ochre", "Celestial Indigo", "Supernova Coral"
];

const COSMIC_QUOTES = [
  "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.",
  "What is bound in the heavens will reflect in the quiet chambers of your heart.",
  "Do not feel lonely, the entire universe is inside you.",
  "The stars are the street lights of eternity, guiding you home to yourself.",
  "In the middle of the cosmic dance, find the still point of your own breathing.",
  "You are not just a drop in the ocean. You are the entire ocean in a single drop.",
  "The celestial spheres sing a silent song that only the soul can hear.",
  "Let your light shine so brightly that the stars pause to admire your glow."
];

// Main Horoscope Generation Function
export function generateHoroscope(signKey, type = 'daily', date = new Date()) {
  const sign = ZODIAC_SIGNS[signKey.toLowerCase()];
  if (!sign) return null;

  // Generate deterministic seed based on Sign + Type + Date String
  let dateSeed = '';
  if (type === 'daily') {
    dateSeed = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  } else if (type === 'weekly') {
    // Get week number
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    dateSeed = `${date.getFullYear()}-W${weekNumber}`;
  } else if (type === 'monthly') {
    dateSeed = `${date.getFullYear()}-${date.getMonth() + 1}`;
  }

  const seed = `${signKey.toLowerCase()}-${type}-${dateSeed}`;
  const prng = new SeededRandom(seed);

  // Generate deterministic horoscope text
  const rawOpening = prng.pick(COSMIC_OPENINGS);
  const rawLove = prng.pick(LOVE_INSIGHTS);
  const rawCareer = prng.pick(CAREER_INSIGHTS);
  const rawWellness = prng.pick(WELLNESS_INSIGHTS);
  const rawLuck = prng.pick(LUCK_INSIGHTS);
  const rawConclusion = prng.pick(COSMIC_CONCLUSIONS);

  // Replace placeholders helper
  const formatText = (text) => {
    return text
      .replace(/{planet}/g, sign.planet)
      .replace(/{element}/g, sign.element)
      .replace(/{sign}/g, sign.name);
  };

  // Compile reading paragraphs
  const reading = {
    overview: formatText(`${rawOpening} ${rawConclusion}`),
    love: formatText(rawLove),
    career: formatText(rawCareer),
    wellness: formatText(rawWellness),
    luck: formatText(rawLuck)
  };

  // Generate mood meters (40 to 100)
  const moods = {
    love: prng.nextInt(45, 100),
    career: prng.nextInt(45, 100),
    wellness: prng.nextInt(45, 100),
    luck: prng.nextInt(45, 100)
  };

  // Generate lucky numbers and colors
  const luckyNumber = prng.nextInt(1, 99);
  const luckyColor = prng.pick(CELestial_COLORS);
  
  // Power Hour
  const powerHourHour = prng.nextInt(1, 12);
  const powerHourMin = prng.pick(["00", "15", "30", "45"]);
  const powerHourAmpm = prng.pick(["AM", "PM"]);
  const powerHour = `${powerHourHour}:${powerHourMin} ${powerHourAmpm}`;

  // Constellation Quote
  const quote = prng.pick(COSMIC_QUOTES);

  return {
    sign: sign.name,
    element: sign.element,
    planet: sign.planet,
    glyph: sign.glyph,
    dateSeed,
    reading,
    moods,
    luckyNumber,
    luckyColor,
    powerHour,
    quote
  };
}
