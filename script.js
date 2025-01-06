let display = document.getElementById('display');
let currentValue = '';
let operator = null;
let previousValue = '';

function clearDisplay() {
    display.value = '';
    currentValue = '';
    previousValue = '';
    operator = null;
}

function deleteDigit() {
    currentValue = currentValue.slice(0, -1);
    display.value = currentValue;
}

function appendNumber(number) {
    currentValue += number;
    display.value = currentValue;
}

function appendOperator(op) {
    if (currentValue === '') return;
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculateResult() {
    if (operator === null || currentValue === '') return;

    let result;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    display.value = result;
    currentValue = result.toString();
    operator = null;
}

function calculateSqrt() {
    if (currentValue === '') return;
    display.value = Math.sqrt(parseFloat(currentValue));
    currentValue = display.value;
}

function calculateFactorial() {
    if (currentValue === '') return;
    let result = 1;
    for (let i = 1; i <= parseFloat(currentValue); i++) {
        result *= i;
    }
    display.value = result;
    currentValue = result.toString();
}

function calculateExponent() {
    if (currentValue === '') return;
    previousValue = currentValue;
    currentValue = '';
    operator = '**';
}
