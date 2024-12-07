let todoItemsContainer = document.getElementById("todoItemsContainer");
let colors = [' #66ffff', 'lightgreen', ' #bf80ff', ' #ffc266', ' #ffb3ff', ' #80e5ff', ' #ff4d94', 'lightgrey', 'yellow', ' #b3ffb3', 'pink'];
let lengthSize = colors.length;


let todoList = [];

function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getFromLocalStorage() {
    let getTodo = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(getTodo);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
todoList = getFromLocalStorage();

let totalUniqueNo = todoList.length;

function onTodoStatusCheck(labelId, todoId) {
    let checkElement = document.getElementById(labelId);
    checkElement.classList.toggle("checked");

    let getIndex = todoList.findIndex(function(eachElement) {
        if (todoId === "todo" + eachElement.uniqueNo) {
            return true;
        } else {
            return false;
        }
    });
    let checkTodo = todoList[getIndex];
    if (checkTodo.isChecked === true) {
        checkTodo.isChecked = false;
    } else {
        checkTodo.isChecked = true;
    }

}

function getIndex(todoElement) {
    let todoId = "todo" + todoElement.uniqueNo;
    let index = todoList.findIndex(function(eachElement) {
        if (todoId === eachElement.uniqueNo) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(index, 1);
}

function createAndAppendTodo(todo) {
    let randomNumber = Math.ceil(Math.random() * lengthSize - 1);
    console.log(randomNumber)
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let checkBoxId = "checkBoxInput" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkBoxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;

    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkBoxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    labelContainer.appendChild(labelElement);
    labelContainer.style.backgroundColor = colors[randomNumber];
    inputElement.onclick = function() {
        onTodoStatusCheck(labelId, todoId);
    }
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);


    deleteIcon.onclick = function() {
        todoItemsContainer.removeChild(todoElement);
        getIndex(todoElement);
    }

}
let userInput = document.getElementById("todoUserInput");
let addButton = document.getElementById("addBtn");

function onAddTodo() {
    let userInputValue = userInput.value;
    console.log(userInputValue);
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    totalUniqueNo = parseInt(totalUniqueNo) + 1;
    let newTodoList = {
        text: userInputValue,
        uniqueNo: totalUniqueNo,
        isChecked: false

    };
    todoList.push(newTodoList);
    createAndAppendTodo(newTodoList);
    userInput.value = "";

}
addButton.onclick = function() {
    onAddTodo();
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}
let saveButton = document.getElementById("button");

saveButton.textContent = "Save";
saveButton.onclick = function() {
    saveToLocalStorage();

}