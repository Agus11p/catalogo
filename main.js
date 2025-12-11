document.addEventListener('DOMContentLoaded', () => {

  // === LISTA MAESTRA DE PRODUCTOS (imágenes actualizadas y funcionando) ===
  const allProducts = [
    {
      id: 1,
      title: "Meta Quest 3 - Realidad Mixta 512GB",
      desc: "Visor de realidad mixta de nueva generación con gran almacenamiento, rendimiento superior y experiencias inmersivas.",
      price: "€699.99",
      img: "https://m.media-amazon.com/images/I/61Nb0MEp1RL._AC_SL1500_.jpg",
      url: "https://www.amazon.es/Quest-512Gb-Realidad-mixta-revolucionaria/dp/B09N24BHKQ?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2SLEQQN0MK4SZ&dib=eyJ2IjoiMSJ9.OOgG_FyAQLT7ierlNiByMsd0GveQ1M9CM5vzKkT5d0Fjhb61ZYOPOZGoJJlicMbDPvIGiPV9db3T5DNmWz3vT-Fb_zuoHl3iB2P9K5uTVdft1y6-_3Aumk6MF6uATozcryz9MeFyt0o0GcXXYgfPOJEra7ZEHBXySvNrT-YarLe0BHITsp45SJirxZEzkUuz52zr6J-_rj5WP8rSHdZFYs8PLablf9SDi9U1ynniBLhjLoTy3DXd2l3Pdh-X9ramRTZZ0B-_U2n8JMflRoD93Pi55E-5eh1Sk3BvWXuwk4U.2L0zjb-hy-XK-0nbwSzHGi8jny3xqbu3Q7lQG8VqdIQ&dib_tag=se&keywords=tecnologia&qid=1765403460&s=mobile-apps&sprefix=tecnologia%2Cmobile-apps%2C341&sr=1-4-catcorr&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=0904e2dc545dc679a8d8fc864561a06a&language=es_ES&ref_=as_li_ss_tl"
    },
    {
      id: 2,
      title: "Pristar Etiquetadora Bluetooth P15",
      desc: "Mini impresora térmica portátil sin tinta, conexión Bluetooth, ideal para hogar, oficina y organización.",
      price: "€32.99",
      img: "https://m.media-amazon.com/images/I/61fG3bX1t7L._AC_SL1500_.jpg",
      url: "https://www.amazon.es/gp/aw/d/B0CMHRC1FH?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=a127728558c2d2d4c6ba3b8b3ab1fb4e&hsa_cr_id=0&qid=1765403460&sr=1-3-1ee1b2e4-01d1-4cd0-b737-4c27ebfc8105&aref=9xQUUiJxMi&pd_rd_w=NqMV9&content-id=amzn1.sym.7dce7ea4-b064-4e7a-b891-491ac0e7a11e%3Aamzn1.sym.7dce7ea4-b064-4e7a-b891-491ac0e7a11e&pf_rd_p=7dce7ea4-b064-4e7a-b891-491ac0e7a11e&pf_rd_r=A4AKEG91ZGJC7ASQABQF&pd_rd_wg=HzrxZ&pd_rd_r=89657e59-8788-45ed-9ee4-c05501f579d9&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=3fd4c1e5a78ec5466a1907fff753c5d0&language=es_ES&ref_=as_li_ss_tl"
    },
    {
      id: 3,
      title: "Cecotec Cecofry Full InoxBlack 5500 Pro",
      desc: "Freidora de aire 5,5 L, 1700 W, 8 modos preconfigurados y tecnología PerfectCook.",
      price: "€45.90",
      img: "https://m.media-amazon.com/images/I/71qY9xR7tPL._AC_SL1500_.jpg",
      url: "https://www.amazon.es/Cecotec-InoxBlack-Tecnolog%C3%ADa-PerfectCook-Termostato/dp/B0BFB3Q7SD?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2SLEQQN0MK4SZ&dib=eyJ2IjoiMSJ9.OOgG_FyAQLT7ierlNiByMsd0GveQ1M9CM5vzKkT5d0Fjhb61ZYOPOZGoJJlicMbDPvIGiPV9db3T5DNmWz3vT-Fb_zuoHl3iB2P9K5uTVdft1y6-_3Aumk6MF6uATozcryz9MeFyt0o0GcXXYgfPOJEra7ZEHBXySvNrT-YarLe0BHITsp45SJirxZEzkUuz52zr6J-_rj5WP8rSHdZFYs8PLablf9SDi9U1ynniBLhjLoTy3DXd2l3Pdh-X9ramRTZZ0B-_U2n8JMflRoD93Pi55E-5eh1Sk3BvWXuwk4U.2L0zjb-hy-XK-0nbwSzHGi8jny3xqbu3Q7lQG8VqdIQ&dib_tag=se&keywords=tecnologia&qid=1765403460&s=mobile-apps&sprefix=tecnologia%2Cmobile-apps%2C341&sr=1-7-catcorr&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=9726e2371d5283b63cceb51b3846cadb&language=es_ES&ref_=as_li_ss_tl"
    },
    {
      id: 4,
      title: "SHYOSUCCE Ventilador de Mano Portátil",
      desc: "Mini ventilador USB recargable con 4 velocidades. Perfecto para verano, viajes y oficina.",
      price: "€14.99",
      img: "https://m.media-amazon.com/images/I/61+9kZ7Z5FL._AC_SL1500_.jpg",
      url: "https://www.amazon.es/SHYOSUCCE-ventilador-velocidades-ajustables-taschenventilador/dp/B0DZX9MHKP?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=BORP5Q86X012&dib=eyJ2IjoiMSJ9.FkK7RXlxK9xJzbhE0XCdmreuSekcmzDu_Geklq9uJGDdgJL_lrnbR65wEJjs6n8zHh04ThV6ppLSG6Tc7Pzgzm63VVxa3mDjBI_ab9KEpkBvq4paqxMG-1OVdgIASKqATIz3OFhOdcuxKNc7ssPh4s9GBPYRQNuGFrbiolSB1k0vyQyHK40UOx8yp_WRU1dcxuVP0UfMdItpEspqaeDHnjhwN3vCIIhjzD32R2SVc0h1XtjriNx5S5-uwNXFu7jRtQmgzunJg6_SIjmwo15K3jZacINmwuJZOJr55EFRy10.Xft37I0fkqIbuivudqETAsrYoSWUInxXIl0PUSz-HWY&dib_tag=se&keywords=Gadgets%2Bpara%2Bel%2Bhogar&qid=1765332607&sprefix=gadgets%2Bpara%2Bel%2Bhogar%2Caps%2C333&sr=8-55&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=12cf10706f834b5cbbd18557c2bb175e&language=es_ES&ref_=as_li_ss_tl"
    }
  ];

  // Orden en que quieres que aparezcan (cambia los números cuando añadas más)
  const allowedIds = [4, 1, 2, 3];

  const products = allowedIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

  // === DOM ===
  const grid = document.getElementById('productGrid');
  const stats = document.getElementById('stats');
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const noResults = document.getElementById('noResults');
  const sentinel = document.getElementById('scrollSentinel');

  const PAGE_SIZE = 12;
  let offset = 0;
  let activeList = products.slice();
  let loading = false;
  let observer = null;

  // Fuse.js estable
  const fuse = new Fuse(activeList, {
    keys: [{ name: 'title', weight: 0.7 }, { name: 'desc', weight: 0.3 }],
    threshold: 0.3,
    ignoreLocation: true
  });

  function esc(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function render(list, reset = true) {
    if (loading) return;
    loading = true;
    if (reset) { offset = 0; grid.innerHTML = ''; }

    const slice = list.slice(offset, offset + PAGE_SIZE);

    if (slice.length === 0 && offset === 0) {
      noResults.hidden = false;
      stats.textContent = '0 productos';
      loading = false;
      return;
    }
    noResults.hidden = true;

    const html = slice.map(p => `
      <div class="card">
        <img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy">
        <div class="card-body">
          <h3 class="card-title">${esc(p.title)}</h3>
          <p class="card-desc">${esc(p.desc)}</p>
          <div class="card-footer">
            <div class="price">${esc(p.price)}</div>
            <a href="${esc(p.url)}" target="_blank" rel="noopener" class="buy-btn">Comprar en Amazon</a>
          </div>
        </div>
      </div>
    `).join('');

    grid.insertAdjacentHTML('beforeend', html);
    offset += slice.length;

    stats.textContent = `Mostrando ${Math.min(offset, list.length)} de ${list.length} productos`;

    if (offset >= list.length && observer) {
      observer.disconnect();
      observer = null;
    } else {
      ensureObserver();
    }

    loading = false;
  }

  function ensureObserver() {
    if (observer || !sentinel) return;
    observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) render(activeList, false);
    }, { rootMargin: '400px' });
    observer.observe(sentinel);
  }

  const doSearch = () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      activeList = products.slice();
    } else {
      const results = fuse.search(q);
      activeList = results.length ? results.map(r => r.item) : [];
    }
    fuse.setCollection(activeList);
    render(activeList, true);
  };

  searchInput.addEventListener('input', doSearch);
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    activeList = products.slice();
    fuse.setCollection(activeList);
    render(activeList, true);
  });

  // Inicio
  render(products, true);
  ensureObserver();
});