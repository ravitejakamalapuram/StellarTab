# Chrome Web Store Listing & Publishing Record

*Last Updated: 2026-09-21*

---

## 1. Extension Information
- **Name**: StellarTab - Daily Astrology & Cosmic Horoscope
- **Extension ID**: `efpigokkcblmjdnameafogblekknbhdc`
- **Publisher ID**: `9637cb78-fa33-49dd-a4cb-91066ff182e3`
- **Version**: `1.0.1`
- **Manifest Version**: `MV3`
- **Language**: `en`
- **Category**: `Lifestyle`

---

## 2. Store Listing Copy

### Short Description (max 132 characters)
> Cosmic Dashboard for your New Tab. Get daily horoscopes, track cosmic mood meters, and play constellation mini-games.

### Detailed Description
```markdown
StellarTab transforms your browser's new tab page into a tranquil, cosmic sanctuary. Stay connected with celestial cycles, daily astrological insights, and mindful interactive mini-games right from your Chrome toolbar and new tab.

KEY FEATURES
• Daily Horoscopes: Personalized astrological forecasts for all 12 zodiac signs, updated daily.
• Real-Time Moon Phases: Accurate visualization of current lunar phases, illumination percentages, and astronomical events.
• Cosmic Mood Meter: Track your celestial biorhythms and energy levels throughout the day.
• Constellation Mini-Games: Relax with interactive star-connecting and constellation puzzles.
• Ambient Visuals: Beautiful high-resolution space backgrounds with glassmorphic aesthetics.
• 100% Private & Local-First: All horoscope calculations, preferences, and game states run entirely in your browser without external servers, tracking, or analytics.

HOW TO USE
1. Install StellarTab and open a new tab in Chrome.
2. Select your zodiac sun sign or customize your birth chart preferences.
3. Enjoy daily astrological readings, live lunar cycles, and interactive star maps every time you open a tab.
```

---

## 3. Permissions Justifications (Required for Review)

Google review requires specific plain-English justification for each declared permission:

| Permission | Used in Code? | Sample Evidence | Required? | Risk | Plain-English Review Justification |
| :--- | :---: | :--- | :---: | :---: | :--- |
| `storage` | Yes | background.js:4 | Yes | LOW | Required to locally persist user zodiac sign selection, preferences, and horoscope viewing history directly on the device. |

---

## 4. Privacy & Data Use Disclosure

- **Data Flow**:
  User Interaction
  ⬇
  Extension Frontend (New Tab Page)
  ⬇
  Local Browser Storage (`chrome.storage.local`)

- **Data Handling Summary**:
  - **User Preference & Session State**: Collected: Yes | Stored: Local | Purpose: Store zodiac preferences and visual theme selection locally.
  - **Web Page Data & Content**: Collected: No | Stored: No | Purpose: N/A
  - **Analytics & Telemetry**: Collected: No | Stored: No | Purpose: No analytics or telemetry collected.

- **Privacy Policy URL**: `https://session-bridge-4.preview.emergentagent.com/privacy`

---

## 5. Store Assets Checklist

- [x] Extension Icon (128×128 PNG): `icons/icon-128.png`
- [x] Primary Screenshot (1280×800 PNG): `store-assets/01-main.png`
- [x] Promotional Tile (440×280 PNG): `store-assets/tile-small.png`
- [x] Marquee Promo (1400×560 PNG): `store-assets/tile-marquee.png`

---

## 6. Pre-Publish Checklist

- [x] Manifest V3 compliance verified
- [x] No `eval()` or remotely hosted code
- [x] No secrets, private keys, or API tokens in package
- [x] Distributable archive contains `manifest.json` at root
- [x] Extension registered in Chrome Web Store Developer Dashboard
- [x] Branding guidelines & safe zones verified

---

## 7. Release History

| Version | Date | Status | Package ZIP | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `1.0.1` | 2026-09-21 | Draft / Submitted | `chrome-store/builds/stellartab-v1.0.1.zip` | Updated category to Lifestyle, updated description, privacy disclosures, and bumped version to v1.0.1 |
