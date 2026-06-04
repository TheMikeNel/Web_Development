const formEl = document.querySelector('#post-form');

const nameInputEl = document.querySelector('#product-name');
const weightInputEl = document.querySelector('#weight');
const distanceInputEl = document.querySelector('#distance');

const productContainerEl = document.querySelector('.product-table-container');

const formData = {
    name: '',
    weight: 0,
    distance: 0
}

const productData = {
    ...formData,
    deliveryCost: 0
}

function resetForm() {
    formEl.reset();
}

function fetchFormData() {
    const formDataObj = Object.create(formData);

    for (const key in formData) {
        const element = formEl.elements[key];
        console.log(`Element for key "${key}":`, element);

        if (!element) {            
            console.warn(`No form element found for key "${key}"`);
            continue;
        }

        formDataObj[key] = element.value.trim();
    }

    console.log('Form data object:', formDataObj);
    resetForm();
    return formDataObj;
}

function calculateDeliveryCost(weight, distance) {
    const baseCost = 5;
    const weightCost = weight * 0.5;
    const distanceCost = distance * 0.2;
    return (baseCost + ((weight * distance) / 10));
}

function addProduct(productDataObj){
    const newRow = document.createElement('tr');
    for (const key in productDataObj) {
        const value = productDataObj[key];
        console.log('Adding value to table:', value);
        const newCell = document.createElement('td');
        newCell.textContent = value;
        newRow.appendChild(newCell);
    }
    productContainerEl.appendChild(newRow);
}

nameInputEl.addEventListener('input', () => {
    if (nameInputEl.value.trim() === '') {
        nameInputEl.setCustomValidity('Product name cannot be empty!');
    } else {
        nameInputEl.setCustomValidity('');
    }
});

weightInputEl.addEventListener('input', () => {
    if (weightInputEl.value.trim() === '') {
        weightInputEl.setCustomValidity('Weight cannot be empty!');
    } else {
        weightInputEl.setCustomValidity('');
    }
});

distanceInputEl.addEventListener('input', () => {
    if (distanceInputEl.value.trim() === '') {
        distanceInputEl.setCustomValidity('Distance cannot be empty!');
    } else {
        distanceInputEl.setCustomValidity('');
    }
});

formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    if (nameInputEl.value.trim() === '') {
        nameInputEl.setCustomValidity('Product name cannot be empty!');
        formEl.reportValidity();
        return;
    }

    if (weightInputEl.value.trim() === '' || weightInputEl.value < 0) {
        weightInputEl.setCustomValidity('Weight cannot be empty or negative!');
        formEl.reportValidity();
        return;
    }

    if (distanceInputEl.value.trim() === '' || distanceInputEl.value < 0) {
        distanceInputEl.setCustomValidity('Distance cannot be empty or negative!');
        formEl.reportValidity();
        return;
    }

    const formDataObj = Object.assign({}, productData, fetchFormData());
    formDataObj.deliveryCost = calculateDeliveryCost(formDataObj.weight, formDataObj.distance);
    addProduct(formDataObj);
});