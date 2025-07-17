window.addEventListener("load", function () {
  const removeByHref = ["webflow.shared"];
  const removeBySrc = ["jquery", "webflow."];

  // 1. Remove Webflow stylesheets
  document.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
    if (removeByHref.some(substr => link.href.includes(substr))) link.remove();
  });

  // 2. Remove Webflow scripts
  document.querySelectorAll("script[src]").forEach((script) => {
    if (removeBySrc.some(substr => script.src.includes(substr))) script.remove();
  });

  // 3. Remove empty or useless <script> tags
  document.querySelectorAll("script").forEach((script) => {
    const isEmpty = !script.src && script.textContent.trim() === "";
    const isWebflowInjected = script.innerHTML.includes("Webflow"); // optional catch
    if (isEmpty || isWebflowInjected) script.remove();
  });

  // 4. Remove Webflow's injected <style> tag like `.wf-force-outline-none`
  document.querySelectorAll("style").forEach((style) => {
    if (style.textContent.includes(".wf-force-outline-none")) style.remove();
  });

  // 5. Remove Webflow HTML comments (like the green one)
  const commentNodeIterator = document.createNodeIterator(
    document,
    NodeFilter.SHOW_COMMENT,
    {
      acceptNode: function (node) {
        return (
          node.nodeValue.includes("This site was created in Webflow") ||
          node.nodeValue.includes("Last Published")
        )
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }
  );

  let currentNode;
  while ((currentNode = commentNodeIterator.nextNode())) {
    currentNode.parentNode.removeChild(currentNode);
  }
});
