// Menú de navegación móvil accesible: abre/cierra con botón, Escape y al elegir un enlace.
(function () {
  const boton = document.getElementById('boton-menu');
  const menu = document.getElementById('menu-principal');
  if (!boton || !menu) return;

  function abrir(estado) {
    boton.setAttribute('aria-expanded', String(estado));
    boton.setAttribute('aria-label', estado ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('hidden', !estado);
  }

  boton.addEventListener('click', function () {
    abrir(boton.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', function (evento) {
    if (evento.target.closest('a') && window.matchMedia('(max-width: 767px)').matches) abrir(false);
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') {
      abrir(false);
      boton.focus();
    }
  });
})();
