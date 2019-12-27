const person = {
  name: {
    first: 'trang',
    last: 'le'
  },
  age: 32,
  gender: 'male',
  interest: ['music', 'skiing'],
  bio: function(){
    console.log(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interest[0] + ' and ' + this.interest[1] + '.')
  },
  greeting: function () {
    console.log('Hi! I\'m ' + this.name.first + '.')
  }
}

person.age = 35
person.farewell = function () {
  console.log('hi')
}

person.name
person.age
person.gender
person.interest
person.bio()
person.greeting()
person.farewell()


// var person = function(name, birthYear, job){
//   this.name = name;
//   this.birthYear = birthYear;
//   this.job = job;
// };

// person.prototype.calculateAge = function(){
//   return (2019 - this.birthYear)
// }

// trang = new person('trang', 1993, 'software engineer');

// console.log(trang)
// console.log(trang.calculateAge())

// let person = {
//   calculateAge: function () {
//       console.log(2019 - this.yearOfBirth)
//   }
// };

// trang = Object.create(person)
// trang.name = 'trang'
// trang.yearOfBirth = 1993
// trang.job = 'software engineer'
// trang.calculateAge()

// sheep = Object.create(person, {
//   name: {value: 'bunny'},
//   yearOfBirth: {value: 2011, writable: true},
//   job: {value: 'home'}
// });

// sheep.calculateAge()

// let age = 90

// change = function(var_, object_){
//   var_ = 100
//   object_.yearOfBirth = 0
// };

// change(age, sheep)
// change(age, trang)

// console.log(age, ' ', sheep.yearOfBirth, ' ', trang.yearOfBirth)

//## functions
// function buttonInteraction(event_){
//   if (event_ === 'click'){
//     return function(value_){
//       console.log(value_,' button change color to blue')
//     }
//   } else if(event_ === 'hover'){
//     return function (value_) {
//       console.log(value_, 'has impression')
//     }
//   } else {
//       return function (value_) {
//         console.log(value_, 'do another tasks')
//       }
//     }
//   }

// click_event = buttonInteraction('click')
// hover_event = buttonInteraction('hover')
// click_event('holiday')
// hover_event('incomming')

// ##function

// var years = [1990, 1991, 1992, 1993]

// function  arrayCount(years, fn) {
//   ages = []
//   for (index in years){
//     console.log(years[index])
//     ages.push(fn(years[index]))
//   }
//   return ages
// }

// function calculateAge(yearOfBirth){
//   return (2019 - yearOfBirth)
// }

// console.log(arrayCount(years, calculateAge))

// function interview(job){
//   return function(name){
//     if(job === 'designer'){
//       return [name, 'color','UX/UI']
//     } else if(job == 'teacher'){
//       return [name, 'board','student']
//     } else {
//       return [name, 'to be update']
//     }
//   }
// }

// designer = interview('designer')
// console.log(designer('desig'))
// teacher = interview('teacher')
// console.log(teacher('tea'))




