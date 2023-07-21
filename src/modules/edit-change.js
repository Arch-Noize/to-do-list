/* eslint-disable import/no-mutable-exports */

import { storeItem } from './add-remove.js';

export let todo = [
  {
    description: '',
    completed: false,
    index: 1,
  }
];

export const editItem = (index, desc, storage) => {
  todo[index].description = desc;
  storeItem(storage);
};

export const checkedBox = (index) => {
  todo[index].completed = true;
  storeItem();
};

export const notChecked = (index) => {
  todo[index].completed = false;
  storeItem();
};

export function clearTasks() {
  const unchecked = todo.filter((item) => item.completed === false);
  unchecked.forEach((item, index) => {
    item.index = index + 1;
  });
  todo = unchecked;
  storeItem();
}