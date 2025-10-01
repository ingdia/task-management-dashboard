class TaskManagement {
  constructor(
    id,
    taskname,
    status = "pending",
    priority = "low",
    due_date = null
  ) {
    this.id = id;
    this.taskname = taskname;
    this.due_date = due_date;
    this.status = status;
    this.priority = priority;
  }
}
let currentId = 0;
let task_list = [];
loadtasks();
// function to display initial task
function displaytask() {
  let sample_tasks = [
    { taskname: "working", due_date: "25-04-04", status: "completed" },
    { taskname: "shoping", due_date: "25-05-04" },
    { taskname: "washing", due_date: "25-06-04" },
    { taskname: "cooking", due_date: "25-07-04" },
    { taskname: "homework", due_date: "25-08-04" },
  ];
  // make them object of the class
  sample_tasks.forEach((task) => addTask(task));
  return task_list;
}

// function to add a task
function addTask({
  taskname,
  status = "pending",
  priority = "low",
  due_date = null,
}) {
  if (!taskname) return;
  let newtask = new TaskManagement(
    ++currentId,
    taskname,
    status,
    priority,
    due_date
  );
  task_list.push(newtask);
  storetasks();
  return task_list;
}
// displaytask();
// passing the object
// addTask({taskname:"working",due_date:"2025-04-04"})
// console.log(task_list)

// function to edit a task
function EditTask(id, mynewData) {
  let mytask = task_list.find((mytask) => mytask.id === id);
  if (mytask) {
    if (mynewData.taskname) {
      mytask.taskname = mynewData.taskname;
    }
    if (mynewData.priority) {
      mytask.priority = mynewData.priority;
    }
    if (mynewData.due_date) {
      mytask.due_date = mynewData.due_date;
    }
  }

  storetasks();
}
// EditTask(2, {taskname: "my shoping"});

// function to delete the task
function deleteTask(id) {
  // for example we want to delete task one
  let task = task_list.find((task) => task.id === id);
  if (!task) return;
  let userConfirm = confirm(
    `are you sure you want to delete  ${task.taskname}?`
  );

  if (userConfirm) {
    console.log(`the ${task.taskname}  is deleted!`);
    task_list = task_list.filter((task) => task.id !== id);
    console.log(task_list);
  } else {
    console.log("the task is not deleted ");
  }
  storetasks();
}
// deleteTask(2);

// function to mark as complete

function togglestatus(id) {
  let mytask = task_list.find((task) => task.id === id);
  if (mytask) {
    // checking the status
    if (mytask.status === "pending") {
      mytask.status = "completed";
    } else {
      mytask.status = "pending";
    }
  }
  storetasks();
}
// togglestatus(2);

// a function for filtering  task by status
function filterTask(filter) {
  let filteredTasks;
  if (filter === "all") {
    filteredTasks = task_list;
  } else {
    filteredTasks = task_list.filter((mytask) => mytask.status === filter);
  }

  return filteredTasks;
}
// filterTask("all");

//started sorting , started by changing priority to numbers for us to use sort method
function changePriorityToNum(priority) {
  if (priority === "high") {
    return 3;
  } else if (priority === "medium") {
    return 2;
  } else {
    return 1;
  }
}
// sorting the task with priority from high to low
function sorting() {
  let newsorted = task_list.sort((task1, task2) => {
    let mytask1 = changePriorityToNum(task1.priority);
    let mytask2 = changePriorityToNum(task2.priority);
    return mytask2 - mytask1;
  });
  return newsorted;
}
// console.log(sorting())
// function to store the data on browser storage
function storetasks() {
  localStorage.setItem("task_list", JSON.stringify(task_list));
  return "task_list";
}
// function to load the stored data on browser
function loadtasks() {
  let stored_list = localStorage.getItem("task_list");
  if (stored_list) {
    task_list = JSON.parse(stored_list);
  }
  return task_list;
}

// counting cards 
function countTask(){
    let allTask= task_list.length;
    let pendingTask = task_list.filter(task=>task.status==="pending").length
    let completedTask = task_list.filter(task=>task.status==="completed").length

    return({allTask,pendingTask,completedTask})
}

// an object window that will help to render everything when page loard using browser storage
window.onload = function () {
  loadtasks();
  if (task_list.length === 0) {
    displaytask();
    storetasks();
  }
  renderTasks(task_list);

  currentId = task_list.length
    ? Math.max(...task_list.map((task) => task.id))
    : 0;
};

function renderTasks(tasks) {
  const container = document.getElementById("taskContainer");
  container.innerHTML = ""; // delete the  previous tasks

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className =
      "flex justify-between md:px-4 w-[760px] mb-2 bg-stone-700 h-[50px] rounded-xl items-center";
    taskDiv.setAttribute("data-id", task.id);

    // Priority color
    const priorityClass =
      task.priority === "low"
        ? "bg-green-500 text-black px-2 py-1 rounded-full"
        : task.priority === "medium"
        ? "bg-blue-500 text-black px-2 py-1 rounded-full"
        : "bg-red-500 text-black px-2 py-1 rounded-full";

    taskDiv.innerHTML = `
            <input type="checkbox" ${
              task.status === "completed" ? "checked" : ""
            } class="mr-2"/>
            <p class="flex-1">${task.taskname} [${
      task.status
    }] - Priority: <span class="${priorityClass}">${task.priority}</span> ${task.due_date}<span></span></p>
            <button class="edit-btn px-2"><i class="fa-solid fa-edit"></i></button>
            <button class="delete-btn px-2"><i class="fa-solid fa-trash"></i></button>
        `;

   if(task.status==="completed"){
    let paragraph = taskDiv.querySelector("p");
    paragraph.classList.add("line-through", "text-gray-400");
    taskDiv.classList.add("bg-yellow-900");
   }
    container.appendChild(taskDiv);
    
  });
   updateCountCard();
}
document.getElementById("taskContainer").addEventListener("click", function (e) {
    const taskDiv = e.target.closest("div[data-id]");
    if (!taskDiv) return;

    const id = Number(taskDiv.getAttribute("data-id"));
    const task = task_list.find((t) => t.id === id);

    // Toggle complete
    if (e.target.type === "checkbox") {
      togglestatus(id);
      renderTasks(task_list);
    }

    // Delete task
    if (e.target.closest(".delete-btn")) {
      deleteTask(id);
      renderTasks(task_list);
    }

    // Edit task
    if (e.target.closest(".edit-btn")) {
      const p = taskDiv.querySelector("p");
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.taskname;
      input.className = "px-1 text-black w-full";
      p.innerHTML = "";
      p.appendChild(input);
      input.focus();

      input.addEventListener("keypress", function (ev) {
        if (ev.key === "Enter") {
          EditTask(id, { taskname: input.value.trim() });
          renderTasks(task_list);
        }
      });
    }
  
  });

document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const taskname = document.getElementById("inputTask").value.trim();
  const due_date = document.getElementById("inputDate").value;
  const priority = document.getElementById("inputPriority").value;

  if (!taskname) return;

  addTask({ taskname, due_date, priority });
  renderTasks(task_list);
  updateCountCard();
  e.target.reset();
});

document.getElementById("filterAll").addEventListener("click", function(event){
    event.preventDefault();
    renderTasks(filterTask("all"))
})
document.getElementById("filterPending").addEventListener("click",function(e){
     e.preventDefault();
     renderTasks(filterTask("pending"))
})
document.getElementById("filterCompleted").addEventListener("click",function(e){
     e.preventDefault();
     renderTasks(filterTask("completed"))
})


function updateCountCard(){
    const {allTask,pendingTask,completedTask}= countTask();
    document.getElementById("countAll").innerHTML=`All tasks: ${allTask}`;
    document.getElementById("countPending").innerHTML=`Pending task: ${pendingTask}`;
     document.getElementById("countCompleted").innerHTML=`Completed task
     : ${completedTask}`;
}

