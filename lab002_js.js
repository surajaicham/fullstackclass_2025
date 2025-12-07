//Variable Declaration
const constVariable = 30;

function testScope1() {
    let letVariable = 10;
    var varVariable = 10;
    {
        let letVariable = 20;
        var varVariable = 20;
        alert(varVariable);
    }
    alert(varVariable);
}

// testScope1();

//Assignment + Operators
let operator1 = 10;
let operator2 = 20;
let greetingMessage = "Hello";
let operator3 = "20";
//This will concat as string instead of the value
// alert(operator3 + operator1);

//Comparison Operators
// if(operator2 === operator3) {
//     alert("Equal");
// } else {
//     alert("Not Equual");
// }

function greeting(message) {
    alert(message);
}

function sum() {
    let op1 = document.getElementById("op1").value;
    let op2 = document.getElementById("op2").value;

    let op1Value = parseInt(op1);
    let op2Value = parseInt(op2);

    let  resultElement = document.getElementById("result");
    resultElement.innerHTML = op1Value + op2Value;
    // return a + b;
}
// greeting(greetingMessage);

for(let i = 0; i < 5; i++) {
    alert(i);
}
while(constVariable > 25) {
    alert("Const Variable is greater than 25");
    break;
}