const formEl = document.querySelector('#card-form');
const textInputEl = document.querySelector('#custom-text-input');
const colorSelectEl = document.querySelector('#color-choice');

const cardEl = document.querySelector('#card-container');
const customTextEl = cardEl.querySelector('#custom-text');

const outputData = {
    customText: '',
    selectedColor: '',
    set: function(text, color){
        this.customText = text;
        this.selectedColor = color;
    }
}

textInputEl.addEventListener('input', (e) => {
    const textValue = textInputEl.value.trim();
    customTextEl.textContent = textValue;
});

textInputEl.addEventListener('focus', () => {
    textInputEl.classList.toggle("input-focused")
    customTextEl.classList.toggle("input-focused")
});

textInputEl.addEventListener('blur', () => {
    textInputEl.classList.toggle("input-focused")
    customTextEl.classList.toggle("input-focused")
});

colorSelectEl.addEventListener('change', () => {
    const selectedColor = colorSelectEl.value;
    changeCardColor(selectedColor);
});

formEl.addEventListener('submit', (e) => {
    e.preventDefault(); 
    approveCardStyle(); 
});

function approveCardStyle() {
    const elements = formEl.elements;
    const customText = elements['custom-text-input'].value.trim()
    const selectedColor = elements['color-choice'].value.trim()
    
    const output = Object.create(outputData);
    output.set(customText, selectedColor);
    console.log(output);
}

function changeCardColor(colorName) {
    cardEl.className = colorName;
}



changeCardColor(colorSelectEl.value);