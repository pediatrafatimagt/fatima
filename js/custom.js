// custom.js (vanilla)
document.addEventListener("DOMContentLoaded", () => {
  // Collapse navbar when a link is clicked
  const collapseEl = document.querySelector(".navbar-collapse");
  if (collapseEl) {
    document.querySelectorAll(".navbar-collapse a").forEach(a => {
      a.addEventListener("click", () => {
        if (typeof bootstrap !== "undefined" && bootstrap.Collapse) {
          // Bootstrap 5 collapse API
          const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) || 
                             new bootstrap.Collapse(collapseEl, { toggle: false });
          bsCollapse.hide();
        } else {
          // fallback: hide manually
          collapseEl.classList.remove("show");
          collapseEl.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Smooth scroll for .smoothscroll links
  document.querySelectorAll(".smoothscroll").forEach(link => {
    link.addEventListener("click", (e) => {
      const targetSelector = link.getAttribute("href");
      if (!targetSelector || !targetSelector.startsWith("#")) return;
      const target = document.querySelector(targetSelector);
      if (!target) return;

      e.preventDefault();
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
      const scrollTo = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    });
  });

  // Update the current year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
