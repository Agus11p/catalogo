document.addEventListener('DOMContentLoaded', () => {
  // ---- Productos: editá / duplicá aquí ----
  const products = [
    {
      id: 1,
      title: "SHYOSUCCE Ventilador portátil",
      desc: "Ventilador de mano con velocidades ajustables, recargable y compacto. Ideal para el hogar o la oficina.",
      price: "€14.99",
      img: "https://m.media-amazon.com/images/I/71z4vVmpMlL._AC_SL1500_.jpg",
      url: "https://www.amazon.es/SHYOSUCCE-ventilador-velocidades-ajustables-taschenventilador/dp/B0DZX9MHKP/?tag=catalogo11p-21"
    }
    // agregá más objetos para poblar el catálogo (>100)
  ];

  const grid = document.getElementById('productGrid');
  const year = document.getElementById('year');
  const searchInput = document.getElementById('search');
  const clearBtn = document.getElementById('clearSearch');
  const loadMoreBtn = document.getElementById('loadMore');
  const themeToggle = document.getElementById('themeToggle');
  year.textContent = new Date().getFullYear();

  // Paginación simple
  const PAGE_SIZE = 12;
  let currentOffset = 0;
  let currentList = products.slice();

  // Init Fuse (fuzzy search)
  const fuse = new Fuse(products, {
    keys: ['title', 'desc'],
    threshold: 0.35,
    distance: 200,
    minMatchCharLength: 2
  });

  // util: escape
  function esc(s){ return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function renderProducts(list, reset = true) {
    if(reset) {
      currentOffset = 0;
      grid.innerHTML = '';
    }
    const slice = list.slice(currentOffset, currentOffset + PAGE_SIZE);
    const html = slice.map(p => `
      <a class="card-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">
        <div class="card" aria-labelledby="title-${p.id}">
          <div class="card-media">
            <img loading="lazy" src="${esc(p.img)}" alt="${esc(p.title)}">
          </div>
          <div class="card-content">
            <h3 id="title-${p.id}" class="card-title">${esc(p.title)}</h3>
            <p class="card-desc">${esc(p.desc)}</p>
            <div class="card-bottom">
              <div class="price">${esc(p.price)}</div>
              <div class="buy">Comprar</div>
            </div>
          </div>
        </div>
      </a>
    `).join('');
    grid.insertAdjacentHTML('beforeend', html);
    currentOffset += slice.length;
    loadMoreBtn.style.display = (currentOffset < list.length) ? 'inline-block' : 'none';
  }

  // Debounce
  function debounce(fn, wait) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(()=>fn(...args), wait); };
  }

  // Search handler
  const doSearch = debounce(() => {
    const q = searchInput.value.trim();
    if (!q) {
      currentList = products.slice();
      renderProducts(currentList, true);
      return;
    }
    const results = fuse.search(q, { limit: 200 }).map(r => r.item);
    currentList = results;
    renderProducts(currentList, true);
  }, 200);

  searchInput.addEventListener('input', doSearch);
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentList = products.slice();
    renderProducts(currentList, true);
    searchInput.focus();
  });

  loadMoreBtn.addEventListener('click', () => renderProducts(currentList, false));

  // Theme toggle: guarda en localStorage
  function applyTheme(dark) {
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    document.body.classList.toggle('dark', !!dark);
    themeToggle.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('catalog_theme_dark', dark ? '1' : '0');
  }
  themeToggle.addEventListener('click', () => applyTheme(localStorage.getItem('catalog_theme_dark') !== '1'));
  applyTheme(localStorage.getItem('catalog_theme_dark') === '1');

  // Inicial render
  renderProducts(currentList);

});
