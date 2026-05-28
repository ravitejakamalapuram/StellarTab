# Chrome Web Store Listing — StellarTab

> Last Updated: 2026-05-28

## Store Listing

**Extension Name**
StellarTab - Daily Astrology & Cosmic Horoscope

**Short Description**
Transform your New Tab page into a stunning glassmorphic Cosmic Dashboard with daily, weekly, and monthly horoscopes.

**Detailed Description**
Transform your default browser New Tab page into an immersive, glassmorphic Cosmic Dashboard. Align yourself with the stars every single day with StellarTab.

Key Features:
- Daily, Weekly, and Monthly Horoscopes: Poetic, authentic, and deep astrological readings tailored to your sign.
- Cosmic Mood Indices: Track daily alignment percentages for Love, Career, Wellness, and Luck.
- Interactive Zodiac Wheel: Rotate the celestial ring using smooth, tactile drag controls to explore readings for other signs.
- Celestial Astral Clock: View time and date against a beautiful, dynamic starry sky backdrop.
- Minimalist Search Utility: Query the web via Google, Bing, or DuckDuckGo directly from your dashboard.
- Constellation Mini-game: Connect the glowing stars of your sign to reveal inspiring daily cosmic quotes.
- Completely Private & Offline: Our deterministic engine calculates your readings locally—your data never leaves your device.

How to Use:
1. Install StellarTab.
2. Open a new tab to step into the cosmic dashboard.
3. Enter your name and select your zodiac sign.
4. Drag or spin the Zodiac Wheel to check other signs, and switch tabs to read daily, weekly, or monthly forecasts.
5. Click the "Constellation" button in the header to play the daily connection game.

Privacy & Permissions:
StellarTab values your privacy. We store your preferences locally on your browser using secure extension storage. No trackers, no cookies, and no data transmissions are made to third-party servers.

**Category**
Fun

**Single Purpose**
Displays daily, weekly, and monthly horoscopes and astrological insights on the browser New Tab page.

**Primary Language**
English

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon | 128×128 PNG | ✅ Ready | `icons/icon-128.png` |
| Screenshot 1 | 1280×800 | ✅ Ready (Generated) | `newtab_onboarding_preview.png` |
| Screenshot 2 | 1280×800 | ✅ Ready (Generated) | `newtab_dashboard_preview.png` |
| Small Promo Tile | 440×280 | ⬜ Not created | |

### Screenshot Notes
- Screenshot 1: Shows the clean and minimal glassmorphic onboarding screen asking for the user's name and zodiac sign.
- Screenshot 2: Shows the active Cosmic Dashboard containing the astrological clock, greeting, interactive SVG Zodiac Wheel, category readings, and circular mood meters.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| `storage` | permissions | Required to save the user's name, selected zodiac sign, search engine preferences, and custom dashboard themes locally on the browser. |

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

StellarTab computes all readings locally using a seed-based deterministic astrological engine. No data is collected, stored, or transmitted off-device.

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

## Distribution

**Visibility**: Public
**Regions**: All regions
**Pricing**: Free

## Developer Info

**Publisher Name**
Stargazing Labs

**Contact Email**
stargazer@stargazinglabs.io

**Homepage URL**
https://github.com/rkamalapuram/dailyHoroscope

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.0 | 2026-05-28 | Initial release featuring full-screen override dashboard, interactive zodiac wheel, and constellation game. | Draft |

## CI/CD Automation

We automate the zipping and publishing of the extension to the Chrome Web Store using GitHub Actions.

### Deployment Secrets Setup
To enable automation, you must configure the following Secrets in your GitHub repository (`Settings -> Secrets and variables -> Actions`):

1. `CLIENT_ID`: Google API OAuth Client ID (obtained from Google Cloud Console).
2. `CLIENT_SECRET`: Google API OAuth Client Secret (obtained from Google Cloud Console).
3. `REFRESH_TOKEN`: OAuth Refresh Token allowing upload scopes to Chrome Web Store API.
4. `APP_ID`: The Chrome Web Store Item ID assigned when you first create the draft item.

Once these secrets are configured, pushes to the `main` branch that modify the manifest version will automatically trigger a release build, package the extension zip (excluding dev files), and upload it to the Chrome Web Store.
