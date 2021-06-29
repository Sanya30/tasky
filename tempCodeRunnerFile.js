const saveChanges =() =>
{
 const taskData=
 {
     id:`${Date.now()}`,//return a unique no. as ID for card
     imageUrl:document.getElementById("Imageurl").value,
     taskTitle:document.getElementById("tasktitle").value,
     taskType:document.getElementById("tasktype").value,
     taskDescription:document.getElementById("taskdescription").value,
 };
 //parent object in browser
 //parent object of html->DOM->document
 console.log(taskData);
};