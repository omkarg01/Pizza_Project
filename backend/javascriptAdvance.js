const callMe = () => {
  const a = "first";
  const runA = () => {
    console.log(a);
  };

  const b = "second";
  const runB = () => {
    setTimeout(() => {
      console.log(b);
    }, 2000);
  };

  const c = "three";
  const runC = () => {
    console.log(c);
  };

  runA();
  runB();
  runC();
};

// let a = "first";

// const runA = () => {
//   setTimeout(() => {
//     console.log(a);
//   }, 2000);
// };
// runA();

// a = "second";

const init = () => {
  let firstName = "Omkar";
  const sayFirstName = () => {
    const sayFirstNameNested = () => {
      console.log(firstName);
    };
    return sayFirstNameNested;
  };

  return sayFirstName;
};

// init()()()
// const refOFSayFirstName = init();
// const refOFSayFirstNameNested = refOFSayFirstName();
// refOFSayFirstNameNested();
// let value = init();
// console.log(value);
// value();

// const tp = () => {
//   console.log("hello");
// };

// // console.log(tp)
// const tp2 = tp;
// console.log(tp2);
// const tp3 = tp2;
// console.log(tp3)
// tp3()

// const sum = (a, b =  5) => {
//     return a+b;
// }

// const result = sum(4,7);
// console.log(result)

// const tp = (a) =>{
//   if (a === "Hello"){
//     return "Bye";
//   }
//   console.log("after if return")
//   return "Muje kon print karega?";
// }

// const result = tp("Hello");

// console.log(result);

// console.log("Start");
// function waitFor7Seconds() {
//   const futureTime = new Date().getTime() + 7000;

//   while (new Date() < futureTime) {}
// }


// setTimeout(function () {
//   console.log("I am from Timeout");
// }, 3000);

// waitFor7Seconds();

// console.log("End");



const myName =(name)=>{
  console.log(name)
}

const sayFirstName = (cb)=>cb("omkar gu")

// sayFirstName(myName);

// console.log(new Date().getTime())

import fs from "fs"
import path from "path"

// path.resolve(__dirname);

// console.log(global);

// global.appRoot = "hello"
// console.log(__dirname);

let obj1 = {name : "pooja"}
const isValid = true
let obj = {add : "xyz"}
const isValid2 = true
let obj2 = {...(isValid && obj1) , age : "23"  , ...( isValid && obj)}
// let obj1 = {name :"omkar", name1: "omkar1"}



const arr1 = ['omkar']
const condition = true
const arr2 = [...( condition ? [arr1] :  []), 'pooja'] 
// [["omkar"] , "pooja"]
//[["omkar"], "pooja"]
// console.log(arr2);


const array = [1, 2, 2];

for (let i = 0; i < array.length; i++){
  let curr = 0;
  for (let j = i; j < array.length; j++){
    curr += array[j];
    console.log(curr)
  }
}