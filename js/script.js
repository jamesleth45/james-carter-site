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

// #region Panel open
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const panel = document.getElementById(targetId);
      if (!panel) return;

      panel.setAttribute('data-state', 'open');
    });
  });
});
// #endregion

// #region Panel close
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const panel = e.target.closest('.panel');
    if (!panel) return;

    const inner = panel.querySelector('.panel__inner');
    const isCloseBtn = e.target.matches('.panel__close');
    const clickedOutsideInner = !inner.contains(e.target);

    if (isCloseBtn || clickedOutsideInner) {
      panel.setAttribute('data-state', 'closed');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.panel[data-state="open"]').forEach((panel) => {
        panel.setAttribute('data-state', 'closed');
      });
    }
  });
});
// #endregion

// #region panel scroll lock
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    const isAnyPanelOpen = document.querySelector('.panel[data-state="open"]');
    if (isAnyPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  });

  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['data-state'],
  });
});
// #endregion

//#region Form
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblklkpa";

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData
    });

    if (res.ok) {
      form.hidden = true;
      done.removeAttribute("hidden");
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    alert("Something went wrong. Please try again.");
  }
});
//#endregion

// #region Search input logic
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#siteSearch');
  const clearBtn = document.querySelector('.search__clear');
  const searchPanel = document.getElementById('panelSearch');

  if (!input || !clearBtn || !searchPanel) return;

  // Show/hide clear button while typing
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      clearBtn.removeAttribute('hidden');
    } else {
      clearBtn.setAttribute('hidden', '');
    }
  });

  // Clear input and refocus
  clearBtn.addEventListener('click', () => {
    input.value = '';
    input.focus();
    clearBtn.setAttribute('hidden', '');
  });

  // Watch for panel open/close
  const observer = new MutationObserver(() => {
    const isOpen = searchPanel.getAttribute('data-state') === 'open';

    if (isOpen) {
      input.focus();
    } else {
      input.value = '';
      clearBtn.setAttribute('hidden', '');
    }
  });

  observer.observe(searchPanel, {
    attributes: true,
    attributeFilter: ['data-state']
  });
});
// #endregion

//#region Hero

//#endregion