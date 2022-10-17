'use strict';


// sorting data 

let arr = [1,244,394,90,394,203,9,44];
let arr1 = [1,244,394,90,394,203,9,44];


// big to small
let result1 = arr.sort((a,b) => b - a);
console.log(result1);

// small to big
let result2 = arr1.sort((a,b) => a - b);
console.log(result2);

