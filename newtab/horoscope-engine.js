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

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  next() {
    const m = 0x80000000;
    const a = 1103515245;
    const c = 12345;
    this.seed = (a * this.seed + c) % m;
    return this.seed / (m - 1);
  }

  nextInt(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }
}

export const TRANSLATIONS = {
  en: {
    elements: { Fire: 'Fire', Earth: 'Earth', Air: 'Air', Water: 'Water' },
    planets: { Mars: 'Mars', Venus: 'Venus', Mercury: 'Mercury', Moon: 'Moon', Sun: 'Sun', Pluto: 'Pluto', Jupiter: 'Jupiter', Saturn: 'Saturn', Uranus: 'Uranus', Neptune: 'Neptune' },
    signs: { Aries: 'Aries', Taurus: 'Taurus', Gemini: 'Gemini', Cancer: 'Cancer', Leo: 'Leo', Virgo: 'Virgo', Libra: 'Libra', Scorpio: 'Scorpio', Sagittarius: 'Sagittarius', Capricorn: 'Capricorn', Aquarius: 'Aquarius', Pisces: 'Pisces' },
    colors: [
      "Cosmic Lavender", "Nebula Teal", "Solar Gold", "Lunar Silver", "Andromeda Purple",
      "Zenith Cyan", "Stellar Amber", "Orion Crimson", "Galaxy Violet", "Eclipse Charcoal",
      "Aurora Emerald", "Astral Ochre", "Celestial Indigo", "Supernova Coral"
    ]
  },
  te: {
    elements: { Fire: 'అగ్ని', Earth: 'భూమి', Air: 'వాయువు', Water: 'జలం' },
    planets: { Mars: 'కుజుడు', Venus: 'శుక్రుడు', Mercury: 'బుధుడు', Moon: 'చంద్రుడు', Sun: 'సూర్యుడు', Pluto: 'ప్లూటో', Jupiter: 'గురుడు', Saturn: 'శని', Uranus: 'యురేనస్', Neptune: 'నెప్ట్యూన్' },
    signs: { Aries: 'మేషం', Taurus: 'వృషభం', Gemini: 'మిథునం', Cancer: 'కర్కాటకం', Leo: 'సింహం', Virgo: 'కన్య', Libra: 'తుల', Scorpio: 'వృశ్చికం', Sagittarius: 'ధనుస్సు', Capricorn: 'మకరం', Aquarius: 'కుంభం', Pisces: 'మీనం' },
    colors: [
      "విశ్వ లావెండర్", "నెబ్యులా టీల్", "సౌర బంగారం", "చాంద్ర వెండి", "అండ్రోమెడ ఊదా",
      "జెనిత్ సయాన్", "నక్షత్ర అంబర్", "ఓరియన్ ఎరుపు", "గెలాక్సీ వైలెట్", "గ్రహణ బొగ్గు",
      "అరోరా పచ్చ", "నక్షత్ర పసుపు", "ఖగోళ ఇండిగో", "సూపర్‌నోవా పగడపు"
    ]
  },
  hi: {
    elements: { Fire: 'अग्नि', Earth: 'पृथ्वी', Air: 'वायु', Water: 'जल' },
    planets: { Mars: 'मंगल', Venus: 'शुक्र', Mercury: 'बुध', Moon: 'चन्द्रमा', Sun: 'सूर्य', Pluto: 'यम', Jupiter: 'बृहस्पति', Saturn: 'शनि', Uranus: 'अरुण', Neptune: 'वरुण' },
    signs: { Aries: 'मेष', Taurus: 'वृषभ', Gemini: 'मिथुन', Cancer: 'कर्क', Leo: 'सिंह', Virgo: 'कन्या', Libra: 'तुला', Scorpio: 'वृश्चिक', Sagittarius: 'धनु', Capricorn: 'मकर', Aquarius: 'कुंभ', Pisces: 'मीन' },
    colors: [
      "कास्मिक लैवेंडर", "नेबुला टील", "सौर स्वर्ण", "चंद्र रजत", "एंड्रोमेडा बैंगनी",
      "जेनिथ सियान", "तारकीय एम्बर", "ओरियन क्रिमसन", "आकाशगंगा वायलेट", "ग्रहण चारकोल",
      "अरोड़ा पन्ना", "तारकीय गेरू", "खगोलीय इंडिगो", "सुपरनोवा मूंगा"
    ]
  },
  es: {
    elements: { Fire: 'Fuego', Earth: 'Tierra', Air: 'Aire', Water: 'Agua' },
    planets: { Mars: 'Marte', Venus: 'Venus', Mercury: 'Mercurio', Moon: 'Luna', Sun: 'Sol', Pluto: 'Plutón', Jupiter: 'Júpiter', Saturn: 'Saturno', Uranus: 'Urano', Neptune: 'Neptuno' },
    signs: { Aries: 'Aries', Taurus: 'Tauro', Gemini: 'Géminis', Cancer: 'Cáncer', Leo: 'Leo', Virgo: 'Virgo', Libra: 'Libra', Scorpio: 'Escorpio', Sagittarius: 'Sagitario', Capricorn: 'Capricornio', Aquarius: 'Acuario', Pisces: 'Piscis' },
    colors: [
      "Lavanda Cósmico", "Teal Nebulosa", "Oro Solar", "Plata Lunar", "Púrpura Andrómeda",
      "Cian Cénit", "Ámbar Estelar", "Carmesí Orión", "Violeta Galaxia", "Carbón Eclipse",
      "Esmeralda Aurora", "Ocre Astral", "Índigo Celestial", "Coral Supernova"
    ]
  }
};

const VOCABULARY = {
  en: {
    openings: [
      "With your ruling planet, {planet}, radiating harmonious energies, the stellar landscape is shifting.",
      "As the celestial currents flow, {planet} aligns with distant cosmic beacons to activate your natural path.",
      "A quiet cosmic vibration stirs in the background of your chart, casting a revealing glow on your intentions.",
      "Under the guidance of {planet}, the planetary configuration points toward a period of profound expansion.",
      "The current stellar transit invites you to pause, feel the pull of {planet}, and look beyond immediate horizons.",
      "An energetic bridge forms between your element of {element} and the zenith of your chart today.",
      "Celestial shifts encourage a deeper awareness of the subtle paths unfolding directly in front of you."
    ],
    love: [
      "In relationships, clarity is your highest ally. Expressing your true feelings will dissolve silent barriers.",
      "A spark of connection is highlighted today. Listen deeply to what remains unsaid in conversations.",
      "The stars advise you to cultivate space for gentle listening. Vulnerability is a form of deep strength.",
      "Your emotional intelligence shines. Trust the magnetic pull of your heart to guide connection.",
      "An unexpected moment of understanding brings close bonds into a warmer, clearer light.",
      "Release old expectations. Let the natural rhythm of your connections reveal itself without pressure."
    ],
    career: [
      "Your professional sphere benefits from bold, analytical thinking. A subtle idea holds immense promise.",
      "Collaboration is key. An exchange of perspectives will open up paths that previously seemed blocked.",
      "Focus on refining your current tasks rather than seeking new horizons. Mastery lies in the details.",
      "Your element of {element} calls you to stand grounded. Your perseverance is noticed by the right eyes.",
      "An opportunity for growth presents itself through a challenging puzzle. Dive in with complete curiosity.",
      "Trust your instincts regarding a project direction. The planetary currents support structured creativity."
    ],
    wellness: [
      "Nourish your nervous system. A few moments of quiet reflection will restore your cosmic balance.",
      "Physical movement helps ground your active mind. Connect with the natural elements around you.",
      "Prioritize restorative sleep and hydration. The celestial energies are demanding, so refuel your reservoir.",
      "Mental clarity is achieved through clearing away outer noise. Protect your personal space today.",
      "Listen to the subtle messages your body is sending. A slower, more deliberate pace is highly beneficial.",
      "Realign your energy by engaging in something that brings you pure, uncomplicated joy."
    ],
    luck: [
      "Opportunities are hidden within small coincidences. Keep your eyes open to subtle synchronicities.",
      "A favorable wind blows from your past contacts. Reach out or remain receptive to old connections.",
      "Fortune favors the patient today. Rushing will cloud the clarity that is naturally trying to find you.",
      "Your lucky compass points toward unexpected conversations. Speak your truth freely.",
      "The cosmic field is highly receptive to your intentions. Visualize clearly what you wish to attract.",
      "A small pivot in your routine will invite fresh cosmic currents and positive serendipity."
    ],
    conclusions: [
      "Hold this stellar truth close: your authenticity is your compass in a shifting universe.",
      "The stars outline the path, but your conscious choices write the destination.",
      "Let your actions align with your highest values. The universe responds to deliberate movement.",
      "Observe, learn, and grow. Every interaction today carries a seed of cosmic wisdom.",
      "Trust the timing of your journey. You are exactly where the universe needs you to be.",
      "Step forward with courage. Your internal light is more stable than any passing planetary storm."
    ],
    quotes: [
      "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.",
      "What is bound in the heavens will reflect in the quiet chambers of your heart.",
      "Do not feel lonely, the entire universe is inside you.",
      "The stars are the street lights of eternity, guiding you home to yourself.",
      "In the middle of the cosmic dance, find the still point of your own breathing.",
      "You are not just a drop in the ocean. You are the entire ocean in a single drop.",
      "The celestial spheres sing a silent song that only the soul can hear.",
      "Let your light shine so brightly that the stars pause to admire your glow."
    ]
  },
  te: {
    openings: [
      "మీ పాలక గ్రహం {planet} అనుకూలమైన శక్తులను ప్రసరింపజేయడంతో, ఖగోళ దృశ్యం మారుతోంది.",
      "ఖగోళ ప్రవాహాలు సాగుతుండగా, {planet} మీ సహజ మార్గాన్ని సక్రియం చేయడానికి సుదూర ఖగోళ సంకేతాలతో సమలేఖనం అవుతుంది.",
      "మీ రాశిచక్రంలో ఒక నిశ్శబ్ద ఖగోళ కంపనం కదులుతోంది, ఇది మీ ఉద్దేశాలపై కాంతిని ప్రసరింపజేస్తుంది.",
      "మీ గ్రహం {planet} మార్గదర్శకత్వంలో, గ్రహాల అమరిక మీ జీవితంలో లోతైన విస్తరణ కాలం వైపు చూపుతుంది.",
      "ప్రస్తుత నక్షత్ర సంచారం మిమ్మల్ని కాసేపు ఆగి, {planet} ఆకర్షణను అనుభూతి చెందాలని మరియు తదుపరి అవకాశాలను చూడమని ఆహ्वానిస్తోంది.",
      "మీ మూలకమైన {element} మరియు మీ చార్ట్ యొక్క శిఖరం మధ్య ఈ రోజు ఒక शक्तिవంతమైన వంతెన ఏర్పడుతుంది.",
      "ఖగోళ మార్పులు మీ ముందు విప్పుతున్న సూక్ష్మ మార్గాలపై లోతైన అవగాహనను పెంచుకోవడానికి మిమ్మల్ని ప్రోత్సహిస్తాయి."
    ],
    love: [
      "సంబంధాలలో స్పష్టత మీ అతిపెద్ద మిత్రుడు. మీ నిజమైన భావాలను వ్యక్తపరచడం నిశ్శబ్ద అడ్డంకులను తొలగిస్తుంది.",
      "ఈ రోజు పరస్పర బంధాలలో ఒక మెరుపు హైలైట్ చేయబడింది. సంభాషణలలో వ్యక్తపరచని విషయాలను కూడా లోతుగా వినండి.",
      "నక్షత్రాలు వినడానికి సమయం కేటాయించమని సలహా ఇస్తున్నాయి. సున్నితత్వమే మీ గొప్ప బలం.",
      "మీ భావోద్వేగ మేధస్సు ప్రకాశిస్తుంది. సంబంధాలను నడిపించడానికి మీ హృదయం యొక్క అయస్కాంత ఆకర్షణను నమ్మండి.",
      "ఊహించని అవగాహన మీ బంధాలను మరింత వెచ్చని మరియు స్పష్టమైన కాంతిలోకి తీసుకువస్తుంది.",
      "పాత అంచనాలను వదిలేయండి. మీ బంధాల సహజ లయ ఎటువంటి ఒత్తిడి లేకుండా సాగనివ్వండి."
    ],
    career: [
      "మీ వృత్తిపరమైన రంగం ధైర్యమైన, విశ్లేషణాత్మక ఆలోచనల నుండి ప్రయోజనం పొందుతుంది. ఒక చిన్న ఆలోచన గొప్ప వాగ్దానాన్ని కలిగి ఉంటుంది.",
      "సహకారం ముఖ్యం. విభిన్న దృక్పథాల మార్పిడి గతంలో మూసుకుపోయినట్లు అనిపించిన మార్గాలను తెరుస్తుంది.",
      "కొత్త వాటిని వెతకడం కంటే మీ ప్రస్తుత పనులను మెరుగుపరచడంపై దృష్టి పెట్టండి. నైపుణ్యం సూక్ష్మ విషయాలలోనే ఉంటుంది.",
      "మీ మూలకమైన {element} మిమ్మల్ని స్థిరంగా ఉండమని పిలుస్తోంది. మీ పట్టుదల సరైన వ్యక్తుల దృష్టిని ఆకర్షిస్తుంది.",
      "సవాలుతో కూడిన పని ద్వారా వృద్ధికి అవకాశం లభిస్తుంది. పూర్తి ఉత్సుకతతో ముందుకు సాగండి.",
      "ప్రాజెక్ట్ దిశకు సంబంధించి మీ అంతర్ దృష్టిని నమ్మండి. గ్రహాల ప్రవాహం సృజనాత్మకతకు మద్దతు ఇస్తుంది."
    ],
    wellness: [
      "మీ నాడీ వ్యవస్థను బలోపేతం చేసుకోండి. కొన్ని నిమిషాల నిశ్శబ్ద ప్రతిబింబం మీ ఖగోళ సమతుల్యతను పునరుద్ధరిస్తుంది.",
      "శారీరక శ్రమ మీ చురుకైన మనస్సును స్థిరపరచడంలో సహాయపడుతుంది. మీ చుట్టూ ఉన్న ప్రకృతి మూలకాలతో కనెక్ట్ అవ్వండి.",
      "నిద్ర మరియు తగినంత నీరు త్రాగడానికి ప్రాధాన్యత ఇవ్వండి. ఖగోళ శక్తులు మీ శక్తిని కోరుతున్నాయి, కాబట్టి రీఛార్జ్ చేసుకోండి.",
      "బాహ్య శబ్దాలను దూరం చేయడం ద్వారా మానసిక స్పష్టత లభిస్తుంది. ఈ రోజు మీ వ్యక్తిగत ప్రశాంతతను కాపాడుకోండి.",
      "మీ శరీరం పంపుతున్న సూక్ష్మ సంకేతాలను వినండి. నెమ్మదిగా, ఆలోచనాత్మకమైన వేగం మీకు ఎంతో మేలు చేస్తుంది.",
      "మీకు స్వచ్ఛమైన, సాధారణ ఆనందాన్ని ఇచ్చే పనిలో పాల్గొనడం ద్వారా మీ శక్తిని తిరిగి పొందండి."
    ],
    luck: [
      "చిన్న యాదృచ్ఛికాల వెనుక అవకాశాలు దాగి ఉన్నాయి. సూక్ష్మమైన సమకాలీకరణలపై మీ కన్ను ఉంచండి.",
      "మీ పాత పరిచయాల నుండి సానుకూల పవనాలు వీస్తున్నాయి. పాత స్నేహితులను సంప్రదించండి.",
      "ఈ రోజు అదృష్టం సహనశీలులను వరిస్తుంది. తొందరపాటు మీ ముందు ఉన్న స్పష్టతను పాడు చేస్తుంది.",
      "మీ అదృష్ట దిక్సూచి ఊహించని సంభాషణల వైపు చూపుతోంది. మీ సత్యాన్ని స్వేచ్ఛగా మాట్లాడండి.",
      "మీ ఉద్దేశాలను స్వీకరించడానికి విశ్వం సిద్ధంగా ఉంది. మీరు దేనిని ఆకర్షించాలనుకుంటున్నారో స్పష్టంగా ఊహించుకోండి.",
      "మీ దినచర్యలో చిన్న మార్పు తాజా ఖగోళ ప్రవాహాలను మరియు అనుకూలమైన అదృష్టాన్ని ఆహ్వానిస్తుంది."
    ],
    conclusions: [
      "ఈ ఖగోళ సత్యాన్ని గుర్తుంచుకోండి: మారుతున్న విశ్వంలో మీ యదార్థతే మీ దిక్సూచి.",
      "నక్షత్రాలు మార్గాన్ని నిర్దేశిస్తాయి, కానీ మీ స్పృహతో కూడిన నిర్ణయాలే గమ్యాన్ని రాస్తాయి.",
      "మీ పనులను మీ అత్యున్నత విలువలతో సమలేఖనం చేయండి. విశ్వం ఆలోచనాత్మక కదలికలకు ప్రతిస్పందిస్తుంది.",
      "గమనించండి, నేర్చుకోండి మరియు ఎదగండి. ఈ రోజు ప్రతి పరస్పర చర్య ఖగోళ జ్ఞానపు విత్తనాన్ని కలిగి ఉంటుంది.",
      "మీ ప్రయాణ సమయాన్ని నమ్మండి. విశ్వానికి మీరు ఎక్కడ ఉండాలో సరిగ్గా అక్కడే ఉన్నారు.",
      "ధైర్యంతో ముందుకు సాగండి. మీ అంతర్గత కాంతి ఏ తాత్కాలిక గ్రహాల తుఫాను కంటే స్థిరంగా ఉంటుంది."
    ],
    quotes: [
      "విశ్వం మనలోనే ఉంది. మనమంతా నక్షత్ర ధూళి ద్వారా తయారయ్యాము.",
      "ఆకాశంలో ముడిపడి ఉన్నవి మీ హృదయ నిశ్శబ్ద గదులలో ప్రతిబింబిస్తాయి.",
      "ఒంటరిగా భావించకండి, విశ్వం మొత్తం మీలోనే ఉంది.",
      "నక్షత్రాలు శాశ్వతత్వపు వీధి దీపాలు, అవి మిమ్మల్ని మీ వద్దకు నడిపిస్తాయి.",
      "ఖగోళ నృత్యం మధ్యలో, మీ స్వంత శ్వాస యొక్క నిశ్శబ్ద బిందువును కనుగొనండి.",
      "మీరు సముద్రంలో కేవలం ఒక చుక్క కాదు. మీరు ఒకే చుక్కలో ఉన్న మొత్తం సముద్రం.",
      "ఖగోళ గోళాలు ఆత్మ మాత్రమే వినగలిగే నిశ్శబ్ద గీతాన్ని ఆలపిస్తాయి.",
      "మీ కాంతిని ఎంత ప్రకాశవంతంగా వెలిగించాలంటే, నక్షత్రాలు కూడా మీ కాంతిని చూసి ఆగిపోయేలా ఉండాలి."
    ]
  },
  hi: {
    openings: [
      "आपके स्वामी ग्रह {planet} के अनुकूल ऊर्जा विकीर्ण करने के साथ, ब्रह्मांडीय परिदृश्य बदल रहा है।",
      "जैसे-जैसे खगोलीय धाराएं बहती हैं, {planet} आपके प्राकृतिक मार्ग को सक्रिय करने के लिए संरेखित होता है।",
      "एक शांत ब्रह्मांडीय कंपन आपकी कुंडली के बैकग्राउंड में चल रहा है, जो आपके इरादों पर प्रकाश डालता है।",
      "{planet} के मार्गदर्शन में, वर्तमान ग्रहों की स्थिति आपके जीवन में एक महत्वपूर्ण विकास की ओर इशारा करती है।",
      "वर्तमान गोचर आपको रुकने, {planet} के खिंचाव को महसूस करने और तात्कालिक सीमाओं से परे देखने के लिए आमंत्रित करता है।",
      "आज आपके तत्व {element} और आपके चार्ट के शिखर के बीच एक ऊर्जावान सेतु बन रहा है।",
      "खगोलीय परिवर्तन आपके सामने आने वाले सूक्ष्म मार्गों के प्रति गहरी जागरूकता को प्रोत्साहित करते हैं।"
    ],
    love: [
      "रिश्तों में स्पष्टता आपका सबसे बड़ा सहयोगी है। अपनी सच्ची भावनाओं को व्यक्त करने से मौन बाधाएं दूर होंगी।",
      "आज आपसी संबंधों में एक चमक दिखाई दे रही है। बातचीत में अनकही बातों को भी गहराई से सुनें।",
      "सितारे सलाह देते हैं कि सुनने के लिए समय निकालें। संवेदनशीलता ही आपकी सबसे बड़ी ताकत है।",
      "आपका भावनात्मक कौशल चमक रहा है। संबंधों को दिशा देने के लिए अपने दिल के आकर्षण पर भरोसा करें।",
      "अचानक होने वाली समझ आपके रिश्तों को अधिक मधुर और स्पष्ट रूप दे सकती है।",
      "पुरानी उम्मीदों को छोड़ दें। अपने रिश्तों की स्वाभाविक लय को बिना किसी दबाव के चलने दें।"
    ],
    career: [
      "आपका पेशेवर क्षेत्र साहसिक, विश्लेषणात्मक सोच से लाभान्वित होगा। एक छोटा विचार बहुत संभावनाएं रखता है।",
      "सहयोग महत्वपूर्ण है। विभिन्न विचारों का आदान-प्रदान उन रास्तों को खोलेगा जो पहले बंद लग रहे थे।",
      "नए रास्तों की तलाश करने के बजाय अपने वर्तमान कार्यों को बेहतर बनाने पर ध्यान दें। निपुणता सूक्ष्म विवरणों में है।",
      "आपका तत्व {element} आपको जमीन से जुड़े रहने के लिए कह रहा है। आपका धैर्य सही लोगों का ध्यान खींचेगा।",
      "एक चुनौतीपूर्ण कार्य के माध्यम से विकास का अवसर मिलेगा। पूरी जिज्ञासा के साथ आगे बढ़ें।",
      "परियोजना की दिशा के बारे में अपने अंतर्ज्ञान पर भरोसा करें। ग्रहों का प्रवाह रचनात्मकता का समर्थन करता है।"
    ],
    wellness: [
      "अपने तंत्रिका तंत्र को पोषण दें। कुछ क्षणों का शांत चिंतन आपके ब्रह्मांडीय संतुलन को बहाल करेगा।",
      "शारीरिक गतिविधि आपके सक्रिय दिमाग को शांत करने में मदद करेगी। प्रकृति के तत्वों से जुड़ें।",
      "नींद और पर्याप्त पानी पीने को प्राथमिकता दें। ब्रह्मांडीय ऊर्जाएं आपकी सक्रियता की मांग कर रही हैं, इसलिए खुद को तरोताजा करें।",
      "बाहरी शोर को दूर करके मानसिक स्पष्टता प्राप्त की जा सकती है। आज अपनी व्यक्तिगत शांति बनाए रखें।",
      "आपका शरीर जो सूक्ष्म संकेत भेज रहा है, उन्हें सुनें। धीमी, विचारशील गति आपके लिए बहुत फायदेमंद होगी।",
      "अपने आप को एक ऐसी गतिविधि में व्यस्त करें जो आपको सरल और वास्तविक खुशी देती है।"
    ],
    luck: [
      "अवसर छोटी-छोटी घटनाओं में छिपे होते हैं। सूक्ष्म बदलावों पर नज़र रखें।",
      "आपके पुराने संपर्कों से अनुकूल हवाएं चल रही हैं। पुराने मित्रों से संपर्क करें।",
      "आज भाग्य धैर्य रखने वालों का साथ देगा। जल्दबाजी आपकी स्पष्टता को खराब कर सकती है।",
      "आपका भाग्य सूचक अप्रत्याशित बातचीत की ओर इशारा कर रहा है। अपनी बात खुलकर कहें।",
      "ब्रह्मांड आपके इरादों को स्वीकार करने के लिए तैयार है। आप जो आकर्षित करना चाहते हैं उसकी स्पष्ट कल्पना करें।",
      "आकी दिनचर्या में एक छोटा सा बदलाव नई ऊर्जा और अनुकूल भाग्य लेकर आएगा।"
    ],
    conclusions: [
      "इस ब्रह्मांडीय सत्य को याद रखें: बदलती दुनिया में आपकी वास्तविकता ही आपका मार्गदर्शक है।",
      "सितारे रास्ता दिखाते हैं, लेकिन आपके जागरूक निर्णय ही गंतव्य लिखते हैं।",
      "अपने कार्यों को अपने उच्चतम मूल्यों के साथ संरेखित करें। ब्रह्मांड सोच-समझकर किए गए निर्णयों पर प्रतिक्रिया करता है।",
      "ध्यान दें, सीखें और आगे बढ़ें। आज हर बातचीत खगोलीय ज्ञान का एक बीज लेकर आती है।",
      "अपनी यात्रा के समय पर भरोसा रखें। ब्रह्मांड के अनुसार आप बिल्कुल सही जगह पर हैं।",
      "धैर्य और साहस के साथ आगे बढ़ें। आपका आंतरिक प्रकाश किसी भी अस्थायी अशांति से अधिक स्थिर है।"
    ],
    quotes: [
      "ब्रह्मांड हमारे भीतर है। हम सितारों के तत्वों से बने हैं।",
      "जो आकाश में बंधा है, वह आपके हृदय के शांत कमरों में प्रतिबिंबित होगा।",
      "अकेलापन महसूस न करें, पूरा ब्रह्मांड आपके भीतर है।",
      "तारे अनंत काल की स्ट्रीट लाइटें हैं, जो आपको अपने घर तक ले जाती हैं।",
      "ब्रह्मांडीय नृत्य के बीच, अपनी सांसों के शांत बिंदु को खोजें।",
      "आप सागर में सिर्फ एक बूंद नहीं हैं। आप एक बूंद में समाया हुआ पूरा महासागर हैं।",
      "खगोलीय पिंड एक ऐसा मूक संगीत बजाते हैं जिसे केवल आत्मा ही सुन सकती है।",
      "अपने प्रकाश को इतना चमकाएं कि तारे भी आपके प्रकाश को देखने के लिए रुक जाएं।"
    ]
  },
  es: {
    openings: [
      "Con tu planeta regente, {planet}, irradiando energías armoniosas, el paisaje estelar está cambiando.",
      "A medida que fluyen las corrientes celestes, {planet} se alinea con faros cósmicos distantes para activar tu camino natural.",
      "Una sutil vibración cósmica se agita en el fondo de tu carta natal, arrojando luz sobre tus intenciones.",
      "Bajo la guía de {planet}, la configuración planetaria apunta hacia un período de profunda expansión personal.",
      "El tránsito estelar actual te invita a hacer una pausa, sentir la atracción de {planet} y mirar más allá.",
      "Un puente de energía se forma hoy entre tu elemento de {element} y el cenit de tu carta.",
      "Los cambios celestiales fomentan una mayor conciencia de los sutiles caminos que se abren ante ti."
    ],
    love: [
      "En las relaciones, la claridad es tu mayor aliada. Expresar tus verdaderos sentimientos disolverá las barreras silenciosas.",
      "Una chispa de conexión se destaca hoy. Escucha profundamente lo que no se dice en las conversaciones.",
      "Los astros te aconsejan cultivar un espacio para la escucha atenta. La vulnerabilidad es una forma de fuerza interna.",
      "Tu inteligencia emocional brilla. Confía en la atracción magnética de tu corazón para guiar la conexión.",
      "Un momento inesperado de comprensión mutua aporta una luz más cálida y clara a tus lazos afectivos.",
      "Libérate de viejas expectativas. Deja que el ritmo natural de tus relaciones se revele sin presiones."
    ],
    career: [
      "Tu ámbito profesional se beneficia de un pensamiento audaz y analítico. Una sutil idea tiene una gran promesa.",
      "La colaboración es la clave. Un intercambio de perspectivas abrirá caminos que antes parecían bloqueados.",
      "Concéntrate en perfeccionar tus tareas actuales en lugar de buscar nuevos horizontes. La maestría está en el detalle.",
      "Tu elemento de {element} te llama a mantenerte firme. Tu perseverancia es notada por las personas adecuadas.",
      "Una oportunidad de crecimiento se presenta a través de un desafío. Sumérgete con total curiosidad.",
      "Confía en tus instintos sobre la dirección del proyecto. Las corrientes apoyan la creatividad estructurada."
    ],
    wellness: [
      "Nutre tu sistema nervioso. Unos momentos de reflexión tranquila restaurarán tu equilibrio cósmico.",
      "La actividad física ayuda a calmar tu mente activa. Conéctate con los elementos de la naturaleza.",
      "Prioriza el sueño reparador y la hidratación. Las energías celestiales demandan un reabastecimiento.",
      "La claridad mental se logra eliminando el ruido externo. Protege tu paz personal hoy mismo.",
      "Escucha los sutiles mensajes que te envía tu cuerpo. Un ritmo más pausado será de gran beneficio.",
      "Reorienta tu energía participando en algo que te brinde una alegría simple y pura."
    ],
    luck: [
      "Las oportunidades se esconde dentro de pequeñas coincidencias. Mantén los ojos abiertos a las sutiles sincronías.",
      "Un viento favorable sopla de tus contactos pasados. Reestablece el contacto o mantente receptivo.",
      "La fortuna favorece hoy a los pacientes. Apresurarse nublará la claridad que intenta encontrarte.",
      "Tu brújula de la suerte apunta hacia conversaciones inesperadas. Di tu verdad con libertad.",
      "El campo cósmico es altamente receptivo a tus intenciones. Visualiza claramente lo que deseas atraer.",
      "Un pequeño giro en tu rutina diaria invitará a nuevas corrientes cósmicas y serendipias positivas."
    ],
    conclusions: [
      "Guarda esta verdad estelar: tu autenticidad es tu brújula en un universo cambiante.",
      "Las estrellas trazan el camino, pero tus decisiones conscientes escriben el destino.",
      "Alinea tus acciones con tus valores más altos. El universo responde al movimiento deliberado.",
      "Observa, aprende y crece. Cada interacción de hoy lleva consigo una semilla de sabiduría celestial.",
      "Confía en los tiempos de tu viaje. Estás exactamente donde el universo necesita que estés.",
      "Da un paso adelante con valentía. Tu luz interna es más estable que cualquier tormenta planetaria pasajera."
    ],
    quotes: [
      "El cosmos está en nosotros. Estamos hechos de materia estelar. Somos el medio para que el cosmos se conozca a sí mismo.",
      "Lo que está ligado en los cielos se reflejará en las silenciosas cámaras de tu corazón.",
      "No te sientas solo, el universo entero está dentro de ti.",
      "Las estrellas son los faroles de la eternidad, guiándote de vuelta a ti mismo.",
      "En medio de la danza cósmica, encuentra el punto inmóvil de tu propia respiración.",
      "No eres solo una gota en el océano. Eres el océano entero en una sola gota.",
      "Las esferas celestiales cantan una canción silenciosa que solo el alma puede escuchar.",
      "Deja que tu luz brille con tanta fuerza que las estrellas se detengan a admirar tu resplandor."
    ]
  }
};

// Main Horoscope Generation Function
export function generateHoroscope(signKey, type = 'daily', date = new Date(), lang = 'en') {
  const sign = ZODIAC_SIGNS[signKey.toLowerCase()];
  if (!sign) return null;

  // Safe fallback for unsupported language keys
  const l = (VOCABULARY[lang]) ? lang : 'en';

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
  const rawOpening = prng.pick(VOCABULARY[l].openings);
  const rawLove = prng.pick(VOCABULARY[l].love);
  const rawCareer = prng.pick(VOCABULARY[l].career);
  const rawWellness = prng.pick(VOCABULARY[l].wellness);
  const rawLuck = prng.pick(VOCABULARY[l].luck);
  const rawConclusion = prng.pick(VOCABULARY[l].conclusions);

  // Fetch translated sign, planet, and element names
  const transSign = TRANSLATIONS[l].signs[sign.name] || sign.name;
  const transPlanet = TRANSLATIONS[l].planets[sign.planet] || sign.planet;
  const transElement = TRANSLATIONS[l].elements[sign.element] || sign.element;

  // Replace placeholders helper
  const formatText = (text) => {
    return text
      .replace(/{planet}/g, transPlanet)
      .replace(/{element}/g, transElement)
      .replace(/{sign}/g, transSign);
  };

  // Compile reading paragraphs
  const reading = {
    overview: formatText(`${rawOpening} ${rawConclusion}`),
    love: formatText(rawLove),
    career: formatText(rawCareer),
    wellness: formatText(rawWellness),
    luck: formatText(rawLuck)
  };

  // Generate mood meters (45 to 100)
  const moods = {
    love: prng.nextInt(45, 100),
    career: prng.nextInt(45, 100),
    wellness: prng.nextInt(45, 100),
    luck: prng.nextInt(45, 100)
  };

  // Generate lucky numbers and colors
  const luckyNumber = prng.nextInt(1, 99);
  const luckyColor = prng.pick(TRANSLATIONS[l].colors || TRANSLATIONS['en'].colors);
  
  // Power Hour
  const powerHourHour = prng.nextInt(1, 12);
  const powerHourMin = prng.pick(["00", "15", "30", "45"]);
  const powerHourAmpm = prng.pick(["AM", "PM"]);
  const powerHour = `${powerHourHour}:${powerHourMin} ${powerHourAmpm}`;

  // Constellation Quote
  const quote = prng.pick(VOCABULARY[l].quotes);

  return {
    sign: transSign,
    element: transElement,
    planet: transPlanet,
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
