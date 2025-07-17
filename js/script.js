// script.js – master loader

function loadScript(src) {
  const s = document.createElement('script');
  s.src = src;
  s.defer = true;
  document.body.appendChild(s);
}

// Load modules
loadScript('js/core.js');
loadScript('js/ui.js');
loadScript('js/animations.js');
