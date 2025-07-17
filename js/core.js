window.addEventListener("load", function () {
  const html = document.documentElement;
  html.removeAttribute("data-wf-domain");
  html.removeAttribute("data-wf-page");
  html.removeAttribute("data-wf-site");
  html.classList.remove("w-mod-js");
  html.setAttribute("lang", "en");
  html.setAttribute("dir", "ltr");

  document.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
    if (link.href.includes("webflow.shared")) link.remove();
  });

  document.querySelectorAll("script[src]").forEach((script) => {
    const src = script.src;
    if (src.includes("jquery") || src.includes("webflow.")) script.remove();
  });

  document.querySelectorAll("script").forEach((script) => {
    if (!script.src && script.textContent.trim() === "") script.remove();
  });

  document.querySelectorAll("style").forEach((style) => {
    if (style.textContent.includes(".wf-force-outline-none")) style.remove();
  });

  const commentNodeIterator = document.createNodeIterator(
    document,
    NodeFilter.SHOW_COMMENT,
    {
      acceptNode: (node) => (
        node.nodeValue.includes("This site was created in Webflow") ||
        node.nodeValue.includes("Last Published")
      )
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
    }
  );

  let currentNode;
  while ((currentNode = commentNodeIterator.nextNode())) {
    currentNode.parentNode.removeChild(currentNode);
  }
});