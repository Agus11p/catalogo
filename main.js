document.addEventListener('DOMContentLoaded', () => {
  // Fijar modo oscuro
  try { document.documentElement.style.colorScheme = 'dark'; document.body.classList.add('dark'); } catch(e){}

  // --- Productos de ejemplo (3 ficticios) ---
  const products = [
    {
  id: 3,
  title: "Meta Quest – Realidad Mixta 512GB",
  desc: "Visor de realidad mixta de nueva generación con gran almacenamiento, rendimiento superior y experiencias inmersivas.",
  price: "€599.00",
  img: "https://m.media-amazon.com/images/I/B09N24BHKQ._AC_SL1500_.jpg",
  url: "https://www.amazon.es/Quest-512Gb-Realidad-mixta-revolucionaria/dp/B09N24BHKQ?tag=catalogo11p-21"
},

  ];

  // DOM refs
  const grid = document.getElementById('productGrid');
  const stats = document.getElementById('stats');
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const loadMoreBtn = document.getElementById('loadMore');
  const noResults = document.getElementById('noResults');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  // Pagination config (useful si agregás muchos productos)
  const PAGE_SIZE = 12;
  let offset = 0;
  let activeList = products.slice();

  // Fuse.js init (fuzzy search)
  const fuse = new Fuse(products, {
    keys: [
      { name: 'title', weight: 0.75 },
      { name: 'desc', weight: 0.25 }
    ],
    threshold: 0.35,
    distance: 200,
    minMatchCharLength: 2,
    ignoreLocation: true
  });

  // util: escape minimal
  function esc(s){ return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function render(list, reset = true){
    if(reset){ offset = 0; grid.innerHTML = ''; }
    const slice = list.slice(offset, offset + PAGE_SIZE);
    if(slice.length === 0 && offset === 0){
      noResults.hidden = false;
      grid.innerHTML = '';
      stats.textContent = `0 productos`;
      loadMoreBtn.hidden = true;
      return;
    } else {
      noResults.hidden = true;
    }

    const html = slice.map(p => `
      <a id="product-${p.id}" class="card-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">
        <article class="card" aria-labelledby="title-${p.id}">
          <div class="card-badge">#${esc(p.id)}</div>
          <div class="card-media">
            <img loading="lazy" src="${esc(p.img)}" alt="${esc(p.title)}">
          </div>
          <div class="card-content">
            <h3 id="title-${p.id}" class="card-title">${esc(p.title)}</h3>
            <p class="card-desc">${esc(p.desc)}</p>
            <div class="card-bottom">
              <div class="price">${esc(p.price)}</div>
              <div><button class="btn btn-cta" type="button">Comprar en Amazon</button></div>
            </div>
          </div>
        </article>
      </a>
    `).join('');
    grid.insertAdjacentHTML('beforeend', html);
    offset += slice.length;
    stats.textContent = `${Math.min(offset, list.length)} de ${list.length} productos`;
    loadMoreBtn.hidden = offset >= list.length;
  }

  // Debounce helper
  function debounce(fn, wait=200){
    let t;
    return (...args)=>{ clearTimeout(t); t = setTimeout(()=>fn(...args), wait); };
  }

  // Search handler
  const doSearch = debounce(()=>{
    const q = searchInput.value.trim();
    if(!q){ activeList = products.slice(); render(activeList, true); return; }
    const f = fuse.search(q, { limit: 1000 }).map(r => r.item);
    const results = f.length ? f : products.filter(p => (p.title + ' ' + p.desc).toLowerCase().includes(q.toLowerCase()));
    activeList = results;
    render(activeList, true);
  }, 180);

  searchInput.addEventListener('input', doSearch);
  clearBtn.addEventListener('click', () => { searchInput.value=''; activeList = products.slice(); render(activeList, true); searchInput.focus(); });

  loadMoreBtn.addEventListener('click', ()=> render(activeList, false));

  // initial render
  render(activeList, true);
});