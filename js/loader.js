// js/loader.js

document.addEventListener('DOMContentLoaded', async () => {
  // 📋 Sustituí esta URL por la que obtuviste al desplegar tu Apps Script como Web App
  const JSON_URL = 'products.json'; // Ahora lee local, no desde raw.githubusercontent

  try {
    // 1️⃣ Descarga el JSON que expone tu Sheet
    const resp = await fetch(JSON_URL);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const all = await resp.json(); // array de objetos { id, categoria, nombre, descripcion, precio, img1, img2, img3 }

    // 2️⃣ Mapeo de nombre de archivo a la columna "categoria" que quieras filtrar
    const catMap = {
      'almohadon_apego.html': 'almohadon apego',
        'almohadon_apego': 'almohadon apego',
      'almohadones.html':        'almohadones',
       'almohadones':        'almohadones',
      'indumentaria.html':   'indumentaria',
      'indumentaria':   'indumentaria',
      'taza.html':     'taza',
      'taza':     'taza',
      'mate.html':     'mate',
      'mate':     'mate',
      'stickers.html':'stickers',
      'stickers':'stickers'
    };

    // 3️⃣ Determina la categoría según el nombre del archivo actual
    const filename  = location.pathname.split('/').pop().toLowerCase();
    const categoria = catMap[filename] || '';
    const modelos   = all.filter(p => p.categoria.toLowerCase() === categoria);

   console.log("filename", filename); // qué archivo toma
console.log("categoria", categoria); // qué categoría busca
console.log("all", all); // el array de productos cargado
console.log("modelos filtrados", modelos); // lo que encuentra para esa categoría


    // 4️⃣ Inyecta cada producto dentro del contenedor .modelos
    const container = document.querySelector('.container .modelos');
    
console.log("container catálogo", container); // chequeá si encuentra el contenedor
    
    container.innerHTML = '';

    modelos.forEach((m, idx) => {
      const images = [m.img1, m.img2, m.img3].filter(x => x);
          // Genero un ID único para el slideshow por producto
      const slideshowId = `slideshow-${idx}`;

      const div = document.createElement('div');
      div.className = 'modelo';

      div.innerHTML = `
        <div class="modelo-img" id="${slideshowId}">
          ${images.map((src, i) =>
            `<img src="img/${src}" alt="${m.nombre} ${i+1}" class="${i === 0 ? 'active' : ''}">`
          ).join('')}
          <div class="slideshow-controls" ${images.length < 2 ? 'style="display:none"' : ''}>
            <button class="prev" title="Imagen anterior">&#10094;</button>
            <button class="next" title="Siguiente imagen">&#10095;</button>
          </div>
        </div>
        <div class="modelo-info">
          <h3>${m.nombre}</h3>
          <p>${m.descripcion}</p>
          <p class="precio"><strong>Precio:</strong> $${m.precio}</p>
          <button class="add-to-cart"
                  data-id="${m.id}"
                  data-name="${m.nombre}"
                  data-price="${m.precio}">
            Agregar al carrito
          </button>
        </div>
      `;
      container.appendChild(div);

      // Agregar funcionalidad slideshow a cada producto
      if (images.length > 1) {
        const imgs = div.querySelectorAll('img');
        const prevBtn = div.querySelector('.prev');
        const nextBtn = div.querySelector('.next');
        let idxImg = 0;
        const show = i => {
          imgs.forEach((img, j) => img.classList.toggle('active', i === j));
        };
        prevBtn.onclick = e => {
          e.stopPropagation();
          idxImg = (idxImg - 1 + images.length) % images.length;
          show(idxImg);
        };
        nextBtn.onclick = e => {
          e.stopPropagation();
          idxImg = (idxImg + 1) % images.length;
          show(idxImg);
        };
      }
    });

    // 5️⃣ Inicializa tus slideshows y el carrito (deben estar definidos en js/script.js)
    if (window.initSlideshows) initSlideshows();
    if (window.initCart)      initCart();

  } catch (err) {
    console.error('Error cargando datos JSON:', err);
  }
});
