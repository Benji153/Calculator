const display = document.querySelector('#display');

var equation = "";
var a;
var b;

var numButtons = document.querySelectorAll(".numButton");
numButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
        if (Number.isInteger(parseInt(e.target.value))) {
            equation = equation + e.target.value;
            updateDisplay(equation);
        } else {
            if (Number.isInteger(parseInt(equation.charAt(equation.length - 1))) || equation == "") {
                equation = equation + e.target.value;
                updateDisplay(equation);
            }
        }
    });

});

const clear = document.querySelector('#clear');
clear.addEventListener('click', function (e) {
    equation = "";
    updateDisplay(equation);
});

const compute = document.querySelector('#compute');
compute.addEventListener('click', function (e) {
    let post = convertPostfix(equation);
    let answer = evaluatePostfix(post);
    equation = answer;
    updateDisplay(answer);
});

function updateDisplay(text) {
    e = display.querySelector('p');
    e.textContent = text;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
        default:
            return 0;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return b-a;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b/a;
}

function convertPostfix(expression) {
    let newExpression = "";
    expression = expression + ")"
    let stack = ["("];
    for (let i = 0; i < expression.length; i++) {
        let scan = expression.charAt(i);
        if (Number.isInteger(parseInt(scan))) {
            flag = true;
            oldI = i;
            while (flag) {

                if (Number.isInteger(parseInt(expression.charAt(i + 1)))) {
                    i = i + 1;
                } else {
                    newExpression = newExpression + expression.substring(oldI, i + 1) + " ";
                    flag = false;
                }

            }
        } else if (scan == "(") {
            stack.push("(");
        } else if (scan == "+" || scan == "-") {
            let flag = true;
            while (flag) {
                if (stack[stack.length - 1] == "+" || stack[stack.length - 1] == "-" || stack[stack.length - 1] == "*" || stack[stack.length - 1] == "/") {
                    newExpression = newExpression + stack.pop() + " ";
                } else {
                    flag = false;
                }
            }
            stack.push(scan);
        } else if (scan == "*" || scan == "/") {
            let flag = true;
            while (flag) {
                if (stack[stack.length - 1] == "*" || stack[stack.length - 1] == "/") {
                    newExpression = newExpression + stack.pop() + " ";
                } else {
                    flag = false;
                }
            }
            stack.push(scan);
        } else if (scan == ")") {
            let flag = true;
            while (flag) {
                if (stack[stack.length - 1] == "+" || stack[stack.length - 1] == "-" || stack[stack.length - 1] == "*" || stack[stack.length - 1] == "/") {
                    newExpression = newExpression + stack.pop() + " ";
                } else if (stack[stack.length - 1] == "(") {
                    stack.pop();
                    flag = false;
                } else {
                    flag = false;
                }
            }
        }
    }
    return newExpression = (newExpression.substring(0, newExpression.length - 1)).split(" ");
}

function evaluatePostfix(expression) {
    //expression.push(")");
    let stack = [];
    for (let i = 0; i < expression.length; i++) {
        if (Number.isInteger(parseInt(expression[i]))) {
            stack.push(expression.slice(i,i+1)[0]);
        } else if (expression[i] == "+" || expression[i] == "-" || expression[i] == "*" || expression[i] == "/") {
            let a = parseInt(stack.pop());
            let b = parseInt(stack.pop());
            stack.push(operate(expression[i],a,b));
        }
    }
    return "" + stack.pop();
}