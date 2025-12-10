document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            title: "Auriculares inalámbricos XYZ",
            desc: "Cancelación de ruido, hasta 30h de batería y Bluetooth 5.2.",
            price: "$59.99",
            meta: "Envío desde Amazon",
            img: "https://via.placeholder.com/800x450/0b2430/ffdba8?text=Auriculares+XYZ",
            url: "https://www.amazon.com/s?k=auriculares+inalambricos"
        },
        {
            id: 2,
            title: "Smartwatch Modelo A1",
            desc: "Rastreo de actividad, pulsómetro y resistencia 5ATM.",
            price: "$79.90",
            meta: "Oferta por tiempo limitado",
            img: "https://via.placeholder.com/800x450/0b2430/ffdba8?text=Smartwatch+A1",
            url: "https://www.amazon.com/s?k=smartwatch"
        },
        {
            id: 3,
            title: "Cafetera Espresso Compacta",
            desc: "15 bar, depósito removible y soporte para cápsulas.",
            price: "$129.00",
            meta: "En stock",
            img: "https://via.placeholder.com/800x450/0b2430/ffdba8?text=Cafetera+Espresso",
            url: "https://www.amazon.com/s?k=cafetera+espresso"
        },
        {
            id: 4,
            title: "Mochila urbana 20L",
            desc: "Resistente al agua, compartimento para laptop y diseño ergonómico.",
            price: "$39.50",
            meta: "Envío gratis",
            img: "https://via.placeholder.com/800x450/0b2430/ffdba8?text=Mochila+20L",
            url: "https://www.amazon.com/s?k=mochila+urbana"
        }
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