/*
Multi-line comment
 console.log('Hello world'); */

var square = function (number) {
  var sq = number * number
  return sq;
}

var cube = function (number) {
  return square(number) * number;
}

var area = function (length, height) {
  return length * height;
}

var get_number = function (message) {
  return parseInt(prompt(messge));
}
var response = prompt('(s)quare, (c)cube, (a)rea or (q)uit');

while (response !== 'q') {
  switch(response) {
    case 's':
      var squared = square(get_number('enter a number to square'));
      console.log('the square is: ' + squared);
      break;
    case 'c':
      var cubed = cube(get_number('enter a number to cube'));
      console.log('the cube is: ' + cubed);
      break;
    case 'a':
      var length = get_number('enter length');
      var width = get_number('enter width');
      var a = area(length, width);
      console.log('the area is: ' + a);
  }
  response = prompt('(s)quare, (c)cube, (a)rea or (q)uit');
}


// var colors = [];
// var color = prompt('enter a colour: ');

// //read colours from the user until she 'q' quits

// while(color != 'q') {
//   colors.push(color);
//   color = prompt('enter a colour: ');
// }

// console.log('read loop done');

// //Log out each of the colours.
// for (var index = 0; index < colors.length; index++) {
//   console.log('the colour is: '+ colors[index]);
// }


/*
var first = prompt('Enter your first name:');
console.log('Welcome ' + first);

var age = prompt(first + ', how old are you:');
console.log(first, ' is ', age);

age = parseInt(age);

if (age < 18) {
  console.log('you are a child');
} else {
  console.log('you are an adult');
}

switch(age) {
  case 10:
    console.log('you are 10');
    break;
  case 20:
    console.log('you are 20');
    break;
  case 30:
  console.log('you are 30');
    break;
default:
  console.log('you are not specified');
}
*/