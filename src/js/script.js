(function ($) {
  "use strict"; // Start of use strict

  // Debounce function to limit scroll event firing
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  $(document).ready(function () {
    // Smooth scrolling with improved performance
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
                scrollTop: target.offset().top - 48, // Offset for fixed header
              },
              600, // Smoother animation duration
              "easeInOutExpo"
            );
            return false;
          }
        }
      });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").on('click', function () {
      $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy with debouncing
    const debouncedScrollspy = debounce(function() {
      $("body").scrollspy({
        target: "#sideNav",
        offset: 74 // Adjusted offset for better accuracy
      });
    }, 100);

    $(window).on('scroll', debouncedScrollspy);
    
    // Initialize scrollspy on load
    debouncedScrollspy();

    // Add 'active' class to nav links when scrolling
    $(window).on('scroll', function() {
      const scrollDistance = $(window).scrollTop();

      // For each section, check if it's in view and add 'active' class to the corresponding nav link
      $('section').each(function(i) {
        if ($(this).position().top <= scrollDistance + 100) {
          $('.navbar-nav .nav-item .nav-link').removeClass('active');
          $('.navbar-nav .nav-item .nav-link').eq(i).addClass('active');
        }
      });
    }).scroll();
  });

})(jQuery); // End of use strict
