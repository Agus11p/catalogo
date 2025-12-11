document.addEventListener('DOMContentLoaded', () => {
  // Forzar modo oscuro (no tocar)
  try { document.documentElement.style.colorScheme = 'dark'; document.body.classList.add('dark'); } catch(e){}

  // --- Lista maestra de productos (NO tocar) ---
  const allProducts = [
const allProducts = [
  {
    id: 4,
    title: "SHYOSUCCE Ventilador de Mano",
    desc: "Mini ventilador portátil USB con 4 velocidades ajustables, ideal para oficina, viajes y camping.",
    price: "€14.99",
    img: "https://m.media-amazon.com/images/I/61+9kZ7Z5FL._AC_SL1500_.jpg", // nueva y funcionando
    url: "https://www.amazon.es/..."
  },
  {
    id: 1,
    title: "Meta Quest 3 - Realidad Mixta 512GB",
    desc: "Visor de realidad mixta de nueva generación con gran almacenamiento y experiencias inmersivas.",
    price: "€699.99",
    img: "https://m.media-amazon.com/images/I/61Nb0MEp1RL._AC_SL1500_.jpg", // actualizada
    url: "https://amazon.es/..."
  },
  {
    id: 2,
    title: "Pristar Etiquetadora Bluetooth P15",
    desc: "Mini impresora térmica portátil, sin tinta, conexión Bluetooth, perfecta para hogar y oficina.",
    price: "€32.99",
    img: "https://m.media-amazon.com/images/I/61fG3bX1t7L._AC_SL1500_.jpg", // actualizada
    url: "https://amazon.es/..."
  },
  {
    id: 3,
    title: "Cecotec Cecofry Full InoxBlack 5500 Pro",
    desc: "Freidora sin aceite 5,5 L, 1700 W, 8 modos y tecnología PerfectCook.",
    price: "€45.90",
    img: "https://m.media-amazon.com/images/I/71qY9xR7tPL._AC_SL1500_.jpg", // actualizada
    url: "https://amazon.es/..."
  }
];

  // --- SOLO editar esta línea: poné aquí los IDs que querés que aparezcan ---
  // Ejemplo: [1,2] mostrará solo Meta Quest e Pristar; agregá nuevos IDs cuando crees productos.
  const allowedIds = [4,1,2,3];

  // Construir la lista 'products' exactamente en el orden de allowedIds (filtra IDs inexistentes)
  const products = allowedIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

  // DOM refs
  const grid = document.getElementById('productGrid');
  const stats = document.getElementById('stats');
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const noResults = document.getElementById('noResults');
  const year = document.getElementById('year');
  const sentinel = document.getElementById('scrollSentinel');
  if (year) year.textContent = new Date().getFullYear();

  // Pagination / infinite scroll
  const PAGE_SIZE = 12;
  let offset = 0;
  let activeList = products.slice();
  let loading = false;
  let observer = null;

  // Fuse.js (se inicializa con la lista filtrada)
  const fuse = new Fuse(activeList, {
    keys: [{ name: 'title', weight: 0.75 }, { name: 'desc', weight: 0.25 }],
    threshold: 0.35,
    distance: 200,
    minMatchCharLength: 2,
    ignoreLocation: true
  });

  function esc(s){ return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function render(list, reset = true){
    try {
      if (loading) return;
      loading = true;
      if (!grid) return;
      if (reset) { offset = 0; grid.innerHTML = ''; }
      const slice = list.slice(offset, offset + PAGE_SIZE);

      if (slice.length === 0 && offset === 0) {
        if (noResults) noResults.hidden = false;
        grid.innerHTML = '';
        if (stats) stats.textContent = '0 productos';
        if (observer) { observer.disconnect(); observer = null; }
        loading = false;
        return;
      } else if (noResults) {
        noResults.hidden = true;
      }

      const html = slice.map(p => `
        <a id="product-${esc(p.id)}" class="card-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">
          <article class="card" aria-labelledby="title-${esc(p.id)}">
            <div class="card-badge">#${esc(p.id)}</div>
            <div class="card-media"><img loading="lazy" src="${esc(p.img)}" alt="${esc(p.title)}"></div>
            <div class="card-content">
              <h3 id="title-${esc(p.id)}" class="card-title">${esc(p.title)}</h3>
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
      if (stats) stats.textContent = `Mostrando ${Math.min(offset, list.length)} de ${list.length} productos`;

      if (offset >= list.length) {
        if (observer) { observer.disconnect(); observer = null; }
      } else {
        ensureObserver();
      }
    } catch (err) {
      console.error('Render error', err);
    } finally {
      loading = false;
    }
  }

  function debounce(fn, wait=180){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; }

  function ensureObserver(){
    if (!sentinel || observer) return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting && !loading) render(activeList, false);
    }, { root: null, rootMargin: '400px', threshold: 0 });
    observer.observe(sentinel);
  }

  const doSearch = debounce(()=>{
    const q = (searchInput && searchInput.value) ? searchInput.value.trim() : '';
    if (!q) {
      activeList = products.slice();
      // reinit fuse with base list
      fuse.setCollection(activeList);
      if (observer) { observer.disconnect(); observer = null; }
      render(activeList, true);
      return;
    }
    const f = fuse.search(q, { limit: 1000 }).map(r => r.item);
    activeList = f.length ? f : products.filter(p => (p.title + ' ' + p.desc).toLowerCase().includes(q.toLowerCase()));
    fuse.setCollection(activeList);
    if (observer) { observer.disconnect(); observer = null; }
    render(activeList, true);
  }, 180);

  if (searchInput) searchInput.addEventListener('input', doSearch);
  if (clearBtn) clearBtn.addEventListener('click', () => { if (searchInput) searchInput.value=''; activeList = products.slice(); fuse.setCollection(activeList); if (observer) { observer.disconnect(); observer = null; } render(activeList, true); if (searchInput) searchInput.focus(); });

  // initial
  render(activeList, true);
  ensureObserver();
});