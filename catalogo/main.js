/* =========================
   CONFIG GENERAL
========================= */

const AFFILIATE_TAG = "catalogo11p-21";

const EXCHANGE = {
  EUR: 1,
  USD: 1.08,
  ARS: 1450
};

const SYMBOL = {
  EUR: "€",
  USD: "US$",
  ARS: "$"
};

let currency = "EUR";

/* =========================
   PRODUCTOS (DATOS REALES)
========================= */

const products = [
  {
    name: "Mini ventilador de mano SHYOSUCCE",
    category: "Electrónica",
    rating: 4.4,
    reviews: 36,
    price: 14.99,
    oldPrice: null,
    discount: 0,
    tags: [],
    link: "https://www.amazon.es/dp/B0DZX9MHKP"
  },
  {
    name: "Meta Quest 3 – 512 GB",
    category: "Videojuegos",
    rating: 4.6,
    reviews: 3417,
    price: 549.0,
    oldPrice: 699.99,
    discount: 22,
    tags: ["Opción Amazon", "🔥 Más vendido"],
    link: "https://www.amazon.es/dp/B09N24BHKQ"
  },
  {
    name: "Pristar Etiquetadora Bluetooth P15",
    category: "Electrónica",
    rating: 4.5,
    reviews: 3843,
    price: 29.99,
    oldPrice: 32.99,
    discount: 9,
    tags: [],
    link: "https://www.amazon.es/dp/B0CMHRC1FH"
  },
  {
    name: "Cecotec Cecofry Full InoxBlack 5,5 L",
    category: "Cocina",
    rating: 4.5,
    reviews: 27202,
    price: 49.9,
    oldPrice: null,
    discount: 0,
    tags: ["Opción Amazon"],
    link: "https://www.amazon.es/dp/B0BFB3Q7SD"
  },
  {
    name: "Tapo C51A Cámara Wi-Fi Exterior 360° 2K",
    category: "Seguridad",
    rating: 4.5,
    reviews: 16677,
    price: 39.99,
    oldPrice: 54.99,
    discount: 27,
    tags: ["Opción Amazon"],
    link: "https://www.amazon.es/dp/B0DQ5NTHB8"
  }
];

/* =========================
   FUNCIONES
========================= */

function affiliate(url) {
  return `${url}?tag=${AFFILIATE_TAG}`;
}

function convert(value) {
  return Math.round(value * EXCHANGE[currency]);
}

/* =========================
   RENDER
========================= */

function render() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="image-placeholder">Imagen ilustrativa</div>

      <h3>${p.name}</h3>
      <p class="category">${p.category}</p>

      <p class="rating">
        ⭐ ${p.rating} (${p.reviews.toLocaleString()} reseñas)
      </p>

      ${
        p.discount > 0
          ? `<p class="discount">🔥 ${p.discount}% OFF</p>`
          : ""
      }

      ${
        p.oldPrice
          ? `<p class="old-price">${SYMBOL[currency]} ${convert(p.oldPrice)}</p>`
          : ""
      }

      <p class="price">
        ${SYMBOL[currency]} ${convert(p.price)}
        <span class="approx">aprox</span>
      </p>

      ${
        p.tags.length
          ? `<div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>`
          : ""
      }

      <a href="${affiliate(p.link)}"
         target="_blank"
         rel="nofollow sponsored"
         class="buy-btn">
        Ver en Amazon
      </a>
    `;

    container.appendChild(card);
  });

  document.getElementById("currency-note").innerText =
    "Precios aproximados. El precio final y el IVA se confirman en Amazon.";
}

/* =========================
   EVENTOS
========================= */

document.addEventListener("DOMContentLoaded", () => {
  render();

  document.querySelectorAll("[data-currency]").forEach(btn => {
    btn.addEventListener("click", () => {
      currency = btn.dataset.currency;
      render();
    });
  });
});
