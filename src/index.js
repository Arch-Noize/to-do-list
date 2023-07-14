import './index.css';

/* Selectors */

const todo = JSON.parse(localStorage.getItem('items')) || [];
const list = document.querySelector('#list');
const addBtn = document.querySelector("#add-btn");
const storeItem = () => {
    window.localStorage.setItem('items', JSON.stringify(todo));
} 

/* To-do list displaying and storing */

const todoList = () => {
    todo.sort((a, b) => a.index - b.index);
  
    todo.forEach((item) => {
        list.innerHTML += `
        <li> 
            <input type="checkbox"> <span class="item">${item.desc}</span>  
            <button class="edit"> <i class="fa fa-reorder"></i> </button>
            <button class="remove"> <i class="fa fa-times"></i> </button>
        </li>`;
    });

};
  
todoList();

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
            <li class="item"> 
                <input type="checkbox">${newItem}</span>  
                <button> <i class="fa fa-reorder"></i> </button>
                <button> <i class="fa fa-times remove"></i> </button>
            </li>`;
        document.querySelector("#new").value = '';
    }
    storeItem();
})

/* Remove Item */

const removeItem = (index) => {
    todo.splice(index, 1);
    for (let i = index; i < todo.length; i += 1) {
        todo[i].index = i + 1;
    }
    storeItem();
}

const findIndex = () => {
    let items = document.querySelectorAll('.item');
    let index = 0;
    for (let i = 1; i < items.length; i++){
        if (items[i].textContent === todo[i].desc){
            index = i;
        }
    }
    return index;
}

list.addEventListener('click', (e) => {
    if(e.target.classList.contains("fa-times")){
        let index = findIndex();
        console.log(index);
        removeItem(index);
        e.target.parentElement.parentElement.remove();
        console.log("delete me!");
    } else if (e.target.classList.contains("fa-reorder")) {
        console.log("change me!");
    }
})

/* Edit Item */
    