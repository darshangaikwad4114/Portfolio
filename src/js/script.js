(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing with improved performance
  $('a.js-scroll-trigger[href*="#"]')
    .not('[href="#"]')
    .on('click', function (e) {
      e.preventDefault();
      
      if (
        location.pathname.replace(/^\//, "") === 
          this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname
      ) {
        const target = $(this.hash).length ? 
          $(this.hash) : 
          $("[name=" + this.hash.slice(1) + "]");

        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            100, // Keep animation quick for better UX
            "easeInOutExpo"
          );
        }
      }
    });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").on('click', function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy with throttling to improve scroll performance
  let scrollTimeout;
  $(window).on('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        $("body").scrollspy({
          target: "#sideNav",
          offset: 50 // Add offset for better accuracy
        });
        scrollTimeout = null;
      }, 100);
    }
  });

})(jQuery); // End of use strict
