/* eslint-disable no-alert, no-plusplus, */
import {
  todo, storeItem, addItem, editItem, removeItem, findIndex,
} from './modules/edit.js';
import './index.css';

/* Selectors */

const list = document.querySelector('#list');
const addBtn = document.querySelector('#add-btn');

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

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newItem = document.querySelector('#new').value;
  if (!newItem) {
    alert('Please add a task!');
  } else {
    addItem(newItem);
    list.innerHTML += `
              <li> 
              <input type="checkbox"><span class="item">${newItem}<i id="edit" class="fa fa-ellipsis-v"></i></span> 
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
    e.target.parentElement.parentElement.remove();
  }
});

window.addEventListener('DOMContentLoaded', todoList());