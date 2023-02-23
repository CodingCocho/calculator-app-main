// HTMLInputElement
const themeSelector: HTMLInputElement | null = document.querySelector('#currentTheme');

// HTMLElements
const background: HTMLElement | null = document.querySelector('#background');
const title: HTMLElement | null = document.querySelector('#title');
const themeLabel: HTMLElement | null = document.querySelector('#theme');
const sliderRange: HTMLElement | null = document.querySelector('#slider-range');
const calcScreen: HTMLElement | null = document.querySelector('#screen');
const calcPad: HTMLElement | null = document.querySelector('#calculator-pad');
const numbers: NodeListOf<HTMLElement> | null = document.querySelectorAll('.number-button-1');
const commands: NodeListOf<HTMLElement> | null = document.querySelectorAll('.command-button-1');
const equals: HTMLElement | null = document.querySelector('#equals');

// Calculator State
let calcScreenDisplay: string | number = '';
let num1: number | undefined;
let num2: number | undefined;
let operand: string = '';

/*
* Handle the theme change for the theme slider
* @param none
* @return void
*/
const handleTheme = (): void =>
{
  if(themeSelector) changeTheme();
}

/*
* Handle the theme change for all the Elements
* @param none
* @return void
*/
const changeTheme = (): void =>
{

  // Hold the new theme
  const newTheme: string = themeSelector!.value

  // Switch block for theme 
  switch(newTheme)
  {

    // Change all HTMLElements to theme 1 
    case '1':
      background!.className = 'background-1';
      title!.className = 'title-1';
      themeLabel!.className = 'theme-1';
      sliderRange!.className = 'slider-range-1';
      calcScreen!.className = 'calculator-screen-1';
      calcPad!.className = 'grid-wrapper-1';
      for(let counter: number = 0; counter < numbers.length; counter++)
      {
        numbers[counter]!.className = 'number-button-1';
      }
      for(let counter: number = 0; counter < commands.length; counter++)
      {
        commands[counter]!.className = 'command-button-1';
      }
      equals!.className = 'equals-1';
      themeSelector!.className = 'slider-1';
      break;
    
    // Change all HTMLElements to theme 2
    case '2':
      background!.className = 'background-2';
      title!.className = 'title-2';
      themeLabel!.className = 'theme-2';
      sliderRange!.className = 'slider-range-2';
      calcScreen!.className = 'calculator-screen-2';
      calcPad!.className = 'grid-wrapper-2';
      for(let counter: number = 0; counter < numbers.length; counter++)
      {
        numbers[counter]!.className = 'number-button-2';
      }
      for(let counter: number = 0; counter < commands.length; counter++)
      {
        commands[counter]!.className = 'command-button-2';
      }
      equals!.className = 'equals-2';
      themeSelector!.className = 'slider-2';
      break;
    
    // Change all HTMLElements to theme 3
    case '3':
      background!.className = 'background-3';
      title!.className = 'title-3';
      themeLabel!.className = 'theme-3';
      sliderRange!.className = 'slider-range-3';
      calcScreen!.className = 'calculator-screen-3';
      calcPad!.className = 'grid-wrapper-3';
      for(let counter: number = 0; counter < numbers.length; counter++)
      {
        numbers[counter]!.className = 'number-button-3';
      }
      for(let counter: number = 0; counter < commands.length; counter++)
      {
        commands[counter]!.className = 'command-button-3';
      }
      equals!.className = 'equals-3';
      themeSelector!.className = 'slider-3';
      break;
  }
}

/*
* Handle the number button on the calculator screen
* @param digit the number pressed
* @return void
*/
const printNumber = (digit: string): void =>
{

  // Check if it is a new number
  calcScreenDisplay = calcScreenDisplay.toString() + digit;
  calcScreen!.innerText = calcScreenDisplay.toString();
  
  checkFormat();
}

/*
* Handle operand selection
* @param operand the operand pressed
* @return void
*/
const setOperand = (userOperand: string): void =>
{

  // No num1 
  if(calcScreenDisplay.toString().length === 0) throwError();

  // Set num1 
  num1 = Number(calcScreenDisplay);

  // Reset calc screen state
  calcScreenDisplay = '';
  calcScreen!.innerText = calcScreenDisplay;

  // Set the operand state
  operand = userOperand;
}

/*
* Handle the operand and the numbers
* @param none
* @return void
*/
const calculate = (): void =>
{

  // Error check
  if(calcScreenDisplay == '' || operand == '')
  {
    throwError();
    return;
  }

  // Set num2
  num2 = Number(calcScreenDisplay);

  // Check for both numbers
  if(num1 && num2)
  {

    // Switch based on operand
    switch(operand)
    {

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
    calcScreen!.innerText = calcScreenDisplay.toString();
    
    // Check the format
    checkFormat();

    // Undefine num2
    num2 = undefined;

    // Reset operand
    operand = '';
  }
}

/*
* Handle reset button
* @param none
* @return void
*/
const reset = (): void =>
{

  // Reset state variables
  operand = '';
  calcScreenDisplay = '';
  calcScreen!.innerText = '';
  num1 = undefined, num2 = undefined;
}

/*
* Handle delete button
* @param none
* @return void
*/
const handleDelete = (): void =>
{

  // Reset current display and screen numbers
  calcScreenDisplay = '';
  calcScreen!.innerText = '';
}

/*
* Handle the format of the calculator screen
* @param none
* @return void
*/
const checkFormat = (): void =>
{

  // Hold a counter for the commas
  let commaCounter: number = 0;
  
  // Check if the new display is an error
  if(calcScreenDisplay.toString().length >= 12)
  {

    // Throw the error
    throwError();
    return;
  }

  // Loop through the string
  for(let counter: number = calcScreenDisplay.toString().length-1; counter >= 0; counter--)
  {
    
    // Check for comma placements
    if(commaCounter === 3)
    {

      // Reset counter
      commaCounter = 0;
      
      // Add the commas
      calcScreen!.innerText = calcScreenDisplay.toString().substring(0, counter+1) + ',' + calcScreen!.innerText.substring(counter+1);
    }

    // Increment the comma counter
    commaCounter++;
  }
}

/*
* Handle any calculator error
@param none
@return void
*/
const throwError = (): void =>
{

  // Reset
  reset(); 
  
  // Show that there is an error with the calculator
  calcScreen!.innerText = "ERROR"; 
}
