document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      chrome.runtime.sendMessage({
        action: 'search',
        text: selectedText
      });
    }
  });
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'performSearch') {
      let searchInput = document.querySelector('input[name="q"]') ||
                       document.querySelector('input[type="search"]') || 
                       document.querySelector('input[placeholder*="search" i]');
  
                       if (searchInput) {
                        searchInput.value = request.text;
                        searchInput.focus();
                        const form = searchInput.closest('form');
                        const searchButton = document.querySelector('.search-button');
                        if (searchButton) {
                          searchButton.click();
                        } else if (form) {
                          form.submit();
                        } else {
                          const enterEvent = new KeyboardEvent('keydown', {
                            bubbles: true,
                            cancelable: true,
                            keyCode: 13
                          });
                          searchInput.dispatchEvent(enterEvent);
                        }
                      } else {
                        console.log('Search input not found');
                      }
    }
  });