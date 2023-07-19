/* Storage */

const todo = [];

const storeItem = (storage) => {
  storage.setItem('items', JSON.stringify(todo));
};

/* Add Item */

export const addItem = (desc, storage) => {
  const item = {
    desc,
    completed: false,
    index: todo.length + 1,
  };
  todo.push(item);
  storeItem(storage);
};

/* Remove Item */

export const removeItem = (index, storage) => {
  todo.splice(index, 1);
  for (let i = index; i < todo.length; i += 1) {
    todo[i].index = i + 1;
  }
  storeItem(storage);
};