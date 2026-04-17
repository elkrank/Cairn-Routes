function initialSortTable() {
    const table = document.querySelector('table.sortable');
    if (table) {
        const firstHeader = table.tHead.rows[0].cells[0];
        if (firstHeader)
            sorttable.innerSortFunction.apply(firstHeader, []);
    }
};