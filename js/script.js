//#region Cleanup
window.addEventListener("load", function () {
  const html = document.documentElement;
  html.removeAttribute("data-wf-domain");
  html.removeAttribute("data-wf-page");
  html.removeAttribute("data-wf-site");
  html.classList.remove("w-mod-js", "w-mod-touch");
  if (!html.classList.length) html.removeAttribute("class");
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
    const content = script.textContent.trim();
    if (!script.src && content === "") script.remove();
    if (content.includes("w-mod-") && content.includes("ontouchstart")) script.remove();
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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".w-embed").forEach(embed => {
    const inner = embed.firstElementChild;
    if (inner && embed.childElementCount === 1) {
      embed.replaceWith(inner);
    }
  });

  const removeCurrentClasses = () => {
    document.querySelectorAll(".w--current").forEach(el => {
      el.classList.remove("w--current");
    });
  };

  let attempts = 0;
  const interval = setInterval(() => {
    removeCurrentClasses();
    attempts++;
    if (attempts > 20) clearInterval(interval);
  }, 100);

  const observer = new MutationObserver(() => {
    removeCurrentClasses();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
//#endregion

//#region Header
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".header__link");
  const currentPath = window.location.pathname.replace(/\/$/, "");

  links.forEach(link => {
    const href = link.getAttribute("href");

    // Skip if it's empty, just a hash, or a full external link
    if (!href || href === "#" || href.startsWith("http") && !href.includes(location.hostname)) {
      return;
    }

    // Parse pathname safely
    const linkPath = new URL(href, location.origin).pathname.replace(/\/$/, "");

    if (linkPath === currentPath) {
      link.classList.add("header__link--selected");
    }
  });
});
//#endregion

//#region Footer

//#endregion

//#region Panel
document.addEventListener('click', (e) => {
  const openBtn = e.target.closest('[data-target]');
  const closeBtn = e.target.closest('.panel__close');

  if (openBtn) {
    const targetId = openBtn.getAttribute('data-target');
    const panel = document.getElementById(targetId);
    if (panel) panel.setAttribute('data-state', 'open');
  }

  if (closeBtn) {
    const panel = closeBtn.closest('.panel');
    if (panel) panel.setAttribute('data-state', 'closed');
  }

  // Click outside to close
  const openPanels = document.querySelectorAll('.panel[data-state="open"]');
  openPanels.forEach((panel) => {
    const inner = panel.querySelector('.panel__inner');
    if (inner && !inner.contains(e.target) && !e.target.closest('[data-target]')) {
      panel.setAttribute('data-state', 'closed');
    }
  });
});

// Escape key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.panel[data-state="open"]').forEach((panel) => {
      panel.setAttribute('data-state', 'closed');
    });
  }
});
//#endregion

//#region Form

//#endregion

//#region Search

//#endregion

//#region Hero

//#endregion