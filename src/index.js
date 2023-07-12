import './index.css';

const items = [
    {
      desc: 'Clean around.',
      completed: false,
      index: 1,
    },
    {
      desc: 'Clean yourself!',
      completed: false,
      index: 2,
    },
    {
      desc: 'Cook around.',
      completed: false,
      index: 3,
    },
    {
      desc: 'Cook yours-! Wait no. Dont do that',
      completed: true,
      index: 4,
    },
  ];
  
const todoList = () => {
    const list = document.querySelector('#list');
  
    items.sort((a, b) => a.index - b.index);
  
    items.forEach((item) => {
        list.innerHTML += `<tr><td><input type="checkbox"><span class="item">${item.desc}</span></td></tr>`;
    })
}

todoList();