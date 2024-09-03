
let main_box = document.querySelector("#main_container");
let operator_box = document.querySelector("#operators_container");
let number1html = document.querySelector("#number1");
let number2html = document.querySelector("#number2");
let operatorhtml = document.querySelector("#operator");
let resulthtml = document.querySelector("#result");
let displayhtml = document.querySelector("#display");
let clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => reset());

// Create operator buttons
const operators = ['/', '+', '*', '-', '='];

// Store numbers and operator
let number1 = '';
let number2 = '';
let operator = '';

// Track if the display is showing something calculated 
let calculated_on_display = false;

function roundToThreeDPIfNeeded(number) {
    // Convert the number to a string to check its decimal places
    let str = number.toString();
    
    // Check if there is a decimal point and if there are more than 3 digits after it
    if (str.includes('.') && str.split('.')[1].length > 3) {
        // Round the number to 3 decimal places
        return parseFloat(number.toFixed(3));
    }
    
    // Return the number as it is if it doesn't need rounding
    return number;
}

// function used to take button presses and store the numbers and operator
function record_keypresses(key_press) {
    // Ensure the key press value is a string
    key_press = String(key_press);

    // Handle if a user clicks minus before clicking a number (allows it!)
    if (key_press == '-' && number1 == ''){
        number1 = number1 + key_press;
        update_display(number1, number2, operator);
        return
    // if a user clicks minus before entering the 2nd number, allow it
    } else if (key_press == '-' && number2 == '') {
        number2 = number2 + key_press;
        update_display(number1, number2, operator);
        return
    // if user clicks +, - or / when number 2 contains and digits, then ignore it
    } else if (operators.slice(0, -1).includes(key_press) && number2 != '') {
        return;
    }


    // Handle when user clicks equals
    if (key_press == '=' && number2 != '') {
        let result = do_calculation(number1, number2, operator);
        number1 = roundToThreeDPIfNeeded(result); 
        number2 = '';
        operator = '';

        update_display(number1, number2, operator);

        // Update tracker to show the display is currently showing a calculated value
        calculated_on_display = true;

        return
    } else if (key_press == '=') { // If user just clicks = without entering something to calculate, ignore the click
        return;
    }

    // Handle when users clicks a number or an operator
    // Handle if a user clicks an operator before entering a number (ignore it)
    if (operators.slice(0, -1).includes(key_press) && (number1 == '')) {
        return
        // else, if user clciks operator, allow it
    } else if (operators.slice(0, -1).includes(key_press)) {  
        operator = key_press;
        update_display(number1, number2, operator);
        calculated_on_display = false;
        // This handles if a user clicks a number while display is showing a calculated value (reset the screen)
    } else if (calculated_on_display == true) {  
        reset(); 
        update_display(number1, number2, operator); // resets display to blank
        calculated_on_display = false;
        number1 = number1 + key_press;
        update_display(number1, number2, operator);
        // When a user clicks a number
    } else if (operator == '') { 
        number1 = number1 + key_press;
        update_display(number1, number2, operator);
        // When a user clicks a number after clicking an operator (add it to 2nd number)
    } else {
        number2 = number2 + key_press; 
        update_display(number1, number2, operator);
        
    }
}

// Resets all numbers and operators stored, and blanks the display
function reset() {
    number1 = '';
    number2 = '';
    operator = '';
    update_display(number1, number2, operator);
}


// function to update the calc display
function update_display(number1, number2, operator) {
    display_inner.textContent = number1 + operator + number2;
}

function do_calculation(number1, number2, operator) {
    number1 = Number(number1);
    number2 = Number(number2);

    if (operator === "/") {
        return number1 / number2;
    } else if (operator === "+") {
        return number1 + number2;
    } else if (operator === "-") {
        return number1 - number2;
    } else if (operator === "*") {
        return number1 * number2;
    }
}



// Create the buttons 1 to 9
for (let i=9; i > -1; i--) {
    let button = document.createElement("button");
    // give it an id
    button.className = `button number_${i}`;
    button.textContent = i;
    numbers_container.appendChild(button);    

    button.addEventListener("click", () => {record_keypresses(i)});
}


// Create operator buttons
for (let i=0; i < operators.length; i++) {
    // use this if statement to create the equals button in the numbers div
    if (operators[i] == '=') {
        let button = document.createElement("button");
        button.className = (`equals ${operators[i]}`);
        button.textContent = operators[i];
        numbers_container.appendChild(button);
        button.addEventListener("click", () => {record_keypresses(operators[i])});
    } else { // create other operators into their own div
        let button = document.createElement("button");
        button.className = (`operator ${operators[i]}`);
        button.textContent = operators[i];
        operators_container.appendChild(button);
        button.addEventListener("click", () => {record_keypresses(operators[i])});
    }
}







