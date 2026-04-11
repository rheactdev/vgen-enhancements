# VGen Enhancements: UserScript Suite

A collection of specialized JavaScript injections designed to optimize the browsing experience on [VGen](https://vgen.co).

## ⚖️ Legal Disclaimer

**Please read carefully before installing:**

These scripts are provided for personal use and optimization purposes only.
1. **Age Requirement**: The "Auto Reveal Sensitive Content" script is intended for adult users only. By installing this script, you certify that you are at least **18 years of age** and that viewing mature content is legal in your jurisdiction.
2. **Responsibility**: The author of these scripts is not responsible for any content viewed, nor for any potential account actions taken by VGen.
3. **No Affiliation**: This suite is an independent project and is not affiliated with, endorsed by, or supported by VGen.co.

## 🐵 Combined Script

All features are bundled into a single ultra-optimized userscript (`combined.js`) with per-feature toggles via the Tampermonkey/Greasemonkey menu.

### Features

#### 1. Open Products in Background Tab
Modern web apps like VGen use "Single Page Application" (SPA) routing which often breaks the ability to middle-click or right-click products into background tabs without the main page also changing.

* **True Backgrounding**: Uses the `GM_openInTab` API to ensure new tabs stay in the background while you keep your scroll position on the main page.
* **Zero Lag**: Skips the client-side transition delay entirely.
* Toggle: `Background Tabs: ON/OFF`

#### 2. Hover Price Revealer (Permanent Display)
VGen omits pricing data from the initial search results to save bandwidth. This script restores that data without requiring a click.

* **Hover Intent**: Triggers a fetch only when you hover over a card for **300ms**, mimicking human behavior to avoid anti-bot flags.
* **Stripe Math Correction**: Automatically converts raw API integers (cents) into readable currency (e.g., `20000` → `$200.00`).
* **License Badges**: Displays commercial use, merchandising, and custom license info as color-coded badges.
* **Discount Tags**: Shows active sale percentages directly on the card.
* **Persistent UI**: Revealed prices stay on the card permanently until the page is refreshed.

#### 3. Auto Reveal Sensitive Content
Bypasses the "Sensitive Content" warning wall and blur filters automatically as you browse, ensuring a seamless gallery experience without manual clicks.

* **Virtual DOM Interception**: Bypasses VGen's React-based lazy loading by extracting high-res media URLs directly from the `__reactFiber$` memory state.
* **Pure CSS Blur Removal**: Overrides VGen's `filter: blur()` rules on `.blurContainer` elements with zero JavaScript overhead — works on shop cards, notification panels, and any scroll-loaded content automatically.
* **Zero-Action Bypass**: Removes the need for the "Are you sure?" confirmation modal.
* **Click-Through Transparency**: Uses strict `z-index` management and `pointer-events: none` on revealed layers to ensure the card's native links and the **Price Revealer** both remain fully functional.
* Toggle: `Auto-Reveal Sensitive: ON/OFF`

#### 4. Notification Grid View
Transforms VGen's notification dropdown into a full-page responsive grid for visual browsing of new commissions and products.

* **Full-Page Grid**: Expands the notification panel to fill the viewport with a responsive card grid layout.
* **Native Scroll Preserved**: Uses a CSS class toggle approach so all React functionality (infinite scroll, filters, click handlers) remains intact.
* **Smart Filtering**: Automatically hides notifications without image previews (e.g., broken vsona listings) using a pure CSS `:has()` selector — no JavaScript overhead.
* **Card Layout**: Product thumbnails and commission cover images display as full-width hero images with notification text below.
* Toggle: `Grid Notification Display: ON/OFF` (hides/shows the Grid View button)

## ⚙️ Configuration

All features are toggled via the Violentmonkey/Tampermonkey/Greasemonkey extension menu:

| Toggle | Default | Description |
|---|---|---|
| Background Tabs | OFF | Open cards in background tabs on click |
| Auto-Reveal Sensitive | OFF | Remove blur filters and content warnings site-wide |
| Grid Notification Display | OFF | Show the Grid View button in the notifications panel |

## 🛠️ To Do
- [x] ~~Make VGen: Open Products in Background Tab work on products not on the shop page~~ Done!
- [x] ~~Implement non-destructive Mature Content auto-reveal~~ Done!
- [x] ~~Notification Grid View with full-page layout~~ Done!
- [x] ~~Pure CSS blur removal for notifications~~ Done!
- [x] ~~Hide broken/imageless notifications in grid mode~~ Done!
