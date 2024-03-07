const menuBtn = document.getElementById('create-menu');
const menusContaienr = document.querySelector('.menus-container');

let menus = [];

const handleDeleteMenu = async (id) => {
  const response = await fetch(`http://localhost:3000/menu?id=${id}`, {
    method: 'DELETE',
  });
};

const handleMenuClick = async () => {
  const menu = document.querySelector('input[name="name"]');
  const price = document.querySelector('input[name="price"]');

  const payload = {
    name: menu.value,
    price: price.value,
  };

  const response = await fetch('http://localhost:3000/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  menus = await response.json();
};

let ul;
let li;
let deleteBtn;
menus?.forEach((menu) => {
  ul = document.createElement('ul');
  li = document.createElement('li');
  deleteBtn = document.createElement('button');

  li.innerHTML = `<span>${menu.name}</span> - <span>${menu.price}</span>`;
  deleteBtn.textContent = 'Delete';
  ul.appendChild(li);
  li.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', () => handleDeleteMenu(menu.id));
});

menusContaienr.appendChild(ul);
ul.innerHTML = '';
ul.appendChild(li);

menuBtn.addEventListener('click', handleMenuClick);
