// Objects

// const engineObj = {
//     volume: 2.0,
//     power: 150,
//     type: 'diesel',
//     isWorking: false
// }

// const carObj = {
//     name: 'Base car',
//     year: 2020,
//     color: 'black',
//     engine: engineObj, // we can add other objects inside
//     start: function()  // We can also define functions inside
//     {
//         this.engine.isWorking = true; // But if it will be an array-func, the 'this' will address to a global space.
//         console.log(`car ${this.name} started`);
//     },
//     openDoor() {
//         console.log('door opened')
//     }
// }

// carObj.maxSpeed = 250; // we can add some fields on the fly
// carObj.engine.material = 'aluminium';
// console.log(carObj)
// console.log(carObj["engine"]) // The object is also a tuple / dictionary, so we can get some field by key-name
// carObj.openDoor()

// const bmw = Object.create(carObj);
// bmw.name = 'BMW X5';

// console.log(bmw)

// bmw.start();
// carObj.start();

// console.log("Base engine")
// console.log(engineObj)
// console.log("Car engine")
// console.log(carObj.engine)
// console.log("BMW engine")
// console.log(bmw.engine)

// const person = {
//     name: 'Sasha',
//     age: 30,
//     city: 'Moscow',
//     happyBidthday() {
//         console.log(`Happy birthday, ${this.name}!`)
//         this.age++;
//     }
// }

// const transformer = Object.assign({}, person); // we can create a copy of an object another way
// transformer.name = 'Optimus Prime';
// console.log(transformer)
// console.log(person)
// transformer.happyBidthday();
// console.log(transformer)
// console.log(person)

// const mix = Object.assign(person, carObj) // we can also mix objects
// console.log(mix)

// Object.freeze(carObj) // we can freeze an object to prevent any changes in it
// carObj.name = 'New name';
// carObj.haircut = "Crop";
// console.log(carObj)

// const pair = Object.entries(carObj) // we can get an array of pairs [key, value] from an object
// console.log(pair)

// const keys = Object.keys(carObj) // we can get an array of keys from an object
// console.log(keys)

// keys.forEach(key => console.log(carObj[key])) // we can also get values by keys from an object

// const values = Object.values(carObj) // we can get an array of values from an object
// console.log(values)





// Destructuring & Expanding
// const person = {
//     name: 'Sasha',
//     age: 30,
//     city: "Bangkok"
// }

// const {name, age, hp = 10 } = person; // we can get fields from an object to variables by destructuring, but if we uses 'this' in a function, the destructured variables will not work, because they are not in the object anymore, but in a global space
// console.log(name, age, hp)

// const sayHi = function(...names) // If we want to get an array of arguments, we can use rest operator, but we need to use it in the end of the parameters list
// {
//     console.log(`Hi, ${names}!`)
// }

// sayHi('Sasha', 'Masha', 'Casha')

// const arr = [1, 2, 3, 4, 5];
// const [a, b, c, ...rest] = arr; // we can also destructure arrays, but we need to use square brackets, and we can also use rest operator to get the rest of the array
// console.log(a, b, c, rest)

// console.log(..."Expansion") // we can also expand a string to get its characters as separate arguments, but we need to use spread operator in front of the string

// const smarty = {
//     iq: 150,
//     ...person // we can also expand an object to get its fields as separate fields in another object, but we need to use spread operator in front of the object
// }

// smarty.name = 'Smarty';
// const iPerson = Object.assign(person, smarty) // it wiil change the person object, because it will be a reference to the same object in memory, but if we want to create a new object, we can use spread operator to expand the person object and add new fields to it
// iPerson.iq = 200;
// iPerson.city = "Moscow";
// const baseCitizen = Object.assign({}, person, iPerson)
// console.log(person)
// console.log(iPerson)
// console.log(baseCitizen)