
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
const operators = ['/', '+', '-', '*', '='];


let number1 = '';
let number2 = '';
let operator = '';

// Track if the display is showing something calculated 
let calculated_on_display = false;

// function used to take button presses and store the numbers and operator
function record_keypresses(key_press) {
    // Ensure the key press value is a string
    key_press = String(key_press);

    // Handle when user clicks equals
    if (key_press == '=' && number2 != '') {
        let result = do_calculation(number1, number2, operator);
        resulthtml.textContent = result;

        // Number1 becomes the calculated result
        number1 = result; 
        number1html.textContent = `number1: ${number1}`;
        number2 = '';
        number2html.textContent = `number2: ${number2}`;
        operator = '';
        operatorhtml.textContent = operator;

        update_display(number1, number2, operator);

        // Update tracker to show the display is currently showing a calculated value
        calculated_on_display = true;

        return
    } else if (key_press == '=') { // If user just clicks = without entering something to calculate, ignore the click
        return;
    }

    // Handle when users clicks a number or an operator

    // if user clicks an operator
    if (operators.slice(0, -1).includes(key_press)) {  
        operatorhtml.textContent = key_press;
        operator = key_press;
        update_display(number1, number2, operator);
        calculated_on_display = false;
    } else if (calculated_on_display == true) {  // This handles if a user clicks a number while display is showing a calculated value
        reset(); 
        update_display(number1, number2, operator); // resets display to blank
        calculated_on_display = false;
        number1 = number1 + key_press;
        number1html.textContent = `number1: ${number1}`;
        update_display(number1, number2, operator);
 
    } else if (operator == '') { // When a user clicks a number
        number1 = number1 + key_press;
        number1html.textContent = `number1: ${number1}`;
        update_display(number1, number2, operator);
    } else {
        number2 = number2 + key_press; // When a user clicks a number after clicking an operator
        number2html.textContent = `number2: ${number2}`;
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


function update_display(number1, number2, operator) {
    displayhtml.textContent = number1 + operator + number2;
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
for (let i=0; i < 10; i++) {
    let button = document.createElement("button");
    // give it an id
    button.className = `button ${i}`;
    button.textContent = i;
    main_box.appendChild(button);    

    button.addEventListener("click", () => {record_keypresses(i)});

}



for (let i=0; i < operators.length; i++) {
    let button = document.createElement("button");
    button.className = (`operator ${operators[i]}`);
    button.textContent = operators[i];
    operator_box.appendChild(button);
    button.addEventListener("click", () => {record_keypresses(operators[i])});
}







