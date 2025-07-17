window.addEventListener("load", function () {
  // 1. Remove data-wf-* attributes from <html>
  const html = document.documentElement;
  html.removeAttribute("data-wf-domain");
  html.removeAttribute("data-wf-page");
  html.removeAttribute("data-wf-site");

  // 2. Remove Webflow-specific class
  html.classList.remove("w-mod-js");

  // 3. Remove Webflow stylesheet
  document.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
    if (link.href.includes("webflow.shared")) link.remove();
  });

  // 4. Remove Webflow + jQuery scripts
  document.querySelectorAll("script[src]").forEach((script) => {
    const src = script.src;
    if (src.includes("jquery") || src.includes("webflow.")) script.remove();
  });

  // 5. Remove empty <script> tags
  document.querySelectorAll("script").forEach((script) => {
    if (!script.src && script.textContent.trim() === "") script.remove();
  });

  // 6. Remove Webflow-injected <style> tag
  document.querySelectorAll("style").forEach((style) => {
    if (style.textContent.includes(".wf-force-outline-none")) style.remove();
  });

  // 7. Remove Webflow-generated comments
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
