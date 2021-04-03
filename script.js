function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case 'plus':
            return add(num1, num2);
            break;
    
        case 'minus':
            return subtract(num1, num2);
            break;
        
        case 'power':
            return multiply(num1, num2);
            break;

        case 'division':
            if (num2 === 0) return "Error! Can't divide by zero!";
            return divide(num1, num2);
            break;
    }
}
