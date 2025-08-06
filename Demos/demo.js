// const numbers = [2, 3, 5, 6, 10];
// const numberSquare = [];
// numbers.forEach(function (num) {
//    numberSquare.push(num * num);
// })
// console.log(numberSquare);

// for each keyword
// let colors = ['Red', 'Blue', 'Green', 'Purple']
// colors.forEach(function (color, i, a) {
//    console.log(`the color ${color} is number ${i} in the array of ${a}`)
// })

// const mapping = colors.map((color, i) => {
//    return `the color ${color} is number ${i}`;
// })
// console.log(mapping)


// const random = (count, min, max) => {
//    const generatedNumbers = [];
//    while (generatedNumbers.length < count) {
//       generatedNumbers.push(Math.floor(Math.random() * (max - min)) + min);
//    }
//    return generatedNumbers;
// }
// const rand = random(8, 10, 100);
// rand.forEach(number =>
//    console.log(`The number ${number} is binary ${number.toString(2)}`)
// );

// const evens = rand.filter((num) => num % 2 === 0
// )
// console.log(evens);

// for (let i = 0; i < evens.length; i++) {
//    const no = evens[i]
//    console.log(no);
// }
// evens.forEach(no => console.log(no));

// const total = rand.reduce((acc, cur) => {
//    return acc + cur;
// }, 0);

// console.log(`the total number generated is ${total}`)

// Js constructor

// function profile(name, level, department, faculty) {
//    this.name = name;
//    this.level = level;
//    this.department = department;
//    this.faculty = faculty;
// }

// const nick = new profile("Nicholas", 200, "computer science", "computing");
// const rex = new profile("Big rex", 400, "Biology", "Plant life");
// console.log(nick.name);
// console.log(rex.faculty);


// class product{
//    static saleTax = 0.10;
//    constructor(name, price){
//       this.name = name;
//       this.price = price;
//    }
//    displayProduct(){
//       console.log(`product: ${this.name}`);
//       console.log(`price: ${this.price}$`);
//    }
//    calculateTax() {
//       return this.price + (this.price * product.saleTax);
//    }
// }

// const product1 = new product('gala', 100);

// const product2 = new product('mouse', 400)
// product1.displayProduct()
// product2.displayProduct()

// const total = parseInt(product1.calculateTax(), 10);
// console.log(`The tax for product1 is ${total.toFixed(2)}$`);

/* class Vehicle {
   constructor(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
   }
   drive() {
      console.log(`the ${this.make} ${this.model} is driving`)
   }
}

class Car extends Vehicle {
   constructor(make, model, year, numDoors, isSedan) {
      super(make, model, year);
      this.numDoors = numDoors;
      this.isSedan = isSedan;
   }

   honks() {
      console.log(`the ${this.make} ${this.model} honks`);

   }
}
class Motorcycle extends Vehicle {
   constructor(make, model, year, hasSidecar, engineSizeCC) {
      super(make, model, year);
      this.hasSidecar = hasSidecar;
      this.engineSizeCC = engineSizeCC;
   }

   wheelie() {
      console.log(`the ${this.make} ${this.model} is doing a wheelie!`);

   }
}

class ElectricCar extends Car {
   constructor(make, model, year, numDoors, isSedan, batteryRangeMiles) {
      super(make, model, year, numDoors, isSedan)
      this.batteryRangeMiles = batteryRangeMiles;
   }
}

const car1 = new Car('Toyota', 'Camry', 2019, 4, false);
const motor1 = new Motorcycle('Bajaj', 'boxer', 2011, false, 3453788);
const eletric1 = new ElectricCar('Tesla', 'Cybertruck', 2020, 2, true, 40);

console.log(`This ${car1.make} ${car1.model} ${car1.year} has ${car1.numDoors} doors and it is ${car1.isSedan}ly a Sedan.`); car1.drive();

console.log(`This ${motor1.make} ${motor1.model} ${motor1.year} with CC number:${motor1.engineSizeCC} and it does ${motor1.hasSidecar}ly has a side car.`); motor1.wheelie();


console.log(`This ${eletric1.make}, model ${eletric1.model} of the year ${eletric1.year} has ${eletric1.numDoors} doors and ${eletric1.isSedan}ly a sedan that can run for ${eletric1.batteryRangeMiles}Mph`); eletric1.honks(); eletric1.drive()
*/

/*class rectangle {
   constructor(width, height) {
      this.width = width;
      this.height = height;
   }

   set width(newWidth) {
      if (newWidth > 0) {
         this._width = newWidth;
      }
      else {
         console.error("Width must be greater than 0");
      }
   }

   set height(newHeight) {
      if (newHeight > 0) {
         this._height = newHeight;
      }
      else {
         console.error("Height must be greater than 0")
      }
   }

   get width() {
      return this._width;
   }
   get height() {
      return this._height;
   }
   get area() {
      return (this._width * this._height).toFixed(2);
   }
}

const rect = new rectangle(5, 5);
console.log(rect.area)
*/

/*class Person {
   constructor(firstName, lastName, age) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
   }
   set firstName(newFirstName) {
      if(typeof newFirstName === "string" && newFirstName.length > 0) {
         this._firstName = newFirstName;
      }
      else {
         console.error(`Firstname must be a letter and must be over 0 in lenght`)
      }
   }

   set lastName(newLastName) {
      if (typeof newLastName === "string" && newLastName.length  > 0) {
         this._lastName = newLastName;
      }
      else {
         console.error(`Lastname must be a letter and must be over 0 in lenght`)
      }
   }

   set age(newAge) {
      if (typeof newAge === "number" && newAge > 0) {
         this._age = newAge;
      }
      else {
         console.error(`Age must be a number and must be greater than 0`)
      }
   }

   get firstName() {
      return this._firstName;
   }
   get lastName() {
      return this._lastName;
   }
   get age() {
      return this._age;
   }

   get details() {
      return `${this._firstName}, ${this._lastName}, is ${this._age} years old`
   }
}

const person1 = new Person('Benson', 'Nicholas', 20)
console.log(person1.details);
*/

/*function displaySchool({ schoolName, state, type, duoCampus = "NO" }) {
   console.log(`the ${schoolName} is located on ${state} and ${duoCampus} it has muiltiple campuses`)
}

const fuoye = {
   schoolName: 'Federal University Oye-Ekiti',
   state: 'Ekiti State',
   type: 'Federal University',
   duoCampus: 'yes',
}
const eksu = {
   schoolName: 'Ekiti State University',
   state: 'Ekiti State',
   type: 'State University',
}

// const { schoolName, state, type, duoCampus="NO" } = fuoye;
// console.log(duoCampus)
displaySchool(fuoye)
*/

// sort and shuffle
/*const alphabet = ['Benson', 'Emmanuel', 'Adeyemi', 'Ayomide', 'Nicholas', 'Zacheaous'];
alphabet.sort();

const numbers = [3, 2, 4, 46, 10, 20, 31, 2, 1,];
numbers.sort((a, b) => a - b);

const array = [
   { name: 'Nick', age: 20, level: 200 },
   { name: 'Alex', age: 18, level: 100 },
   { name: 'kizito', age: 12, level: 400 }
]
array.sort((a,b) => a.level - b.level)

const cards = ['A', 46, 48, 10, 'bt', 'ty', 3, 4, '57'];
cards.sort(() => Math.random() - 0.5);

shuffle(cards)

function shuffle(array) {
   for (let i = array.lenght - 1; i > 0; i-- ) {
      const random = Math.floor(Math.random() * (i + 1));

      [array[i], array[random] = array[random], array[i]];
   }
   console.log(cards);
};*/

const date = new Date();
console.log(date)