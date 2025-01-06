function calculate() {
    const operation = document.getElementById('operation').value;
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    let result = '';

    if (isNaN(num1)) {
        alert("Please enter a valid number for the first input");
        return;
    }

    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num2 === 0 ? "Error: Division by zero" : num1 / num2;
            break;
        case 'modulus':
            result = num1 % num2;
            break;
        case 'exponent':
            result = Math.pow(num1, num2);
            break;
        case 'sqrt':
            if (num1 < 0) {
                result = "Error: Square root of negative number";
            } else {
                result = Math.sqrt(num1);
            }
            break;
        case 'factorial':
            if (num1 < 0) {
                result = "Error: Factorial of negative number";
            } else {
                result = factorial(num1);
            }
            break;
        default:
            result = "Invalid Operation";
            break;
    }

    document.getElementById('result').innerText = `Result: ${result}`;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
