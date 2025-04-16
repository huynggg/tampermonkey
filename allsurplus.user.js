// ==UserScript==
// @name         allsurplus_helpers
// @namespace    http://tampermonkey.net/
// @version      1.4.2
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
         font-size: 26px;
         padding: 0px 5px;
         margin: 10px;
         width: 50px;
         height: 50px;
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
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
		document.head.appendChild(link);
		const containers = document.querySelectorAll('div.card-body > div.row');

		containers.forEach((container, index) => {
			// Skip if the button is already added
			if (container.querySelector('.custom-google-btn')) return;
			if (container.querySelector('.custom-amazon-btn')) return;
			if (container.querySelector('.custom-ebay-btn')) return;

			const btnContainer = document.createElement('div');
			btnContainer.className = 'btn-container';
			container.appendChild(btnContainer);

			let title = container.parentElement.querySelector('.card-title > .link-click').getAttribute('title');
			if (title === null) {
				title = container.parentElement.querySelector('.card-title > .link-click').textContent;
			}

			const makeBtn = (cls, icon, url) => {
				const btn = document.createElement('button');
				btn.className = cls;
				btn.innerHTML = `<i class="${icon}"></i>`;
				btn.onclick = () => window.open(url, '_blank');
				return btn;
			};
			//const googleSearchUrl = "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(title); // Image
			//const googleSearchUrl = "https://www.google.com/search?tbm=shop&q=" + encodeURIComponent(title); // Shopping
			const googleBtn = makeBtn('custom-google-btn', 'fab fa-google', `https://www.google.com/search?q=${encodeURIComponent(title)}`);
			const amazonBtn = makeBtn('custom-amazon-btn', 'fab fa-amazon', `https://www.amazon.com/s?k=${encodeURIComponent(title)}`);
			const ebayBtn = makeBtn('custom-ebay-btn', 'fab fa-ebay', `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(title)}`);

			btnContainer.appendChild(googleBtn);
			btnContainer.appendChild(amazonBtn);
			btnContainer.appendChild(ebayBtn);
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });
})();



