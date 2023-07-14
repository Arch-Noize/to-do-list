/* eslint-disable no-plusplus */

import {
    todo, storeItem
} from './edit.js';

export const checkedBox = (index) => {
    todo[index].completed = true;
    storeItem();
}

export const notChecked = (index) => {
    todo[index].completed = false;
    storeItem();
}