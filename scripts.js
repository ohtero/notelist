var rowCount = 3;
var rowIndex = 3;
var buttonIndex = 3;
var currentRow;
var nextRow;

var createNewRow = () => {
    const newRow = document.createElement('div');
    newRow.className ="textRow";
    newRow.id ="row" + rowIndex;  
    newRow.addEventListener("keydown", insertAfter);
    newRow.addEventListener("keydown", switchRow);
    newRow.addEventListener("keydown", removeCurrentRow);
    const newTextField = document.createElement("input");
    newTextField.type ='text';
    newTextField.className ="inputField";
    const newBtnCont = document.createElement('div');
    newBtnCont.id = 'button' + buttonIndex;
    newBtnCont.className = 'rowButtonCont';
    newBtnCont.addEventListener("click", removeOwnRow);
    const newButton = document.createElement('i');
    newButton.setAttribute('class', 'fi fi-br-cross rowBtn');
    newBtnCont.appendChild(newButton);
    newRow.appendChild(newBtnCont);
    newRow.appendChild(newTextField);
    return newRow;
};

function createAddRowBtn() {
    const newAddRowBtnCont = document.createElement('div');
    newAddRowBtnCont.className = 'addRowAfterBtn';
    newAddRowBtnCont.id ='addRowBtn' + buttonIndex;
    newAddRowBtnCont.addEventListener("click", insertAfterByBtn);
    const newButton = document.createElement('i');
    newButton.className ='fi fi-br-add plusIcon';
    newAddRowBtnCont.appendChild(newButton);
    return newAddRowBtnCont;
}

function insertAfter(e) {
    if (e.key == 'Enter') {
        let currentRow = this;
        let nextRow = currentRow.nextElementSibling;
        let currentBtn = getBtnFromRow(this);
        let nextBtn = currentBtn.nextElementSibling;
        textFields.insertBefore(createNewRow(), nextRow);
        addRowBtnCont.insertBefore(createAddRowBtn(), nextBtn);
        buttonIndex++;
        rowCount++;
        rowIndex++;
        const focusTargetRow = currentRow.nextElementSibling.lastElementChild;
        focusTargetRow.focus();       
    }
};

function getRowFromButtonId(button) {
    let btnId = button.id;
    let btnIndex;
    if (btnId.length < 11) {
        btnIndex = btnId[btnId.length -1];
    }
    if (btnId.length >= 11) {
        btnIndex = btnId[btnId.length -2] + btnId[btnId.length -1];    
    } 
    let currentRow = document.getElementById('row' + btnIndex);   
    return currentRow;  
};

function getBtnFromRow(row) {
    let currentRow = row.id;
    let currentRowIndex;
    if (currentRow.length == 4) {
        currentRowIndex = currentRow[currentRow.length -1];
    }  
    if ( currentRow.length == 5) {
        currentRowIndex = currentRow[currentRow.length -2] + currentRow[currentRow.length -1];
    }
    let currentBtnId = 'addRowBtn' + currentRowIndex;
    let currentBtn = document.getElementById(currentBtnId);
    return currentBtn;
}

function insertAfterByBtn() {
    let currentRow = getRowFromButtonId(this);
    let nextRow = currentRow.nextElementSibling;
    textFields.insertBefore(createNewRow(), nextRow);
    let currentBtn = this;
    let nextBtn = currentBtn.nextElementSibling;
    addRowBtnCont.insertBefore(createAddRowBtn(), nextBtn);
    buttonIndex++;
    rowCount++;
    rowIndex++;
};

var appendTextfield = () => {
    textFields.append(createNewRow());
    addRowBtnCont.append(createAddRowBtn());
    buttonIndex++;
    rowCount++;
    rowIndex++;
};

function removeCurrentRow(e) {
    if (e.key == 'Delete' && rowCount > 1) {
        let currentRow = this;
        if (currentRow != textFields.lastElementChild) {
            let nextRow = currentRow.nextElementSibling.lastElementChild;
            nextRow.focus();    
        }
        if (currentRow == textFields.lastElementChild) {
            let prevRow = currentRow.previousElementSibling.lastElementChild;
            prevRow.focus();
        }
        let currentBtn = getBtnFromRow(this);
        currentBtn.remove();
        currentRow.remove();
        rowCount--;       
    }
};

function removeOwnRow() {
    if (rowCount > 1) {
        let row = this.parentNode;
        let currentBtn = getBtnFromRow(this.parentNode);
        currentBtn.remove();
        row.remove();
        rowCount--;
    }
};
var removeLastRow = () => {
    if (rowCount > 1) {
        textFields.removeChild(textFields.lastElementChild);
        rowCount--;
    }
};

function switchRow(e) {
    let firstRow = textFields.firstElementChild;
    let lastRow = textFields.lastElementChild;
    let currentRow = this;
    if (e.key == 'ArrowUp' && currentRow != firstRow) {    
        let upperRow = currentRow.previousElementSibling.lastElementChild;
        upperRow.focus();
    } 
    if (e.key == 'ArrowDown' && currentRow != lastRow) { 
        let lowerRow = currentRow.nextElementSibling.lastElementChild;
        lowerRow.focus();
    }
};

document.getElementById('row0').addEventListener("keydown", insertAfter);
document.getElementById('row1').addEventListener("keydown", insertAfter);
document.getElementById('row2').addEventListener("keydown", insertAfter);
document.getElementById('row0').addEventListener("keydown", switchRow);
document.getElementById('row1').addEventListener("keydown", switchRow);
document.getElementById('row2').addEventListener("keydown", switchRow);
document.getElementById('row0').addEventListener("keydown", removeCurrentRow);
document.getElementById('row1').addEventListener("keydown", removeCurrentRow);
document.getElementById('row2').addEventListener("keydown", removeCurrentRow);
document.getElementById('button0').addEventListener("click", removeOwnRow);
document.getElementById('button1').addEventListener("click", removeOwnRow);
document.getElementById('button2').addEventListener("click", removeOwnRow);
document.getElementById('addBtn').addEventListener("click", appendTextfield);
document.getElementById('addRowBtn0').addEventListener("click", insertAfterByBtn);
document.getElementById('addRowBtn1').addEventListener("click", insertAfterByBtn);
document.getElementById('addRowBtn2').addEventListener("click", insertAfterByBtn);



