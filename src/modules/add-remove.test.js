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

});