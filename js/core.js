document.addEventListener("DOMContentLoaded", function () {
  const removeByHref = [
    "webflow.shared",        // Matches the CSS file
  ];

  const removeBySrc = [
    "jquery-3.5.1.min.js",   // jQuery
    "webflow."               // Webflow JS
  ];

  // Remove unwanted <link> tags
  document.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
    if (removeByHref.some(substr => link.href.includes(substr))) {
      link.remove();
    }
  });

  // Remove unwanted <script> tags
  document.querySelectorAll("script[src]").forEach((script) => {
    if (removeBySrc.some(substr => script.src.includes(substr))) {
      script.remove();
    }
  });
});
