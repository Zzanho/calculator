const result = document.getElementById("result");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const percentage = document.getElementById("percentage");
const divide = document.getElementById("divide");
const multiply = document.getElementById("multiply");
const subtract = document.getElementById("subtract");
const add = document.getElementById("add");
const equals = document.getElementById("equals");
const decimal = document.getElementById("decimal");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let currentNumber = "";
let previousNumber = "";
let currentOperator = null;
let shouldReset = false;

function clearAll() {
  currentNumber = "";
  previousNumber = "";
  currentOperator = null;
  shouldReset = false;
  result.value = "0";
}

function deleteLast() {
  currentNumber = currentNumber.slice(0, -1);
  if (currentNumber === "") {
    currentNumber = "0";
  }
  result.value = currentNumber;
}

function calculatePercentage() {
  currentNumber = (parseFloat(currentNumber) / 100).toString();
  result.value = currentNumber;
}

function handleNumberClick(event) {
  const number = event.target.innerText;
  if (currentNumber === "0" || shouldReset) {
    currentNumber = number;
    shouldReset = false;
  } else {
    currentNumber += number;
  }
  result.value = currentNumber;
}

function handleOperatorClick(event) {
  const operator = event.target.innerText;
  if (currentOperator !== null) {
    calculate();
  }
  previousNumber = currentNumber;
  currentNumber = "";
  currentOperator = operator;
}

function calculate() {
  let resultValue;
  const previous = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);
  if (isNaN(previous) || isNaN(current)) {
    return;
  }
  switch (currentOperator) {
    case "+":
      resultValue = previous + current;
      break;
    case "-":
      resultValue = previous - current;
      break;
    case "*":
      resultValue = previous * current;
      break;
    case "/":
      resultValue = previous / current;
      break;
    default:
      return;
  }
  currentNumber = resultValue.toString();
  currentOperator = null;
  previousNumber = "";
  shouldReset = true;
  result.value = currentNumber;
}

function toggleSign() {
  currentNumber = (parseFloat(currentNumber) * -1).toString();
  result.value = currentNumber;
}

clear.addEventListener("click", clearAll);
backspace.addEventListener("click", deleteLast);
percentage.addEventListener("click", calculatePercentage);
equals.addEventListener("click", calculate);
decimal.addEventListener("click", () => {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    result.value = currentNumber;
  }
});

numbers.forEach((number) => {
  number.addEventListener("click", handleNumberClick);
});

operators.forEach((operator) => {
  operator.addEventListener("click", handleOperatorClick);
});

plusMinus.addEventListener("click", toggleSign);
