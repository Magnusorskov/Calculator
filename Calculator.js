let cState = {
    numberOne: "",
    numberTwo: "",
    operator: null,
    displayString: "",
    result: null
};
const buttons = document.querySelectorAll('button');
const stateHistory = [];

function add(numberOne, numberTwo) {
    return numberOne + numberTwo;
}

function subtract(numberOne, numberTwo) {
    return numberOne - numberTwo;
}


function multiply(numberOne, numberTwo) {
    if (numberTwo === 0) {
        return "Error";
    }
    return numberOne * numberTwo;
}

function divide(numberOne, numberTwo) {
    return numberOne / numberTwo;
}

function operate(numberOne, numberTwo, operator) {
    let numberToReturn;
    const parsedNum1 = parseFloat(numberOne);
    const parsedNum2 = parseFloat(numberTwo);
    switch (operator) {
        case "+":
            numberToReturn = add(parsedNum1, parsedNum2);
            break;
        case "-":
            numberToReturn = subtract(parsedNum1, parsedNum2);
            break;
        case "*":
            numberToReturn = multiply(parsedNum1, parsedNum2);
            break;
        case "÷":
            numberToReturn = divide(parsedNum1, parsedNum2);
            break;
    }
    return numberToReturn.toFixed(2);
}


function processCalculatorInput(string) {
    const digits = "0123456789.";
    const areNumbersFilled = cState.numberOne !== "" && cState.numberTwo !== "";


    function updateCalcStateOnResult() {
        if (areNumbersFilled) {
            cState.result = operate(cState.numberOne, cState.numberTwo, cState.operator)
            cState.numberOne = "";
            cState.numberTwo = "";
            cState.operator = null;
        }
    }

    function updateCalcStateOnDigit() {
        if (cState.result !== null && cState.operator === null) {
            cState.result = null;
            cState.numberOne += string;
        } else if (cState.operator === null) {
            cState.numberOne += string;
        } else {
            cState.numberTwo += string;
        }
    }

    function updateCalcStateOnOperator() {
        if (areNumbersFilled) {
            cState.result = operate(cState.numberOne, cState.numberTwo, cState.operator);
            cState.numberOne = cState.result;
            cState.operator = string;
            cState.numberTwo = "";
        } else if (cState.numberOne !== "") {
            cState.operator = string;
        }
    }

    if (digits.includes(string)) {
        saveState();
        updateCalcStateOnDigit();
    } else if (string === "=") {
        saveState();
        updateCalcStateOnResult();
    } else {
        saveState();
        updateCalcStateOnOperator();
    }

    updateDisplay();

}

function allClear() {
    cState.numberOne = "";
    cState.numberTwo = "";
    cState.operator = null;
    cState.result = null;
    updateDisplay();
    saveState();
}

function saveState() {
    stateHistory.push({...cState});
}

function undo() {
    if (stateHistory.length > 0) {
        cState = stateHistory.pop();
        updateDisplay();
    }
}

function updateDisplay() {
    if (cState.result !== null) {
        cState.displayString = cState.result;
    } else if (cState.numberTwo !== "") {
        cState.displayString = cState.numberTwo;
    } else if (cState.operator !== null) {
        cState.displayString = "";
    } else if (cState.numberOne !== "") {
        cState.displayString = cState.numberOne;
    } else {
        cState.displayString = "";
    }
    const display = document.querySelector(".display");
    display.textContent = cState.displayString;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let text = button.textContent;
        if (text === "AC") {
            allClear();
        } else if (text === "Del") {
            undo();
        } else {
            processCalculatorInput(text);
        }
    })

})