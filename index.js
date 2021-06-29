//parent element to store cards
const taskContainer=document.querySelector(".task__container");//directly access html element
const newCard=({id,imageUrl,taskTitle,taskDescription,taskType})=>`  <div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
<button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
  </div>
  <img src=${imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`;
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
const createNewCard=newCard(taskData);
taskContainer.insertAdjacentHTML("beforeend",createNewCard);//insert card adjacently

};