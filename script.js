// First getting all necessary DOM nodes
const display = document.querySelector('.display');
const clearButton = document.querySelector('.clear-btn');
const deleteButton = document.querySelector('.delete-btn');
const numbersButton = Array.from(document.querySelectorAll('.numbers'));
const operatorsButton = Array.from(document.querySelectorAll('.operator'));
const pointButton = document.querySelector('.point');
const equalButton = document.querySelector('.equal');

// Declare global veriables to use
let currentOperator = null;
let firstOperand = '';
let secondOperand = '';
let shouldResetScreen = false;

// Setting EventListeners to buttons
deleteButton.addEventListener('click', deleteNumber);
equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
window.addEventListener('keydown', setInput);
pointButton.addEventListener('click', addPoint)
numbersButton.forEach(number => {
    number.addEventListener('click',() => addToDisplay(number.textContent))
});
operatorsButton.forEach(operator => {
    operator.addEventListener('click', () => setOperator(operator.textContent))
});

// EventListeners Functions
function setInput(e) {
    if (e.key >= 0 && e.key <= 9) addToDisplay(e.key);
    if (e.key === '.') addPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '-' || e.key === '+' || e.key === '/' || e.key === '*') setOperator(e.key);
}

function addPoint() {
    if (display.textContent.includes('.')) return;
    display.textContent += '.';
}

function clear() {
    display.textContent = '0';
    currentOperator = null;
    firstOperand = '';
    secondOperand = '';
}

function addToDisplay(number) {
    if (display.textContent.length === 9) return;
    if (display.textContent === '0' || shouldResetScreen) resetDisplay();
    display.textContent += number;
}

function deleteNumber() {
    if (display.textContent.length === 1) return display.textContent = '0';
    display.textContent = display.textContent.slice(0, -1);
}

function setOperator(oper) {
    if (currentOperator !== null) evaluate();
    firstOperand = display.textContent;
    currentOperator = oper;
    shouldResetScreen = true;
}

function evaluate(e) {
    if (currentOperator === null || shouldResetScreen) return;
    if (currentOperator === '/' && display.textContent === '0') {
        alert('You can\'t divide by zero!');
        clear();
        return
    }
    secondOperand = display.textContent;
    display.textContent = operate(currentOperator, firstOperand, secondOperand);
    currentOperator = null;
}

// Helper Functions
function resetDisplay() {
    display.textContent = ''
    shouldResetScreen = false;
}

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
    let x = +num1;
    let y = +num2;
    switch (operator) {
        case '+':
            return add(x, y);
    
        case '-':
            return subtract(x, y);
        
        case '*':
            return multiply(x, y);

        case '/':
            return divide(x, y);
    }
}
