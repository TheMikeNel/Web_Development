const formEl = document.querySelector('#user-form');

const usernameInputEl = document.querySelector('#username');
const emailInputEl = document.querySelector('#email');

const ratingInputEl = document.querySelector('#rating-input');
const ratingOutputEl = document.querySelector('#rating-output');
ratingOutputEl.textContent = ratingInputEl.value;
ratingInputEl.addEventListener('input', () => {
    ratingOutputEl.textContent = ratingInputEl.value;
});

const formData = {
    username: 'new_user',
    email: '',
    sex: '',
    rating: 1,
    hobbies: [],
    comment: '',
}

function fetchFormData() {
    const formDataObj = Object.assign({}, formData);

    for (const key in formData) {
        const element = formEl.elements[key];
        console.log(`Element for key "${key}":`, element);

        if (!element) {            
            console.warn(`No form element found for key "${key}"`);
            continue;
        }

        const value = element.value.trim();
        if (element.value.trim() !== '') {
            formDataObj[key] = element.value;
            continue;
        }
        
        if (element[0] && element[0].type === 'checkbox') {
            if (!formDataObj[element[0].name]) {
                formDataObj[element[0].name] = [];
            }

            for (const checkbox of element) {
                if (checkbox.checked) {
                    formDataObj[element[0].name].push(checkbox.value);
                }
            }
        }
    }

    console.log('Form data object:', formDataObj);
    return formDataObj;
}

function displayFormResults(formDataObj){
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');

    const resultEl = document.createElement('h2');
    resultEl.textContent = 'Form Results';
    resultContainer.appendChild(resultEl);

    for (const key in formDataObj) {
        const value = formDataObj[key];
        const itemEl = document.createElement('p');
        itemEl.textContent = `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
        resultContainer.appendChild(itemEl);
    }
    document.body.appendChild(resultContainer);
}

usernameInputEl.addEventListener('input', () => {
    if (usernameInputEl.value.trim() === '') {
        usernameInputEl.setCustomValidity('Username cannot be empty!');
    } else {
        usernameInputEl.setCustomValidity('');
    }
});

emailInputEl.addEventListener('input', () => {
    if (emailInputEl.value.trim() === '') {
        emailInputEl.setCustomValidity('Email cannot be empty!');
    } else {
        emailInputEl.setCustomValidity('');
    }
});

formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    if (usernameInputEl.value.trim() === '') {
        usernameInputEl.setCustomValidity('Username cannot be empty!');
        formEl.reportValidity();
        return;
    }

    if (emailInputEl.value.trim() === '') {
        emailInputEl.setCustomValidity('Email cannot be empty!');
        formEl.reportValidity();
        return;
    }

    const formDataObj = fetchFormData();
    displayFormResults(formDataObj);
});