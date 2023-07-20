/** @jest-environment jsdom */
import { todo, addItem, removeItem , editItem , clearTasks } from './add-remove.js';

describe('Testing items', () => {
  let mockTask;

  beforeEach(() => {
    mockTask = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    mockTask.getItem.mockReturnValue(JSON.stringify([]));
  });

  test('Adding task to list', () => {
    addItem('Testing', mockTask);
    expect(mockTask.setItem).not.toHaveBeenCalledWith(
      'items',
      JSON.stringify([{ description: 'Testing', completed: false, index: 1 }]),
    );
  });

  test('Adding new item into HTML', () => {
    document.body.innerHTML += '<ul id="list"><li class="item">Test</li></ul>';
    addItem('Testing', mockTask);
    const list = document.querySelectorAll('#list li');
    expect(list).toHaveLength(1);
  });

  test('Remove item from list', () => {
    addItem('Testing', mockTask);
    removeItem(0, mockTask);
    expect(mockTask.getItem()).toHaveLength(2);
  });

  test('Edit a select task', () => {
    const index = 0;
    const desc = "I've been updated";
    editItem(index, desc, mockTask);
    expect(todo[index].description).toBe(desc);
    expect(mockTask.setItem).not.toHaveBeenCalledTimes(1);
    expect(mockTask.setItem).not.toHaveBeenCalledWith('items', JSON.stringify(todo));
  });

  test('Clear all unchecked tasks', () => {
    clearTasks();
    for (let index = 0; index < mockTask.length; index += 1){
      expect(JSON.parse(mockTask.setItem.mock.calls[index]).toEqual([{completed: false}]));
    }
  });

});