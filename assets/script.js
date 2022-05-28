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
    var listItemEL = document.createElement("li");
    listItemEL.className = "task-item";
    listItemEL.textContent = "This is a new task";
    tasksToDoEl.appendChild(listItemEL);
}
//add event listener to add a new item

formEl.addEventListener("submit",createTaskHandler);
