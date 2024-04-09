document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = button.textContent;

            // Clear button
            if (value === 'C') {
                clear();
            }
            // Operators
            else if (isOperator(value)) {
                handleOperator(value);
            }
            // Decimal
            else if (value === '.') {
                handleDecimal();
            }
            // Equal button
            else if (value === '=') {
                calculate();
            }
            // Numbers
            else {
                handleNumber(value);
            }
        });
    });

    function handleNumber(number) {
        currentInput += number;
        updateDisplay();
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function handleDecimal() {
        if (currentInput.includes('.')) return;
        if (currentInput === '') {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
        updateDisplay();
    }

    function calculate() {
        if (previousInput === '' || currentInput === '') return;
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
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
            default:
                return;
        }
        currentInput = result.toString();
        previousInput = '';
        operator = '';
        updateDisplay();
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay();
    }

    function updateDisplay() {
        display.textContent = currentInput === '' ? '0' : currentInput;
    }

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }
});
