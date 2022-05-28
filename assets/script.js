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

var createTaskHandler = function(event){
    //prevent to refresh the webpage in the browser as sson as we run this code
    event.preventDefault();
    /*When we use square brackets [ ] in a selector, we're trying to select an HTML element by one of its attributes. 
    In this case, we're selecting the <input> element on the page that has a name attribute set to a value of "task-name".*/
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // console.dir(taskTypeInput);
    var listItemEL = document.createElement("li");
    listItemEL.className = "task-item";
    //add the info from the form 
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEL.appendChild(taskInfoEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEL);
    console.dir(listItemEL);
}
//add event listener to add a new item

formEl.addEventListener("submit",createTaskHandler);
