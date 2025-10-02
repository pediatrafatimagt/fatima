
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

// ADD A CC BUTTON FOR VIDEOS WITH TRACK


  document.querySelectorAll("video").forEach(video => {
    video.addEventListener("loadedmetadata", () => {
      const track = video.textTracks[0];
      if (!track) return;
      track.mode = "hidden"; // hide captions initially

      // Create CC button
      const button = document.createElement("button");
      button.textContent = "CC";
      button.className = "cc-button";

      // Position overlay
      video.parentElement.style.position = "relative";
      video.parentElement.appendChild(button);

      // Toggle captions
      button.addEventListener("click", () => {
        if (track.mode === "showing") {
          track.mode = "hidden";
          button.classList.remove("active");
        } else {
          track.mode = "showing";
          button.classList.add("active");
        }
      });
    });
  });