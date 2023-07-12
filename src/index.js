import './index.css';

/* Selectors */

const items = JSON.parse(localStorage.getItem('items')) || [];
const list = document.querySelector('#list');
const addBtn = document.querySelector("#add-btn");
const removeBtn = document.querySelectorAll("#remove");

/* To-do list displaying and storing */

const todoList = () => {
    items.sort((a, b) => a.index - b.index);
  
    items.forEach((item) => {
        list.innerHTML += `
        <tr>
            <td>
            <input type="checkbox"><span class="item">${item.desc}</span> 
            <button id="remove"> <i class="fa fa-times"></i> </button>
            </td>
        </tr>`;
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
    storeItem();
} 

addBtn.addEventListener('click', () => {
    const newItem = document.querySelector("#new").value;
    addItem(newItem);
    list.innerHTML += `
    <tr>
        <td> 
            <input type="checkbox"> <span class="item">${newItem}</span>  
            <button id="remove"> <i class="fa fa-times"></i> </button> 
        </td>
    </tr>`;
    document.querySelector("#new").value = '';
})

/* Remove Item */

// const removeItem = (index) => {
//     items.splice(index, 1);
//     for (let i = index; i < items.length; i += 1) {
//       items[i].index = i + 1;
//     }
//     storeItem();
// }

// removeBtn.addEventListener('click', () => {

// })

/* Edit Item */

const editItem = (index, desc) => {
    items[index].desc = desc;
    storeItem();
}

document.querySelectorAll('.item').forEach((item) => {
    item.addEventListener('click', (event) => {
        console.log('test');
      const desc = event.target.textContent;
      const index = [...item.parentElement.children].indexOf(item) - 1;
      editItem(index, desc);
    });
});
