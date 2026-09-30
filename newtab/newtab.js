// StellarTab — New Tab Dashboard Controller
import { ZODIAC_SIGNS, generateHoroscope, TRANSLATIONS } from './horoscope-engine.js';

// Storage polyfill for offline browser testing outside of Chrome Extension context
const storage = (window.chrome && chrome.storage && chrome.storage.local) ? chrome.storage.local : {
  get: async (keys) => {
    const res = {};
    const arrayKeys = Array.isArray(keys) ? keys : [keys];
    arrayKeys.forEach(k => {
      const val = localStorage.getItem(k);
      try {
        res[k] = val ? JSON.parse(val) : undefined;
      } catch {
        res[k] = val;
      }
    });
    return res;
  },
  set: async (obj) => {
    Object.entries(obj).forEach(([k, v]) => {
      localStorage.setItem(k, typeof v === 'object' ? JSON.stringify(v) : v);
    });
  },
  clear: async () => {
    localStorage.clear();
  }
};

// Application State
let state = {
  userName: '',
  zodiacSign: '',
  theme: 'nebula',
  language: 'en',
  showVedic: true,
  activeTab: 'daily',
  currentRotation: 0,
  wheelDragging: false,
  wheelStartAngle: 0,
  wheelBaseRotation: 0,
  gameConstellation: null,
  gameCompleted: false,
  gameConnectedStars: []
};

// Zodiac Sign Keys ordered in counter-clockwise wheel direction (30 deg intervals)
const SIGN_KEYS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

// DOM Elements
const onboardingScreen = document.getElementById('onboarding-screen');
const onboardingForm = document.getElementById('onboarding-form');
const onboardingNameInput = document.getElementById('user-name-input');
const onboardingSignBtns = document.querySelectorAll('.sign-btn');

const dashboardScreen = document.getElementById('dashboard-screen');
const userDisplayName = document.getElementById('user-display-name');
const clockEl = document.getElementById('astral-clock');
const dateEl = document.getElementById('astral-date');


const zodiacSvgWheel = document.getElementById('zodiac-svg-wheel');
const wheelSpinGroup = document.getElementById('wheel-spin-group');
const activeWheelGlyph = document.getElementById('active-wheel-glyph');
const indicatorGlyph = document.getElementById('indicator-glyph');
const indicatorName = document.getElementById('indicator-name');
const indicatorDates = document.getElementById('indicator-dates');

const horoscopeCard = document.getElementById('horoscope-detail-panel');
const currentGlyph = document.getElementById('current-glyph');
const currentSignName = document.getElementById('current-sign-name');
const currentElement = document.getElementById('current-element');
const currentPlanet = document.getElementById('current-planet');

const tabBtns = document.querySelectorAll('.tab-btn');
const tabSliderPill = document.getElementById('tab-slider-pill');

const overviewEl = document.getElementById('horoscope-overview');
const loveEl = document.getElementById('horoscope-love');
const careerEl = document.getElementById('horoscope-career');
const wellnessEl = document.getElementById('horoscope-wellness');
const luckEl = document.getElementById('horoscope-luck');

const loveRing = document.getElementById('love-ring');
const careerRing = document.getElementById('career-ring');
const wellnessRing = document.getElementById('wellness-ring');
const luckRing = document.getElementById('luck-ring');

const loveValue = document.getElementById('love-value');
const careerValue = document.getElementById('career-value');
const wellnessValue = document.getElementById('wellness-value');
const luckValue = document.getElementById('luck-value');

const luckyNumberEl = document.getElementById('lucky-number');
const luckyColorEl = document.getElementById('lucky-color');
const powerHourEl = document.getElementById('power-hour');

// Dialog overlays
const gameModal = document.getElementById('game-modal');
const triggerGameBtn = document.getElementById('trigger-game-btn');
const closeGameBtn = document.getElementById('close-game-btn');
const constellationCanvas = document.getElementById('constellation-canvas');
const gameSuccessMsg = document.getElementById('game-success-message');
const stellarQuoteEl = document.getElementById('stellar-quote');

const settingsModal = document.getElementById('settings-modal');
const triggerSettingsBtn = document.getElementById('trigger-settings-btn');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const settingsForm = document.getElementById('settings-form');
const settingsUsername = document.getElementById('settings-username');
const settingsZodiac = document.getElementById('settings-zodiac');
const settingsTheme = document.getElementById('settings-theme');
const resetAppBtn = document.getElementById('reset-app-btn');
const onboardingLanguageSelect = document.getElementById('onboarding-language-select');
const settingsLanguage = document.getElementById('settings-language');
const settingsShowVedic = document.getElementById('settings-show-vedic');
const vedicTimesCard = document.getElementById('vedic-times-card');
const rahuKalamVal = document.getElementById('rahu-kalam-val');
const yamagandamVal = document.getElementById('yamagandam-val');

// UI Translation Dictionary for dynamic localization
const UI_TRANSLATIONS = {
  en: {
    onboardingSubtitle: "Connect with the cosmic rhythms of your life",
    onboardingNameLbl: "What shall the cosmos call you?",
    onboardingNamePlaceholder: "Enter your name...",
    onboardingLangLbl: "Preferred Language",
    onboardingSignLbl: "Select your celestial birth sign",
    onboardingSubmitBtn: "Step into the Cosmos",
    wheelTitle: "Celestial Zodiac Wheel",
    wheelInstruction: "Drag or click to spin & explore other signs",
    tabDaily: "Today",
    tabWeekly: "This Week",
    tabMonthly: "This Month",
    catLove: "❤️ Love & Relationship",
    catCareer: "💼 Career & Focus",
    catWellness: "🌱 Wellness & Energy",
    catLuck: "✨ Celestial Luck",
    moodTitle: "Cosmic Alignment Indices",
    moodLove: "Love",
    moodCareer: "Career",
    moodWellness: "Wellness",
    moodLuck: "Luck",
    luckyNumber: "Lucky Number",
    luckyColor: "Lucky Color",
    powerHour: "Power Hour",
    btnConstellation: "Constellation",
    gameTitle: "Star Alignment",
    gameInstruction: "Connect the glowing stars in sequence to reveal your daily insight.",
    gameSuccessTitle: "✨ Constellation Connected ✨",
    settingsTitle: "Celestial Options",
    settingsNameLbl: "Stargazer Name",
    settingsZodiacLbl: "Zodiac Sign",
    settingsThemeLbl: "Dashboard Theme",
    settingsLangLbl: "Language",
    settingsShowVedicLbl: "Enable Vedic Muhurthas (Admin)",
    settingsSaveBtn: "Save Changes",
    settingsResetBtn: "Reset Profile",
    vedicTitle: "Vedic Muhurthas",
    rahuKalamLbl: "Rahu Kalam",
    yamagandamLbl: "Yamagandam",
    activeNow: "Active Now",
    welcomeBack: "Welcome back, {name}",
    elementLbl: "Element: {val} | Ruling Planet: {planet}",
    alertSign: "Please select your zodiac star sign.",
    resetConfirm: "Are you sure you want to reset your cosmic profile?"
  },
  te: {
    onboardingSubtitle: "మీ జీవితంలోని ఖగోళ లయలతో అనుసంధానించబడండి",
    onboardingNameLbl: "విశ్వం మిమ్మల్ని ఏమని పిలవాలి?",
    onboardingNamePlaceholder: "మీ పేరును నమోదు చేయండి...",
    onboardingLangLbl: "ప్రాధాన్య భాష",
    onboardingSignLbl: "మీ ఖగోళ జన్మ రాశిని ఎంచుకోండి",
    onboardingSubmitBtn: "విశ్వంలోకి అడుగు పెట్టండి",
    wheelTitle: "ఖగోళ రాశిచక్ర చక్రం",
    wheelInstruction: "ఇతర రాశులను అన్వేషించడానికి తిప్పండి లేదా క్లిక్ చేయండి",
    tabDaily: "ఈ రోజు",
    tabWeekly: "ఈ వారం",
    tabMonthly: "ఈ నెల",
    catLove: "❤️ ప్రేమ & బంధాలు",
    catCareer: "💼 వృత్తి & దృష్టి",
    catWellness: "🌱 ఆరోగ్యం & శక్తి",
    catLuck: "✨ ఖగోళ అదృష్టం",
    moodTitle: "ఖగోళ సమలేఖన సూచికలు",
    moodLove: "ప్రేమ",
    moodCareer: "వృత్తి",
    moodWellness: "ఆరోగ్యం",
    moodLuck: "అదృష్టం",
    luckyNumber: "అదృష్ట సంఖ్య",
    luckyColor: "అదృష్ట రంగు",
    powerHour: "శక్తి గంట",
    btnConstellation: "నక్షత్రరాశి",
    gameTitle: "నక్షత్రాల సమలేఖనం",
    gameInstruction: "మీ దినసరి అంతర్దృష్టిని తెలుసుకోవడానికి మెరుస్తున్న నక్షత్రాలను క్రమంలో కలపండి.",
    gameSuccessTitle: "✨ నక్షత్రరాశి అనుసంధానించబడింది ✨",
    settingsTitle: "ఖగోళ ఎంపికలు",
    settingsNameLbl: "నక్షత్ర వీక్షకుడి పేరు",
    settingsZodiacLbl: "రాశి చక్రం",
    settingsThemeLbl: "డాష్‌బోర్డ్ థీమ్",
    settingsLangLbl: "భాష",
    settingsShowVedicLbl: "వేద ముహూర్తాలను ప్రారంభించండి (అడ్మిన్)",
    settingsSaveBtn: "మార్పులను సేవ్ చేయి",
    settingsResetBtn: "ప్రొఫైల్ రీసెట్ చేయి",
    vedicTitle: "వేద ముహూర్తాలు",
    rahuKalamLbl: "రాహు కాలం",
    yamagandamLbl: "యమగండం",
    activeNow: "ప్రస్తుతం యాక్టివ్",
    welcomeBack: "తిరిగి స్వాగతం, {name}",
    elementLbl: "మూలకం: {val} | పాలక గ్రహం: {planet}",
    alertSign: "దయచేసి మీ రాశిచక్రాన్ని ఎంచుకోండి.",
    resetConfirm: "మీరు ఖచ్చితంగా మీ ప్రొఫైల్‌ను రీసెట్ చేయాలనుకుంటున్నారా?"
  },
  hi: {
    onboardingSubtitle: "अपने जीवन के ब्रह्मांडीय चक्रों से जुड़ें",
    onboardingNameLbl: "ब्रह्मांड आपको किस नाम से पुकारे?",
    onboardingNamePlaceholder: "अपना नाम दर्ज करें...",
    onboardingLangLbl: "पसंदीदा भाषा",
    onboardingSignLbl: "अपनी खगोलीय जन्म राशि चुनें",
    onboardingSubmitBtn: "ब्रह्मांड में कदम रखें",
    wheelTitle: "खगोलीय राशि चक्र",
    wheelInstruction: "घुमाने और अन्य राशियों का पता लगाने के लिए खींचें या क्लिक करें",
    tabDaily: "आज",
    tabWeekly: "इस सप्ताह",
    tabMonthly: "इस महीने",
    catLove: "❤️ प्रेम और संबंध",
    catCareer: "💼 करियर और फोकस",
    catWellness: "🌱 स्वास्थ्य और ऊर्जा",
    catLuck: "✨ खगोलीय भाग्य",
    moodTitle: "ब्रह्मांडीय संरेखण सूचकांक",
    moodLove: "प्रेम",
    moodCareer: "करियर",
    moodWellness: "स्वास्थ्य",
    moodLuck: "भाग्य",
    luckyNumber: "भाग्यशाली अंक",
    luckyColor: "भाग्यशाली रंग",
    powerHour: "पावर ऑवर",
    btnConstellation: "नक्षत्र समूह",
    gameTitle: "तारा संरेखण",
    gameInstruction: "अपने दैनिक ज्ञान को उजागर करने के लिए चमकते तारों को क्रम में जोड़ें।",
    gameSuccessTitle: "✨ नक्षत्र संरेखित हुआ ✨",
    settingsTitle: "खगोलीय विकल्प",
    settingsNameLbl: "तारादर्शक का नाम",
    settingsZodiacLbl: "राशि चक्र",
    settingsThemeLbl: "डैशबोर्ड थीम",
    settingsLangLbl: "भाषा",
    settingsShowVedicLbl: "वैदिक मुहूर्त सक्षम करें (एडमिन)",
    settingsSaveBtn: "परिवर्तन सहेजें",
    settingsResetBtn: "प्रोफ़ाइल रीसेट करें",
    vedicTitle: "वैदिक मुहूर्त",
    rahuKalamLbl: "राहू काल",
    yamagandamLbl: "यमगंडम",
    activeNow: "अभी सक्रिय",
    welcomeBack: "वापसी पर स्वागत है, {name}",
    elementLbl: "तत्व: {val} | स्वामी ग्रह: {planet}",
    alertSign: "कृपया अपनी जन्म राशि चुनें।",
    resetConfirm: "क्या आप वाकई अपना प्रोफ़ाइल रीसेट करना चाहते हैं?"
  },
  es: {
    onboardingSubtitle: "Conéctate con los ritmos cósmicos de tu vida",
    onboardingNameLbl: "¿Cómo te llamará el cosmos?",
    onboardingNamePlaceholder: "Escribe tu nombre...",
    onboardingLangLbl: "Idioma Preferido",
    onboardingSignLbl: "Selecciona tu signo zodiacal celestial",
    onboardingSubmitBtn: "Paso al Cosmos",
    wheelTitle: "Rueda del Zodíaco Celestial",
    wheelInstruction: "Arrastra o haz clic para girar y explorar otros signos",
    tabDaily: "Hoy",
    tabWeekly: "Esta Semana",
    tabMonthly: "Este Mes",
    catLove: "❤️ Amor y Relaciones",
    catCareer: "💼 Carrera y Enfoque",
    catWellness: "🌱 Bienestar y Energía",
    catLuck: "✨ Suerte Celestial",
    moodTitle: "Índices de Alineación Cósmica",
    moodLove: "Amor",
    moodCareer: "Carrera",
    moodWellness: "Bienestar",
    moodLuck: "Suerte",
    luckyNumber: "Número de la Suerte",
    luckyColor: "Color de la Suerte",
    powerHour: "Hora de Poder",
    btnConstellation: "Constelación",
    gameTitle: "Alineación de Estrellas",
    gameInstruction: "Conecta las estrellas brillantes en secuencia para revelar tu intuición diaria.",
    gameSuccessTitle: "✨ Constelación Conectada ✨",
    settingsTitle: "Opciones Celestiales",
    settingsNameLbl: "Nombre de Observador",
    settingsZodiacLbl: "Signo del Zodíaco",
    settingsThemeLbl: "Tema del Panel",
    settingsLangLbl: "Idioma",
    settingsShowVedicLbl: "Habilitar Vedic Muhurthas (Admin)",
    settingsSaveBtn: "Guardar Cambios",
    settingsResetBtn: "Reiniciar Perfil",
    vedicTitle: "Vedic Muhurthas",
    rahuKalamLbl: "Rahu Kalam",
    yamagandamLbl: "Yamagandam",
    activeNow: "Activo Ahora",
    welcomeBack: "Bienvenido, {name}",
    elementLbl: "Elemento: {val} | Planeta Regente: {planet}",
    alertSign: "Por favor selecciona tu signo zodiacal.",
    resetConfirm: "¿Estás seguro de que deseas restablecer tu perfil cósmico?"
  }
};

// Standard Vedic times data based on days of the week
const VEDIC_DATA = {
  0: { // Sunday
    rahu: { start: { h: 16, m: 30 }, end: { h: 18, m: 0 }, text: "4:30 PM - 6:00 PM" },
    yama: { start: { h: 12, m: 0 }, end: { h: 13, m: 30 }, text: "12:00 PM - 1:30 PM" }
  },
  1: { // Monday
    rahu: { start: { h: 7, m: 30 }, end: { h: 9, m: 0 }, text: "7:30 AM - 9:00 AM" },
    yama: { start: { h: 10, m: 30 }, end: { h: 12, m: 0 }, text: "10:30 AM - 12:00 PM" }
  },
  2: { // Tuesday
    rahu: { start: { h: 15, m: 0 }, end: { h: 16, m: 30 }, text: "3:00 PM - 4:30 PM" },
    yama: { start: { h: 9, m: 0 }, end: { h: 10, m: 30 }, text: "9:00 AM - 10:30 AM" }
  },
  3: { // Wednesday
    rahu: { start: { h: 12, m: 0 }, end: { h: 13, m: 30 }, text: "12:00 PM - 1:30 PM" },
    yama: { start: { h: 7, m: 30 }, end: { h: 9, m: 0 }, text: "7:30 AM - 9:00 AM" }
  },
  4: { // Thursday
    rahu: { start: { h: 13, m: 30 }, end: { h: 15, m: 0 }, text: "1:30 PM - 3:00 PM" },
    yama: { start: { h: 6, m: 0 }, end: { h: 7, m: 30 }, text: "6:00 AM - 7:30 AM" }
  },
  5: { // Friday
    rahu: { start: { h: 10, m: 30 }, end: { h: 12, m: 0 }, text: "10:30 AM - 12:00 PM" },
    yama: { start: { h: 15, m: 0 }, end: { h: 16, m: 30 }, text: "3:00 PM - 4:30 PM" }
  },
  6: { // Saturday
    rahu: { start: { h: 9, m: 0 }, end: { h: 10, m: 30 }, text: "9:00 AM - 10:30 AM" },
    yama: { start: { h: 13, m: 30 }, end: { h: 15, m: 0 }, text: "1:30 PM - 3:00 PM" }
  }
};

// Localizes date ranges displayed in indicator
function getLocalizedDateRange(sign, lang) {
  const monthTranslations = {
    en: { Mar: 'Mar', Apr: 'Apr', May: 'May', June: 'June', July: 'July', Aug: 'Aug', Sept: 'Sept', Oct: 'Oct', Nov: 'Nov', Dec: 'Dec', Jan: 'Jan', Feb: 'Feb' },
    te: { Mar: 'మార్చి', Apr: 'ఏప్రిల్', May: 'మే', June: 'జూన్', July: 'జూలై', Aug: 'ఆగస్టు', Sept: 'సెప్టెంబర్', Oct: 'అక్టోబర్', Nov: 'నవంబర్', Dec: 'డిసెంబర్', Jan: 'జనవరి', Feb: 'ఫిబ్రవరి' },
    hi: { Mar: 'मार्च', Apr: 'अप्रैल', May: 'मई', June: 'जून', July: 'जुलाई', Aug: 'अगस्त', Sept: 'सितंबर', Oct: 'अक्टूबर', Nov: 'नवंबर', Dec: 'दिसंबर', Jan: 'जनवरी', Feb: 'फरवरी' },
    es: { Mar: 'Mar', Apr: 'Abr', May: 'May', June: 'Jun', July: 'Jul', Aug: 'Ago', Sept: 'Sep', Oct: 'Oct', Nov: 'Nov', Dec: 'Dic', Jan: 'Ene', Feb: 'Feb' }
  };
  
  const tMonth = monthTranslations[lang] || monthTranslations['en'];
  const replaceMonth = (str) => {
    const parts = str.split(' ');
    const m = parts[0];
    const d = parts[1];
    const transM = tMonth[m] || m;
    return `${transM} ${d}`;
  };
  
  return `(${replaceMonth(sign.start)} - ${replaceMonth(sign.end)})`;
}

// Localize all UI texts dynamically
function applyLanguageUI(lang) {
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS['en'];
  
  // Onboarding Screen
  const onboardingSubtitle = document.getElementById('onboarding-subtitle');
  if (onboardingSubtitle) onboardingSubtitle.textContent = t.onboardingSubtitle;
  const onboardingNameLbl = document.getElementById('onboarding-name-lbl');
  if (onboardingNameLbl) onboardingNameLbl.textContent = t.onboardingNameLbl;
  if (onboardingNameInput) onboardingNameInput.placeholder = t.onboardingNamePlaceholder;
  const onboardingLangLbl = document.getElementById('onboarding-lang-lbl');
  if (onboardingLangLbl) onboardingLangLbl.textContent = t.onboardingLangLbl;
  const onboardingSignLbl = document.getElementById('onboarding-sign-lbl');
  if (onboardingSignLbl) onboardingSignLbl.textContent = t.onboardingSignLbl;
  const onboardingSubmitBtn = document.getElementById('onboarding-submit-btn');
  if (onboardingSubmitBtn) onboardingSubmitBtn.textContent = t.onboardingSubmitBtn;
  
  
  // Wheel Card
  const wheelTitle = document.querySelector('.wheel-title');
  if (wheelTitle) wheelTitle.textContent = t.wheelTitle;
  const wheelInstruction = document.querySelector('.wheel-instruction');
  if (wheelInstruction) wheelInstruction.textContent = t.wheelInstruction;
  
  // Tabs
  const tDaily = document.getElementById('tab-daily');
  if (tDaily) tDaily.textContent = t.tabDaily;
  const tWeekly = document.getElementById('tab-weekly');
  if (tWeekly) tWeekly.textContent = t.tabWeekly;
  const tMonthly = document.getElementById('tab-monthly');
  if (tMonthly) tMonthly.textContent = t.tabMonthly;
  
  // Categories
  const catHeaders = document.querySelectorAll('.category-block h4');
  if (catHeaders.length >= 4) {
    catHeaders[0].textContent = t.catLove;
    catHeaders[1].textContent = t.catCareer;
    catHeaders[2].textContent = t.catWellness;
    catHeaders[3].textContent = t.catLuck;
  }
  
  // Moods
  const moodHeader = document.querySelector('.mood-meters-container h3');
  if (moodHeader) moodHeader.textContent = t.moodTitle;
  
  const moodLabels = document.querySelectorAll('.mood-lbl');
  if (moodLabels.length >= 4) {
    moodLabels[0].textContent = t.moodLove;
    moodLabels[1].textContent = t.moodCareer;
    moodLabels[2].textContent = t.moodWellness;
    moodLabels[3].textContent = t.moodLuck;
  }
  
  // Lucky details
  const luckyLabels = document.querySelectorAll('.lucky-label');
  if (luckyLabels.length >= 3) {
    luckyLabels[0].textContent = t.luckyNumber;
    luckyLabels[1].textContent = t.luckyColor;
    luckyLabels[2].textContent = t.powerHour;
  }
  
  // Constellation Game modal
  const gameBtnSpan = document.querySelector('#trigger-game-btn span');
  if (gameBtnSpan) gameBtnSpan.textContent = t.btnConstellation;
  
  const modalTitle = document.querySelector('#game-modal .modal-title');
  if (modalTitle) modalTitle.textContent = t.gameTitle;
  const gameInst = document.querySelector('.game-instruction');
  if (gameInst) gameInst.textContent = t.gameInstruction;
  const gameSuccessTitle = document.querySelector('.success-title');
  if (gameSuccessTitle) gameSuccessTitle.textContent = t.gameSuccessTitle;
  
  // Settings modal
  const settingsTitle = document.querySelector('#settings-modal .modal-title');
  if (settingsTitle) settingsTitle.textContent = t.settingsTitle;
  
  const settingsNameLbl = document.getElementById('settings-name-lbl');
  if (settingsNameLbl) settingsNameLbl.textContent = t.settingsNameLbl;
  const settingsZodiacLbl = document.getElementById('settings-zodiac-lbl');
  if (settingsZodiacLbl) settingsZodiacLbl.textContent = t.settingsZodiacLbl;
  const settingsThemeLbl = document.getElementById('settings-theme-lbl');
  if (settingsThemeLbl) settingsThemeLbl.textContent = t.settingsThemeLbl;
  const settingsLangLbl = document.getElementById('settings-lang-lbl');
  if (settingsLangLbl) settingsLangLbl.textContent = t.settingsLangLbl;
  const settingsShowVedicLbl = document.getElementById('settings-show-vedic-lbl');
  if (settingsShowVedicLbl) settingsShowVedicLbl.textContent = t.settingsShowVedicLbl;
  
  const settingsSaveBtn = document.getElementById('settings-save-btn');
  if (settingsSaveBtn) settingsSaveBtn.textContent = t.settingsSaveBtn;
  const resetBtn = document.getElementById('reset-app-btn');
  if (resetBtn) resetBtn.textContent = t.settingsResetBtn;
  
  // Vedic Card
  const vedicTitle = document.getElementById('vedic-title');
  if (vedicTitle) vedicTitle.textContent = t.vedicTitle;
  const rahuKalamLbl = document.getElementById('rahu-kalam-lbl');
  if (rahuKalamLbl) rahuKalamLbl.textContent = t.rahuKalamLbl;
  const yamagandamLbl = document.getElementById('yamagandam-lbl');
  if (yamagandamLbl) yamagandamLbl.textContent = t.yamagandamLbl;
  
  // Rebuild wheel to swap names
  buildZodiacWheelSVG();
  
  // Re-trigger visual updates
  updateGreeting();
  updateDateDisplay();
  updateHoroscopeDisplay();
  updateVedicTimes();
}

// Update personalized greeting based on active language
function updateGreeting() {
  const t = UI_TRANSLATIONS[state.language] || UI_TRANSLATIONS['en'];
  const name = state.userName || (state.language === 'en' ? 'Stargazer' : state.language === 'es' ? 'Astrónomo' : state.language === 'hi' ? 'तारादर्शक' : 'నక్షత్ర వీక్షకుడు');
  const greetingTextEl = document.querySelector('.greeting-text');
  if (greetingTextEl) {
    const text = t.welcomeBack.replace('{name}', `<span id="user-display-name">${name}</span>`);
    greetingTextEl.innerHTML = text;
  }
}

// Update localized date display
function updateDateDisplay() {
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString(
    state.language === 'te' ? 'te-IN' : state.language === 'hi' ? 'hi-IN' : state.language === 'es' ? 'es-ES' : 'en-US',
    options
  );
}

// Toggle Vedic Muhurthas card visibility
function toggleVedicCard(show) {
  if (show) {
    vedicTimesCard.classList.remove('hidden');
  } else {
    vedicTimesCard.classList.add('hidden');
  }
}

// Verification range checker
function checkTimeInRange(timeObj) {
  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes();
  const startMins = timeObj.start.h * 60 + timeObj.start.m;
  const endMins = timeObj.end.h * 60 + timeObj.end.m;
  return currentMins >= startMins && currentMins < endMins;
}

// Calculate and render Vedic Muhurthas (Rahu Kalam and Yamagandam)
function updateVedicTimes() {
  if (!state.showVedic) return;
  
  const now = new Date();
  const day = now.getDay();
  const dayData = VEDIC_DATA[day];
  
  if (!dayData) return;

  rahuKalamVal.textContent = dayData.rahu.text;
  yamagandamVal.textContent = dayData.yama.text;

  const rahuItem = document.getElementById('rahu-kalam-item');
  const yamaItem = document.getElementById('yamagandam-item');

  const isRahuActive = checkTimeInRange(dayData.rahu);
  const isYamaActive = checkTimeInRange(dayData.yama);

  const clearActiveHeader = (item) => {
    const header = item.querySelector('.vedic-time-header');
    const badge = header.querySelector('.active-muhurtha-badge, .active-muhurtha-badge-yama');
    if (badge) badge.remove();
  };

  if (isRahuActive) {
    rahuItem.classList.add('active');
    const header = rahuItem.querySelector('.vedic-time-header');
    if (!header.querySelector('.active-muhurtha-badge')) {
      clearActiveHeader(rahuItem);
      const badge = document.createElement('span');
      badge.className = 'active-muhurtha-badge';
      const t = UI_TRANSLATIONS[state.language] || UI_TRANSLATIONS['en'];
      badge.title = t.activeNow;
      header.appendChild(badge);
    }
  } else {
    rahuItem.classList.remove('active');
    clearActiveHeader(rahuItem);
  }

  if (isYamaActive) {
    yamaItem.classList.add('active-yamagandam');
    const header = yamaItem.querySelector('.vedic-time-header');
    if (!header.querySelector('.active-muhurtha-badge-yama')) {
      clearActiveHeader(yamaItem);
      const badge = document.createElement('span');
      badge.className = 'active-muhurtha-badge-yama';
      const t = UI_TRANSLATIONS[state.language] || UI_TRANSLATIONS['en'];
      badge.title = t.activeNow;
      header.appendChild(badge);
    }
  } else {
    yamaItem.classList.remove('active-yamagandam');
    clearActiveHeader(yamaItem);
  }
}

// Initialize Extension
async function init() {
  try {
    // 1. Fetch user data from local storage
    const data = await storage.get(['userName', 'zodiacSign', 'theme', 'language', 'showVedic']);
    
    state.userName = data.userName || '';
    state.zodiacSign = data.zodiacSign || '';
    state.theme = data.theme || 'nebula';
    state.language = data.language || 'en';
    state.showVedic = data.showVedic !== undefined ? data.showVedic : true;

    // 2. Apply theme & language
    applyTheme(state.theme);
    applyLanguageUI(state.language);
    toggleVedicCard(state.showVedic);

    // 3. Populate Zodiac Wheel SVG elements
    buildZodiacWheelSVG();

    // 4. Setup Clock
    startClock();

    // 5. Check if Onboarding is required
    if (!state.zodiacSign) {
      showOnboarding();
    } else {
      showDashboard();
    }

    // 6. Bind Event Listeners
    setupEventListeners();
  } catch (err) {
    console.error('Initialization error:', err);
  }
}

// Clock updates
function startClock() {
  const update = () => {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    
    updateDateDisplay();
    updateVedicTimes();
  };
  update();
  setInterval(update, 1000);
}

// Show Onboarding view
function showOnboarding() {
  onboardingScreen.classList.remove('hidden');
  dashboardScreen.classList.add('hidden');
  
  // Clean select state
  onboardingSignBtns.forEach(btn => btn.classList.remove('selected'));
  state.zodiacSign = '';
}

// Show Dashboard view
function showDashboard() {
  onboardingScreen.classList.add('hidden');
  dashboardScreen.classList.remove('hidden');
  
  updateGreeting();
  updateDateDisplay();
  updateVedicTimes();

  // Navigate wheel to user's saved sign
  const signIndex = SIGN_KEYS.indexOf(state.zodiacSign.toLowerCase());
  if (signIndex !== -1) {
    rotateWheelToIndex(signIndex, false);
    updateHoroscopeDisplay();
  }
  
  // Set default active tab slider width
  updateTabSliderPosition();
}

// Apply selected theme class to body
function applyTheme(themeName) {
  document.body.className = `theme-${themeName}`;
}

// Dynamic construction of SVG Wheel sectors & labels
function buildZodiacWheelSVG() {
  wheelSpinGroup.innerHTML = '';
  
  const cx = 250, cy = 250;
  const radiusOuter = 210;
  const radiusInner = 170;
  
  SIGN_KEYS.forEach((key, index) => {
    const sign = ZODIAC_SIGNS[key];
    const baseAngle = index * 30; // 30 deg sectors
    
    // Create segment group
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'wheel-segment');
    g.setAttribute('transform', `rotate(${baseAngle}, ${cx}, ${cy})`);
    
    // Sector dividing line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx);
    line.setAttribute('y1', cy - radiusInner);
    line.setAttribute('x2', cx);
    line.setAttribute('y2', cy - radiusOuter);
    line.setAttribute('class', 'wheel-segment-line');
    g.appendChild(line);
    
    // Glyph text (placed at radius 190, mid angle 15 degrees)
    const glyphText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    glyphText.setAttribute('x', cx);
    glyphText.setAttribute('y', cy - 188);
    glyphText.setAttribute('text-anchor', 'middle');
    glyphText.setAttribute('transform', `rotate(15, ${cx}, ${cy})`);
    glyphText.setAttribute('class', 'wheel-glyph');
    glyphText.setAttribute('data-index', index);
    glyphText.textContent = sign.glyph;
    g.appendChild(glyphText);
    
    // Sign name label (placed at radius 176, mid angle 15)
    const nameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    nameText.setAttribute('x', cx);
    nameText.setAttribute('y', cy - 176);
    nameText.setAttribute('text-anchor', 'middle');
    nameText.setAttribute('transform', `rotate(15, ${cx}, ${cy})`);
    nameText.setAttribute('class', 'wheel-name');
    nameText.setAttribute('data-index', index);
    const t = TRANSLATIONS[state.language] || TRANSLATIONS['en'];
    const transSignName = t.signs[sign.name] || sign.name;
    nameText.textContent = transSignName.toUpperCase();
    g.appendChild(nameText);

    // Invisible sector touch target
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // Draw an arc sector path between 0 and 30 deg
    const radStart = (0 - 90) * Math.PI / 180;
    const radEnd = (30 - 90) * Math.PI / 180;
    
    const x1_out = cx + radiusOuter * Math.cos(radStart);
    const y1_out = cy + radiusOuter * Math.sin(radStart);
    const x2_out = cx + radiusOuter * Math.cos(radEnd);
    const y2_out = cy + radiusOuter * Math.sin(radEnd);
    
    const x1_in = cx + radiusInner * Math.cos(radEnd);
    const y1_in = cy + radiusInner * Math.sin(radEnd);
    const x2_in = cx + radiusInner * Math.cos(radStart);
    const y2_in = cy + radiusInner * Math.sin(radStart);
    
    const d = `M ${x1_out} ${y1_out} A ${radiusOuter} ${radiusOuter} 0 0 1 ${x2_out} ${y2_out} L ${x1_in} ${y1_in} A ${radiusInner} ${radiusInner} 0 0 0 ${x2_in} ${y2_in} Z`;
    
    path.setAttribute('d', d);
    path.setAttribute('class', 'wheel-segment-trigger');
    path.setAttribute('data-index', index);
    g.appendChild(path);
    
    wheelSpinGroup.appendChild(g);
  });
}

// Navigation Helper with View Transitions API support
function navigate(updateDOM, direction) {
  // Feature detect View Transitions API
  if (!document.startViewTransition) {
    updateDOM();
    return;
  }
  
  // Trigger transition with type metadata (forward or backward)
  document.startViewTransition({
    update: updateDOM,
    types: [direction]
  });
}

// Update Active Reading Card Panels
function updateHoroscopeDisplay() {
  if (!state.zodiacSign) return;
  
  const data = generateHoroscope(state.zodiacSign, state.activeTab, new Date(), state.language);
  if (!data) return;
  
  // Render readings
  overviewEl.textContent = data.reading.overview;
  loveEl.textContent = data.reading.love;
  careerEl.textContent = data.reading.career;
  wellnessEl.textContent = data.reading.wellness;
  luckEl.textContent = data.reading.luck;

  // Header Details
  currentGlyph.textContent = data.glyph;
  currentSignName.textContent = data.sign;
  const t = UI_TRANSLATIONS[state.language] || UI_TRANSLATIONS['en'];
  const metaText = t.elementLbl.replace('{val}', data.element).replace('{planet}', data.planet);
  const metaEl = document.querySelector('.reading-sign-metadata');
  if (metaEl) {
    metaEl.innerHTML = metaText;
  }

  // Animate Mood circular gauges
  updateMoodGauge(loveRing, loveValue, data.moods.love);
  updateMoodGauge(careerRing, careerValue, data.moods.career);
  updateMoodGauge(wellnessRing, wellnessValue, data.moods.wellness);
  updateMoodGauge(luckRing, luckValue, data.moods.luck);

  // Footer Details
  luckyNumberEl.textContent = data.luckyNumber;
  luckyColorEl.textContent = data.luckyColor;
  powerHourEl.textContent = data.powerHour;
  
  // Sync the center glyph of the wheel
  activeWheelGlyph.textContent = data.glyph;
}

// Mood gauge circle stroke adjuster
function updateMoodGauge(ringPath, textVal, percentage) {
  // SVG radius is 15.9155, circumference is 100
  // Animate by shifting the dasharray
  ringPath.style.strokeDasharray = `${percentage}, 100`;
  textVal.textContent = `${percentage}%`;
}

// Rotate wheel to select a sign by index
function rotateWheelToIndex(index, animate = true) {
  // In our model, index 0 (Aries) is centered straight UP when we rotate by -15 degrees.
  // We offset by -15 degrees to align the glyph itself to 12 o'clock.
  const targetRotation = -index * 30 - 15;
  
  // Prevent infinite spinning back and forth by correcting degrees
  let diff = (targetRotation - state.currentRotation) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  
  state.currentRotation += diff;
  
  if (animate) {
    wheelSpinGroup.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.2, 1)';
  } else {
    wheelSpinGroup.style.transition = 'none';
  }
  
  wheelSpinGroup.style.transform = `rotate(${state.currentRotation}deg)`;
  
  const t = TRANSLATIONS[state.language] || TRANSLATIONS['en'];
  const transSignName = t.signs[sign.name] || sign.name;
  
  indicatorGlyph.textContent = sign.glyph;
  indicatorName.textContent = transSignName;
  indicatorDates.textContent = getLocalizedDateRange(sign, state.language);

  // Add active classes to wheel text labels
  const glyphs = wheelSpinGroup.querySelectorAll('.wheel-glyph');
  const names = wheelSpinGroup.querySelectorAll('.wheel-name');
  
  glyphs.forEach(g => {
    if (parseInt(g.getAttribute('data-index')) === index) {
      g.classList.add('active');
    } else {
      g.classList.remove('active');
    }
  });

  names.forEach(n => {
    if (parseInt(n.getAttribute('data-index')) === index) {
      n.classList.add('active');
    } else {
      n.classList.remove('active');
    }
  });

  // Save selection
  state.zodiacSign = key;
  storage.set({ zodiacSign: key });
}

// Calculate the active index based on current wheel rotation
function getIndexFromRotation(rotation) {
  // Normalize angle to 0 - 360 range
  let normalized = (-rotation) % 360;
  if (normalized < 0) normalized += 360;
  
  // Find nearest segment, accounting for the 15-degree offset of glyph placement
  let index = Math.round((normalized - 15) / 30) % 12;
  return index;
}

// Adjust the tab sliding pill offset
function updateTabSliderPosition() {
  const activeTabBtn = document.querySelector('.tab-btn.active');
  if (!activeTabBtn) return;
  
  tabSliderPill.style.width = `${activeTabBtn.offsetWidth}px`;
  tabSliderPill.style.transform = `translateX(${activeTabBtn.offsetLeft - 4}px)`;
}

// Parallax effects
function handleBackgroundParallax(e) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const offsetX = (e.clientX - width / 2) / (width / 2);
  const offsetY = (e.clientY - height / 2) / (height / 2);
  
  // Stars shift slower than Nebula for deep parallax feel
  document.querySelector('.stars-layer').style.transform = `translate3d(${offsetX * 15}px, ${offsetY * 15}px, 0)`;
  document.querySelector('.nebula-layer').style.transform = `translate3d(${offsetX * 30}px, ${offsetY * 30}px, 0)`;
  
  // Update mouse radial gradients
  const mousePercentX = (e.clientX / width) * 100;
  const mousePercentY = (e.clientY / height) * 100;
  document.body.style.setProperty('--mouse-x', `${mousePercentX}%`);
  document.body.style.setProperty('--mouse-y', `${mousePercentY}%`);
}

// Interactive Constellation Mini-game Controller
function startConstellationGame() {
  const sign = ZODIAC_SIGNS[state.zodiacSign.toLowerCase()];
  if (!sign) return;

  state.gameConstellation = sign;
  state.gameCompleted = false;
  state.gameConnectedStars = [];
  
  gameSuccessMsg.classList.add('hidden');
  
  // Initialize canvas
  const ctx = constellationCanvas.getContext('2d');
  
  // Setup responsive scale based on coordinates in ZODIAC_SIGNS (relative to 200x200)
  // Our canvas size is 400x300. Map 0-200 stars values to 40-360 X and 30-270 Y
  const mapCoords = (star) => {
    return {
      x: 40 + (star.x / 200) * 320,
      y: 30 + (star.y / 200) * 240
    };
  };

  const mappedStars = sign.stars.map(mapCoords);
  
  // Draw Loop
  const draw = () => {
    ctx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);
    
    // Draw background nebula aura glow inside canvas
    const gradient = ctx.createRadialGradient(200, 150, 10, 200, 150, 180);
    gradient.addColorStop(0, 'rgba(120, 80, 220, 0.1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, constellationCanvas.width, constellationCanvas.height);

    // Draw completed connection lines
    if (state.gameConnectedStars.length > 1) {
      ctx.beginPath();
      const first = mappedStars[state.gameConnectedStars[0]];
      ctx.moveTo(first.x, first.y);
      
      for (let i = 1; i < state.gameConnectedStars.length; i++) {
        const star = mappedStars[state.gameConnectedStars[i]];
        ctx.lineTo(star.x, star.y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.8)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(100, 200, 255, 0.8)';
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }

    // Draw lines connecting to current cursor for guidance if dragging/connecting
    if (state.gameConnectedStars.length > 0 && state.gameConnectedStars.length < mappedStars.length) {
      const lastIndex = state.gameConnectedStars[state.gameConnectedStars.length - 1];
      const lastStar = mappedStars[lastIndex];
      const nextStar = mappedStars[state.gameConnectedStars.length]; // next expected star

      ctx.beginPath();
      ctx.moveTo(lastStar.x, lastStar.y);
      ctx.lineTo(nextStar.x, nextStar.y);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]); // reset
    }

    // Draw Stars (circles)
    mappedStars.forEach((star, index) => {
      const isConnected = state.gameConnectedStars.includes(index);
      const isNext = state.gameConnectedStars.length === index;

      ctx.beginPath();
      ctx.arc(star.x, star.y, isConnected ? 6 : 4, 0, Math.PI * 2);
      
      if (isConnected) {
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(100, 200, 255, 1)';
      } else if (isNext) {
        ctx.fillStyle = 'rgba(255, 220, 100, 0.9)';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 220, 100, 0.9)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.shadowBlur = 0;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0; // reset
      
      // Star label numbers
      if (!isConnected && isNext) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '10px Outfit';
        ctx.fillText(index + 1, star.x + 8, star.y - 8);
      }
    });
  };

  // Set click handler on canvas
  const handleCanvasClick = (e) => {
    if (state.gameCompleted) return;

    const rect = constellationCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Next star index to connect
    const nextExpectedIndex = state.gameConnectedStars.length;
    if (nextExpectedIndex >= mappedStars.length) return;

    const targetStar = mappedStars[nextExpectedIndex];
    
    // Check collision radius (15 pixels tolerance)
    const dist = Math.hypot(clickX - targetStar.x, clickY - targetStar.y);
    if (dist < 20) {
      state.gameConnectedStars.push(nextExpectedIndex);
      
      // Check Win condition
      if (state.gameConnectedStars.length === mappedStars.length) {
        state.gameCompleted = true;
        const currentData = generateHoroscope(state.zodiacSign, 'daily', new Date(), state.language);
        stellarQuoteEl.textContent = `"${currentData.quote}"`;
        gameSuccessMsg.classList.remove('hidden');
      }
      
      draw();
    }
  };

  const cleanListeners = () => {
    constellationCanvas.removeEventListener('click', handleCanvasClick);
  };

  constellationCanvas.addEventListener('click', handleCanvasClick);
  draw();

  // Dialog onClose callback to remove events
  gameModal.addEventListener('close', cleanListeners, { once: true });
}

// Bind Page Event Listeners
function setupEventListeners() {
  
  // Parallax Mousemove
  window.addEventListener('mousemove', handleBackgroundParallax);

  // Onboarding interactions
  onboardingSignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      onboardingSignBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.zodiacSign = btn.getAttribute('data-sign');
    });
  });

  onboardingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!state.zodiacSign) {
      const t = UI_TRANSLATIONS[state.language] || UI_TRANSLATIONS['en'];
      alert(t.alertSign);
      return;
    }
    
    state.userName = onboardingNameInput.value.trim();
    state.language = onboardingLanguageSelect.value;
    
    // Save to storage
    await storage.set({
      userName: state.userName,
      zodiacSign: state.zodiacSign,
      language: state.language
    });
    
    applyLanguageUI(state.language);
    showDashboard();
  });

  // Settings Dialog handlers
  triggerSettingsBtn.addEventListener('click', () => {
    settingsUsername.value = state.userName;
    settingsZodiac.value = state.zodiacSign;
    settingsTheme.value = state.theme;
    settingsLanguage.value = state.language;
    settingsShowVedic.checked = state.showVedic;
    settingsModal.showModal();
  });

  closeSettingsBtn.addEventListener('click', () => {
    settingsModal.close();
  });

  settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const oldSign = state.zodiacSign;
    
    state.userName = settingsUsername.value.trim();
    state.zodiacSign = settingsZodiac.value;
    state.theme = settingsTheme.value;
    state.language = settingsLanguage.value;
    state.showVedic = settingsShowVedic.checked;

    await storage.set({
      userName: state.userName,
      zodiacSign: state.zodiacSign,
      theme: state.theme,
      language: state.language,
      showVedic: state.showVedic
    });

    applyTheme(state.theme);
    applyLanguageUI(state.language);
    toggleVedicCard(state.showVedic);
    
    // If sign changed, spin the wheel to correct snap position
    if (oldSign !== state.zodiacSign) {
      const signIndex = SIGN_KEYS.indexOf(state.zodiacSign.toLowerCase());
      rotateWheelToIndex(signIndex, true);
    }
    
    updateHoroscopeDisplay();
    settingsModal.close();
  });

  resetAppBtn.addEventListener('click', async () => {
    const t = UI_TRANSLATIONS[state.language] || UI_TRANSLATIONS['en'];
    const confirmReset = confirm(t.resetConfirm);
    if (!confirmReset) return;
    
    await storage.clear();
    state.userName = '';
    state.zodiacSign = '';
    state.theme = 'nebula';
    state.language = 'en';
    state.showVedic = true;
    
    applyTheme(state.theme);
    applyLanguageUI(state.language);
    toggleVedicCard(state.showVedic);
    settingsModal.close();
    showOnboarding();
  });

  // Game Modal triggers
  triggerGameBtn.addEventListener('click', () => {
    gameModal.showModal();
    startConstellationGame();
  });

  closeGameBtn.addEventListener('click', () => {
    gameModal.close();
  });

  // Tab switching with View Transitions
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab === state.activeTab) return;

      // Determine navigation direction
      const currentIdx = ['daily', 'weekly', 'monthly'].indexOf(state.activeTab);
      const targetIdx = ['daily', 'weekly', 'monthly'].indexOf(targetTab);
      const direction = targetIdx > currentIdx ? 'forward' : 'backward';

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update state
      state.activeTab = targetTab;
      
      // Update reading under View Transition
      navigate(() => {
        updateHoroscopeDisplay();
        updateTabSliderPosition();
      }, direction);
    });
  });

  // Resize listener to fix tab sliding pill offset
  window.addEventListener('resize', updateTabSliderPosition);

  // Zodiac Wheel Pointer Drag and Rotate Actions
  let hasMoved = false;

  zodiacSvgWheel.addEventListener('pointerdown', (e) => {
    state.wheelDragging = true;
    hasMoved = false;
    zodiacSvgWheel.setPointerCapture(e.pointerId);
    
    const rect = zodiacSvgWheel.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    state.wheelStartAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI;
    state.wheelBaseRotation = state.currentRotation;
    
    wheelSpinGroup.style.transition = 'none';
  });

  zodiacSvgWheel.addEventListener('pointermove', (e) => {
    if (!state.wheelDragging) return;
    hasMoved = true;
    
    const rect = zodiacSvgWheel.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI;
    let angleDiff = currentAngle - state.wheelStartAngle;
    
    state.currentRotation = state.wheelBaseRotation + angleDiff;
    wheelSpinGroup.style.transform = `rotate(${state.currentRotation}deg)`;

    // Live update indicator text on drag
    const hoverIdx = getIndexFromRotation(state.currentRotation);
    const key = SIGN_KEYS[hoverIdx];
    const sign = ZODIAC_SIGNS[key];
    const t = TRANSLATIONS[state.language] || TRANSLATIONS['en'];
    const transSignName = t.signs[sign.name] || sign.name;
    indicatorGlyph.textContent = sign.glyph;
    indicatorName.textContent = transSignName;
    indicatorDates.textContent = getLocalizedDateRange(sign, state.language);
  });

  zodiacSvgWheel.addEventListener('pointerup', (e) => {
    if (!state.wheelDragging) return;
    state.wheelDragging = false;
    zodiacSvgWheel.releasePointerCapture(e.pointerId);

    // If it was just a quick click, let's identify click target instead
    const targetIdxAttr = e.target.getAttribute('data-index');
    if (!hasMoved && targetIdxAttr !== null) {
      const clickIdx = parseInt(targetIdxAttr);
      rotateWheelToIndex(clickIdx, true);
      updateHoroscopeDisplay();
      return;
    }

    // Otherwise snap rotated wheel to closest index segment
    const snapIdx = getIndexFromRotation(state.currentRotation);
    rotateWheelToIndex(snapIdx, true);
    updateHoroscopeDisplay();
  });
}

// Fire initialization
document.addEventListener('DOMContentLoaded', init);
