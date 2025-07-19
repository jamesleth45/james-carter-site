

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
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletterForm');
  const done = document.querySelector('.newsletter__done');

  if (!form || !done) return;

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






window.addEventListener('load', () => {
  const carousels = document.querySelectorAll('.js-carousel');
  carousels.forEach((carousel) => {
    const flkty = new Flickity(carousel, {
      cellAlign: 'left',
      contain: true,
      lazyLoad: true,
      wrapAround: true,
      prevNextButtons: false,
      pageDots: false,
      dragThreshold: 5,
    });

    // Force layout after a tick
    setTimeout(() => {
      flkty.resize();
    }, 100);
  });
});