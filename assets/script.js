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

//EDIT item from the list
var editTask = function(taskId){
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
  
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
}


//delete item from the list
var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

//add event listener to add a new item

formEl.addEventListener("submit",taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
