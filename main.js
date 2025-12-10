document.addEventListener('DOMContentLoaded', () => {
  const products = [
    {
      id: 1,
      title: "SHYOSUCCE Ventilador portátil",
      desc: "Ventilador de mano con velocidades ajustables, recargable y compacto. Ideal para el hogar o la oficina.",
      price: "€24.99",
      img: "https://m.media-amazon.com/images/I/71z4vVmpMlL._AC_SL1500_.jpg",
      url: "https://www.amazon.es/SHYOSUCCE-ventilador-velocidades-ajustables-taschenventilador/dp/B0DZX9MHKP/?tag=catalogo11p-21"
    }
    // Si querés agregar más productos, duplicá este objeto del array
  ];

  const grid = document.getElementById('productGrid');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  function renderProducts(list) {
    grid.innerHTML = list.map(p => `
      <a class="card-link" href="${p.url}" target="_blank" rel="noopener noreferrer">
        <div class="card">
          <div class="card-media">
            <img loading="lazy" src="${p.img}" alt="${p.title}">
          </div>
          <div class="card-content">
            <h3 class="card-title">${p.title}</h3>
            <p class="card-desc">${p.desc}</p>
            <div class="card-bottom">
              <div class="price">${p.price}</div>
              <div class="buy">Comprar</div>
            </div>
          </div>
        </div>
      </a>
    `).join('');
  }

  // Buscador simple
  const searchInput = document.getElementById('search');
  const clearBtn = document.getElementById('clearSearch');

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { renderProducts(products); return; }
    const filtered = products.filter(p =>
      (p.title + ' ' + p.desc).toLowerCase().includes(q)
    );
    renderProducts(filtered);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = "";
    renderProducts(products);
    searchInput.focus();
  });

  renderProducts(products);
});
