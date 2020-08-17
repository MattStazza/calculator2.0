// Reference to the Calculator <div> in the HTML Document.
const calculator = document.querySelector(".calculator");

// Reference to the Keys <div> in the HTML Document.
// All the buttons are children of the .calculator__keys <div>.
const keys = calculator.querySelector(".calculator__keys");

// Reference to the Display <div> in the HTML Document.
const display = calculator.querySelector(".calculator__display");

//-CALCULATIONS--------------------------------------------------------------|

const calculate = (n1, operator, n2) => {
  // Converts firstNum and secondNum into floats (number variables)
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  // Perform calculation and return calculated value.
  if (operator === "add") {
    return firstNum + secondNum;
  }

  if (operator === "subtract") {
    return firstNum - secondNum;
  }

  if (operator === "multiply") {
    return firstNum * secondNum;
  }

  if (operator === "divide") {
    return firstNum / secondNum;
  }
};
//-------------------------------------------------------------------------|

// Listen for all keypresses.
keys.addEventListener("click", (e) => {
  // Loops through each key in the 'calculator__keys' <div> and
  // checks to see if it is a button.
  if (e.target.matches("button")) {
    //Variables
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    // Reference to the custom attribute: 'previousKeyType'
    const previousKeyType = calculator.dataset.previousKeyType;

    // DETERMINING THE TYPE OF KEY THAT WAS PRESSED.-------------------------|

    // NUMBER KEYS:
    if (!action) {
      // Is the display currently equal to '0' OR was the previous key pressed an operator key?
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        // Updates display to the number pressed.
        display.textContent = keyContent;

        // Else (The user presses a number key and the display is NOT currently '0'):
      } else {
        // Add the pressed number to the currently displayed number.
        display.textContent = displayedNum + keyContent;
      }

      // Remove .is-depressed class from all keys
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );

      calculator.dataset.previousKeyType = "number";
    }

    // ------------|

    // OPERATOR KEYS:
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      // [Note: the secondValue isn't needed because it always exists in the display.]
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        // Update calculated value as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        // If there are no calculations, set displayedNum as the firstValue.
        calculator.dataset.firstValue = displayedNum;
      }

      // Remove .is-depressed class from all keys
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    // ------------|

    // DECIMAL KEY:
    if (action === "decimal") {
      // Do nothing if string has a dot already.
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";

        // Display '0.' if user presses the decimal key AFTER an operator key
        // OR calculate key.
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }

      // Updating previousKeyType to decimal key.
      calculator.dataset.previousKeyType = "decimal";
    }

    // ----------|

    // (NOT) CLEAR KEY [CE]:
    if (action !== "clear") {
      // Reference to the clear button and data.
      const clearButton = calculator.querySelector("[data-action=clear]");

      // Updating the Clear Button's text to "CE".
      clearButton.textContent = "CE";
    }

    //-----------|

    // CLEAR KEY [AC]
    if (action === "clear") {
      // Reset the Calculator to its initial state
      if ((key.textContent = "AC")) {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        // Updating the Clear Button's text to "AC".
        key.textContent = "AC";
      }

      // Sets display to 0.
      display.textContent = 0;

      // Remove .is-depressed class from all keys
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );

      //Updating previousKeyType to clear key.
      calculator.dataset.previousKeyType = "clear";
    }

    // ------------|

    // CALUCLATE (EQUALS) KEY:
    if (action === "calculate") {
      // Sets firstValue, operator and secondValue.
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        // Updates the display to the result.
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      // Set ModValue
      calculator.dataset.modVlaue = secondValue;

      // Updating previousKeyType to calculate key.
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});
