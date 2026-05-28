// StellarTab — New Tab Dashboard Controller
import { ZODIAC_SIGNS, generateHoroscope } from './horoscope-engine.js';

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
  searchEngine: 'google',
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

const searchForm = document.getElementById('cosmic-search-form');
const searchInput = document.getElementById('search-input');

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
const settingsSearch = document.getElementById('settings-search');
const settingsTheme = document.getElementById('settings-theme');
const resetAppBtn = document.getElementById('reset-app-btn');

// Initialize Extension
async function init() {
  try {
    // 1. Fetch user data from local storage
    const data = await storage.get(['userName', 'zodiacSign', 'theme', 'searchEngine']);
    
    state.userName = data.userName || '';
    state.zodiacSign = data.zodiacSign || '';
    state.theme = data.theme || 'nebula';
    state.searchEngine = data.searchEngine || 'google';

    // 2. Apply theme
    applyTheme(state.theme);

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
    
    // Formatting date
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString([], options);
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
  
  userDisplayName.textContent = state.userName || 'Stargazer';

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
    nameText.textContent = sign.name.toUpperCase();
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
  
  const data = generateHoroscope(state.zodiacSign, state.activeTab);
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
  currentElement.textContent = data.element;
  currentPlanet.textContent = data.planet;

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
  
  // Update indicator text
  const key = SIGN_KEYS[index];
  const sign = ZODIAC_SIGNS[key];
  
  indicatorGlyph.textContent = sign.glyph;
  indicatorName.textContent = sign.name;
  indicatorDates.textContent = `(${sign.start} - ${sign.end})`;

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
        const currentData = generateHoroscope(state.zodiacSign, 'daily');
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
      alert('Please select your zodiac star sign.');
      return;
    }
    
    state.userName = onboardingNameInput.value.trim();
    
    // Save to storage
    await storage.set({
      userName: state.userName,
      zodiacSign: state.zodiacSign
    });
    
    showDashboard();
  });

  // Settings Dialog handlers
  triggerSettingsBtn.addEventListener('click', () => {
    settingsUsername.value = state.userName;
    settingsZodiac.value = state.zodiacSign;
    settingsSearch.value = state.searchEngine;
    settingsTheme.value = state.theme;
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
    state.searchEngine = settingsSearch.value;
    state.theme = settingsTheme.value;

    await storage.set({
      userName: state.userName,
      zodiacSign: state.zodiacSign,
      searchEngine: state.searchEngine,
      theme: state.theme
    });

    applyTheme(state.theme);
    userDisplayName.textContent = state.userName;
    
    // If sign changed, spin the wheel to correct snap position
    if (oldSign !== state.zodiacSign) {
      const signIndex = SIGN_KEYS.indexOf(state.zodiacSign.toLowerCase());
      rotateWheelToIndex(signIndex, true);
    }
    
    updateHoroscopeDisplay();
    settingsModal.close();
  });

  resetAppBtn.addEventListener('click', async () => {
    const confirmReset = confirm('Are you sure you want to reset your cosmic profile?');
    if (!confirmReset) return;
    
    await storage.clear();
    state.userName = '';
    state.zodiacSign = '';
    state.theme = 'nebula';
    state.searchEngine = 'google';
    
    applyTheme(state.theme);
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

  // Cosmic Search Submit redirection
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = encodeURIComponent(searchInput.value.trim());
    if (!query) return;

    let url = `https://www.google.com/search?q=${query}`;
    if (state.searchEngine === 'bing') {
      url = `https://www.bing.com/search?q=${query}`;
    } else if (state.searchEngine === 'duckduckgo') {
      url = `https://duckduckgo.com/?q=${query}`;
    }
    
    window.location.href = url;
  });

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
    indicatorGlyph.textContent = sign.glyph;
    indicatorName.textContent = sign.name;
    indicatorDates.textContent = `(${sign.start} - ${sign.end})`;
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
