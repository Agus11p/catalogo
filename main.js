document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            title: "SHYOSUCCE Ventilador Portátil",
            desc: "Velocidades ajustables, portátil, recargable y compacto para el hogar o la oficina.",
            price: "€29.99",
            meta: "Envío desde Amazon",
            img: "https://m.media-amazon.com/images/I/61Zp1L0L3iL._AC_SL1500_.jpg",
            url: "https://www.amazon.es/SHYOSUCCE-ventilador-velocidades-ajustables-taschenventilador/dp/B0DZX9MHKP/?tag=catalogo11p-21"
        },
        // Puedes agregar más productos aquí
    ];

    const grid = document.getElementById('productGrid');
    const year = document.getElementById('year');
    year.textContent = new Date().getFullYear();

    function renderProducts(list){
        grid.innerHTML = list.map(p => `
            <a class="card-link" href="${p.url}" target="_blank" rel="noopener noreferrer">
                <article class="card" data-id="${p.id}">
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
                </article>
            </a>
        `).join('');
    }

    // Buscador simple
    const searchInput = document.getElementById('search');
    const clearBtn = document.getElementById('clearSearch');

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        if(!q){ renderProducts(products); return; }
        const filtered = products.filter(p => (p.title + ' ' + p.desc).toLowerCase().includes(q));
        renderProducts(filtered);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        renderProducts(products);
        searchInput.focus();
    });

    renderProducts(products);
});
