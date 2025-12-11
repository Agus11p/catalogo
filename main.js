document.addEventListener('DOMContentLoaded', () => {
  // Fijar modo oscuro
  try { document.documentElement.style.colorScheme = 'dark'; document.body.classList.add('dark'); } catch(e){}

  // --- Productos de ejemplo (3 ficticios + tu producto) ---
  const products = [
    {
      id: 1,
      title: "Meta Quest – Realidad Mixta 512GB",
      desc: "Visor de realidad mixta de nueva generación con gran almacenamiento, rendimiento superior y experiencias inmersivas.",
      price: "€599.00",
      img: "https://m.media-amazon.com/images/I/B09N24BHKQ._AC_SL1500_.jpg",
      url: "https://www.amazon.es/Quest-512Gb-Realidad-mixta-revolucionaria/dp/B09N24BHKQ?tag=catalogo11p-21"
    },
    {
      id: 5,
      title: "Pristar Etiquetadora Bluetooth P15",
      desc: "Mini impresora térmica de etiquetas con conexión Bluetooth, compatible con iOS y Android. Ideal para hogar, oficina y escuela. Modelo tejido negro.",
      price: "€XX.XX",
      img: "https://m.media-amazon.com/images/I/71E1aBzgI0L._AC_SL1500_.jpg",
      url: "https://www.amazon.es/gp/aw/d/B0CMHRC1FH?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=a127728558c2d2d4c6ba3b8b3ab1fb4e&hsa_cr_id=0&qid=1765403460&sr=1-3-1ee1b2e4-01d1-4cd0-b737-4c27ebfc8105&aref=9xQUUiJxMi&pd_rd_w=NqMV9&content-id=amzn1.sym.7dce7ea4-b064-4e7a-b891-491ac0e7a11e%3Aamzn1.sym.7dce7ea4-b064-4e7a-b891-491ac0e7a11e&pf_rd_p=7dce7ea4-b064-4e7a-b891-491ac0e7a11e&pf_rd_r=A4AKEG91ZGJC7ASQABQF&pd_rd_wg=HzrxZ&pd_rd_r=89657e59-8788-45ed-9ee4-c05501f579d9&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=3fd4c1e5a78ec5466a1907fff753c5d0&language=es_ES&ref_=as_li_ss_tl"
    },
    {
      id: 2,
      title: "Smartwatch Nexus S",
      desc: "Monitor de ritmo cardiaco, GPS integrado y esferas personalizables. Resistente al agua 5ATM.",
      price: "€149.90",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d1b8a9f2f8b1d2c9c3e9a7b6c8d4e5f",
      url: "https://www.amazon.com/s?k=smartwatch"
    },
    {
      id: 3,
      title: "Cafetera Barista Mini",
      desc: "Cafetera espresso compacta 15 bar, depósito extraíble y compatible con cápsulas y café molido.",
      price: "€129.00",
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
      url: "https://www.amazon.com/s?k=espresso+machine"
    }
  ];

  // DOM refs
  const grid = document.getElementById('productGrid');
  const stats = document.getElementById('stats');
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const loadMoreBtn = document.getElementById('loadMore');
  const noResults = document.getElementById('noResults');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Pagination config
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
      if (noResults) noResults.hidden = false;
      grid.innerHTML = '';
      if (stats) stats.textContent = `0 productos`;
      if (loadMoreBtn) loadMoreBtn.hidden = true;
      return;
    } else {
      if (noResults) noResults.hidden = true;
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
    if (stats) stats.textContent = `${Math.min(offset, list.length)} de ${list.length} productos`;
    if (loadMoreBtn) loadMoreBtn.hidden = offset >= list.length;
  }

  // Debounce helper
  function debounce(fn, wait=200){
    let t;
    return (...args)=>{ clearTimeout(t); t = setTimeout(()=>fn(...args), wait); };
  }

  // Search handler
  const doSearch = debounce(()=>{
    const q = (searchInput && searchInput.value) ? searchInput.value.trim() : '';
    if(!q){ activeList = products.slice(); render(activeList, true); return; }
    const f = fuse.search(q, { limit: 1000 }).map(r => r.item);
    const results = f.length ? f : products.filter(p => (p.title + ' ' + p.desc).toLowerCase().includes(q.toLowerCase()));
    activeList = results;
    render(activeList, true);
  }, 180);

  if (searchInput) searchInput.addEventListener('input', doSearch);
  if (clearBtn) clearBtn.addEventListener('click', () => { if (searchInput) searchInput.value=''; activeList = products.slice(); render(activeList, true); if (searchInput) searchInput.focus(); });

  if (loadMoreBtn) loadMoreBtn.addEventListener('click', ()=> render(activeList, false));

  // initial render
  render(activeList, true);
});