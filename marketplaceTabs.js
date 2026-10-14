// NAME: Marketplace Tabs Fix
// AUTHORS: nephren
// DESCRIPTION: Spotify >= 1.3.3 removed .main-topBar-topbarContentWrapper, the element the Marketplace tab bar
//   (Extensions / Themes / Snippets / Apps) mounts into. This extension recreates it inside #main-view.
//   Workaround for the upstream bug spicetify/marketplace #1253 / #1265: remove it once the Marketplace is fixed
//   (spicetify config extensions marketplaceTabs.js-  then  spicetify apply).

(function marketplaceTabs() {
	const ID = "tui-tabhost";
	const root = document.querySelector("#main-view");
	if (!root || !document.head) {
		setTimeout(marketplaceTabs, 300);
		return;
	}

	if (!document.getElementById(ID + "-style")) {
		const style = document.createElement("style");
		style.id = ID + "-style";
		style.textContent = `
			#main-view { position: relative; }
			#${ID} {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				height: 64px;
				z-index: 5;
				display: flex;
				align-items: center;
				padding: 0 16px;
				pointer-events: none; /* does not block clicks on other pages */
			}
			#${ID} > * { pointer-events: auto; }
		`;
		document.head.appendChild(style);
	}

	function ensureHost() {
		if (document.getElementById(ID)) return;
		const host = document.createElement("div");
		host.id = ID;
		host.className = "main-topBar-topbarContentWrapper";
		root.prepend(host);
	}

	ensureHost();
	// if Spotify re-renders #main-view and removes the element, put it back
	new MutationObserver(ensureHost).observe(root, { childList: true });
})();
