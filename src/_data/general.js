const path = require('path');

function load(name) {
  return require(path.join(__dirname, name));
}

module.exports = Object.assign(
  {},
  load('gral_identidad.json'),
  load('gral_hero.json'),
  load('gral_stats.json'),
  load('gral_proyectos.json'),
  load('gral_valoraciones.json'),
  load('gral_acerca.json'),
  load('gral_proceso.json'),
  load('gral_contacto.json'),
  load('gral_footer.json')
);
