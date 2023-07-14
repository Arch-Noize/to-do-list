import './index.css';

/* Selectors */

const todo = JSON.parse(localStorage.getItem('items')) || [];
const list = document.querySelector('#list');
const addBtn = document.querySelector("#add-btn");

const storeItem = () => {
    localStorage.setItem('items', JSON.stringify(todo));
} 

/* To-do list displaying and storing */

const todoList = () => {
    todo.sort((a, b) => a.index - b.index);
  
    todo.forEach((item) => {
        list.innerHTML += `
        <li> 
            <input type="checkbox"><span class="item">${item.desc}<i class="fa fa-ellipsis-v"></i></span> 
        </li>`;
    });

};

/* Add Item */

const addItem = (desc) => {
    const item = {
        desc,
        completed: false,
        index: todo.length + 1,
    }
    todo.push(item);
    storeItem();
} 

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newItem = document.querySelector("#new").value;
    if(!newItem){
        alert("Please add a task!")
    } else {
        addItem(newItem);
        list.innerHTML += `
            <li> 
            <input type="checkbox"><span class="item">${newItem}<i id="edit" class="fa fa-ellipsis-v"></i></span> 
            </li>`;
        document.querySelector("#new").value = '';
    }
    storeItem();
})

/* Remove Item */

const removeItem = (index) => {
    todo.splice(index, 1);
    for (let i = index; i < todo.length; i++) {
        todo[i].index = i + 1;
      }
    storeItem();
}

/* Edit Item */

const editItem = (index, desc) => {
    todo[index].desc = desc;
    console.log("I was done!")
    storeItem();
}

/* Find Index */

const findIndex = (e) => {
    let items = document.querySelectorAll('.item');
    let index = 0;
    for (let i = 0; i < items.length; i++){
        let text = e.target.parentElement.textContent;
        if (text === todo[i].desc){
            index = i;
        }
    }
    return index;
}

/* List Listeners */

list.addEventListener('click', (e) => {
    let index = findIndex(e);
    if (e.target.classList.contains("fa-ellipsis-v")){
        e.target.parentElement.contentEditable = 'true';
        e.target.parentElement.addEventListener('input', () => {
            console.log("i was pressed");
            todo[index].desc = e.target.parentElement.textContent;
            console.log(e.target.parentElement.textContent);
            storeItem();
        })
        e.target.classList.remove("fa-ellipsis-v");
        e.target.classList.add("fa-times");
    } else if (e.target.classList.contains("fa-times")){
        removeItem(index);
        e.target.parentElement.parentElement.remove();
    }
})

window.addEventListener("DOMContentLoaded", todoList());