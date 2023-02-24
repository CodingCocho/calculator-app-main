// HTMLInputElement
var themeSelector = document.querySelector('#currentTheme');
// HTMLElements
var background = document.querySelector('#background');
var title = document.querySelector('#title');
var themeLabel = document.querySelector('#theme');
var sliderRange = document.querySelector('#slider-range');
var calcScreen = document.querySelector('#screen');
var calcPad = document.querySelector('#calculator-pad');
var numbers = document.querySelectorAll('.number-button-1');
var commands = document.querySelectorAll('.command-button-1');
var equals = document.querySelector('#equals');
// Calculator State
var calcScreenDisplay = '';
var num1;
var num2;
var operand = '';
var hasDecimal = false;
/*
* Handle the theme change for the theme slider
* @param none
* @return void
*/
var handleTheme = function () {
    if (themeSelector)
        changeTheme();
};
/*
* Handle the theme change for all the Elements
* @param none
* @return void
*/
var changeTheme = function () {
    // Hold the new theme
    var newTheme = themeSelector.value;
    // Switch block for theme 
    switch (newTheme) {
        // Change all HTMLElements to theme 1 
        case '1':
            background.className = 'background-1';
            title.className = 'title-1';
            themeLabel.className = 'theme-1';
            sliderRange.className = 'slider-range-1';
            calcScreen.className = 'calculator-screen-1';
            calcPad.className = 'grid-wrapper-1';
            for (var counter = 0; counter < numbers.length; counter++) {
                numbers[counter].className = 'number-button-1';
            }
            for (var counter = 0; counter < commands.length; counter++) {
                commands[counter].className = 'command-button-1';
            }
            equals.className = 'equals-1';
            themeSelector.className = 'slider-1';
            break;
        // Change all HTMLElements to theme 2
        case '2':
            background.className = 'background-2';
            title.className = 'title-2';
            themeLabel.className = 'theme-2';
            sliderRange.className = 'slider-range-2';
            calcScreen.className = 'calculator-screen-2';
            calcPad.className = 'grid-wrapper-2';
            for (var counter = 0; counter < numbers.length; counter++) {
                numbers[counter].className = 'number-button-2';
            }
            for (var counter = 0; counter < commands.length; counter++) {
                commands[counter].className = 'command-button-2';
            }
            equals.className = 'equals-2';
            themeSelector.className = 'slider-2';
            break;
        // Change all HTMLElements to theme 3
        case '3':
            background.className = 'background-3';
            title.className = 'title-3';
            themeLabel.className = 'theme-3';
            sliderRange.className = 'slider-range-3';
            calcScreen.className = 'calculator-screen-3';
            calcPad.className = 'grid-wrapper-3';
            for (var counter = 0; counter < numbers.length; counter++) {
                numbers[counter].className = 'number-button-3';
            }
            for (var counter = 0; counter < commands.length; counter++) {
                commands[counter].className = 'command-button-3';
            }
            equals.className = 'equals-3';
            themeSelector.className = 'slider-3';
            break;
    }
};
/*
* Handle the number button on the calculator screen
* @param digit the number pressed
* @return void
*/
var printNumber = function (digit) {
    // Check if it is a new number
    calcScreenDisplay = calcScreenDisplay.toString() + digit;
    calcScreen.innerText = calcScreenDisplay.toString();
    checkFormat();
};
/*
* Handle operand selection
* @param operand the operand pressed
* @return void
*/
var setOperand = function (userOperand) {
    // No num1 
    if (calcScreenDisplay.toString().length === 0)
        throwError();
    // Set num1 
    num1 = Number(calcScreenDisplay);
    // Reset calc screen state
    calcScreenDisplay = '';
    calcScreen.innerText = calcScreenDisplay;
    // Set the operand state
    operand = userOperand;
    // Set the decimal state
    hasDecimal = false;
};
/*
* Handle the operand and the numbers
* @param none
* @return void
*/
var calculate = function () {
    // Error check
    if (calcScreenDisplay == '' || operand == '') {
        throwError();
        return;
    }
    // Set num2
    num2 = Number(calcScreenDisplay);
    // Check for both numbers
    if (num1 && num2) {
        // Switch based on operand
        switch (operand) {
            // Handle addition
            case '+':
                num1 = num1 + num2;
                break;
            // Handle subtraction
            case '-':
                num1 = num1 - num2;
                break;
            // Handle multiplication
            case 'x':
                num1 = num1 * num2;
                break;
            // Handle division
            case '/':
                num1 = num1 / num2;
                break;
        }
        // Hold the screen display state
        calcScreenDisplay = num1;
        // Set the new string
        calcScreen.innerText = calcScreenDisplay.toString();
        // Check the format
        checkFormat();
        // Undefine num2
        num2 = undefined;
        // Reset operand
        operand = '';
    }
};
/*
* Handle reset button
* @param none
* @return void
*/
var reset = function () {
    // Reset state variables
    operand = '';
    calcScreenDisplay = '';
    calcScreen.innerText = '';
    num1 = undefined, num2 = undefined;
    hasDecimal = false;
};
/*
* Handle delete button
* @param none
* @return void
*/
var handleDelete = function () {
    // Reset current display and screen numbers
    calcScreenDisplay = '';
    calcScreen.innerText = '';
    hasDecimal = false;
};
/*
* Handle the decimal point
* @param none
* @return void
*/
var handleDecimalPoint = function () {
    // Check if there is a decimal
    if (hasDecimal) {
        throwError();
        return;
    }
    // Else add the decimal
    calcScreenDisplay = calcScreenDisplay.toString() + '.';
    calcScreen.innerText = calcScreen.innerText + '.';
    hasDecimal = true;
};
/*
* Handle the format of the calculator screen
* @param none
* @return void
*/
var checkFormat = function () {
    // Hold a counter for the commas
    var commaCounter = 0;
    // Check if the new display is an error
    if (calcScreenDisplay.toString().length >= 12) {
        // Throw the error
        throwError();
        return;
    }
    // Hold start for loop
    var start = calcScreenDisplay.toString().length - 1;
    // Decimal check
    if (hasDecimal) {
        start = calcScreenDisplay.toString().indexOf('.') - 1;
    }
    // Loop through the string
    for (var counter = start; counter >= 0; counter--) {
        // Check for comma placements
        if (commaCounter === 3) {
            // Reset counter
            commaCounter = 0;
            // Add the commas
            calcScreen.innerText = calcScreenDisplay.toString().substring(0, counter + 1) + ',' + calcScreen.innerText.substring(counter + 1);
        }
        // Increment the comma counter
        commaCounter++;
    }
};
/*
* Handle any calculator error
@param none
@return void
*/
var throwError = function () {
    // Reset
    reset();
    // Show that there is an error with the calculator
    calcScreen.innerText = "ERROR";
};
