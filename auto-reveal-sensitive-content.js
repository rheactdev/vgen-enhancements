// ==UserScript==
// @name         VGen: Auto Reveal Sensitive Content 
// @namespace    https://github.com/rhea-manuel/vgen-enhancements
// @version      1.0
// @description  Automatically bypasses sensitive content warnings, lazy loading their thumbnails while scrolling.
// @author       https://github.com/rhea-manuel
// @match        *://vgen.co/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function getMediaUrl(element) {
        let fiberKey = Object.keys(element).find(k => k.startsWith('__reactFiber$'));
        if (!fiberKey) return null;
        let queue = [element[fiberKey]];
        let visited = new Set();
        while (queue.length > 0) {
            let node = queue.shift();
            if (!node || visited.has(node)) continue;
            visited.add(node);
            if (visited.size > 300) break;
            let p = node.memoizedProps;
            let data = p?.service || p?.product;
            if (data && data.galleryItems && data.galleryItems.length > 0) {
                return data.galleryItems[0].url;
            }
            if (node.child) queue.push(node.child);
            if (node.return) queue.push(node.return);
            if (node.sibling) queue.push(node.sibling);
        }
        return null;
    }

    function processCard(card) {
        if (card.dataset.matureRevealed === "true") return;
        card.dataset.matureRevealed = "true";

        const matureWarning = card.querySelector('[class*="MatureContentWarning__MatureContentOuterContainer"]');
        if (!matureWarning) return;

        const thumbContainer = card.querySelector('[class*="ThumbnailContainer"]');
        if (!thumbContainer) return;

        const mediaUrl = getMediaUrl(card);
        if (!mediaUrl) return;

        // 1. Hide the warning
        matureWarning.style.display = "none";

        // 2. Inject the unblurred image
        const isVideo = mediaUrl.endsWith('.webm') || mediaUrl.endsWith('.mp4');
        let injectedMedia = isVideo ? document.createElement('video') : document.createElement('img');

        injectedMedia.src = mediaUrl;
        if (isVideo) {
            injectedMedia.autoplay = true;
            injectedMedia.loop = true;
            injectedMedia.muted = true;
        }

        injectedMedia.className = "vgen-revealed-media";
        injectedMedia.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 5; /* Lower than the pricing box z-index */
            border-radius: inherit;
            pointer-events: none; /* CRITICAL: Let clicks pass through this to the card link */
        `;

        if (window.getComputedStyle(thumbContainer).position === 'static') {
            thumbContainer.style.position = 'relative';
        }

        thumbContainer.appendChild(injectedMedia);

        // 3. Fix Z-Index for Pricing Box
        // If the pricing box already exists or is added later, ensure it's on top
        const checkPricing = () => {
            const pricingBox = card.querySelector('.vgen-injected-pricing-box');
            if (pricingBox) {
                pricingBox.style.zIndex = "100";
                pricingBox.style.pointerEvents = "none"; // Ensure pricing doesn't block clicks either
            }
        };

        checkPricing();
        // Watch for the pricing script adding the box later
        const pricingObserver = new MutationObserver(checkPricing);
        pricingObserver.observe(card, { childList: true, subtree: true });
    }

    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                processCard(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px 0px', threshold: 0.01 });

    const domObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === 1) {
                    if (node.className && typeof node.className === 'string' &&
                       (node.className.includes('ServiceGridCard__GridCard') || node.className.includes('ProductListing__'))) {
                        lazyObserver.observe(node);
                    } else {
                        const cards = node.querySelectorAll('[class*="ServiceGridCard__GridCard"], [class*="ProductListing__"]');
                        cards.forEach(card => lazyObserver.observe(card));
                    }
                }
            }
        }
    });

    document.querySelectorAll('[class*="ServiceGridCard__GridCard"], [class*="ProductListing__"]').forEach(card => {
        lazyObserver.observe(card);
    });

    domObserver.observe(document.body, { childList: true, subtree: true });

})();
