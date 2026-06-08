import { createWarehouseTable as renderTable } from "../components/warehouseTable.js";
import { getItems, removeItem } from "../storage.js";

let sortState = {
  field: "",
  direction: "desc",
};

function sortItems(items) {
  if (!sortState.field) {
    return items;
  }

  const sortedItems = items.sort(function (a, b) {
    let result;

    if (sortState.field === "weight") {
      result = Number(a.weight) - Number(b.weight);
    } else if (sortState.field === "storageTime") {
      result = String(a.storageTime).localeCompare(String(b.storageTime), "ru");
    } else {
      result = String(a[sortState.field]).localeCompare(
        String(b[sortState.field]),
        "ru"
      );
    }

    return result * -1;
  });

  return sortedItems;
}

function handleSort(field, updateTable) {
  if (sortState.field === field) {
    sortState.field = "";
    sortState.direction = "desc";
  } else {
    sortState.field = field;
    sortState.direction = "desc";
  }

  updateTable();
}

export default function renderPage(container, navigate) {
  const page = document.createElement("div");
  const pageHeader = document.createElement("div");
  const title = document.createElement("h1");
  const actions = document.createElement("div");
  const addButton = document.createElement("button");
  let items = getItems();

  title.textContent = "Склад";
  pageHeader.className = "page-header";
  actions.className = "page-actions";

  addButton.type = "button";
  addButton.className = "primary-button";
  addButton.textContent = "Добавить запись";
  addButton.addEventListener("click", function () {
    navigate("add");
  });

  actions.appendChild(addButton);
  pageHeader.appendChild(title);
  pageHeader.appendChild(actions);
  page.appendChild(pageHeader);

  function updateTable() {
    const oldTable = page.querySelector("table");
    const sortedItems = sortItems(getItems().slice());
    const table = renderTable(
      sortedItems,
      sortState,
      function (field) {
        handleSort(field, updateTable);
      },
      function (id) {
        removeItem(id);
        updateTable();
      }
    );

    if (oldTable) {
      oldTable.replaceWith(table);
    } else {
      page.appendChild(table);
    }
  }

  items = sortItems(items.slice());
  page.appendChild(
    renderTable(
      items,
      sortState,
      function (field) {
        handleSort(field, updateTable);
      },
      function (id) {
        removeItem(id);
        updateTable();
      }
    )
  );

  container.innerHTML = "";
  container.appendChild(page);
}
