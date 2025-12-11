document.addEventListener('DOMContentLoaded', () => {
  // Forzar modo oscuro (no tocar)
  try { document.documentElement.style.colorScheme = 'dark'; document.body.classList.add('dark'); } catch(e){}

  // --- Lista maestra de productos (NO tocar) ---
  const allProducts = [
    {
      id: 1,
      title: "Meta Quest 3 - Realidad Mixta 512GB",
      desc: "Visor de realidad mixta de nueva generación con gran almacenamiento, rendimiento superior y experiencias inmersivas.",
      price: "€699.99",
      img: "https://m.media-amazon.com/images/I/B09N24BHKQ._AC_SL1500_.jpg",
      url: "https://www.amazon.es/Quest-512Gb-Realidad-mixta-revolucionaria/dp/B09N24BHKQ?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2SLEQQN0MK4SZ&dib=eyJ2IjoiMSJ9.OOgG_FyAQLT7ierlNiByMsd0GveQ1M9CM5vzKkT5d0Fjhb61ZYOPOZGoJJlicMbDPvIGiPV9db3T5DNmWz3vT-Fb_zuoHl3iB2P9K5uTVdft1y6-_3Aumk6MF6uATozcryz9MeFyt0o0GcXXYgfPOJEra7ZEHBXySvNrT-YarLe0BHITsp45SJirxZEzkUuz52zr6J-_rj5WP8rSHdZFYs8PLablf9SDi9U1ynniBLhjLoTy3DXd2l3Pdh-X9ramRTZZ0B-_U2n8JMflRoD93Pi55E-5eh1Sk3BvWXuwk4U.2L0zjb-hy-XK-0nbwSzHGi8jny3xqbu3Q7lQG8VqdIQ&dib_tag=se&keywords=tecnologia&qid=1765403460&s=mobile-apps&sprefix=tecnologia%2Cmobile-apps%2C341&sr=1-4-catcorr&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=0904e2dc545dc679a8d8fc864561a06a&language=es_ES&ref_=as_li_ss_tl"
    },
    {
      id: 2,
      title: "Pristar Etiquetadora Bluetooth P15",
      desc: "The Pristar P15 is a portable thermal label printer that uses Bluetooth 4.0 to connect with iOS and Android devices via the 'Marklife' app, which offers over 800 icons, multiple frames, languages, and fonts for editing labels including barcodes and QR codes. It features a rechargeable battery, no ink required, and is suitable for various applications with waterproof and durable label paper.",
      price: "€32.99",
      img: "https://m.media-amazon.com/images/I/71E1aBzgI0L._AC_SL1500_.jpg",
      url: "https://www.amazon.es/gp/aw/d/B0CMHRC1FH?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=a127728558c2d2d4c6ba3b8b3ab1fb4e&hsa_cr_id=0&qid=1765403460&sr=1-3-1ee1b2e4-01d1-4cd0-b737-4c27ebfc8105&aref=9xQUUiJxMi&pd_rd_w=NqMV9&content-id=amzn1.sym.7dce7ea4-b064-4e7a-b891-491ac0e7a11e%3Aamzn1.sym.7dce7ea4-b064-4e7a-b891-491ac0e7a11e&pf_rd_p=7dce7ea4-b064-4e7a-b891-491ac0e7a11e&pf_rd_r=A4AKEG91ZGJC7ASQABQF&pd_rd_wg=HzrxZ&pd_rd_r=89657e59-8788-45ed-9ee4-c05501f579d9&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=3fd4c1e5a78ec5466a1907fff753c5d0&language=es_ES&ref_=as_li_ss_tl"
    },
    {
      id: 3,
      title: "Cecotec Cecofry Full InoxBlack 5500 Pro",
      desc: "Freidora de aire caliente 5,5 L, 1700 W, tecnología PerfectCook y 8 modos preconfigurados.",
      price: "€45.90",
      img: "https://m.media-amazon.com/images/I/71TfXYy3jzL._AC_SL1500_.jpg",
      url: "https://www.amazon.es/Cecotec-InoxBlack-Tecnolog%C3%ADa-PerfectCook-Termostato/dp/B0BFB3Q7SD?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2SLEQQN0MK4SZ&dib=eyJ2IjoiMSJ9.OOgG_FyAQLT7ierlNiByMsd0GveQ1M9CM5vzKkT5d0Fjhb61ZYOPOZGoJJlicMbDPvIGiPV9db3T5DNmWz3vT-Fb_zuoHl3iB2P9K5uTVdft1y6-_3Aumk6MF6uATozcryz9MeFyt0o0GcXXYgfPOJEra7ZEHBXySvNrT-YarLe0BHITsp45SJirxZEzkUuz52zr6J-_rj5WP8rSHdZFYs8PLablf9SDi9U1ynniBLhjLoTy3DXd2l3Pdh-X9ramRTZZ0B-_U2n8JMflRoD93Pi55E-5eh1Sk3BvWXuwk4U.2L0zjb-hy-XK-0nbwSzHGi8jny3xqbu3Q7lQG8VqdIQ&dib_tag=se&keywords=tecnologia&qid=1765403460&s=mobile-apps&sprefix=tecnologia%2Cmobile-apps%2C341&sr=1-7-catcorr&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=9726e2371d5283b63cceb51b3846cadb&language=es_ES&ref_=as_li_ss_tl"
    },
    {
      id: 4,
      title: "SHYOSUCCE Ventilador de Mano",
      desc: "Mini ventilador portátil USB con 4 velocidades ajustables, ideal para oficina, viajes y camping.",
      price: "€14.99",
      img: "https://m.media-amazon.com/images/I/515NOL57ABL._AC_SL1500_.jpg",
      url: "https://www.amazon.es/SHYOSUCCE-ventilador-velocidades-ajustables-taschenventilador/dp/B0DZX9MHKP?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=BORP5Q86X012&dib=eyJ2IjoiMSJ9.FkK7RXlxK9xJzbhE0XCdmreuSekcmzDu_Geklq9uJGDdgJL_lrnbR65wEJjs6n8zHh04ThV6ppLSG6Tc7Pzgzm63VVxa3mDjBI_ab9KEpkBvq4paqxMG-1OVdgIASKqATIz3OFhOdcuxKNc7ssPh4s9GBPYRQNuGFrbiolSB1k0vyQyHK40UOx8yp_WRU1dcxuVP0UfMdItpEspqaeDHnjhwN3vCIIhjzD32R2SVc0h1XtjriNx5S5-uwNXFu7jRtQmgzunJg6_SIjmwo15K3jZacINmwuJZOJr55EFRy10.Xft37I0fkqIbuivudqETAsrYoSWUInxXIl0PUSz-HWY&dib_tag=se&keywords=Gadgets%2Bpara%2Bel%2Bhogar&qid=1765332607&sprefix=gadgets%2Bpara%2Bel%2Bhogar%2Caps%2C333&sr=8-55&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=12cf10706f834b5cbbd18557c2bb175e&language=es_ES&ref_=as_li_ss_tl"
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