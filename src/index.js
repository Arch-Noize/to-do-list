import './index.css';

/* Selectors */

const items = JSON.parse(localStorage.getItem('items')) || [];
const addBtn = document.querySelector("#add-btn");
const list = document.querySelector('#list');

/* To-do list displaying and storing */

const todoList = () => {
    items.sort((a, b) => a.index - b.index);
  
    items.forEach((item) => {
        list.innerHTML += `<tr><td><input type="checkbox"><span class="item">${items.desc}</span></td></tr>`;
    });
};

const storeItem = () => {
    localStorage.setItem('items', JSON.stringify(items));
} 
  
todoList();

/* To-do list functions */

const addItem = (desc) => {
    const item = {
        desc,
        completed: false,
        index: items.length + 1,
    }
    items.push(item);
    storeItem();
} 

const removeTask = (index) => {
    items.splice(index, 1);
    for (let i = index; i < tasks.length; i += 1) {
      items[i].index = i + 1;
    }
    storeTasks();
  }

/* Buttons */

addBtn.addEventListener('click', () => {
    const newItem = document.querySelector("#new").value;
    addItem(newItem);
    list.innerHTML += `
    <tr>
        <td> 
            <input type="checkbox"> <span class="item">${newItem}</span>
        </td>
    </tr>`;
    document.querySelector("#new").value = '';
})