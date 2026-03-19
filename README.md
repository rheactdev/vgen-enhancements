# VGen Enhancements: UserScript Suite

A collection of specialized JavaScript injections designed to optimize the browsing experience on [VGen](https://vgen.co).

## ⚖️ Legal Disclaimer

**Please read carefully before installing:**

These scripts are provided for personal use and optimization purposes only. 
1. **Age Requirement**: The "Auto Reveal Sensitive Content" script is intended for adult users only. By installing this script, you certify that you are at least **18 years of age** and that viewing mature content is legal in your jurisdiction.
2. **Responsibility**: The author of these scripts is not responsible for any content viewed, nor for any potential account actions taken by VGen. 
3. **No Affiliation**: This suite is an independent project and is not affiliated with, endorsed by, or supported by VGen.co.

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

### 3. VGen: Auto Reveal Sensitive Content
Bypasses the "Sensitive Content" warning wall and blur filters automatically as you browse, ensuring a seamless gallery experience without manual clicks.

* **Virtual DOM Interception**: Bypasses VGen’s React-based lazy loading by extracting high-res media URLs directly from the `__reactFiber$` memory state.
* **Smart Intersection Observer**: Implements a "Lazy Load" buffer that only reveals and downloads images when they are within **200px** of your scroll position, keeping network traffic identical to a standard user.
* **Zero-Action Bypass**: Removes the need for the "Are you sure?" confirmation modal.
* **Click-Through Transparency**: Uses strict `z-index` management and `pointer-events: none` on revealed layers to ensure the card’s native links and the **Price Revealer** script both remain fully functional.
* [🍴 Install on GreasyFork](https://greasyfork.org/en/scripts/570263-vgen-auto-reveal-sensitive-content)

## 🛠️ To Do
- [x] ~~Make VGen: Open Products in Background Tab work on products not on the shop page (i.e: from the home page, shop tab on user profile, etc.)~~ Done!
- [x] ~~Implement non-destructive Mature Content auto-reveal~~ Done!
