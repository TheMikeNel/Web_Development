function getItems() {
  const items = localStorage.getItem("warehouseItems");

  if (!items) {
    return [];
  }

  return JSON.parse(items);
}

function saveItems(items) {
  localStorage.setItem("warehouseItems", JSON.stringify(items));
}

function addItem(item) {
  const items = getItems();

  item.id = String(Date.now());
  items.push(item);

  saveItems(items);
}

function removeItem(id) {
  const items = getItems().filter(function (item) {
    return item.id !== id;
  });

  saveItems(items);
}

export {
  getItems,
  saveItems,
  addItem,
  removeItem
}
