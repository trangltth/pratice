// /*******************************
// * variable mutation and type coercion
// */
// var firstName = 'Trang';
// console.log(firstName);

// var lastName = "Le";
// age = 27
// console.log(firstName + " " + lastName)

// fullAge = true
// console.log(fullAge)

// var test;
// console.log(test);

// test = "testing for today"
// console.log(test)

// var years = 3

// /*******************************
// * variable mutation and type coercion
// */

// var firstName = 'Trang';
// var age = 27;
// console.log(firstName + ' '+ age);

// var job, is_alone;
//   job = "programmer";
//   is_alone = true;

// // alert(firstName + ' is ' + age + 
// // ' years old ' + job + '. is alone: ' + is_alone)

// var lastname = prompt('what is her last name');
// console.log(firstName + ' ' +  lastname)

/*****************
* basic operators
*/

// var firstName = 'trang'
// var age=27

// if( age == '27'){
//   console.log('need to review')
// } else{
//   console.log('hurry up')
// }


/*****************************
* CODING CHALLENGE 2
*/

/*
John and Mike both play basketball in different teams. 
In the latest 3 games, John's team scored 89, 120 and 103 
points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average 
(highest average score), and print the winner to 
the console. Also include the average score in the output.
3. Then change the scores to show different winners. 
Don't forget to take into account there might be a draw 
(the same average score)

4. EXTRA: Mary also plays basketball, 
and her team scored 97, 134 and 105 points. 
Like before, log the average winner to the console.
 HINT: you will need the && operator to take the decision. 
 If you can't solve this one, just watch the solution, 
 it's no problem :)
5. Like before, change the scores to generate different 
winners, keeping in mind there might be draws.

GOOD LUCK 😀
*/

// var john_score1, john_score2, john_score3, 
// mike_score1, mike_score2, mike_score3, john_avg, mike_avg;

// john_score1 = 89;
// john_score2 = 120;
// john_score3 = 193;
// john_avg = (john_score1 + john_score2 + john_score3) / 3

// mike_score1 = 116;
// mike_score2 = 94;
// mike_score3 = 523;
// mike_avg = (mike_score1 + mike_score2 + mike_score3) / 3

// mary_score1 = 116;
// mary_score2 = 94;
// mary_score3 = 523;
// mary_avg = (mary_score1 + mary_score2 + mary_score3) / 3

// if(john_avg > mike_avg && john_avg > mary_avg){
//   console.log('the highest team is: john team - ', john_avg)
// }
// else
// if (mike_avg > john_avg && mike_avg > mary_avg) {
//     console.log('the highest team is: mike team - ',mike_avg)
// }else
// if (mary_avg > john_avg && mike_avg < mary_avg) {
//   console.log('the highest team is: mary team - ',mary_avg)
// }else{
//   console.log('there are 2 teams are family ')
// }

// var information = ['trang',27,'test']
// information.unshift('ms')
// information.shift()
// console.log(information.indexOf(127))

/*****************************
* CODING CHALLENGE 3
*/

/*
John and his family went on a holiday and went to 
3 different restaurants. The bills were $124, $48 and $268.

To tip the waiter a fair amount, John created a simple 
tip calculator (as a function). He likes to tip 20% of 
the bill when the bill is less than $50, 15% when the 
bill is between $50 and $200, and 10% if the bill is 
more than $200.

In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).

(NOTE: To calculate 20% of a value, simply multiply it with
   20/100 = 0.2)

GOOD LUCK 😀
*/

// var tips, tip_vs_bills, bills;

// bills = [124,48,268]
// tips=[]
// tip_vs_bills = []

// bills.forEach(bill => {
//   tip = 0
//   payment_total = 0
  
//   if(bill < 50){
//     tip = 0.2
//     payment_total = bill + bill * tip
//   }else if (bill <= 200){
//     tip = 0.15
//     payment_total = bill + bill*tip
//   } else{
//     tip = 0.1
//     payment_total = bill + bill*tip
//   }
//   tips.push(tip)
//   tip_vs_bills.push(payment_total)
// });

// console.log(tips)
// console.log(tip_vs_bills)

/*****************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Mark and 
John compared their BMIs. Let's now implement the same 
functionality with objects and methods.
1. For each of them, create an object with properties f
or their full name, mass, and height
2. Then, add a method to each object to calculate the BMI.
 Save the BMI to the object and also return it from the  
 method.
3. In the end, log to the console who has the highest BMI,
 together with the full name and the respective BMI. 
 Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

GOOD LUCK 😀
*/
// var massMark = 78; // kg
// var heightMark = 1.69; // meters

// var massJohn = 92;
// var heightJohn = 1.95;

// john = {
//   'name':'john',
//   'mass':78,
//   'height':1.69,
//   'BMI':0,
//   calBMI: function () {
//     this.BMI = (this.mass/(this.height*this.height))
//   } 
// }

// john.calBMI();
// console.log(john.BMI)

// mike = {
//   'name':'mike',
//   'mass':92,
//   'height':1.95,
//   'BMI':0,
//   calBMI: function () {
//     this.BMI = (this.mass/(this.height*this.height))
//   } 
// }

// mike.calBMI();
// console.log(mike.BMI)


/*****************************
* CODING CHALLENGE 5
*/

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different 
restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less 
than $50, 15% when the bill is between $50 and $200, 
and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all 
the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips,
 and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less 
than $100, 10% when the bill is between $100 and $300, 
and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time 
using Mark's tipping rules
6. Create a function (not a method) to calculate the 
average of a given array of tips. HINT: Loop over the 
array, and in each iteration store the current sum in 
a variable (starting from 0). After you have the sum of 
the array, divide it by the number of elements in it 
(that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips 
on average

GOOD LUCK 😀
*/

// var john_bills_info = {
//   'tips':[],
//   'total_payments':[],
//   'bills':[124, 48, 268, 180, 42],
//   calBill: function() {
//     this.bills.forEach(bill => {
//       tip = 0
//       total_payment = 0  
//       if(bill < 50){
//           tip = 0.2
//           total_payment = bill + tip * bill
//       } else if(bill <= 200){
//         tip = 0.15
//         total_payment = bill + tip * bill
//       }else{
//         tip = 0.1
//         total_payment = bill + tip * bill
//       }
//       this.tips.push(tip)
//       this.total_payments.push(total_payment)
//     });
//   }
// }

// john_bills_info.calBill()

// console.log(john_bills_info)

// var mark_bills_info = {
//   'tips':[],
//   'total_payments':[],
//   'bills':[124, 48, 268, 180, 42],
//   calBill: function() {
//     this.bills.forEach(bill => {
//       tip = 0
//       total_payment = 0  
//       if(bill < 100){
//           tip = 0.2
//           total_payment = bill + tip * bill
//       } else if(bill <= 300){
//         tip = 0.1
//         total_payment = bill + tip * bill
//       }else{
//         tip = 0.25
//         total_payment = bill + tip * bill
//       }
//       this.tips.push(tip)
//       this.total_payments.push(total_payment)
//     });
//   }
// }

// mark_bills_info.calBill()

// console.log(mark_bills_info)

// function calTip(tips) {
//   sum = 0
//   n = 0
//   tips.forEach(tip =>{
//     sum += tip
//     n += 1
//   })
//   return sum / n
// }

// john_tip_avg = calTip(john_bills_info.tips)
// console.log(john_tip_avg)
// mark_tip_avg = calTip(mark_bills_info.tips)
// console.log(mark_tip_avg)











