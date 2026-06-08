export function createWarehouseTable(items, sortState, onSort, onDelete) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  const columns = [
    { key: "name", label: "Название" },
    { key: "shelf", label: "Полка" },
    { key: "weight", label: "Вес" },
    { key: "storageTime", label: "Время хранения" },
  ];

  headerRow.className = "table-header-row";

  columns.forEach(function (column) {
    const cell = document.createElement("td");
    const isActive = sortState.field === column.key;

    cell.className = "sortable-header-cell";

    if (isActive) {
      cell.classList.add("table-header-active");
    }

    cell.textContent = column.label;
    cell.addEventListener("click", function () {
      onSort(column.key);
    });

    headerRow.appendChild(cell);
  });

  const actionCellHeader = document.createElement("td");
  actionCellHeader.textContent = "Действие";
  headerRow.appendChild(actionCellHeader);
  thead.appendChild(headerRow);

  if (items.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 5;
    cell.className = "empty-cell";
    cell.textContent = "На складе пока нет записей.";
    row.appendChild(cell);
    tbody.appendChild(row);
  }

  items.forEach(function (item) {
    const row = document.createElement("tr");

    row.innerHTML =
      "<td>" +
      item.name +
      "</td>" +
      "<td>" +
      item.shelf +
      "</td>" +
      "<td>" +
      item.weight +
      "</td>" +
      "<td>" +
      item.storageTime +
      "</td>";

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "danger-button";
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", function () {
      onDelete(item.id);
    });

    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);

  return table;
}
