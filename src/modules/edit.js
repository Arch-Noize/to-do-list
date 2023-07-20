/* Edit Item */

let todo = JSON.parse(localStorage.getItem('items')) || [];

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

export const storeItem = () => {
  localStorage.setItem('items', JSON.stringify(todo));
};

export const editItem = (index, desc) => {
  todo[index].description = desc;
  storeItem();
};

/* Find Index */

export const findIndex = (e) => {
  const items = document.querySelectorAll('.item');
  let index = 0;

  for (let i = 0; i < items.length; i += 1) {
    if (e.target.textContent === todo[i].description) {
      index = i;
    } if (e.target.nextSibling.textContent === todo[i].description) {
      index = i;
    } else if (e.target.previousSibling.textContent === todo[i].description) {
      index = i;
    }
  }

  return index;
};

export function clearTasks() {
  const unchecked = todo.filter((item) => item.completed === false);
  unchecked.forEach((item, index) => {
    item.index = index + 1;
  });
  todo = unchecked;
  storeItem();
}

const finalTodo = todo;

export { finalTodo };