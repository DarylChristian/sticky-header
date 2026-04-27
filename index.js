(function () {
  var tables = document.querySelectorAll(
    '.confluenceTable, table.wrapped, .wiki-content table'
  );

  if (!tables.length) {
    console.warn('[freezeHeader] No Confluence tables found on this page.');
    return;
  }

  var frozen = 0;

  tables.forEach(function (table, idx) {
    var firstRow = table.querySelector('tr');
    if (!firstRow) return;

    var cells = firstRow.querySelectorAll('th, td');
    if (!cells.length) return;

    var wrapper = document.createElement('div');
    wrapper.style.cssText =
      'overflow-x: auto; overflow-y: auto; max-height: 70vh; position: relative;';

    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);

    cells.forEach(function (cell) {
      cell.style.cssText +=
        'position: sticky; top: 0; z-index: 2;' +
        'background: #f4f5f7; box-shadow: 0 1px 0 #ccc;';
    });

    frozen++;
    console.log('[freezeHeader] Frozen header on table #' + (idx + 1));
  });

  console.log('[freezeHeader] Done. ' + frozen + ' table(s) updated.');
})();