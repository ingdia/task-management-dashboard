class TaskManagement{
    constructor(id,taskname, status="pending",priority="low", due_date=null){
        this.id=id;
        this.taskname=taskname;
        this.due_date=due_date;
        this.status=status;
        this.priority=priority
    }  
    
}

let task_list=[];
// function to display initial task
function displaytask(){
   let sample_tasks= [
       {taskname: "working",due_date:"25-04-04"},
       {taskname: "shoping",due_date:"25-05-04"},
       {taskname: "washing",due_date:"25-06-04"},
       {taskname: "cooking",due_date:"25-07-04"},
       {taskname: "homework",due_date:"25-08-04"},
       ];
       // make them object of the class 
       sample_tasks.forEach(task=>addTask(task));
    return task_list

}

// function to add a task 
function addTask({taskname,status="pending", priority="low", due_date=null}){
let newtask= new TaskManagement(Date.now(),taskname,status,priority,due_date )
task_list.push(newtask);
 return task_list;
}
displaytask();
// passing the object 
addTask({taskname:"working",due_date:"2025-04-04"})
console.log(task_list)


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
            mytask.due_date = newData.due_date;
        }
}

 
}
EditTask(2, {taskname: "my shoping"});
// function to delete the task
function deleteTask(taskname){
    // for example we want to delete task one
    let userConfirm =confirm("are you sure you want to delete this task")
    
    if (userConfirm){
        console.log("the task is deleted!")
        task_list= task_list.filter(task=>task.taskname!== taskname)
        console.log(task_list)
    }
    else {
        console.log("the task is not deleted ")
    }  
}
deleteTask("shoping");




