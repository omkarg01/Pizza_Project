// let outerVar;

// if (true) {
//     let innerVar =  10;
//     outerVar = innerVar
// }
// console.log(outerVar);

// const sum = (a, b) => a + b;
// const result = sum(5, 2);
// console.log(result);

// const sum = (a,b) => {
//     return a + b;
// }
// const result = sum(3,5);
// console.log(result);

// const sum = (a,b,c = 3) => (a+b+c)//function defintion

// console.log(sum(2,4,5));

// function sum(a, b){
//     return (a+b);
// }
// console.log(sum(2,3))

//  const arr = ["omkar" , "pooja", "poo"]
// //  const newarr = arr.map((fname)=>(fname + "gujja"))
//  const newarr = arr.map((fname)=>{

//    return fname + " gujja"
//  })
//  console.log(newarr)

// const sum = (a,b) =>(a + b)

// const result = sum(1,5);
// console.log(result)

// const result2 = sum(8,6);
// console.log(result2)

// const result3 = sum(85,98);
// console.log(result3)

// for (let i = 1; i <= 10; i++) {
//     console.log(`1 x ${i} = ${i*1}`)
// }
// for (let i = 1; i <= 10; i++) {
//     console.log(`2 x ${i} = ${i*2}`)
// }
// for (let i = 1; i <= 10; i++) {
//     console.log(`3 x ${i} = ${i*3}`)
// }
// for (let i = 1; i <= 10; i++) {
//     console.log(`4 x ${i} = ${i*4}`)
// }
// for (let i = 1; i <= 10; i++) {
//     console.log(`5 x ${i} = ${i*5}`)
// }

// for (let j = 1; j <= 5; j++) {
//   for (let i = 1; i <= 10; i++) {
//     console.log(`${j} x ${i} = ${i * j}`);
//   }
//   console.log("\n")
// }

for (let j = 1; j <= 5; j++) {
    let row = "";
    for (let i = 1; i <= 5; i++){
        if(i >= 6-j){

            row = row + "*"
        }
        else{
            row = row + " "
        }
    }
    console.log(row)
}
