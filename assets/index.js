class TaskManagement{
    constructor(id,taskname, status="pending",priority="low", due_date=null){
        this.id=id;
        this.taskname=taskname;
        this.due_date=due_date;
        this.status=status;
        this.priority=priority
    } ;
    
}

let task_list=[];
// function to display initial task
function displaytask(){
   let sample_tasks= [
       {taskname: "working",due_date:"25-04-04", status:"completed"},
       {taskname: "shoping",due_date:"25-05-04"},
       {taskname: "washing",due_date:"25-06-04"},
       {taskname: "cooking",due_date:"25-07-04"},
       {taskname: "homework",due_date:"25-08-04"},
       ];
       // make them object of the class 
       sample_tasks.forEach(task=>addTask(task));
    return task_list

}
let currentId= 0
// function to add a task 
function addTask({taskname,status="pending", priority="low", due_date=null}){
    if(!taskname) return; 
let newtask= new TaskManagement(++currentId,taskname,status,priority,due_date )
task_list.push(newtask);
 return task_list;
}
displaytask();
// passing the object 
addTask({taskname:"working",due_date:"2025-04-04"})
// console.log(task_list)



// function to edit a task
function EditTask(id, mynewData){
let mytask= task_list.find(mytask => mytask.id===id);
if(mytask){
    if(mynewData.taskname){
      mytask.taskname= mynewData.taskname;
    }
    if(mynewData.priority){
       mytask.priority= mynewData.priority;
    }
    if (mynewData.due_date) {
            mytask.due_date = mynewData.due_date;
        }
}

 
}
EditTask(2, {taskname: "my shoping"});

// function to delete the task
function deleteTask(id){
    // for example we want to delete task one
    let task= task_list.find(task=>task.id===id);
    if(!task) return;
    let userConfirm =confirm(`are you sure you want to delete  ${task.taskname}?`)
    
    if (userConfirm){
        console.log(`the ${task.taskname}  is deleted!`)
        task_list= task_list.filter(task=>task.id!== id)
        console.log(task_list)
    }
    else {
        console.log("the task is not deleted ")
    }  
}
deleteTask(2);

// function to mark as complete 

function togglestatus(id){
 let mytask= task_list.find(task=> task.id === id);
 if(mytask){
// checking the status 
     if(mytask.status==="pending"){
         mytask.status="completed"
     }
     else{
         mytask.status="pending"
     }
 }
}
togglestatus(2);

// a function for filtering  task by status 
function filterTask(filter){
    let filteredTasks;
    if (filter==="all"){
        filteredTasks= task_list
    }
    else{
      filteredTasks= task_list.filter(mytask=>mytask.status===filter);  
    }
     
    console.log(filteredTasks)
}
filterTask("all");

//started sorting , started by changing priority to numbers for us to use sort method 
function changePriorityToNum(priority){
    if(priority==="high"){
       return 3;
    }
    else if(priority==="medium"){
      return 2;
    }
    else {
       return 1;
    }
}
// sorting the task with priority from high to low 
function sorting(){
  let  newsorted= task_list.sort((task1,task2)=>{
  let    mytask1=changePriorityToNum(task1.priority);
  let  mytask2=changePriorityToNum(task2.priority);
     return mytask2- mytask1;
    });
    return newsorted ;
}
console.log(sorting())








