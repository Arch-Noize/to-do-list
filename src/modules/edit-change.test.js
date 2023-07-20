/** @jest-environment jsdom */
import {
     editItem, clearTasks, checkedBox, notChecked,
} from './edit-change.js';
import { todo } from './add-remove.js';

describe('Testing editing items', () => {
  let mockTask;

  beforeEach(() => {
    mockTask = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    mockTask.getItem.mockReturnValue(JSON.stringify([]));
  });

  test('Edit a select task', () => {
    const index = 0;
    const desc = "I've been updated";
    editItem(index, desc, mockTask);
    expect(todo[index].description).toBe(desc);
    expect(mockTask.setItem).not.toHaveBeenCalledTimes(1);
    expect(mockTask.setItem).not.toHaveBeenCalledWith('items', JSON.stringify(todo));
  });

  test('If task is checked', () => {
    checkedBox(0, mockTask);
    expect(todo[0].completed).toBe(true);
    expect(mockTask.setItem).not.toHaveBeenCalledWith('items', JSON.stringify(todo));
  });

  test('If task is unchecked', () => {
    notChecked(0, mockTask);
    expect(todo[0].completed).toBe(false);
    expect(mockTask.setItem).not.toHaveBeenCalledWith('items', JSON.stringify(todo));
  });

  test('Clear all unchecked tasks', () => {
    clearTasks();
    for (let index = 0; index < mockTask.length; index += 1) {
      expect(JSON.parse(mockTask.setItem.mock.calls[index]).toEqual([{ completed: false }]));
    }
  });

})