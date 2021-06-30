//parent element to store cards
const taskContainer=document.querySelector(".task__container");//directly access html element
//global store->to store card details
let globalStore=[];


//convert data to html card and changing dynamic data
const newCard=({id,imageUrl,taskTitle,taskDescription,taskType})=>
`  <div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success" id=${id} onclick="editCard.apply(this,arguments)"><i class="fas fa-pencil-alt" id=${id} onclick="editCard.apply(this,arguments)"></i></button>
<button type="button" class="btn btn-outline-danger"  id=${id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash" id=${id} onclick="deleteCard.apply(this,arguments)"></i></button>
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
//2nd issue resolved
const loadInitialTaskCards=()=>
{
  //access localstorage
  const getInitialData=localStorage.getItem("tasky");//if null return
  if(!getInitialData) return;//false
  //convert stringify object to object
  const {cards}=JSON.parse(getInitialData);
  //map around the array to generate html card and inject to DOM
  cards.map((cardObject)=>{
   const createNewCard=newCard(cardObject);
   taskContainer.insertAdjacentHTML("beforeend",createNewCard);
   globalStore.push(cardObject);
  }
  );

};
//
const updateLocalStorage=()=>
{
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};

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
 //html code
const createNewCard=newCard(taskData);
taskContainer.insertAdjacentHTML("beforeend",createNewCard);//insert card adjacently
globalStore.push(taskData);//we get an array of object
//application programming interface
//localstorage->interface->programming
updateLocalStorage();
};
const deleteCard =(event)=>
{
//id
event=window.event;//access exact element
const targetID=event.target.id;
const tagname=event.target.tagName;//to check whether clicking on button or icon
//search globalStore array,then remove the object which matches with the id
globalStore=globalStore.filter((cardObject)=>cardObject.id!==targetID);//cards having id not equal to target id will be filtered
//loop over the new globalStore ang inject updated cards to DOM(this doesnt work)


updateLocalStorage();//delete from root of local storage


//access DOM to remove them
//if click on button of delete
if(tagname==="BUTTON")
{
  //task__container
  return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode //col-lg-4
  );
}
//if user click on icon of delete
//task__container
return taskContainer.removeChild(
  event.target.parentNode.parentNode.parentNode.parentNode //col-lg-4
);

};
//contenteditable
const editCard=(event)=>
{
  event=window.event;//access exact element
const targetID=event.target.id;
const tagname=event.target.tagName;
let parentElement;
if(tagname==="BUTTON")
{
  parentElement=event.target.parentNode.parentNode //refer to card

}
else{
  parentElement=event.target.parentNode.parentNode.parentNode
}
let taskTitle=parentElement.childNodes[5].childNodes[1];
let taskDescription=parentElement.childNodes[5].childNodes[3];
let taskType=parentElement.childNodes[5].childNodes[5];
let submitButton=parentElement.childNodes[7].childNodes[1];
//set Attributes
taskTitle.setAttribute("contenteditable","true");
taskDescription.setAttribute("contenteditable","true");
taskType.setAttribute("contenteditable","true");
submitButton.innerHTML="Save Changes";
}
//Issues
//the modal was not closing upon adding new card
//the cards were deleted after refresh ->local storage(5MB)->browser storage

//features
//delete modal feature
//open task
//Edit task