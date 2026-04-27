# Confluence Freeze Header

A lightweight bookmarklet that freezes the header row of all tables on a Confluence page — keeping column headers visible as you scroll through long tables.

No plugins, no admin access, no installation required.

---

## What it does

- Finds all tables on the current Confluence page
- Makes the first row **sticky** so it stays visible while scrolling
- Wraps each table in a scrollable container (capped at 70% of viewport height)
- Shows a confirmation alert with how many tables were updated
- Skips tables that have already been frozen (safe to click multiple times)

---

## Installation

### Option A — Drag to bookmarks bar (easiest)

1. Make sure your bookmarks bar is visible
   - **Chrome / Edge:** `Ctrl+Shift+B` (Windows) or `Cmd+Shift+B` (Mac)
   - **Firefox:** `View → Toolbars → Bookmarks Toolbar`

2. Create a new bookmark manually:
   - **Chrome:** Right-click the bookmarks bar → *Add page*
   - **Firefox:** Right-click the bookmarks bar → *Add Bookmark*
   - **Edge:** Right-click the bookmarks bar → *Add favorite*

3. Fill in the fields:
   - **Name:** `Freeze Table Headers` (or anything you like)
   - **URL:** Copy the contents of [`bookmarklet.min.js`](#bookmarklet) below and paste it as the URL

### Option B — Browser console (no setup)

1. Open your Confluence page
2. Press `F12` to open DevTools → go to the **Console** tab
3. Paste the full contents of [`confluence-freeze-header.js`](./confluence-freeze-header.js)
4. Press `Enter`

---

## Bookmarklet

Copy this entire line and paste it as the URL when creating your bookmark:

```
javascript:(function(){var SELECTORS='.confluenceTable,table.wrapped,.wiki-content table';var MAX_HEIGHT='70vh';var HEADER_BG='#f4f5f7';var HEADER_SHADOW='0 1px 0 #ccc';var tables=document.querySelectorAll(SELECTORS);if(!tables.length){alert('[Freeze Header] No tables found on this page.');return;}var frozen=0;tables.forEach(function(table,index){if(table.parentNode&&table.parentNode.dataset.freezeWrapper)return;var firstRow=table.querySelector('tr');if(!firstRow)return;var headerCells=firstRow.querySelectorAll('th,td');if(!headerCells.length)return;var wrapper=document.createElement('div');wrapper.dataset.freezeWrapper='true';wrapper.style.cssText='overflow-x:auto;overflow-y:auto;max-height:'+MAX_HEIGHT+';position:relative;border:1px solid #dfe1e6;border-radius:3px;';table.parentNode.insertBefore(wrapper,table);wrapper.appendChild(table);headerCells.forEach(function(cell){cell.style.position='sticky';cell.style.top='0';cell.style.zIndex='2';cell.style.backgroundColor=HEADER_BG;cell.style.boxShadow=HEADER_SHADOW;});frozen++;});if(frozen>0){alert('[Freeze Header] Done! '+frozen+' table(s) updated.');}else{alert('[Freeze Header] All tables on this page are already frozen.');}})();
```

---

## Usage

1. Navigate to any Confluence page that has a long table
2. Click **Freeze Table Headers** in your bookmarks bar
3. A popup will confirm how many tables were updated
4. Scroll down — the header row will now stay pinned at the top

> **Note:** The effect lasts for your current page session only. If you refresh or navigate away, click the bookmarklet again.

---

## Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome  | ✅ |
| Edge    | ✅ |
| Firefox | ✅ |
| Safari  | ✅ |

Works on **Confluence Cloud** and **Confluence Data Center / Server**.

---

## Limitations

- Only freezes the **first row** of each table. Multiple header rows are not supported.
- Does not persist after a page refresh — click the bookmarklet again when needed.
- May not work correctly if tables are nested inside other tables.
- Does not apply in **Confluence editor mode** — view mode only.

---

## Files

```
confluence-freeze-header/
├── confluence-freeze-header.js   # Full readable source
└── README.md                     # This file
```

---

## License

MIT — free to use, modify, and distribute.
