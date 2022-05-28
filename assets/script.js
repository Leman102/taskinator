// //create the parent variable to append child (li)
// var tasksToDoEl = document.querySelector("#tasks-to-do");

// //create a new HTML element (li) with Java
// var taskItemEl = document.createElement("li");

// //assign text to the element
// taskItemEl.textContent = "Hello";
// //append new element to the parent DOM
// tasksToDoEl.appendChild(taskItemEl);
// //add the same css style use .className 
// taskItemEl.className = "task-item";
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event){
    //prevent to refresh the webpage in the browser as sson as we run this code
    event.preventDefault();
    /*When we use square brackets [ ] in a selector, we're trying to select an HTML element by one of its attributes. 
    In this case, we're selecting the <input> element on the page that has a name attribute set to a value of "task-name".*/
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //check if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    //clean the form
    formEl.reset();

    // package up data as an object
    var taskDataObj ={
        name: taskNameInput,
        type: taskTypeInput
    };
    
    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function (taskDataObj){
    //create list item
    var listItemEL = document.createElement("li");
    // give it a class name
    listItemEL.className = "task-item";
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEL.appendChild(taskInfoEl);
    
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEL);
}

//add event listener to add a new item

formEl.addEventListener("submit",taskFormHandler);
