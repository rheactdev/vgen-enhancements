# VGen Enhancements: UserScript Suite

A collection of specialized JavaScript injections designed to optimize the browsing experience on [VGen](https://vgen.co).

## 🐵 Scripts

### 1. VGen: Open Products in Background Tab
Modern web apps like VGen use "Single Page Application" (SPA) routing which often breaks the ability to middle-click or right-click products into background tabs without the main page also changing.

* **True Backgrounding**: Uses the `GM_openInTab` API to ensure new tabs stay in the background while you keep your scroll position on the main page.
* **Zero Lag**: Skips the client-side transition delay entirely.
* [🍴 Install on GreasyFork](https://greasyfork.org/en/scripts/570219-vgen-open-products-in-background-tab)

### 2. VGen: Hover Price Revealer (Permanent Display)
VGen omits pricing data from the initial search results to save bandwidth. This script restores that data without requiring a click.

* **Hover Intent**: Triggers a fetch only when you hover over a card for **300ms**, mimicking human behavior to avoid anti-bot flags.
* **Stripe Math Correction**: Automatically converts raw API integers (cents) into readable currency (e.g., `20000` → `$200.00`).
* **Safety Lock**: Implements a `data-price-fetched` attribute to ensure each card is only requested once per session, preventing redundant network traffic.
* **Persistent UI**: Revealed prices stay on the card permanently until the page is refreshed.
* [🍴 Install on GreasyFork](https://greasyfork.org/en/scripts/570220-vgen-hover-price-revealer-permanent-display)

## 🛠️ To Do
- [ ] Make VGen: Open Products in Background Tab work on products not on the shop page (i.e: from the home page, shop tab on user profile, etc.)
