// ==UserScript==
// @name         allsurplus_helpers
// @namespace    http://tampermonkey.net/
// @version      1.1.3
// @description  Helpers for using allsurplus.com
// @author       Huy Nguyen
// @match        https://www.allsurplus.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=allsurplus.com
// @grant        none
// @updateURL    https://github.com/huynggg/tampermonkey/raw/refs/heads/main/allsurplus.user.js
// @downloadURL  https://github.com/huynggg/tampermonkey/raw/refs/heads/main/allsurplus.user.js
// ==/UserScript==

(function() {
	'use strict';

	const observer = new MutationObserver(() => {
		const containers = document.querySelectorAll('div.card-body > div.row');

		containers.forEach((container, index) => {
			// Skip if the button is already added
			if (container.querySelector('.custom-google-btn')) return;

			const title = container.parentElement.querySelector('.card-title > .link-click').getAttribute('title');
			//console.log(title);

			const googleSearchUrl = "https://www.google.com/search?q=" + encodeURIComponent(title);
			const googleBtn = document.createElement('button');
			googleBtn.textContent = 'Google';
			googleBtn.className = 'custom-google-btn';
			googleBtn.style.marginTop = '10px';
			// googleBtn.style.marginLeft = '5px';
			googleBtn.style.display = 'block';
			googleBtn.onclick = () => {
				window.open(googleSearchUrl, '_blank');
			};

			const amazonSearchUrl = "https://www.amazon.com/s?k=" + encodeURIComponent(title);
			const amazonBtn = document.createElement('button');
			amazonBtn.textContent = 'Amazon';
			amazonBtn.className = 'custom-google-btn';
			amazonBtn.style.marginTop = '10px';
			amazonBtn.style.marginLeft = '5px';
			amazonBtn.style.display = 'block';
			amazonBtn.onclick = () => {
				window.open(amazonSearchUrl, '_blank');
			};

			const ebaySearchUrl = "https://www.ebay.com/sch/i.html?_nkw=" + encodeURIComponent(title);
			const ebayBtn = document.createElement('button');
			ebayBtn.textContent = 'eBay';
			ebayBtn.className = 'custom-google-btn';
			ebayBtn.style.marginTop = '10px';
			ebayBtn.style.marginLeft = '5px';
			ebayBtn.style.display = 'block';
			ebayBtn.onclick = () => {
				window.open(ebaySearchUrl, '_blank');
			};

			container.appendChild(googleBtn);
			container.appendChild(amazonBtn);
			container.appendChild(ebayBtn);
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });
})();
