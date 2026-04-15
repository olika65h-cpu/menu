// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  const cartList = document.getElementById('cart-items');
  const emptyCart = document.getElementById('empty-cart');
  const totalEl = document.getElementById('total-sum');
  const cartTotal = document.getElementById('cart-total');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let cart = [];

  // Добавление в корзину
  document.addEventListener('click', (e) => {
    if (e.target && e.target.dataset.action === 'add') {
      const name = e.target.dataset.name;
      addToCart(name);
    }
  });

  function addToCart(name) {
    const item = { name, qty: 1 };
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push(item);
    }
    renderCart();
  }

  function renderCart() {
    cartList.innerHTML = '';
    if (cart.length === 0) {
      emptyCart.style.display = 'block';
      cartTotal.style.display = 'none';
      return;
    }
    emptyCart.style.display = 'none';
    cartTotal.style.display = 'flex';
    let sum = 0;
    cart.forEach(i => {
      // Пример цены по имени (упрощено)
      const priceMap = {
        'Брускетта с помидорами': 1890,
        'Уха по-домашнему': 2690,
        'Стейк из говядины': 9500,
        'Чизкейк Нью-Йорк': 1990
      };
      const price = priceMap[i.name] ?? 0;
      sum += price * i.qty;

      const li = document.createElement('li');
      li.textContent = `${i.name} x${i.qty}`;
      const small = document.createElement('span');
      small.textContent = `${price * i.qty} ₸`;
      li.appendChild(small);
      cartList.appendChild(li);
    });
    totalEl.textContent = `${sum} ₸`;
  }

  // Фильтрация меню
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;
      filterMenu(category);
    });
  });

  function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
      const itemCat = item.dataset.category;
      if (category === 'все' || category === itemCat) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Изначально показать все
  filterMenu('все');
});