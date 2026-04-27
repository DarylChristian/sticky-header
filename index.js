/**
 * confluence-freeze-header.js
 *
 * A bookmarklet that freezes the header row of all tables on a Confluence page,
 * keeping column headers visible while scrolling through long tables.
 *
 * Usage: See README.md for installation instructions.
 * Repo:  https://github.com/your-org/confluence-freeze-header
 */

(function () {
  var SELECTORS = '.confluenceTable, table.wrapped, .wiki-content table';
  var MAX_HEIGHT = '70vh';
  var HEADER_BG = '#f4f5f7';
  var HEADER_SHADOW = '0 1px 0 #ccc';

  var tables = document.querySelectorAll(SELECTORS);

  if (!tables.length) {
    alert('[Freeze Header] No tables found on this page.');
    return;
  }

  var frozen = 0;

  tables.forEach(function (table, index) {
    // Skip tables that are already wrapped
    if (table.parentNode && table.parentNode.dataset.freezeWrapper) return;

    var firstRow = table.querySelector('tr');
    if (!firstRow) return;

    var headerCells = firstRow.querySelectorAll('th, td');
    if (!headerCells.length) return;

    // Wrap the table in a scrollable container
    var wrapper = document.createElement('div');
    wrapper.dataset.freezeWrapper = 'true';
    wrapper.style.cssText = [
      'overflow-x: auto',
      'overflow-y: auto',
      'max-height: ' + MAX_HEIGHT,
      'position: relative',
      'border: 1px solid #dfe1e6',
      'border-radius: 3px',
    ].join('; ');

    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);

    // Make header cells sticky
    headerCells.forEach(function (cell) {
      cell.style.position = 'sticky';
      cell.style.top = '0';
      cell.style.zIndex = '2';
      cell.style.backgroundColor = HEADER_BG;
      cell.style.boxShadow = HEADER_SHADOW;
    });

    frozen++;
    console.log('[Freeze Header] Frozen table #' + (index + 1));
  });

  if (frozen > 0) {
    console.log('[Freeze Header] Done. ' + frozen + ' table(s) updated.');
    alert('[Freeze Header] Done! ' + frozen + ' table(s) updated.');
  } else {
    alert('[Freeze Header] All tables on this page are already frozen.');
  }
})();
