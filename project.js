let taskInput = document.querySelector('#taskInput');
let add = document.querySelector('.add');
let API = 'https://6a1e839fb79eec0d6cef6254.mockapi.io/api/v1/todos';
let todocontainer=document.querySelector('.todocontainer');


add.addEventListener('click',PostData)


async function fetchdata() {
  let response=await fetch(API)
  let data=await response.json();
  if(data){
    todocontainer.innerHTML=''
  }

    data.forEach(obj => {
      let divs = document.createElement("div");
      divs.className = "todo";
      divs.innerHTML = `
      <p class="para">${obj.text}</p>
      <input class='para' id='parain' placeholder='new value..' value=${obj.text}>
      <div class="btns">
        <button class='deleteBtn'>delete</button>
        <button class='editBtn'>Edit</button>
        <button class='save'>save</button>
      </div>
      `;
      let paragraph=divs.querySelector('.para')
      let saveBtn=divs.querySelector('.save')
      let deleteBtn=divs.querySelector('.deleteBtn');
      saveBtn.style.display='none'
      deleteBtn.addEventListener('click',function(){
        deleteData(obj.id)
      })

      let parain=divs.querySelector('#parain')
      parain.style.backgroundColor='none'
      parain.style.display='none'
      let editBtns = divs.querySelector('.editBtn');
      editBtns.addEventListener('click',function(){
        saveBtn.style.display='inline-block';
        editBtns.style.display='none'
        console.log(obj.id)
        paragraph.style.display='none';
        parain.style.display='block'

        
        

        

        
        

      })
      saveBtn.addEventListener('click',async function(){
        console.log(obj.id);
        editBtns.style.display='inline-block'
        saveBtn.style.display='none';
        parainValue=parain.value;
        await editData(obj.id,parainValue)


        
      })

    todocontainer.append(divs)
  });
  
}

//add
async function PostData(){
  
  let value=taskInput.value;
  console.log(value)
  let objData={
    text:value.trim()
  }

  let response=await fetch(API,{
    method:'POST',
    headers:{
      'Content-Type':'application/Json',

    },
    body: JSON.stringify(objData),
  })
  console.log(response)
  if(response.status=== 201){
    fetchdata()
  }
  taskInput.value='';


}
//delete
async function deleteData(id){
  let response=await fetch(`${API}/${id}`,{
    method:'DELETE',
  })
  console.log(response)
  if (response.status===200){
    fetchdata()
  }
}   

//edit

async function editData(id,value){
  let newvalue=value
  let obj={
    text:newvalue
  }
  let response=await fetch(`${API}/${id}`,{
    method:'PUT',
    headers:{
    'Content-Type':'application/json'},
    body: JSON.stringify(obj),
    })
    console.log(response)
  if(response.status=== 200){
    fetchdata()
  }
}

fetchdata()