/* Storage */

export let todo = JSON.parse(localStorage.getItem('items')) || [];

const storeItem = (storage) => {
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
  storeItem(todo);
};

/* Remove Item */

export const removeItem = (index, storage) => {
  todo.splice(index, 1);
  for (let i = index; i < todo.length; i += 1) {
    todo[i].index = i + 1;
  }
  storeItem(storage);
};

export const editItem = (index, desc, storage) => {
  todo[index].description = desc;
  storeItem(storage);
};

export function clearTasks() {
  const unchecked = todo.filter((item) => item.completed === false);
  unchecked.forEach((item, index) => {
    item.index = index + 1;
  });
  todo = unchecked;
  storeItem();
}