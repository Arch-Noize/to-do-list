/* Storage */

const todo = JSON.parse(localStorage.getItem('items')) || [];

export const storeItem = (storage) => {
  localStorage.setItem('items', JSON.stringify(storage));
};

/* Add Item */

export const addItem = (desc) => {
  const item = {
    description: desc,
    completed: false,
    index: todo.length + 1,
  };
  todo.push(item);
  storeItem();
};

/* Remove Item */

export const removeItem = (index, storage) => {
  todo.splice(index, 1);
  for (let i = index; i < todo.length; i += 1) {
    todo[i].index = i + 1;
  }
  storeItem(storage);
};