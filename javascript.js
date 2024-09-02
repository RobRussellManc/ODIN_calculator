
let main_box = document.querySelector("#main_container");
let operator_box = document.querySelector("#operators_container");

let number1html = document.querySelector("#number1");
let number2html = document.querySelector("#number2");
let operatorhtml = document.querySelector("#operator");
let resulthtml = document.querySelector("#result");
let displayhtml = document.querySelector("#display");

// Create operator buttons
const operators = ['/', '+', '-', '*', '='];


let number1 = '';
let number2 = '';
let operator = '';

// function used to take button presses and store the numbers and operator
function record_keypresses(key_press) {
    // Ensure the key press value is a string
    key_press = String(key_press);

    // Handle when user clicks equals
    if (key_press == '=' && number2 != '') {
        let result = do_calculation(number1, number2, operator);
        resulthtml.textContent = result;
        return
    } else if (key_press == '=') {
        return;
    }

    // Handle when users clicks a number or an operator
    if (operators.slice(0, -1).includes(key_press)) {
        operatorhtml.textContent = key_press;
        operator = key_press;
    } else if (operator == '') {
        number1 = number1 + key_press;
        number1html.textContent = `number1: ${number1}`;
    } else {
        number2 = number2 + key_press;
        number2html.textContent = `number2: ${number2}`;
        
    }
}


function do_calculation(number1, number2, operator) {
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







