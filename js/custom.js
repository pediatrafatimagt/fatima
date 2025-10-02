
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });
  
  })(window.jQuery);

// UPDATE THE YEAR
  document.getElementById('current-year').textContent = new Date().getFullYear();
    // custom.js
  document.addEventListener("DOMContentLoaded", () => {
    // Collapse navbar after clicking a link
    document.querySelectorAll(".navbar-collapse a").forEach(link => {
      link.addEventListener("click", () => {
        const collapseEl = document.querySelector(".navbar-collapse");
        const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      });
    });

    // Smooth scroll for .smoothscroll links
    document.querySelectorAll(".smoothscroll").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            const headerHeight = document.querySelector(".navbar")?.offsetHeight || 0;
            const offsetTop = targetEl.offsetTop - headerHeight;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }
        }
      });
    });
  });
