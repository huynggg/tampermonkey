// ==UserScript==
// @name         allsurplus_helpers
// @namespace    http://tampermonkey.net/
// @version      1.7.4
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

    .custom-btn {
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
		justify-content: left;
	}

    .custom-google-btn i {
	    color: #3367D6;
	}
	.custom-amazon-btn i {
	    color: #CC7A00;
	}
	.custom-ebay-btn i {
	    color: #B22222;
	}
`);

	const makeBtn = (cls, icon, url) => {
		const btn = document.createElement('button');
		btn.className = `${cls} custom-btn`;
		btn.innerHTML = `<i class="${icon}"></i>`;
		btn.onclick = () => window.open(url, '_blank');
		return btn;
	};
	const observer = new MutationObserver(() => {
		// For items on general pages
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
			if (title === null) {
				title = container.querySelector('.card-title > span').getAttribute('title');
			}

			btnContainer.appendChild(makeBtn('custom-google-btn', 'fab fa-google', `https://www.google.com/search?q=${encodeURIComponent(title)}`));
			btnContainer.appendChild(makeBtn('custom-amazon-btn', 'fab fa-amazon', `https://www.amazon.com/s?k=${encodeURIComponent(title)}`));
			btnContainer.appendChild(makeBtn('custom-ebay-btn', 'fab fa-ebay', `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(title)}&LH_Sold=1`));
			containerBody.appendChild(btnContainer);
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });

	// For items in detail page
	const checkExist = setInterval(() => {
		const productTitleElement = document.querySelector('.product-title');
		if (productTitleElement) {
			clearInterval(checkExist);
			const productTitle = productTitleElement.textContent;

			const btnContainerTitle = document.createElement('div');
			btnContainerTitle.className = 'btn-container';
			const btnContainerDesc = document.createElement('div');
			btnContainerDesc.className = 'btn-container';

			btnContainerTitle.appendChild(makeBtn('custom-google-btn', 'fab fa-google', `https://www.google.com/search?q=${encodeURIComponent(productTitle)}`));
			btnContainerTitle.appendChild(makeBtn('custom-amazon-btn', 'fab fa-amazon', `https://www.amazon.com/s?k=${encodeURIComponent(productTitle)}`));
			btnContainerTitle.appendChild(makeBtn('custom-ebay-btn', 'fab fa-ebay', `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(productTitle)}&LH_Sold=1`));
			btnContainerDesc.appendChild(makeBtn('custom-google-btn', 'fab fa-google', `https://www.google.com/search?q=${encodeURIComponent(productTitle)}`));
			btnContainerDesc.appendChild(makeBtn('custom-amazon-btn', 'fab fa-amazon', `https://www.amazon.com/s?k=${encodeURIComponent(productTitle)}`));
			btnContainerDesc.appendChild(makeBtn('custom-ebay-btn', 'fab fa-ebay', `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(productTitle)}&LH_Sold=1`));
			// productTitleElement.parentNode.appendChild(googleBtnDetail);
			const descriptionElement = document.querySelector('.description-body');
			descriptionElement.appendChild(btnContainerDesc);
			productTitleElement.appendChild(btnContainerTitle);
		}
	}, 500); // check every 500ms

})();
