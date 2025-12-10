document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            title: "Ventilador portátil SHYOSUCCE",
            desc: "Ventilador de mano con velocidades ajustables, recargable y compacto. Ideal para el hogar o la oficina.",
            price: "€24.99",
            meta: "Envío desde Amazon",
            img: "https://m.media-amazon.com/images/I/71z4vVmpMlL._AC_SL1500_.jpg",
            url: "https://www.amazon.es/SHYOSUCCE-ventilador-velocidades-ajustables-taschenventilador/dp/B0DZX9MHKP?__mk_es_ES=ÅMÅŽÕÑ&tag=catalogo11p-21"
        },
    ];

    const grid = document.getElementById('productGrid');
    const year = document.getElementById('year');
    year.textContent = new Date().getFullYear();

    function escapeHtml(str){ return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    function renderProducts(list){
    grid.innerHTML = list.map(p => `
        <a class="card-link" href="${p.url}" target="_blank" rel="noopener noreferrer">
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
                            <span class="buy">Comprar en Amazon</span>
                        </div>
                    </div>
                </div>
            </article>
        </a>
    `).join('');

        // modal de imagen
        const modal = document.getElementById("imgModal");
        const modalImg = document.getElementById("modalImg");
        const caption = document.getElementById("caption");
        const closeBtn = modal.querySelector(".close");

        document.querySelectorAll('.product-img').forEach(img => {
            img.addEventListener('click', e => {
                modal.style.display = "block";
                modalImg.src = e.target.src;
                caption.textContent = e.target.alt;
            });
        });

        closeBtn.onclick = function(){ modal.style.display = "none"; }
        modal.onclick = function(e){ if(e.target===modal) modal.style.display="none"; }
    }

    // búsqueda
    const searchInput = document.getElementById('search');
    const clearBtn = document.getElementById('clearSearch');

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        renderProducts(!q ? products : products.filter(p => (p.title + ' ' + p.desc).toLowerCase().includes(q)));
    });
    clearBtn.addEventListener('click', () => { searchInput.value=''; renderProducts(products); searchInput.focus(); });

    renderProducts(products);

    // nieve decorativa
    const snowContainer = document.getElementById('snow');
    if(snowContainer){
        const flakes=36, chars=['❆','❅','✻','✽'];
        for(let i=0;i<flakes;i++){
            const s=document.createElement('div'); s.className='snowflake';
            const size=8+Math.round(Math.random()*16); s.style.fontSize=size+'px';
            s.style.left=Math.random()*100+'vw';
            s.style.opacity=(0.6+Math.random()*0.4).toFixed(2);
            const duration=8+Math.random()*18;
            s.style.animationDuration=`${duration}s, ${3+Math.random()*4}s`;
            s.style.animationDelay=`${Math.random()*-20}s`;
            s.textContent=chars[Math.floor(Math.random()*chars.length)];
            snowContainer.appendChild(s);
        }
    }
});
