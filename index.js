//parent element to store cards
const taskContainer=document.querySelector(".task__container");

//global store
let globalStore=[];
//card1 card2 card3
const newCard= ({
    id,
    imageUrl,
    taskTitle,
    taskDescription,
    taskType,
})=>
  `<div class="col-md-6 col-lg-4" id=${id}>
     <div class="card">
          <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this,arguments)">
            <i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this,arguments)"></i></button>
          </div>
          <img src=${imageUrl}
          class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">${taskTitle}</h5>
            <p class="card-text">${taskDescription}</p>
        <span class="badge bg-primary">${taskType}</span>
          </div>
          <div class="card-footer text-muted">
            <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
          </div>
        </div>
   </div>`
 const loadInitialTaskCards =() =>
 {
   //acess local storage
   const getInitialData=localStorage.tasky;//if null
   if(!getInitialData) return;//false
   //convert stringified object to object
   const {cards}=JSON.parse(getInitialData);//way--{cards:[{..}]}
   //map around the array to generate html card and inject it to DOM
   cards.map((cardObject)=>
   {
     const createNewCard=newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    globalStore.push(cardObject);
   });
 };

 const updateLocalStorage= () =>
 localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));//permanently delete from localstore
const saveChanges= () => 
{
 const taskData={
  id:`${Date.now()}`,//unique no. for card id
  imageUrl:document.getElementById("imageurl").value,
  taskTitle:document.getElementById("tasktitle").value,
  taskType:document.getElementById("tasktype").value,
  taskDescription:document.getElementById("taskdescription").value,
 };
 //html code
 const createNewCard = newCard(taskData);
 taskContainer.insertAdjacentHTML("beforeend",createNewCard);
 globalStore.push(taskData);//storing taskdata in globalstore
 updateLocalStorage();
  
};

const deleteCard= (event) =>
{
  //id
  event=window.event;
  const targetID=event.target.Id;
  const tagname=event.target.tagname;//checking whether clicking on button or icon
  console.log(targetID);


  //search the globalStore,and inject updated cards to DOM(doesnt work in DOM)
  //filter->new array
  globalStore=globalStore.filter((cardObject) =>cardObject.id !== targetID);
  updateLocalStorage();

  
  //loop over the new globalStore,and inject updated cards to DOM
 if(tagname==="BUTTON"){
   //taskcontainer
   return event.target.taskContainer.removeChild(
     //col-lg-4
     event.target.parentNode.parentNode.parentNode
   );
 }
 return event.target.taskContainer.removeChild(
  //col-lg-4
  event.target.parentNode.parentNode.parentNode.parentNode
 );


};
