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
  year.textContent = new Date().getFullYear();

  // Forcing dark mode (no toggle)
  try {
    document.documentElement.style.colorScheme = 'dark';
    document.body.classList.add('dark');
  } catch (e) { /* silent */ }

  // Paginación simple
  const PAGE_SIZE = 12;
  let currentOffset = 0;
  let currentList = products.slice();

  // Init Fuse (fuzzy search) - tuned for larger catalogs
  const fuse = new Fuse(products, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'desc', weight: 0.3 }
    ],
    threshold: 0.36,
    distance: 200,
    minMatchCharLength: 2,
    ignoreLocation: true,
    includeScore: true
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

  // Search handler (Fuse + fallback substring)
  const doSearch = debounce(() => {
    const q = searchInput.value.trim();
    if (!q) {
      currentList = products.slice();
      renderProducts(currentList, true);
      return;
    }
    // first try fuzzy search
    const f = fuse.search(q, { limit: 500 }).map(r => r.item);
    // if fuzzy returns nothing, fallback to substring search (helps short tokens)
    const results = (f.length) ? f : products.filter(p => (p.title + ' ' + p.desc).toLowerCase().includes(q.toLowerCase()));
    currentList = results;
    renderProducts(currentList, true);
  }, 180);

  searchInput.addEventListener('input', doSearch);
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentList = products.slice();
    renderProducts(currentList, true);
    searchInput.focus();
  });

  loadMoreBtn.addEventListener('click', () => renderProducts(currentList, false));

  // Inicial render
  renderProducts(currentList);

});
