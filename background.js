chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Background received:', request);
    if (request.action === 'search') {
      if (chrome.scripting && chrome.scripting.executeScript) {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: performSearch,
          args: [request.text]
        }, () => {
          if (chrome.runtime.lastError) {
            console.error('executeScript error:', chrome.runtime.lastError.message);
          }
        });
      } else {
        console.error('chrome.scripting is not available');
      }
    }
  });
  
  function performSearch(text) {
    console.log('Injecting search for:', text);
    chrome.runtime.sendMessage({
      action: 'performSearch',
      text: text
    });
  }