// click-scroll.js
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-item .nav-link");
  const sections = [];

  navLinks.forEach((link, index) => {
    const value = link.dataset.scroll; // assumes data-scroll="1" etc.
    const section = document.getElementById("section_" + value);
    if (section) {
      sections.push({ section, index });

      // Click scroll behavior
      link.addEventListener("click", e => {
        e.preventDefault();
        const offsetClick = section.offsetTop - 94;
        window.scrollTo({ top: offsetClick, behavior: "smooth" });
        setActiveLink(index);
      });
    }
  });

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 95;
    for (let { section, index } of sections) {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        setActiveLink(index);
      }
    }
  });

  function setActiveLink(index) {
    navLinks.forEach(link => {
      link.classList.remove("active");
      link.classList.add("inactive");
    });
    navLinks[index].classList.add("active");
    navLinks[index].classList.remove("inactive");
  }

  // Initialize first link as active
  if (navLinks.length > 0) setActiveLink(0);
});
