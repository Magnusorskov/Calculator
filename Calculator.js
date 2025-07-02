let numberOne;
let numberTwo;
let operator;



function add(numberOne, numberTwo) {
    return numberOne + numberTwo;
}

function subtract(numberOne, numberTwo) {
    return numberOne - numberTwo;
}


function multiply(numberOne, numberTwo) {
    return numberOne - numberTwo;
}

function divide(numberOne, numberTwo) {
    return numberOne / numberTwo;
}

function operate(numberOne, numberTwo, operator) {
    let numberToReturn;
    switch (operator) {
        case "+":
            numberToReturn = add(numberOne,numberTwo);
            break;
        case "-":
            numberToReturn = subtract(numberOne, numberTwo);
            break;
        case "*":
            numberToReturn = multiply(numberOne,numberTwo);
            break;
        case "/":
            numberToReturn = divide(numberOne,numberTwo);
            break;
    }
    return numberToReturn;
}