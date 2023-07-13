import './index.css';

/* Selectors */

const items = JSON.parse(localStorage.getItem('items')) || [];
const list = document.querySelector('#list');
const addBtn = document.querySelector("#add-btn");

/* To-do list displaying and storing */

const todoList = () => {
    items.sort((a, b) => a.index - b.index);
  
    items.forEach((item) => {
        list.innerHTML += `
        <li> 
            <input type="checkbox"> <span class="item">${item.desc}</span>  
            <button class="edit"> <i class="fa fa-reorder"></i> </button>
            <button class="remove"> <i class="fa fa-times"></i> </button>
        </li>`;
    });

};

const storeItem = () => {
    localStorage.setItem('items', JSON.stringify(items));
} 
  
todoList();

/* Add Item */

const addItem = (desc) => {
    const item = {
        desc,
        completed: false,
        index: items.length + 1,
    }
    items.push(item);
    console.log(items);
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
                <input type="checkbox"> <span class="item">${newItem}</span>  
                <button> <i class="fa fa-reorder"></i> </button>
                <button> <i class="fa fa-times remove"></i> </button>
            </li>`;
        document.querySelector("#new").value = '';
    }
    console.log(items);
})

/* Remove Item */

const removeItem = (index) => {
    items.splice(index, 1);
    for (let i = index; i < items.length; i += 1) {
      items[i].index = i + 1;
    }
    console.log(items);
    storeItem();
}

list.addEventListener('click', (e) => {
    if(e.target.classList.contains("fa-times")){
        let item = document.querySelector('.item').textContent;
        // let index = items.indexOf(item);
        let r = items.some(i => i.desc.includes(item));
        let index = items.findIndex(i => i.desc === document.querySelector('.item').textContent);
        console.log(r + '' + index);
        e.target.parentElement.parentElement.remove();
        console.log("delete me!");
    } else if (e.target.classList.contains("fa-reorder")) {
        console.log("change me!");
    }
})

/* Edit Item */


// document.addEventListener('click', (e) => {
//     const editBtn = e.target.document.querySelector(".edit");
//     const removeBtn = e.target.closest(".remove");
//     console.log('ive been clicked');

//     if (editBtn){
//         console.log("you can edit me!")
//     }

//     if (removeBtn){
//         console.log("you can delete me!")
//     }

//  })
    