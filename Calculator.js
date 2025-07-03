let cState = {
    numberOne: "",
    numberTwo: "",
    operator: "",
    displayString: "",
    result: ""
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
    if (numberTwo === 0 || numberOne === 0) {
        return 0;
    }
    return numberOne * numberTwo;
}

function divide(numberOne, numberTwo) {
    if (numberTwo === 0) {
        return "ERROR"
    }
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
        case "x":
            numberToReturn = multiply(parsedNum1, parsedNum2);
            break;
        case "÷":
            numberToReturn = divide(parsedNum1, parsedNum2);
            break;
    }
    if (typeof numberToReturn === "string") {
        return numberToReturn;
    }
    if (numberToReturn % 1 !== 0) {
        return parseFloat(numberToReturn.toFixed(10).toString());
    } else {
        return numberToReturn;
    }

}


function processCalculatorInput(string) {
    const digits = "0123456789.";
    const areNumbersFilled = cState.numberOne !== "" && cState.numberTwo !== "";
    if (cState.numberOne === "ERROR") {
        allClear();
    }

    function updateCalcStateOnResult() {
        if (areNumbersFilled) {
            cState.result = operate(cState.numberOne, cState.numberTwo, cState.operator)
            cState.numberOne = cState.result;
            cState.numberTwo = "";
            cState.operator = "";
        }
    }

    function updateCalcStateOnDigit() {
        const checkForPeriod = (stringToAdd, stringToManipulate) => {
            if (stringToAdd === ".") {
                if (!stringToManipulate.includes(".")) {
                    return stringToManipulate + stringToAdd;
                } else return stringToManipulate;
            } else return stringToManipulate + stringToAdd;
        }

        if (cState.result !== "" && cState.operator === "") {
            cState.result = "";
            cState.numberOne = checkForPeriod(string, cState.numberOne)
        } else if (cState.operator === "") {
            cState.numberOne = checkForPeriod(string, cState.numberOne)
        } else {
            cState.numberTwo = checkForPeriod(string, cState.numberTwo)
        }
    }

    function updateCalcStateOnOperator() {
        if (areNumbersFilled) {
            cState.numberOne = operate(cState.numberOne, cState.numberTwo, cState.operator);
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
    cState.operator = "";
    cState.result = "";
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
    cState.displayString = `${cState.numberOne} ${cState.operator} ${cState.numberTwo}`
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
