import {
  finalTodo, storeItem, addItem, editItem, removeItem, findIndex, clearTasks,
} from './modules/edit.js';
import { checkedBox, notChecked } from './modules/completed.js';
import './index.css';

/* Selectors */

const list = document.querySelector('#list');
const addBtn = document.querySelector('#add-btn');
const clear = document.querySelector('#clear');

/* To-do list displaying and storing */

const todoList = () => {
  finalTodo.sort((a, b) => a.index - b.index);

  finalTodo.forEach((item) => {
    list.innerHTML += `
        <li class="item"> 
            <input type="checkbox" class="check"><span>${item.desc}</span><i class="fa fa-ellipsis-v"></i>
        </li>`;
  });
};

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newItem = document.querySelector('#new').value;
  if (!newItem) {
    e.preventDefault();
  } else {
    addItem(newItem);
    list.innerHTML += `
        <li class="item"> 
          <input type="checkbox" class="check"><span>${newItem}</span><i class="fa fa-ellipsis-v"></i>
        </li>`;
    document.querySelector('#new').value = '';
  }
  storeItem();
});

/* List Listeners */

list.addEventListener('click', (e) => {
  const index = findIndex(e);
  if (e.target.classList.contains('fa-ellipsis-v')) {
    e.target.parentElement.contentEditable = 'true';
    e.target.parentElement.addEventListener('input', () => {
      editItem(index, e.target.parentElement.textContent);
      storeItem();
    });
    e.target.classList.remove('fa-ellipsis-v');
    e.target.classList.add('fa-times');
  } else if (e.target.classList.contains('fa-times')) {
    removeItem(index);
    e.target.parentElement.remove();
  } else if (e.target.classList.contains('check')) {
    e.target.addEventListener('change', () => {
      if (e.target.checked) {
        checkedBox(index);
      } else {
        notChecked(index);
      }
    });
  }
});

clear.addEventListener('click', () => {
  const items = document.querySelectorAll('.check');
  items.forEach((item) => {
    if (item.checked) {
      item.parentElement.remove();
    }
  });
  clearTasks();
});

window.addEventListener('DOMContentLoaded', todoList());