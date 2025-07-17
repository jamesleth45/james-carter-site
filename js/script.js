function loadScript(src) {
  const s = document.createElement('script');
  s.src = src;
  s.defer = true;
  document.body.appendChild(s);
}

// Use full CDN paths here:
const cdn = "https://cdn.jamescarter.eu/js/";

loadScript(`${cdn}core.js`);
loadScript(`${cdn}ui.js`);
loadScript(`${cdn}animations.js`);
