import { addItem } from "../storage.js";

function createField(labelText, name, type, step) {
  const wrapper = document.createElement("label");
  const span = document.createElement("span");
  const input = document.createElement("input");

  wrapper.className = "field";
  span.textContent = labelText;
  input.name = name;
  input.type = type || "text";
  if (step && !isNaN(step) && +step > 0) input.step = step;
  input.autocomplete = "off";
  
  wrapper.appendChild(span);
  wrapper.appendChild(input);

  input.addEventListener('input', () => { 
    input.setCustomValidity("");
    input.classList.remove("field-error");
  });

  return {
    wrapper: wrapper,
    input: input,
  };
}

function validate(fields) {
  for (const field of fields) {
    const value = field.input.value.trim();

    function setInvalid(message) {
      field.input.setCustomValidity(message);
      field.input.classList.add("field-error")
      field.input.reportValidity();
    }

    if (!value || value === "") {
      setInvalid("Поле обязательно для заполнения.");
      return false;
    }

    if (field.input.name === "weight" && +value <= 0) {
      setInvalid("Введите число больше нуля.");
      return false;
    } else if (field.input.name === "storage-time") {
      try {
        const year = new Date(value).getFullYear();
        if (+year < 1900) {
          setInvalid("Год должен быть больше 1900.");
          return false;
        }
      } catch (error){
        setInvalid("Ошибка форматирования даты.")
        console.error(error);
        return false;
      }
    }
  }

  return true;
}

export default function renderPage(container, navigate) {
  const page = document.createElement("div");
  const title = document.createElement("h1");
  const form = document.createElement("form");
  const buttons = document.createElement("div");
  const saveButton = document.createElement("button");
  const backButton = document.createElement("button");
  const nameField = createField("Название", "name", "text");
  const shelfField = createField("Полка", "shelf", "text");
  const weightField = createField("Вес", "weight", "number", 0.1);
  const timeField = createField("Время хранения", "storage-time", "date");
  const fields = [nameField, shelfField, weightField, timeField];

  title.textContent = "Добавить запись";
  form.className = "warehouse-form";
  buttons.className = "page-actions";

  fields.forEach(function (field) {
    form.appendChild(field.wrapper);
  });

  saveButton.type = "submit";
  saveButton.className = "primary-button";
  saveButton.textContent = "Добавить";

  backButton.type = "button";
  backButton.className = "secondary-button";
  backButton.textContent = "Назад";
  backButton.addEventListener("click", function () {
    navigate("warehouse");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validate(fields)) {
      return;
    }

    addItem({
      name: nameField.input.value.trim(),
      shelf: shelfField.input.value.trim(),
      weight: weightField.input.value.trim(),
      storageTime: timeField.input.value.trim(),
    });

    navigate("warehouse");
  });

  buttons.appendChild(saveButton);
  buttons.appendChild(backButton);
  form.appendChild(buttons);
  page.appendChild(title);
  page.appendChild(form);

  container.innerHTML = "";
  container.appendChild(page);
}
