/* eslint-disable import/no-mutable-exports */

import { todo , storeItem } from "./add-remove.js";

todo = JSON.parse(localStorage.getItem('items')) || [];

export const editItem = (index, desc, storage) => {
  finalTodo[index].description = desc;
  storeItem(storage);
};

const finalTodo = todo;

export const checkedBox = (index) => {
  finalTodo[index].completed = true;
  storeItem();
};

export const notChecked = (index) => {
  finalTodo[index].completed = false;
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