var c = 5+6
console.log(c)
console.log(5==="5")
var a = 10
var b = 20
console.log(a-b)

function geet(name)
{
    console.log("Hello "+name)
}
geet("dev")

//loop

function isage(age)
{
    if(age>=18)
    {
        console.log("Major")
    }
    else
    {
        console.log("Minor")
    }           
}
isage(17)

//object arrays
let fruits = ["apple","banana","mango"]
for(let i=0;i<fruits.length;i++)
{
    console.log(fruits[i])
}
let car = {
    name:"BMW",
    year:2020,  
    color:"black"
}
console.log(fruits[2])
console.log(car.color)

//hoisting
console.log(x)
var x = 10

//null and undefined

let q = null;
let q1;
console.log(q)
console.log(q1)

//switch case

function fruitsColor(fruit)
{
    switch(fruit)
    {
        case "apple":
            console.log("Apple is selected")
            break;
        case "banana":
            console.log("Banana is selected")
            break;                 
    }
}
fruitsColor("banana")
fruitsColor("apple")


//object created 
let person = {
    firstName:"DEV",
    age:25,
    city:"tirupur"
}
for (let key in person)
{
    console.log(key + ": " + person[key])
}   

//ternary operater 
let age1 = 18
let status = (age1>=18) ? "Allowed" : "not Allowed"
console.log(status)

//another way of declaration
let age2 = 14
console.log(age2>=18 ? "Allowed" : "not Allowed")

//arrow function
const greet = (name) => {
    return "Hello " + name
}
console.log(greet("Dev"))


//spread operator
const number = [1,2,3,4,5]
const number2 = [4,5,6,7]
const allnumber = [...number,...number2]
console.log(allnumber)


//object creation 
const person1 = {
    name :"Dev",
    age:25
}
const city = "Tirupur"
const person2 = {...person1,city}
console.log(person2)



//destructuring
const num = [1,2,3];
const [a1,b1,c1] = num;
console.log(a,b,c)


const [first,third] = num;
console.log(first,third)


const [x1,y1,...rest] = num;
console.log(x1,y1,rest)

///object destructuring
const person3 = {
    name:"Dev",
    age:25,}
const {name,age} = person3;
console.log(name,age)


//map,filter,reduce
const numbers = [1,2,3,4,5]
const num1 = numbers.map(numbers => numbers * num);
    console.log(num1)
    const evenNumbers = numbers.filter(number => number % 2 === 0);
    console.log(evenNumbers)

//arrays and string operations
const arr = [1,2,3,4,5]
arr.push(6,7)
console.log(arr)
arr.pop()
console.log(arr)


//shift and unshift
arr.unshift(0)
console.log(arr)
arr.shift()
console.log(arr)

let str = "DD"
console.log(str.concat("shine"))
console.log(str.includes("A"))
console.log(str.indexOf("D"))
console.log(str.substring(0,1))
console.log(str.toLowerCase())
