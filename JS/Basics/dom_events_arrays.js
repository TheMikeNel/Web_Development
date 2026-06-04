// DOM - Document Object Model
// const content = document.querySelector('.content');
// const buttonEl = document.createElement('button');
// buttonEl.textContent = "Add header"
// content.append(buttonEl);
// let count = 0;
// buttonEl.onclick = () =>
// {
//     count++;
//     const h2El = document.createElement('h2');
//     h2El.textContent = `count: ${count}`
//     content.append(h2El)
//     buttonEl.classList.toggle('new-color')
// }

// const arr1 = Array();
//  const arr2 = [1, 'table', true];
//  arr2[3] = 'chair'; // add new element
//  arr2[6] = 16; // we can have empty items up to this

//  console.log(arr2)
//  console.log("push to arr1 from pop")
//  arr1.push(arr2.pop()); // push - add to last, pop - get and remove from end
//  console.log(arr1)
//  console.log(arr2)

//  console.log("shift arr2 and add shifted to arr1")
//  const shifted = arr2.shift(); // get first and shift array to left (to start)
//  arr1[3] = shifted;
//  console.log(arr1)
//  console.log(arr2)
//  console.log("unshift arr2")
//  arr2.unshift(12) // add an element to start and shift to right (to finish)
//  console.log(arr2)








// functions, arrays, cycles
// const arr = ['Sasha', 'Masha', 'Casha']
// const content2 = document.querySelector('.content');

// function renderArr(arr)
// {
//     const listEl = document.createElement('ul');
//     content2.append(listEl);

//     for (const key in arr)
//     {
//         const liEl = document.createElement('li');
//         liEl.textContent = `${Number(key) + 1}) ${arr[key]}`;
//         listEl.append(liEl);
//     }
// }

// function search()
// {
//     const search = prompt('write search');
//     let found = -1;
//     for (const key in arr)
//     {
//         if (arr[key] == search)
//         {
//             found = key;
//             break;
//         }
//     }

//     if (found > -1)
//     {
//         document.querySelector(`li:nth-child(${found + 1})`).style.color = "red";
//     }
//     else
//     {
//         alert('not found')
//     }
// }

// const btn = document.createElement('button');
// btn.textContent = "Search"
// btn.onclick = search;
// content2.append(btn);
// renderArr(arr)
// console.log(arr)


// var h1El = document.querySelector('h1');
// h1El.addEventListener('click', () =>{
//     console.log(h1El.parentNode); // we can get parent element of an element
//     console.log(h1El.nextElementSibling); // get next sibling element
//     console.log(h1El.nextSibling); // get next sibling node (can be text, comment, etc.)
//     console.log(h1El.previousElementSibling); // get previous sibling element
//     console.log(h1El.parentNode.children); // get all child elements of the parent
//     console.log(h1El.parentNode.childNodes); // get all child nodes of the parent
//     console.log(h1El.parentNode.firstElementChild); // get the first child element of the parent
//     console.log(h1El.parentNode.firstChild); // get the first child node of the parent
//     console.log(h1El.parentNode.lastElementChild); // get the last child element of the parent
//     console.log(h1El.parentNode.lastChild); // get the last child node of the parent
// });

const h2El = document.querySelector('h2');
console.log(h2El.getAttribute('class')); // get attribute of an element
h2El.setAttribute('my-attribute', 200); // set attribute of an element
console.log(h2El.hasAttribute('my-attribute'));
console.log(h2El.removeAttribute('my-attribute'));
console.log(h2El);

const button = document.createElement('button');
button.dataset.clicks = 0;

const counterBox = (buttonEl) => {
    let count = 0;
    return function () {
        count++;
        buttonEl.dataset.clicks = count;
        buttonEl.textContent = count;
        console.log(`Button clicked ${count} times`);
    }
}

const handleClick = counterBox(button); // we can use closure to incapsulate the count and prevent it from being changed from outside
button.addEventListener('click', handleClick);

h2El.parentNode.append(button);

h2El.addEventListener('click', function (event)
{
    if (event.altKey)
    {
        console.log('Alt + click')
    }
    else if (event.ctrlKey)
    {
        console.log('Ctrl + click')
    }
    else if (event.shiftKey){
        console.log('Shift + click')
    }
    else console.log(event)
});
