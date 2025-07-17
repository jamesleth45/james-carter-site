document.addEventListener("DOMContentLoaded", function () {
  const removeByHref = ["webflow.shared"];
  const removeBySrc = ["jquery", "webflow."];

  document.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
    if (removeByHref.some(substr => link.href.includes(substr))) link.remove();
  });

  document.querySelectorAll("script[src]").forEach((script) => {
    if (removeBySrc.some(substr => script.src.includes(substr))) script.remove();
  });
});
