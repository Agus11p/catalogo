document.addEventListener('DOMContentLoaded', () => {
    const products = [
    {
        id: 1,
        title: "Ventilador portátil SHYOSUCCE",
        desc: "Ventilador de mano con velocidades ajustables, recargable y compacto. Ideal para el hogar o la oficina.",
        price: "€24.99",
        meta: "Envío desde Amazon",
        img: "https://m.media-amazon.com/images/I/71z4vVmpMlL._AC_SL1500_.jpg", // Imagen principal del producto
        url: "https://www.amazon.es/SHYOSUCCE-ventilador-velocidades-ajustables-taschenventilador/dp/B0DZX9MHKP?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=BORP5Q86X012&dib=eyJ2IjoiMSJ9.FkK7RXlxK9xJzbhE0XCdmreuSekcmzDu_Geklq9uJGDdgJL_lrnbR65wEJjs6n8zHh04ThV6ppLSG6Tc7Pzgzm63VVxa3mDjBI_ab9KEpkBvq4paqxMG-1OVdgIASKqATIz3OFhOdcuxKNc7ssPh4s9GBPYRQNuGFrbiolSB1k0vyQyHK40UOx8yp_WRU1dcxuVP0UfMdItpEspqaeDHnjhwN3vCIIhjzD32R2SVc0h1XtjriNx5S5-uwNXFu7jRtQmgzunJg6_SIjmwo15K3jZacINmwuJZOJr55EFRy10.Xft37I0fkqIbuivudqETAsrYoSWUInxXIl0PUSz-HWY&dib_tag=se&keywords=Gadgets%2Bpara%2Bel%2Bhogar&qid=1765332607&sprefix=gadgets%2Bpara%2Bel%2Bhogar%2Caps%2C333&sr=8-55&th=1&linkCode=ll1&tag=catalogo11p-21&linkId=17a9d7935a27648f8cac6479378bb4a0&language=es_ES&ref_=as_li_ss_tl"
    },
];


    const grid = document.getElementById('productGrid');
    const year = document.getElementById('year');
    year.textContent = new Date().getFullYear();

    function renderProducts(list) {
        grid.innerHTML = list.map(p => `
            <article class="card" data-id="${p.id}">
                <div class="card-media">
                    <img loading="lazy" src="${p.img}" alt="${escapeHtml(p.title)}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${escapeHtml(p.title)}</h3>
                    <p class="card-desc">${escapeHtml(p.desc)}</p>
                    <div class="card-bottom">
                        <div>
                            <div class="price">${escapeHtml(p.price)}</div>
                            <div class="meta">${escapeHtml(p.meta)}</div>
                        </div>
                        <div>
                            <a class="buy" href="${p.url}" target="_blank" rel="noopener noreferrer">Comprar en Amazon</a>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');
    }

    // Simple search
    const searchInput = document.getElementById('search');
    const clearBtn = document.getElementById('clearSearch');

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) { renderProducts(products); return; }
        const filtered = products.filter(p => (p.title + ' ' + p.desc).toLowerCase().includes(q));
        renderProducts(filtered);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        renderProducts(products);
        searchInput.focus();
    });

    renderProducts(products);

    // ---- Snow generation (decorative) ----
    const snowContainer = document.getElementById('snow');
    if (snowContainer) {
        const flakes = 36; // ajustar para menos/más nieve
        const chars = ['❆','❅','✻','✽'];
        for (let i = 0; i < flakes; i++) {
            const s = document.createElement('div');
            s.className = 'snowflake';
            const size = 8 + Math.round(Math.random() * 16);
            s.style.fontSize = size + 'px';
            s.style.left = Math.random() * 100 + 'vw';
            s.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
            const duration = 8 + Math.random() * 18;
            s.style.animationDuration = `${duration}s, ${3 + Math.random() * 4}s`;
            s.style.animationDelay = `${Math.random() * -20}s`;
            s.textContent = chars[Math.floor(Math.random() * chars.length)];
            snowContainer.appendChild(s);
        }
    }

    // basic HTML escape for values inserted into template
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
});