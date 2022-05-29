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

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

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

    //Adding edit option
    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
     // no data attribute, so create object as normal and pass to createTaskEl (function package up data as an object)
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
    }  
    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}


var createTaskEl = function (taskDataObj){
    //create list item
    var listItemEL = document.createElement("li");
    // give it a class name
    listItemEL.className = "task-item";

    //add task id as a custom attribute
    listItemEL.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEL.appendChild(taskInfoEl);
    
    //append createTasksActions
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEL.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEL);

    //increase task counter for next unique Id
    taskIdCounter++;
}

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId)

    actionContainerEl.appendChild(deleteButtonEl);

    //add HTML select element
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    //DRY create a loop to create the previous code for the other sections
    var statusChoices =["To Do", "In Progress", "Completed"];
    for(var i = 0; i < statusChoices.length; i++){
        //create HTML option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

//if EDIT mode is true
var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    // remove data attribute from form
    formEl.removeAttribute("data-task-id");
    // update formEl button to go back to saying "Add Task" instead of "Edit Task"
    formEl.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event){
    // console.log(event.target);
    //get target element from event
    var targetEl = event.target;// long form event.target.getAttribute

    //check for the EDIT buttton based on the class name
    if(targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //check for the DELETE buttton based on the class name
    if (targetEl.matches(".delete-btn")){
        // get element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//status change
var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // move the item from one column to another one based on the status
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};

//EDIT item from the list
var editTask = function(taskId) {
    console.log(taskId);
  
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
  
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
  
    // write values of taskname and taskType to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
  
    // set data attribute to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id", taskId);
    // update form's button to reflect editing a task rather than creating a new one
    formEl.querySelector("#save-task").textContent = "Save Task";
};


//delete item from the list
var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var confirmDelete= confirm("Do you want to delete this task?");
    if (confirmDelete){
        taskSelected.remove();
    }
}

// Create a new task
formEl.addEventListener("submit",taskFormHandler);
// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);