// Reference to the Calculator <div> in the HTML Document.
const calculator = document.querySelector('.calculator');

// Reference to the Keys <div> in the HTML Document.
// All the buttons are children of the .calculator__keys <div>.
const keys = calculator.querySelector('.calculator__keys');

// Reference to the Display <div> in the HTML Document.
const display = calculator.querySelector('.calculator__display');




//-CALCULATIONS--------------------------------------------------------------|
        
const calculate = (n1, operator, n2) => {
            
    // Perform calculation and return calculated value.
    let result = '';
    
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2); 
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2); 
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
}
//-------------------------------------------------------------------------|




// Listen for all keypresses.
keys.addEventListener('click', e => {

    // Loops through each key in the 'calculator__keys' <div> and
    // checks to see if it is a button.
    if (e.target.matches('button')) {
        
        //---Variables---
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        // Reference to the custom attribute: 'previousKeyType'
        const previousKeyType = calculator.dataset.previousKeyType; 




        // DETERMINING THE TYPE OF KEY THAT WAS PRESSED.-------------------------|
        
        // NUMBER KEYS:
        if(!action){

            // Is the display currently equal to '0' OR was the previous key pressed an operator key?
            if (displayedNum === '0' || previousKeyType === 'operator') {

              // Updates display to the number pressed.
              display.textContent = keyContent;

              // Else (The user presses a number key and the display is NOT currently '0'):
            } else {

              // Add the pressed number to the currently displayed number.
              display.textContent = displayedNum + keyContent;
            }

            // Remove .is-depressed class from all keys
            Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove('is-depressed'))

            // Updating previousKeyType to number key.
            calculator.dataset.previousKeyType = 'number';
        }


        // ------------|


        // OPERATOR KEYS:
        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide' 
        )   {

            const firstValue = calculator.dataset.firstValue

            const operator = calculator.dataset.operator
            
            // Storing the current number in the display to the 'secondValue' variable.
            const secondValue = displayedNum;  

            // If the first number and operator values are known (Have been clicked by the user)...
            // ...then calculate the result when the user clicks another number. 
            // [Note: the secondValue isn't needed because it always exists in the display.]
            if(firstValue && operator){
                display.textContent = calculate(firstValue, operator, secondValue);
            }


            // Adding a style (from the CSS)...
            // ...to indicate that the operator key is pressed.
            key.classList.add('is-depressed');

            //  Updating previousKeyType to an operator key.
            calculator.dataset.previousKeyType = 'operator';  
            
            // Storing the displayed number as the first value.
            calculator.dataset.firstValue = displayedNum;

            // Storing the operator (+, -, X, /, * etc)
            calculator.dataset.operator = action;
        }


        // ------------|


            // DECIMAL KEY:
            if(action === 'decimal'){

                // Do nothing if string has a dot
                if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
                } else if (previousKeyType === 'operator'){
                    display.textContent = '0';
                }
                
                // Updating previousKeyType to decimal key.
                calculator.dataset.previousKeyType = 'decimal';
                
            }

            
            // ----------|


            // CLEAR KEY:
            if(action === 'clear'){

                //Updating previousKeyType to clear key.
                calculator.dataset.previousKeyType = 'clear';

            }
           

            // ------------|

            
            // CALUCLATE (EQUALS) KEY:
                if(action === 'calculate'){

                    // Stores the first value.
                    const firstValue = calculator.dataset.firstValue;

                    // Stores the operator action.
                    const operator = calculator.dataset.operator;

                    // When the user presses the [=] button...
                    // ...The current number in the display is set to the 'secondValue' variable.
                    const secondValue = displayedNum;

                    // Updates the display to the result.
                    display.textContent = calculate(firstValue, operator, secondValue);
            }

    }

});



