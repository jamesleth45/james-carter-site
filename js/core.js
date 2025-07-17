// Remove Webflow comment nodes
document.addEventListener("DOMContentLoaded", function () {
  const iterator = document.createNodeIterator(
    document,
    NodeFilter.SHOW_COMMENT,
    {
      acceptNode: function (node) {
        if (node.nodeValue.includes("Last Published") || node.nodeValue.includes("webflow.com")) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    }
  );

  let currentNode;
  while ((currentNode = iterator.nextNode())) {
    currentNode.parentNode.removeChild(currentNode);
  }
});
