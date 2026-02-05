const display = document.getElementById('display');
const cells = document.querySelectorAll('.cell');
const clear = document.getElementById('clear');
const remove = document.getElementById('delete');
const equal = document.getElementById('equal');

const inputList = [];
let lastResult;

const handleDisplay = (key) => {
    const regex1 = /[\+\-\*÷.]/;
    const regex2 = /[0-9]/;
    const isOperator = regex1.test(inputList[inputList.length-2]);
    const isNumber = regex2.test(key);

    if (display.value === String(lastResult)) {                     
        display.value = "";
        display.value += key;
    }  else if (isOperator) {

        if (key.match(regex1)) {
            inputList.pop();
            return;
        } else {
            display.value += key;
        }

    }   else if (display.value === "0" && isNumber) {
            display.value = key;
            inputList[inputList.length - 1] = key;  
            inputList.shift();               
    } else {
        display.value += key;       
    }                     
}

const calculate = () => {
    try {
        const regex = /÷/g;
        const expression = display.value.replace(regex, "/");
        return eval(expression);
    } catch {
        return "ERROR";
    }
}

cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        let currentInput = e.target.textContent;
        inputList.push(currentInput);        

        handleDisplay(currentInput);
    })
});

clear.addEventListener('click', () => {
    display.value = "";
    inputList.length = 0;
})

remove.addEventListener('click', () => {
    if (display.value === String(lastResult) || display.value.length === 0) {
        display.value = "";
    } else {
        inputList.pop();
        display.value = inputList.join("");
    }
})

equal.addEventListener('click', () => {
    lastResult = calculate();
    display.value = lastResult;
})



































