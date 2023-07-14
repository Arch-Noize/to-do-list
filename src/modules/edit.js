/* eslint-disable no-alert, no-plusplus, */

/* Storage */

export const todo = JSON.parse(localStorage.getItem('items')) || [];

export const storeItem = () => {
  localStorage.setItem('items', JSON.stringify(todo));
};

/* Add Item */

export const addItem = (desc) => {
  const item = {
    desc,
    completed: false,
    index: todo.length + 1,
  };
  todo.push(item);
  storeItem();
};

/* Remove Item */

export const removeItem = (index) => {
  todo.splice(index, 1);
  for (let i = index; i < todo.length; i++) {
    todo[i].index = i + 1;
  }
  storeItem();
};

/* Edit Item */

export const editItem = (index, desc) => {
  todo[index].desc = desc;
  storeItem();
};

/* Find Index */

export const findIndex = (e) => {
  const items = document.querySelectorAll('.item');
  let index = 0;
  for (let i = 0; i < items.length; i++) {
    const text = e.target.parentElement.textContent;
    if (text === todo[i].desc) {
      index = i;
    }
  }
  return index;
};