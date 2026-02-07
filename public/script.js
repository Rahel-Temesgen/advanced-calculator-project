const display = document.getElementById('display');
const operators = document.querySelectorAll('.operator');
const operands = document.querySelectorAll('.operand');
const clear = document.getElementById('clear');
const remove = document.getElementById('delete');
const equal = document.getElementById('equal');

const operandList = [];
const operatorList = [];
const expressionList = [];

operands.forEach(operand => {
    operand.addEventListener('click', (e) => {
        const currentOperand = e.target.textContent;
        handleOperand(currentOperand);
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        const currentOperator = e.target.textContent;
        handleOperator(currentOperator);
    })
});

const handleOperand = (key) => {
    const regex1 = /\./;
    const regex2 = /[\.\d]/;
    const regex3 = /[\+\-\*÷]/;
    const regex4 = /[\d]/;    

    const lastIndex = expressionList.length - 1;
    const isDecimal = regex1.test(operandList[operandList.length - 1]);
    const isMatch = regex2.test(expressionList[lastIndex]);
    const isOperator = regex3.test(expressionList[expressionList.length - 1]);
    const isNumber = regex4.test(key);  

    if (display.value === 'ERROR') {
        display.value = "";
    }
    
    if (key === '.' && (isOperator || expressionList.length === 0)) {
       key = '0' + key;        
    }

    if (isDecimal && key === '.') {     
        return;
    }

    if (display.value === '0' && isNumber) {
        display.value = '';
        operandList[operandList.length - 1] = key;  
        operandList.shift();
    }
    operandList.push(key);
    display.value += key;

    if (isMatch) {        
        expressionList.splice(lastIndex, 1);
    }
    expressionList.push(operandList.join(''));
    operatorList.length = 0;
}

const handleOperator = (key) => {
    const regex = /[\+\-\*÷]/;
    const lastItem = display.value.charAt(display.value.length - 1);
    const isOperator = regex.test(lastItem);

    if (isOperator || expressionList.length === 0) {               
        return;
    }
    operatorList.push(key);
    display.value += key;
    expressionList.push(operatorList.join(''));
    operandList.length = 0;
}

const handleCalculation = () => {   
    while (expressionList.includes('÷') || expressionList.includes('*')) {
        
        if (expressionList.some(key => key === '÷')) {
            const divIndex = expressionList.indexOf('÷');
            const firstDivOperandIndex = divIndex - 1;
            const secondDivOperandIndex = divIndex + 1;
            const firstDivOperand = parseFloat(expressionList[firstDivOperandIndex]);
            const secondDivOperand = parseFloat(expressionList[secondDivOperandIndex]);

            if (secondDivOperand === 0) {           
                display.value = "ERROR";
                expressionList.length = 0
                return;
            }
            const tempDivResult = (firstDivOperand/secondDivOperand); 
    
            expressionList.splice(firstDivOperandIndex, 3, tempDivResult.toString());  
        }

        if (expressionList.some(key => key === '*')) {
            const mulIndex = expressionList.indexOf('*');
            const firstMulOperandIndex = mulIndex - 1;
            const secondMulOperandIndex = mulIndex + 1;
            const firstMulOperand = parseFloat(expressionList[firstMulOperandIndex]);
            const secondMulOperand = parseFloat(expressionList[secondMulOperandIndex]);

            const tempMulResult = (firstMulOperand * secondMulOperand);

            expressionList.splice(firstMulOperandIndex, 3, tempMulResult.toString());
        }          
    }

    addAndSubtract();
}


const addAndSubtract = () => {
     while (expressionList.includes('+') || expressionList.includes('-')) {

        if (expressionList.some(key => key === '+')) {
            const addIndex = expressionList.indexOf('+');
            const firstAddOperandIndex = addIndex - 1;
            const secondAddOperandIndex = addIndex + 1;
            const firstAddOperand = parseFloat(expressionList[firstAddOperandIndex]);
            const secondAddOperand = parseFloat(expressionList[secondAddOperandIndex]);

            const tempAddResult = (firstAddOperand + secondAddOperand);

            expressionList.splice(firstAddOperandIndex, 3, tempAddResult.toString());
        }

        if (expressionList.some(key => key === '-')) { 
            const subIndex = expressionList.indexOf('-');
            const firstSubOperandIndex = subIndex - 1;
            const secondSubOperandIndex = subIndex + 1;
            const firstSubOperand = parseFloat(expressionList[firstSubOperandIndex]);
            const secondSubOperand = parseFloat(expressionList[secondSubOperandIndex]);

            const tempSubResult = (firstSubOperand - secondSubOperand);

            expressionList.splice(firstSubOperandIndex, 3, tempSubResult.toString());
        }   
    }
}

equal.addEventListener('click', () => {
    handleCalculation();    
    
    if (expressionList.includes('NaN')) {
        display.value = 'ERROR';
        operandList.length = 0;
        operatorList.length = 0;
        expressionList.length = 0;
        return;
    }

    display.value = expressionList.join('');
    operandList.length = 0;
    operandList.push(expressionList.join(''));       
});

remove.addEventListener('click', () => {
    if (display.value === 'ERROR') {
        display.value = "";
        return;
    }

    if (expressionList.length === 0) {
        return;
    }

    let lastItem = expressionList[expressionList.length - 1];
    lastItem = lastItem.slice(0, -1);

    if (lastItem === "") {
        expressionList.pop();
    } else {
        expressionList[expressionList.length - 1] = lastItem;
    }

    operandList.pop();
    operatorList.pop();

    display.value = expressionList.join('');    
});

clear.addEventListener('click', () => {
    display.value = '';
    operandList.length = 0;
    operatorList.length = 0;
    expressionList.length = 0;    
});
