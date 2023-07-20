/** @jest-environment jsdom */

import { addItem , removeItem } from "./add-remove";

describe('Adding an item', () => {
    let mockTask;

    beforeEach(( ) => {
      mockTask = {
        getItem: jest.fn(),
        setItem: jest.fn(),
      }
      mockTask.getItem.mockReturnValue(JSON.stringify([]));
    });

    test('Adding task to list', () => {
        addItem('Test code', mockTask);
        expect(mockTask.setItem).toHaveBeenCalled(
          'items',
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
        removeItem(0, mockTask);
        expect(mockTask.getItem()).toHaveLength(2);
    });

})