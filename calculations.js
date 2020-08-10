



//Reference to the Calculator <div> in the HTML Document.
const calculator = document.querySelector('.calculator');

//Reference to the Keys <div> in the HTML Document.
//All the buttons are children of the .calculator__keys <div>.
const keys = calculator.querySelector('.calculator__keys');

//Reference to the Display <div> in the HTML Document.
const display = calculator.querySelector('.calculator__display');


//The change

//Listen for all keypresses.
keys.addEventListener('click', e => {

    //Loops through each key in the 'calculator__keys' <div> and
    // checks to see if it is a button.
    if (e.target.matches('button')) {
        

        //---Variables---
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;


        //DETERMINING THE TYPE OF KEY THAT WAS PRESSED.-------------------------|
        
        //Determine's Number keys
        if(!action){
            console.log('number key bro...');
        }


        //Determine's Operator keys
        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide' 
        )   {
            console.log('operator key yo!');

            //Adding a style (from the CSS)...
            //...to indicate that the operator key is pressed.
            key.classList.add('is-depressed');

            //Add custom attribute:
            calculator.dataset.previousKeyType = 'operator';
        }


        //Other Keys
            //Determine's Decimal key:
            if(action === 'decimal'){
                console.log('decimal key');
            }

            //Determine's Clear key
            if(action === 'clear'){
                console.log('clear key!');
            }

            //Determine's Calculate key
            if(action === 'calculate'){
                console.log('equal key!');

                //When the user presses the [=] button...
                //...The current number in the display is set to the 'secondValue' variable.
                const secondValue = displayedNum;
            }
        //-----------------------------------------------------------------------|


        

        //UPDATING THE DISPLAY---------------------------------------------------|

        //Reference to the custom attribute: 'previousKeyType'
        const previousKeyType = calculator.dataset.previousKeyType;

        //Pressing a NUMBER KEY:
        //Is it a Number Key/button?
        if (!action) {

            //Is the display currently equal to '0' OR was the previous key pressed an operator key?
            if (displayedNum === '0' || previousKeyType === 'operator') {

              //Updates display to the number pressed.
              display.textContent = keyContent;

              //Else (The user presses a number key and the display is NOT currently '0'):
            } else {

              //Add the pressed number to the currently displayed number.
              display.textContent = displayedNum + keyContent;
            }
          }

        //Remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))



        //Pressing the DECIMAL KEY:
        //Is it a Decimal Key?
        if (action === 'decimal') {

            //Adds a '.' to the display
            display.textContent = displayedNum + '.';
          }

          

        //--------------------------------------------------------------------------|
        


    }
});



