// click-scroll.js (vanilla, defensive)
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-item .nav-link"));
  if (!navLinks.length) return;

  // Build array of {link, targetEl}
  const items = navLinks.map(link => {
    // Prefer data-scroll attribute, fallback to href (#id)
    const ds = link.dataset && link.dataset.scroll;
    const href = link.getAttribute("href") || "";
    let targetEl = null;

    if (ds) {
      targetEl = document.getElementById("section_" + ds);
    } else if (href.startsWith("#")) {
      targetEl = document.querySelector(href);
    }
    return { link, targetEl };
  });

  function setActive(index) {
    navLinks.forEach((lnk, i) => {
      lnk.classList.toggle("active", i === index);
      lnk.classList.toggle("inactive", i !== index);
    });
  }

  // Click handlers
  items.forEach(({ link, targetEl }, index) => {
    if (!targetEl) return;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const headerH = document.querySelector(".navbar")?.offsetHeight || 0;
      const top = targetEl.getBoundingClientRect().top + window.scrollY - headerH - 6; // small offset
      window.scrollTo({ top, behavior: "smooth" });
      setActive(index);
    });
  });

  // Throttled scroll handler using requestAnimationFrame
  let ticking = false;
  function updateOnScroll() {
    const scrollPos = window.scrollY + (document.querySelector(".navbar")?.offsetHeight || 0) + 10;
    for (let i = 0; i < items.length; i++) {
      const el = items[i].targetEl;
      if (!el) continue;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        setActive(i);
        break;
      }
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateOnScroll);
    }
  });

  // initialize
  setActive(0);
});
