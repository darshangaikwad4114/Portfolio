(function ($) {
  'use strict'; // Start of use strict

  // Debounce function to limit scroll event firing
  function debounce(func, wait) {
    let timeout;
    return function () {
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
          location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
          location.hostname === this.hostname
        ) {
          const target = $(this.hash).length
            ? $(this.hash)
            : $('[name=' + this.hash.slice(1) + ']');

          if (target.length) {
            $('html, body').animate(
              {
                scrollTop: target.offset().top - 48, // Offset for fixed header
              },
              600, // Smoother animation duration
              'easeInOutExpo'
            );
            return false;
          }
        }
      });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy with debouncing
    const debouncedScrollspy = debounce(function () {
      $('body').scrollspy({
        target: '#sideNav',
        offset: 74, // Adjusted offset for better accuracy
      });
    }, 100);

    $(window).on('scroll', debouncedScrollspy);

    // Initialize scrollspy on load
    debouncedScrollspy();

    // Add 'active' class to nav links when scrolling
    $(window)
      .on('scroll', function () {
        const scrollDistance = $(window).scrollTop();

        // For each section, check if it's in view and add 'active' class to the corresponding nav link
        $('section').each(function (i) {
          if ($(this).position().top <= scrollDistance + 100) {
            $('.navbar-nav .nav-item .nav-link').removeClass('active');
            $('.navbar-nav .nav-item .nav-link').eq(i).addClass('active');
          }
        });
      })
      .scroll();
  });

  // Lazy loading implementation
  document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    lazyImages.forEach((img) => imageObserver.observe(img));

    // Optimize scroll performance
    let scrollTimeout;
    const scrollHandler = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
          // Your scroll handling code
        }, 16); // ~60fps
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Cache DOM elements
    const $navbar = $('#sideNav');
    const $sections = $('section');

    // Use RequestAnimationFrame for smooth animations
    const animateElements = () => {
      requestAnimationFrame(() => {
        $sections.each(function () {
          const rect = this.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            this.classList.add('visible');
          }
        });
      });
    };

    window.addEventListener('scroll', animateElements, { passive: true });
  });

  // Performance optimization for animations
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reducedMotion.matches) {
    // Initialize animations
    // ...existing animation code...
  }
})(jQuery); // End of use strict
