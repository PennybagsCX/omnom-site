/* ============================================
   OMNOM - Doge Eat Doge
   Custom JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     DOM References
  ------------------------------------------ */
  // Desktop nav
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  // Mobile nav
  const mobileBurgerBtn = document.getElementById('mobileBurgerBtn');
  const mobileNavLinks = document.getElementById('mobileNavLinks');
  
  // Slider
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');
  const sliderDots = document.getElementById('sliderDots');
  const dots = sliderDots ? sliderDots.querySelectorAll('.dot') : [];

  /* ------------------------------------------
     Mobile Menu Toggle (Desktop navbar)
  ------------------------------------------ */
  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      if (!navLinks.classList.contains('active')) {
        closeAllDropdowns(navLinks);
      }
    });
  }

  /* ------------------------------------------
     Mobile Menu Toggle (Mobile navbar)
  ------------------------------------------ */
  if (mobileBurgerBtn && mobileNavLinks) {
    mobileBurgerBtn.addEventListener('click', function () {
      mobileNavLinks.classList.toggle('active');
      if (!mobileNavLinks.classList.contains('active')) {
        closeAllDropdowns(mobileNavLinks);
      }
    });
  }

  /* ------------------------------------------
     Dropdown Menus
  ------------------------------------------ */
  function closeAllDropdowns(container) {
    if (!container) {
      container = document;
    }
    var toggles = container.querySelectorAll('.dropdown-toggle');
    toggles.forEach(function (toggle) {
      var parent = toggle.closest('.dropdown');
      if (parent) {
        parent.classList.remove('open');
      }
    });
  }

  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var parent = this.closest('.dropdown');
      var navContainer = this.closest('.nav-links');

      // On mobile, toggle this dropdown and close others
      if (window.innerWidth <= 991) {
        var wasOpen = parent.classList.contains('open');
        closeAllDropdowns(navContainer);
        if (!wasOpen) {
          parent.classList.add('open');
        }
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
      closeAllDropdowns(document);
    }
  });

  // Close mobile menu when clicking a non-dropdown link
  [navLinks, mobileNavLinks].forEach(function (navEl) {
    if (navEl) {
      navEl.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && !e.target.classList.contains('dropdown-toggle')) {
          if (window.innerWidth <= 991) {
            navEl.classList.remove('active');
            closeAllDropdowns(navEl);
          }
        }
      });
    }
  });

  /* ------------------------------------------
     Community Slider / Carousel
  ------------------------------------------ */
  var currentSlide = 0;
  var totalSlides = sliderTrack ? sliderTrack.children.length : 0;
  var autoPlayInterval = null;
  var autoPlayDelay = 3000; // 3 seconds

  function goToSlide(index) {
    if (!sliderTrack) return;

    // Handle wrapping
    if (index >= totalSlides) {
      index = 0;
    } else if (index < 0) {
      index = totalSlides - 1;
    }

    currentSlide = index;
    sliderTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

    // Update dots
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Arrow buttons
  if (sliderNext) {
    sliderNext.addEventListener('click', function () {
      nextSlide();
      startAutoPlay();
    });
  }

  if (sliderPrev) {
    sliderPrev.addEventListener('click', function () {
      prevSlide();
      startAutoPlay();
    });
  }

  // Dot navigation
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var index = parseInt(this.getAttribute('data-index'), 10);
      goToSlide(index);
      startAutoPlay();
    });
  });

  // Pause auto-play on hover
  var sliderEl = document.getElementById('slider');
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAutoPlay);
    sliderEl.addEventListener('mouseleave', startAutoPlay);

    // Touch support: pause on touch
    sliderEl.addEventListener('touchstart', function () {
      stopAutoPlay();
    }, { passive: true });

    sliderEl.addEventListener('touchend', function () {
      startAutoPlay();
    }, { passive: true });
  }

  // Touch swipe support for slider
  var touchStartX = 0;
  var touchEndX = 0;

  if (sliderEl) {
    sliderEl.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderEl.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAutoPlay();
      }
    }, { passive: true });
  }

  // Initialize slider
  if (totalSlides > 0) {
    goToSlide(0);
    startAutoPlay();
  }

  /* ------------------------------------------
     Fade-in Animations on Scroll
  ------------------------------------------ */
  function handleScrollAnimations() {
    var elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var isVisible = rect.top < window.innerHeight * 0.85;
      if (isVisible) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', handleScrollAnimations, { passive: true });
  handleScrollAnimations();

  /* ------------------------------------------
     Navbar Scroll Effect
  ------------------------------------------ */
  var navbar = document.getElementById('navbar');
  var minNavbar = document.getElementById('minNavbar');

  window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset;

    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (minNavbar) {
      if (currentScroll > 50) {
        minNavbar.classList.add('scrolled');
      } else {
        minNavbar.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  /* ------------------------------------------
     Close mobile menu on resize
  ------------------------------------------ */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 991) {
      if (navLinks) {
        navLinks.classList.remove('active');
      }
      if (mobileNavLinks) {
        mobileNavLinks.classList.remove('active');
      }
      closeAllDropdowns(document);
    }
  });

  /* ------------------------------------------
     Smooth scroll for anchor links
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = navbar ? navbar.offsetHeight : 0;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

})();
