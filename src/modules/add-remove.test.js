/** @jest-environment jsdom */

import { addItem , removeItem } from "./add-remove";

describe('Adding an item', () => {
    let mockTask;

    beforeEach(( ) => {
      mockTask = {
        getTask: jest.fn(),
        setTask: jest.fn(),
        removeTask: jest.fn(),
      }
      mockTask.getTask.mockReturnValue(JSON.stringify([]));
    });

    test('Adding task to list', () => {
        addItem('Test code', mockStorage);
        expect(mockStorage.setItem).toHaveBeenCalledWith(
          'tasks',
          JSON.stringify([{ description: 'Test code', completed: false, index: 1 }]),
        );
    });

    test('Adding new item into HTML', () => {
        document.body.innerHTML += `<ul id="list"><li class="item">Test</li></ul>`
        addItem('Testing', mockTask);
        const list = document.querySelectorAll('#list li');
        expect(list).toHaveLength(1);
    });

    test('Remove item from list', () => {
        addItem('Testing', mockTask);
        addItem('Testing', mockTask);
        addItem('Testing', mockTask);
        removeItem(0, mockStorage);
        expect(mockStorage.getItem()).toHaveLength(2);
    });

})