const titulo = document.querySelector('header h1');

titulo.addEventListener('mouseenter', function() {
    titulo.style.color = '#ffd700';
    titulo.style.transition = 'color 0.3s';
});

titulo.addEventListener('mouseleave', function() {
    titulo.style.color = '#ff4081';
});

const tarjetas = document.querySelectorAll('.tarjeta');

tarjetas.forEach(function(tarjeta) {
    tarjeta.addEventListener('mouseenter', function() {
        tarjeta.style.transform = 'scale(1.02)';
        tarjeta.style.transition = 'transform 0.3s';
        tarjeta.style.boxShadow = '0 5px 15px rgba(255,64,129,0.4)';
    });

    tarjeta.addEventListener('mouseleave', function() {
        tarjeta.style.transform = 'scale(1)';
        tarjeta.style.boxShadow = 'none';
    });
});

const imagenes = document.querySelectorAll('.tarjeta img, .fotos img');

imagenes.forEach(function(img) {
    img.addEventListener('mouseenter', function() {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.3s';
        img.style.cursor = 'pointer';
    });

    img.addEventListener('mouseleave', function() {
        img.style.transform = 'scale(1)';
    });
});