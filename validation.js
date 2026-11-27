/**
 * Validación del formulario de postulación de Nexova Solutions.
 *
 * Cómo funciona:
 *  1. Cada campo tiene una regla en `REGLAS` que devuelve un mensaje de error o '' si está bien.
 *  2. Se valida al salir de un campo (blur) y, si ya tenía error, mientras la persona lo corrige.
 *  3. Al enviar se validan todos: si hay errores se muestra un resumen con enlaces a cada campo;
 *     si no, se muestra el mensaje de éxito. No se envía nada a ningún servidor todavía.
 *
 * Accesibilidad: los errores se marcan con aria-invalid y se leen gracias a aria-describedby.
 */
(function () {
  'use strict';

  const formulario = document.getElementById('formulario-postulacion');
  if (!formulario) return;

  const resumen = document.getElementById('resumen-errores');
  const listaErrores = document.getElementById('lista-errores');
  const exito = document.getElementById('mensaje-exito');
  const textoExito = document.getElementById('texto-exito');

  const REGEX_NOMBRE = /^[\p{L}][\p{L}'’.\- ]*[\p{L}.]$/u;
  const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;
  const REGEX_TELEFONO = /^\+?[\d\s().-]+$/;
  const REGEX_LINKEDIN = /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/in\/[\w\-áéíóúüñ%]+\/?$/i;
  const TAMANO_MAX_CV = 5 * 1024 * 1024; // 5 MB
  const EXTENSIONES_CV = ['pdf', 'doc', 'docx'];

  // Fechas límite para `disponibilidad` (formato AAAA-MM-DD, en hora local).
  function aISO(fecha) {
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    return `${fecha.getFullYear()}-${mm}-${dd}`;
  }
  const hoy = new Date();
  const FECHA_HOY = aISO(hoy);
  const FECHA_MAX = aISO(new Date(hoy.getFullYear() + 1, hoy.getMonth(), hoy.getDate()));
  const campoFecha = document.getElementById('disponibilidad');
  if (campoFecha) {
    campoFecha.min = FECHA_HOY;
    campoFecha.max = FECHA_MAX;
  }

  // Nombre legible de cada campo, usado en el resumen de errores.
  const ETIQUETAS = {
    nombre: 'Nombre y apellidos',
    email: 'Email',
    pais: 'País de residencia',
    telefono: 'Teléfono',
    ciudad: 'Ciudad',
    cargo_actual: 'Cargo actual',
    sector: 'Sector',
    anios_experiencia: 'Años de experiencia',
    nivel: 'Nivel de cargo',
    habilidades: 'Habilidades principales',
    linkedin_url: 'Perfil de LinkedIn',
    idioma_ingles: 'Nivel de inglés',
    disponibilidad: 'Disponibilidad',
    expectativa_salarial: 'Expectativa salarial',
    moneda: 'Moneda',
    cv: 'CV',
    consentimiento_datos: 'Consentimiento de datos',
  };

  /* ---------- Lectura de valores ---------- */

  function valor(nombre) {
    const campo = formulario.elements[nombre];
    if (!campo) return '';
    if (campo.type === 'checkbox') return campo.checked;
    if (campo.type === 'file') return campo.files && campo.files[0] ? campo.files[0] : null;
    return (campo.value || '').trim(); // también funciona con grupos de radio (RadioNodeList)
  }

  /* ---------- Reglas: devuelven el mensaje de error o '' ---------- */

  const REGLAS = {
    nombre(v) {
      if (!v) return 'Escribe tu nombre y apellidos.';
      if (v.length < 5) return 'El nombre es demasiado corto. Escribe nombre y apellido.';
      if (!REGEX_NOMBRE.test(v)) return 'Usa solo letras, espacios, guiones o apóstrofos.';
      if (v.split(/\s+/).length < 2) return 'Escribe al menos un nombre y un apellido.';
      return '';
    },

    email(v) {
      if (!v) return 'Escribe tu email.';
      if (!REGEX_EMAIL.test(v)) return 'El email no es válido. Debe tener el formato nombre@dominio.com.';
      return '';
    },

    pais(v) {
      return v ? '' : 'Elige tu país de residencia.';
    },

    telefono(v) {
      if (!v) return 'Escribe tu teléfono.';
      if (!REGEX_TELEFONO.test(v)) return 'Usa solo números, espacios, guiones, paréntesis y el signo +.';
      let digitos = v.replace(/\D/g, '');
      const pais = valor('pais');
      if (pais === 'ES') {
        if (digitos.length === 11 && digitos.startsWith('34')) digitos = digitos.slice(2);
        if (!/^[6-9]\d{8}$/.test(digitos)) return 'Un teléfono de España tiene 9 dígitos y empieza por 6, 7, 8 o 9. Ejemplo: +34 612 345 678.';
      } else if (pais === 'US') {
        if (digitos.length === 11 && digitos.startsWith('1')) digitos = digitos.slice(1);
        if (!/^[2-9]\d{9}$/.test(digitos)) return 'Un teléfono de Estados Unidos tiene 10 dígitos. Ejemplo: +1 305 555 0123.';
      } else if (digitos.length < 9 || digitos.length > 15) {
        return 'El teléfono debe tener entre 9 y 15 dígitos.';
      }
      return '';
    },

    ciudad(v) {
      if (!v) return 'Escribe tu ciudad.';
      if (v.length < 2 || !/^[\p{L}][\p{L}'’.\- ]*$/u.test(v)) return 'Escribe un nombre de ciudad válido, solo con letras.';
      return '';
    },

    cargo_actual(v) {
      if (!v) return 'Escribe tu cargo actual o el último que tuviste.';
      if (v.length < 3) return 'El cargo es demasiado corto. Ejemplo: Jefa de Ventas B2B.';
      return '';
    },

    sector(v) {
      return v ? '' : 'Elige el sector en el que trabajas.';
    },

    anios_experiencia(v) {
      if (v === '') return 'Escribe tus años de experiencia. Si recién empiezas, escribe 0.';
      const n = Number(v);
      if (!Number.isInteger(n)) return 'Escribe un número entero de años, sin decimales.';
      if (n < 0 || n > 50) return 'Escribe un número entre 0 y 50.';
      return '';
    },

    nivel(v) {
      return v ? '' : 'Elige si postulas a mando medio o a directivo.';
    },

    habilidades(v) {
      if (!v) return 'Escribe tus habilidades principales.';
      const lista = v.split(',').map((h) => h.trim()).filter(Boolean);
      if (lista.length < 3) return `Escribe al menos 3 habilidades separadas por comas. Llevas ${lista.length}.`;
      if (lista.some((h) => h.length > 50)) return 'Cada habilidad debe tener 50 caracteres o menos. ¿Te faltó separar con comas?';
      return '';
    },

    linkedin_url(v) {
      if (!v) return ''; // opcional
      if (!REGEX_LINKEDIN.test(v)) return 'El enlace debe ser un perfil de LinkedIn, por ejemplo https://www.linkedin.com/in/tu-nombre.';
      return '';
    },

    idioma_ingles(v) {
      return v ? '' : 'Elige tu nivel de inglés.';
    },

    disponibilidad(v) {
      if (!v) return 'Elige la fecha desde la que podrías empezar.';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(Date.parse(v))) return 'La fecha no es válida. Usa el formato día/mes/año.';
      if (v < FECHA_HOY) return 'La fecha ya pasó. Elige hoy o una fecha futura.';
      if (v > FECHA_MAX) return 'Elige una fecha dentro de los próximos 12 meses.';
      return '';
    },

    expectativa_salarial(v) {
      if (v === '') return 'Escribe tu expectativa salarial bruta anual.';
      const n = Number(v);
      if (!Number.isFinite(n) || !/^\d+$/.test(v)) return 'Escribe solo números, sin puntos, comas ni símbolos. Ejemplo: 45000.';
      if (n < 10000) return 'La cifra parece muy baja para un sueldo anual. Escribe un monto de 10000 o más.';
      if (n > 1000000) return 'Escribe un monto de 1000000 o menos.';
      return '';
    },

    moneda(v) {
      return v ? '' : 'Elige la moneda de tu expectativa salarial.';
    },

    cv(archivo) {
      if (!archivo) return 'Adjunta tu CV.';
      const extension = archivo.name.split('.').pop().toLowerCase();
      if (!EXTENSIONES_CV.includes(extension)) return 'El CV debe ser un archivo PDF, DOC o DOCX.';
      if (archivo.size === 0) return 'El archivo está vacío. Adjunta otro.';
      if (archivo.size > TAMANO_MAX_CV) {
        const mb = (archivo.size / 1024 / 1024).toFixed(1);
        return `El archivo pesa ${mb} MB. El máximo es 5 MB.`;
      }
      return '';
    },

    consentimiento_datos(marcado) {
      return marcado ? '' : 'Debes aceptar el tratamiento de tus datos para poder postular.';
    },
  };

  /* ---------- Mostrar y limpiar errores ---------- */

  function controles(nombre) {
    const campo = formulario.elements[nombre];
    if (!campo) return [];
    return campo instanceof RadioNodeList ? Array.from(campo) : [campo];
  }

  function mostrarError(nombre, mensaje) {
    const parrafo = document.getElementById(`${nombre}-error`);
    controles(nombre).forEach((c) => c.setAttribute('aria-invalid', mensaje ? 'true' : 'false'));
    if (!parrafo) return;
    parrafo.textContent = mensaje;
    parrafo.classList.toggle('hidden', !mensaje);
  }

  function validarCampo(nombre) {
    const mensaje = REGLAS[nombre](valor(nombre));
    mostrarError(nombre, mensaje);
    return mensaje;
  }

  function tieneError(nombre) {
    const primero = controles(nombre)[0];
    return primero && primero.getAttribute('aria-invalid') === 'true';
  }

  /* ---------- Eventos por campo ---------- */

  // Al salir de un campo de texto, select o archivo: validar.
  formulario.addEventListener('focusout', (evento) => {
    const nombre = evento.target.name;
    if (!REGLAS[nombre]) return;
    if (evento.target.type === 'radio' || evento.target.type === 'checkbox') return;
    // No molestar si la persona solo pasó por un campo vacío y no escribió nada.
    const actual = valor(nombre);
    if ((actual === '' || actual === null) && !tieneError(nombre)) return;
    validarCampo(nombre);
  });

  // Mientras corrige un campo con error, revalidar para quitar el mensaje en cuanto esté bien.
  formulario.addEventListener('input', (evento) => {
    const nombre = evento.target.name;
    if (REGLAS[nombre] && tieneError(nombre)) validarCampo(nombre);
  });

  formulario.addEventListener('change', (evento) => {
    const nombre = evento.target.name;
    if (!REGLAS[nombre]) return;

    // Radios, checkbox, selects y archivo se validan al cambiar.
    const tipo = evento.target.type;
    if (['radio', 'checkbox', 'file', 'date'].includes(tipo) || evento.target.tagName === 'SELECT') {
      validarCampo(nombre);
    }

    // El país define el formato del teléfono y sugiere la moneda.
    if (nombre === 'pais') {
      if (valor('telefono')) validarCampo('telefono');
      if (!valor('moneda')) {
        const sugerida = { ES: 'EUR', US: 'USD' }[valor('pais')];
        const radio = formulario.querySelector(`input[name="moneda"][value="${sugerida}"]`);
        if (radio) radio.checked = true;
      }
    }
  });

  /* ---------- Envío ---------- */

  function enfocarCampo(nombre) {
    const control = controles(nombre)[0];
    if (!control) return;
    control.focus();
    control.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  function mostrarResumen(errores) {
    listaErrores.innerHTML = '';
    errores.forEach(({ nombre, mensaje }) => {
      const item = document.createElement('li');
      const enlace = document.createElement('a');
      enlace.href = `#${controles(nombre)[0].id || nombre}`;
      enlace.className = 'font-semibold underline underline-offset-4 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-alerta';
      enlace.textContent = `${ETIQUETAS[nombre]}: ${mensaje}`;
      enlace.addEventListener('click', (e) => {
        e.preventDefault();
        enfocarCampo(nombre);
      });
      item.appendChild(enlace);
      listaErrores.appendChild(item);
    });
    resumen.classList.remove('hidden');
    resumen.focus();
    resumen.scrollIntoView({ block: 'start' });
  }

  function recogerDatos() {
    const archivo = valor('cv');
    return {
      candidato_id: window.crypto && crypto.randomUUID ? crypto.randomUUID() : `cand-${Date.now()}`,
      nombre: valor('nombre'),
      email: valor('email'),
      telefono: valor('telefono'),
      pais: valor('pais'),
      ciudad: valor('ciudad'),
      cargo_actual: valor('cargo_actual'),
      sector: valor('sector'),
      anios_experiencia: Number(valor('anios_experiencia')),
      nivel: valor('nivel'),
      habilidades: valor('habilidades').split(',').map((h) => h.trim()).filter(Boolean),
      linkedin_url: valor('linkedin_url') || null,
      idiomas: { ingles: valor('idioma_ingles') },
      expectativa_salarial: Number(valor('expectativa_salarial')),
      moneda: valor('moneda'),
      disponibilidad: valor('disponibilidad'),
      cv_nombre_archivo: archivo ? archivo.name : null,
      consentimiento_datos: { aceptado: true, fecha: new Date().toISOString() },
      fecha_registro: new Date().toISOString(),
    };
  }

  // Botón "Borrar formulario": además de vaciar los campos, quita errores y avisos.
  let limpiandoTrasEnvio = false;
  formulario.addEventListener('reset', () => {
    if (limpiandoTrasEnvio) return; // el envío exitoso gestiona sus propios avisos
    Object.keys(REGLAS).forEach((nombre) => mostrarError(nombre, ''));
    resumen.classList.add('hidden');
    exito.classList.add('hidden');
    listaErrores.innerHTML = '';
    // Tras vaciar, llevar el foco al primer campo.
    setTimeout(() => document.getElementById('nombre').focus(), 0);
  });

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    exito.classList.add('hidden');

    const errores = Object.keys(REGLAS)
      .map((nombre) => ({ nombre, mensaje: validarCampo(nombre) }))
      .filter((e) => e.mensaje);

    if (errores.length) {
      mostrarResumen(errores);
      return;
    }

    resumen.classList.add('hidden');
    const datos = recogerDatos();
    // Aún no hay backend: dejamos en consola lo que se enviaría.
    console.info('Postulación válida (no enviada a ningún servidor):', datos);

    const primerNombre = datos.nombre.split(/\s+/)[0];
    textoExito.textContent = `Gracias, ${primerNombre}. Recibimos tu postulación y te escribiremos a ${datos.email} cuando un consultor la revise.`;

    limpiandoTrasEnvio = true;
    formulario.reset();
    limpiandoTrasEnvio = false;
    Object.keys(REGLAS).forEach((nombre) => mostrarError(nombre, ''));
    exito.classList.remove('hidden');
    exito.focus();
    exito.scrollIntoView({ block: 'start' });
  });
})();
