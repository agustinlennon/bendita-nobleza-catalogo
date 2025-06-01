document.addEventListener("DOMContentLoaded", function() {
  // Banner principal rotativo (rota las <img> dentro de .banner-slideshow)
  const banners = document.querySelectorAll('.banner-slideshow img');
  let bIndex = 0;
  // Inicializamos: la primera visible, las demás ocultas
  banners.forEach((img, idx) => {
    img.classList.toggle('active', idx === 0);
  });
  setInterval(() => {
    banners[bIndex].classList.remove('active');
    bIndex = (bIndex + 1) % banners.length;
    banners[bIndex].classList.add('active');
  }, 3000);

  // Slideshows de productos (idéntica lógica)
  document.querySelectorAll('.slideshow').forEach(slideshow => {
    const imgs = slideshow.querySelectorAll('img');
    const prev = slideshow.querySelector('.prev');
    const next = slideshow.querySelector('.next');
    let i = 0;

    function showImage(idx) {
      imgs.forEach((img, j) => img.classList.toggle('active', j === idx));
    }

    // Botones manuales
    prev && prev.addEventListener('click', () => {
      i = (i - 1 + imgs.length) % imgs.length;
      showImage(i);
    });
    next && next.addEventListener('click', () => {
      i = (i + 1) % imgs.length;
      showImage(i);
    });

    // Arranca el slideshow
    showImage(i);
    setInterval(() => {
      i = (i + 1) % imgs.length;
      showImage(i);
    }, 4000);
  });
});
