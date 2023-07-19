/* Edit Item */

let todo = JSON.parse(localStorage.getItem('items')) || [];

export const storeItem = () => {
  localStorage.setItem('items', JSON.stringify(todo));
}

export const editItem = (index, desc) => {
  todo[index].desc = desc;
  storeItem();
};

/* Find Index */

export const findIndex = (e) => {
  const items = document.querySelectorAll('.item');
  let index = 0;

  for (let i = 0; i < items.length; i += 1) {
    if (e.target.textContent === todo[i].desc) {
      index = i;
    } if (e.target.nextSibling.textContent === todo[i].desc) {
      index = i;
    } else if (e.target.previousSibling.textContent === todo[i].desc) {
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