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
    localStorage.clear();
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

list.addEventListener('click', (e) => {
    if(e.target.classList.contains("fa-times")){
        let items = document.querySelector('.item').textContent;
        console.log(items);
        // if (todo.some(i => i.desc.includes(items)) {
        //     for 
        // }
        let index = todo.map(i => i.desc).indexOf(items);
        console.log(index);
        e.target.parentElement.parentElement.remove();
        console.log("delete me!");
    } else if (e.target.classList.contains("fa-reorder")) {
        console.log("change me!");
    }
})

/* Edit Item */
    