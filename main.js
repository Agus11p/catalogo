document.addEventListener('DOMContentLoaded', () => {
  // Productos con precio base en euros
  const productsRaw = [
    {id:1,title:"Meta Quest 3 512GB",desc:"Visor realidad mixta última generación",priceEUR:699.99,img:"https://m.media-amazon.com/images/I/61Nb0MEp1RL._AC_SL1500_.jpg",url:"https://www.amazon.es/dp/B09N24BHKQ?tag=catalogo11p-21"},
    {id:2,title:"Pristar Etiquetadora Bluetooth",desc:"Impresora térmica portátil sin tinta",priceEUR:32.99,img:"https://m.media-amazon.com/images/I/61fG3bX1t7L._AC_SL1500_.jpg",url:"https://www.amazon.es/dp/B0CMHRC1FH?tag=catalogo11p-21"},
    {id:3,title:"Cecotec Cecofry 5500 Pro",desc:"Freidora sin aceite 5.5L 1700W",priceEUR:45.90,img:"https://m.media-amazon.com/images/I/71qY9xR7tPL._AC_SL1500_.jpg",url:"https://www.amazon.es/dp/B0BFB3Q7SD?tag=catalogo11p-21"},
    {id:4,title:"Ventilador Portátil SHYOSUCCE",desc:"Mini ventilador USB 4 velocidades",priceEUR:14.99,img:"https://m.media-amazon.com/images/I/61+9kZ7Z5FL._AC_SL1500_.jpg",url:"https://www.amazon.es/dp/B0DZX9MHKP?tag=catalogo11p-21"}
  ];

  // Tasas reales al 10 de diciembre 2025
  const rates = { EUR:1, USD:1.09, ARS:1150, MXN:21.80, CLP:1025 };
  const symbols = { EUR:'€', USD:'US$', ARS:'$', MXN:'$', CLP:'$' };

  const allowedIds = [4,1,2,3];
  const products = allowedIds.map(id => productsRaw.find(p=>p.id===id)).filter(Boolean);

  const grid = document.getElementById('productGrid');
  const stats = document.getElementById('stats');
  const search = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const currencySelect = document.getElementById('currencySelect');
  const noResults = document.getElementById('noResults');

  let currentCurrency = currencySelect.value;
  let currentList = products.slice();

  const fuse = new Fuse(products, {keys:['title','desc'], threshold:0.3});

  function format(priceEUR){
    const amount = (priceEUR * rates[currentCurrency]).toFixed(2);
    const [integer, decimal] = amount.split('.');
    const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimal;
    return symbols[currentCurrency] + formatted;
  }

  function render(){
    grid.innerHTML = '';
    currentList.forEach(p => {
      grid.innerHTML += `
        <div class="card">
          <img src="${p.img}" alt="${p.title}" loading="lazy">
          <div class="card-body">
            <h3 class="card-title">${p.title}</h3>
            <p class="card-desc">${p.desc}</p>
            <div class="card-footer">
              <div class="price">${format(p.priceEUR)}</div>
              <a href="${p.url}" target="_blank" class="buy-btn">Comprar</a>
            </div>
          </div>
        </div>
      `;
    });
    stats.textContent = `Mostrando ${currentList.length} productos`;
    noResults.hidden = currentList.length > 0;
  }

  // Cambio de moneda
  currencySelect.addEventListener('change', e => {
    currentCurrency = e.target.value;
    render();
  });

  // Búsqueda
  search.addEventListener('input', () => {
    const q = search.value.trim();
    currentList = q ? fuse.search(q).map(r => r.item) : products;
    render();
  });

  clearBtn.addEventListener('click', () => {
    search.value = '';
    currentList = products;
    render();
  });

  // Primera carga
  render();
});