document.addEventListener('DOMContentLoaded', () =>{
  const products = [
    {id:5,title:"Tapo C51A Cámara Vigilancia Wi-Fi Exterior 360°",desc:"Resolución 2K, visión nocturna color, detección IA personas, seguimiento inteligente, IP65 resistente al agua",priceEUR:39.99,img:"https://m.media-amazon.com/images/I/61t6Wv1nLKL._AC_SL1500_.jpg",url:"https://www.amazon.es/Tapo-C51A-vigilancia-Seguimiento-Inteligente/dp/B0DQ5NTHB8?pd_rd_w=PnaM5&content-id=amzn1.sym.fefa772b-6540-4186-be83-3322ed57acee&pf_rd_p=fefa772b-6540-4186-be83-3322ed57acee&pf_rd_r=2GMXW5XVA27S9K37HE2N&pd_rd_wg=dY8NV&pd_rd_r=68d18979-d2ed-4f64-8c93-1afe1355578c&pd_rd_i=B0DQ5NTHB8&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=9b65b364b692f2a19f36010d8d99c48d&language=es_ES&ref_=as_li_ss_tl"},
    {id:1,title:"Ventilador Portátil SHYOSUCCE",desc:"Mini ventilador de mano con 4 velocidades ajustables",priceEUR:14.99,img:"https://m.media-amazon.com/images/I/61Kx6Y9n8FL._AC_SL1500_.jpg",url:"https://www.amazon.es/SHYOSUCCE-ventilador-velocidades-ajustables-taschenventilador/dp/B0DZX9MHKP?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=BORP5Q86X012&dib=eyJ2IjoiMSJ9.FkK7RXlxK9xJzbhE0XCdmreuSekcmzDu_Geklq9uJGDdgJL_lrnbR65wEJjs6n8zHh04ThV6ppLSG6Tc7Pzgzm63VVxa3mDjBI_ab9KEpkBvq4paqxMG-1OVdgIASKqATIz3OFhOdcuxKNc7ssPh4s9GBPYRQNuGFrbiolSB1k0vyQyHK40UOx8yp_WRU1dcxuVP0UfMdItpEspqaeDHnjhwN3vCIIhjzD32R2SVc0h1XtjriNx5S5-uwNXFu7jRtQmgzunJg6_SIjmwo15K3jZacINmwuJZOJr55EFRy10.Xft37I0fkqIbuivudqETAsrYoSWUInxXIl0PUSz-HWY&dib_tag=se&keywords=Gadgets%2Bpara%2Bel%2Bhogar&qid=1765332607&sprefix=gadgets%2Bpara%2Bel%2Bhogar%2Caps%2C333&sr=8-55&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=12cf10706f834b5cbbd18557c2bb175e&language=es_ES&ref_=as_li_ss_tl"},
    {id:2,title:"Meta Quest 3 512GB",desc:"Visor de realidad mixta revolucionaria",priceEUR:699.99,img:"https://m.media-amazon.com/images/I/71v2EGp4xVL._AC_SL1500_.jpg",url:"https://www.amazon.es/Quest-512Gb-Realidad-mixta-revolucionaria/dp/B09N24BHKQ?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2SLEQQN0MK4SZ&dib=eyJ2IjoiMSJ9.OOgG_FyAQLT7ierlNiByMsd0GveQ1M9CM5vzKkT5d0Fjhb61ZYOPOZGoJJlicMbDPvIGiPV9db3T5DNmWz3vT-Fb_zuoHl3iB2P9K5uTVdft1y6-_3Aumk6MF6uATozcryz9MeFyt0o0GcXXYgfPOJEra7ZEHBXySvNrT-YarLe0BHITsp45SJirxZEzkUuz52zr6J-_rj5WP8rSHdZFYs8PLablf9SDi9U1ynniBLhjLoTy3DXd2l3Pdh-X9ramRTZZ0B-_U2n8JMflRoD93Pi55E-5eh1Sk3BvWXuwk4U.2L0zjb-hy-XK-0nbwSzHGi8jny3xqbu3Q7lQG8VqdIQ&dib_tag=se&keywords=tecnologia&qid=1765403460&s=mobile-apps&sprefix=tecnologia%2Cmobile-apps%2C341&sr=1-4-catcorr&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=0904e2dc545dc679a8d8fc864561a06a&language=es_ES&ref_=as_li_ss_tl"},
    {id:3,title:"Pristar Etiquetadora Bluetooth P15",desc:"Mini impresora térmica portátil sin tinta",priceEUR:32.99,img:"https://m.media-amazon.com/images/I/71E1aBzgI0L._AC_SL1500_.jpg",url:"https://www.amazon.es/gp/aw/d/B0CMHRC1FH?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=a127728558c2d2d4c6ba3b8b3ab1fb4e&hsa_cr_id=0&qid=1765403460&sr=1-3-1ee1b2e4-01d1-4cd0-b737-4c27ebfc8105&aref=9xQUUiJxMi&pd_rd_w=NqMV9&content-id=amzn1.sym.7dce7ea4-b064-4e7a-b891-491ac0e7a11e%3Aamzn1.sym.7dce7ea4-b064-4e7a-b891-491ac0e7a11e&pf_rd_p=7dce7ea4-b064-4e7a-b891-491ac0e7a11e&pf_rd_r=A4AKEG91ZGJC7ASQABQF&pd_rd_wg=HzrxZ&pd_rd_r=89657e59-8788-45ed-9ee4-c05501f579d9&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=3fd4c1e5a78ec5466a1907fff753c5d0&language=es_ES&ref_=as_li_ss_tl"},
    {id:4,title:"Cecotec Cecofry Full InoxBlack 5500 Pro",desc:"Freidora de aire 5,5L 1700W 8 modos",priceEUR:45.90,img:"https://m.media-amazon.com/images/I/71qY9xR7tPL._AC_SL1500_.jpg",url:"https://www.amazon.es/Cecotec-InoxBlack-Tecnolog%C3%ADa-PerfectCook-Termostato/dp/B0BFB3Q7SD?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2SLEQQN0MK4SZ&dib=eyJ2IjoiMSJ9.OOgG_FyAQLT7ierlNiByMsd0GveQ1M9CM5vzKkT5d0Fjhb61ZYOPOZGoJJlicMbDPvIGiPV9db3T5DNmWz3vT-Fb_zuoHl3iB2P9K5uTVdft1y6-_3Aumk6MF6uATozcryz9MeFyt0o0GcXXYgfPOJEra7ZEHBXySvNrT-YarLe0BHITsp45SJirxZEzkUuz52zr6J-_rj5WP8rSHdZFYs8PLablf9SDi9U1ynniBLhjLoTy3DXd2l3Pdh-X9ramRTZZ0B-_U2n8JMflRoD93Pi55E-5eh1Sk3BvWXuwk4U.2L0zjb-hy-XK-0nbwSzHGi8jny3xqbu3Q7lQG8VqdIQ&dib_tag=se&keywords=tecnologia&qid=1765403460&s=mobile-apps&sprefix=tecnologia%2Cmobile-apps%2C341&sr=1-7-catcorr&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=9726e2371d5283b63cceb51b3846cadb&language=es_ES&ref_=as_li_ss_tl"}
  ];

  const rates = { EUR:1, USD:1.09, ARS:1150, MXN:21.80, CLP:1025 };
  const symbols = { EUR:'€', USD:'US$', ARS:'$', MXN:'$', CLP:'$' };

  const allowedIds = products.map(p => p.id); // todas automáticas

  const grid = document.getElementById('productGrid');
  const stats = document.getElementById('stats');
  const search = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const currencySelect = document.getElementById('currencySelect');
  const noResults = document.getElementById('noResults');

  // Solución definitiva: forzamos ARS por defecto
  let currentCurrency = 'ARS';
  if (currencySelect && currencySelect.value) currentCurrency = currencySelect.value;

  let currentList = products.slice();

  const fuse = new Fuse(products, {keys:['title','desc'], threshold:0.3});

  function format(priceEUR){
    const amount = (priceEUR * rates[currentCurrency]).toFixed(2);
    const [int, dec] = amount.split('.');
    return symbols[currentCurrency] + int.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + dec;
  }

  function render(){
    grid.innerHTML = '';
    currentList.forEach(p => {
      grid.innerHTML += `
        <div class="card">
          <img src="${p.img}" alt="${p.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400/0f172a/fbbf24?text=Sin+imagen'">
          <div class="card-body">
            <h3 class="card-title">${p.title}</h3>
            <p class="card-desc">${p.desc}</p>
            <div class="card-footer">
              <div class="price">${format(p.priceEUR)}</div>
              <a href="${p.url}" target="_blank" rel="noopener" class="buy-btn">Comprar en Amazon</a>
            </div>
          </div>
        </div>
      `;
    });
    stats.textContent = `Mostrando ${currentList.length} productos`;
    noResults.hidden = currentList.length > 0;
  }

  currencySelect.addEventListener('change', e => { currentCurrency = e.target.value; render(); });
  search.addEventListener('input', () => {
    const q = search.value.trim();
    currentList = q ? fuse.search(q).map(r => r.item) : products;
    render();
  });
  clearBtn.addEventListener('click', () => { search.value=''; currentList=products; render(); });

  render(); // carga inicial
});