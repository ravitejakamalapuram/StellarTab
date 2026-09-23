# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2026-09-23

### Fixed
- Chrome Web Store compliance (Red Argon rejection): the new tab search box now
  uses `chrome.search.query`, so searches go through the user's default search
  engine instead of a hardcoded provider. Adds the `search` permission and
  removes the search-engine setting.

### Changed
- Store metadata cleanup: corrected the privacy policy URL, added the `search`
  permission justification, and replaced the copy-pasted store description.

## [1.0.2] - 2026-09-21

### Changed
- Privacy policy URL now points to the GitHub Pages policy.

## [1.0.1] - 2026-09-21

### Changed
- Store category set to Lifestyle; store listing metadata and assets updated
  for Chrome Web Store review.

## [1.0.0] - 2026-06-02

### Added
- Initial release of StellarTab featuring full-screen override Cosmic Dashboard.
- Interactive drag-and-spin SVG Zodiac Wheel.
- Glassmorphic category horizontal horoscopes (daily, weekly, monthly).
- Constellation drawing mini-game for celestial quotes.
- Local storage persistence for user name and sign preference.
