let root;

function showLoader() {
  root.innerHTML =
    '<div class="loader-wrap"><div class="loader"></div><p>Загрузка...</p></div>';
}

async function navigate(name) {
  let pageModule;
  showLoader();
  switch (name){
    case "add":
      pageModule = await import("./pages/addItemPage.js");
      break;
    default:
      pageModule = await import("./pages/warehousePage.js");
      break;
  }
  pageModule.default(root, navigate);
}


export function initRouter(container) {
  root = container;
  navigate();
}
