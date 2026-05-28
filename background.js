// StellarTab Service Worker

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(['userName', 'zodiacSign']);
  
  // Set initial default settings if they don't exist
  if (!data.userName) {
    await chrome.storage.local.set({
      userName: '',
      zodiacSign: '',
      theme: 'nebula',
      searchEngine: 'google'
    });
  }
  
  console.log('StellarTab service worker initialized.');
});
