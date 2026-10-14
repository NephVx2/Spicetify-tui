// NAME: Flat Backgrounds
// AUTHORS: nephren
// DESCRIPTION: Applies the "TUI" style to the main panel (#main-view) without relying on Spotify's generated class names:
//   1. removes color tints and gradients (sticky bars / headers: plain theme color, everything else: transparent);
//   2. hides the header cover art (playlist, album, artist...) when the theme sets --display-header-image: none,
//      detecting the image by its size and context, not by the page structure.
//   Processing happens directly in the MutationObserver callback, i.e. before the next paint: no flash.
//   It also tags the artist name with the "tui-entity-title" class, which user.css styles with the ASCII title font.

(function flatBackgrounds() {
	if (!document.body || !document.head) {
		setTimeout(flatBackgrounds, 100);
		return;
	}

	const FLAT = "tui-flat";
	const SOLID = "tui-solid";
	const HIDE = "tui-hide";
	const TITLE = "tui-entity-title";
	const ROOT_SELECTOR = "#main-view";
	// elements whose background must stay untouched (inputs, buttons, rows, menus...)
	const SKIP = 'button, input, textarea, select, [role="row"], [role="menu"], [role="dialog"], dialog, [aria-selected="true"]';

	const style = document.createElement("style");
	style.id = "tui-flat-backgrounds";
	style.textContent = `
		.${FLAT}, .${FLAT}::before, .${FLAT}::after {
			background: none !important;
			background-color: transparent !important;
		}
		.${SOLID}, .${SOLID}::before, .${SOLID}::after {
			background-image: none !important;
			background-color: var(--spice-main) !important;
		}
		.${HIDE} {
			display: none !important;
		}
	`;
	document.head.appendChild(style);

	const isPainted = s =>
		(s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent") ||
		s.backgroundImage.includes("gradient(");

	function hasPaint(e) {
		if (isPainted(getComputedStyle(e))) return true;
		for (const pseudo of ["::before", "::after"]) {
			const s = getComputedStyle(e, pseudo);
			if (s.content !== "none" && isPainted(s)) return true;
		}
		return false;
	}

	const headerImagesHidden = () =>
		getComputedStyle(document.documentElement).getPropertyValue("--display-header-image").trim() === "none";

	// header cover art: large image near the top of the page, inside an entity header,
	// or with the sizes attribute used by header covers, or in the block that contains the title (h1)
	function hideHeaderCover(img, root) {
		if (!headerImagesHidden()) return;
		const r = img.getBoundingClientRect();
		if (r.width < 100 || r.height < 100) return;
		if (r.top - root.getBoundingClientRect().top > 450) return;
		const spacing = img.closest(".contentSpacing");
		// the image must come BEFORE the h1: on "Show all" / grid pages, the h1 comes before the cards
		const h1 = spacing && spacing.querySelector("h1");
		const beforeTitle = h1 && img.compareDocumentPosition(h1) & Node.DOCUMENT_POSITION_FOLLOWING;
		const looksLikeCover =
			img.closest('[data-testid="entity-header"]') ||
			(img.getAttribute("sizes") || "").includes("232px") ||
			beforeTitle;
		if (!looksLikeCover) return;

		// walk up while the parent is no wider than the image and contains no text
		let top = img;
		while (top.parentElement && top.parentElement !== root) {
			const p = top.parentElement;
			if (p.getBoundingClientRect().width > r.width + 12) break;
			if (p.textContent.trim().length > 0) break;
			top = p;
		}
		top.classList.add(HIDE);
	}

	// title without an h1 (e.g. artist name): the leaf element whose text is the page name (aria-label of <main>)
	function styleEntityTitles(root) {
		const main = document.querySelector("main");
		const name = ((main && main.getAttribute("aria-label")) || "").split(" | ")[0].trim();
		if (!name) return;
		for (const header of root.querySelectorAll('[data-testid="entity-header"]')) {
			if (header.querySelector("." + TITLE)) continue;
			const el = Array.from(header.querySelectorAll("*")).find(
				n => n.children.length === 0 && n.textContent.trim() === name && !n.closest("h1")
			);
			if (el) el.classList.add(TITLE);
		}
	}

	function consider(e, rootWidth, root) {
		if (e.tagName === "IMG") {
			hideHeaderCover(e, root);
			return;
		}
		if (e.classList.contains(FLAT) || e.classList.contains(SOLID)) return;
		const r = e.getBoundingClientRect();
		// only large bands: leave cards, tiles and buttons alone
		if (r.width < rootWidth * 0.85 || r.height < 8) return;
		if (e.closest(SKIP) || e.matches(":hover")) return;
		if (!hasPaint(e)) return;
		const position = getComputedStyle(e).position;
		const solid = e.closest("header") || position === "sticky" || position === "fixed";
		e.classList.add(solid ? SOLID : FLAT);
	}

	function process(nodes) {
		const root = document.querySelector(ROOT_SELECTOR);
		if (!root) return;
		const rootWidth = root.getBoundingClientRect().width;
		if (!rootWidth) return;
		const seen = new Set();
		const visit = e => {
			if (seen.has(e)) return;
			seen.add(e);
			consider(e, rootWidth, root);
		};
		for (const n of nodes) {
			if (n.nodeType !== 1 || n === root || !root.contains(n)) continue;
			visit(n);
			n.querySelectorAll("*").forEach(visit);
		}
		styleEntityTitles(root);
	}

	function onMutations(mutations) {
		const nodes = new Set();
		for (const m of mutations) {
			if (m.type === "childList") {
				m.addedNodes.forEach(n => nodes.add(n));
			} else {
				nodes.add(m.target);
			}
		}
		try {
			process(nodes);
		} catch (err) {
			console.warn("[flatBackgrounds]", err);
		}
	}

	function attach() {
		const root = document.querySelector(ROOT_SELECTOR);
		if (!root) {
			setTimeout(attach, 300);
			return;
		}
		new MutationObserver(onMutations).observe(root, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["style", "class", "src", "data-image-status", "aria-label"]
		});
		try {
			process(Array.from(root.children));
		} catch (err) {
			console.warn("[flatBackgrounds]", err);
		}
	}

	attach();
})();
