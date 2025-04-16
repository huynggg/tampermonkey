// ==UserScript==
// @name         allsurplus_helpers
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Helpers for using allsurplus.com
// @author       Huy Nguyen
// @match        https://www.allsurplus.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=allsurplus.com
// @grant        GM_addStyle
// @updateURL    https://github.com/huynggg/tampermonkey/raw/refs/heads/main/allsurplus.user.js
// @downloadURL  https://github.com/huynggg/tampermonkey/raw/refs/heads/main/allsurplus.user.js
// ==/UserScript==

(function() {
	'use strict';
	GM_addStyle(`
    button:hover {
            background-color: #e0e0e0;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transform: scale(1.03);
        }

    button {
         padding: 0px 5px;
         margin: 10px;
         width: 45px;
         height: 45px;
       }

       div.card-body > div.row {
         justify-content: center;
       }

	.btn-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`);

	const observer = new MutationObserver(() => {
		const containers = document.querySelectorAll('div.card-search');

		containers.forEach((container, index) => {
			// Skip if the button is already added
			if (container.querySelector('.custom-google-btn')) return;
			if (container.querySelector('.custom-amazon-btn')) return;
			if (container.querySelector('.custom-ebay-btn')) return;

			const btnContainer = document.createElement('div');
			btnContainer.className = 'btn-container';

			const containerBody = container.querySelector('div.card-body > div.row');
			let title = container.querySelector('div.card > a').getAttribute('title');

			const makeBtn = (cls, icon, url) => {
				const btn = document.createElement('button');
				btn.className = cls;
				btn.innerHTML = `<img src="${icon}">`;
				btn.onclick = () => window.open(url, '_blank');
				return btn;
			};
			const googleBtn = makeBtn('custom-google-btn', 'https://cdn.simpleicons.org/google/4285F4', `https://www.google.com/search?q=${encodeURIComponent(title)}`);
			const amazonBtn = makeBtn('custom-amazon-btn', 'https://cdn.simpleicons.org/amazon/FF9900', `https://www.amazon.com/s?k=${encodeURIComponent(title)}`);
			const ebayBtn = makeBtn('custom-ebay-btn', 'https://cdn.simpleicons.org/ebay/E53238', `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(title)}`);

			btnContainer.appendChild(googleBtn);
			btnContainer.appendChild(amazonBtn);
			btnContainer.appendChild(ebayBtn);
			containerBody.appendChild(btnContainer);
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });
})();




