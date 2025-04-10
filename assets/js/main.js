

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Hero Section Animation with Anime.js
   */
  function initHeroAnimation() {
    // Animate the text content
    anime({
      targets: '.hero h1',
      opacity: [0, 1],
      scale: [
        { value: 0.5, easing: 'easeOutSine', duration: 400 },
        { value: 1.1, easing: 'easeInOutQuad', duration: 300 },
        { value: 0.95, easing: 'easeInOutQuad', duration: 300 },
        { value: 1, easing: 'easeInOutQuad', duration: 300 }
      ],
      translateY: [
        { value: 50, easing: 'easeOutSine', duration: 400 },
        { value: 0, easing: 'easeInOutQuad', duration: 600 }
      ],
      easing: 'easeOutElastic(1, .8)',
      duration: 1500,
      delay: 200
    });

    anime({
      targets: '.hero p',
      opacity: [0, 1],
      scale: [
        { value: 0.5, easing: 'easeOutSine', duration: 400 },
        { value: 1.1, easing: 'easeInOutQuad', duration: 300 },
        { value: 0.95, easing: 'easeInOutQuad', duration: 300 },
        { value: 1, easing: 'easeInOutQuad', duration: 300 }
      ],
      translateY: [
        { value: 50, easing: 'easeOutSine', duration: 400 },
        { value: 0, easing: 'easeInOutQuad', duration: 600 }
      ],
      easing: 'easeOutElastic(1, .8)',
      duration: 1500,
      delay: 400
    });

    anime({
      targets: '.hero .btn-get-started',
      opacity: [0, 1],
      scale: [
        { value: 0.5, easing: 'easeOutSine', duration: 400 },
        { value: 1.1, easing: 'easeInOutQuad', duration: 300 },
        { value: 0.95, easing: 'easeInOutQuad', duration: 300 },
        { value: 1, easing: 'easeInOutQuad', duration: 300 }
      ],
      translateY: [
        { value: 50, easing: 'easeOutSine', duration: 400 },
        { value: 0, easing: 'easeInOutQuad', duration: 600 }
      ],
      easing: 'easeOutElastic(1, .8)',
      duration: 1500,
      delay: 600
    });

    // Animate the terminal window
    anime({
      targets: '.terminal-window',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: 200
    });

    // Typing animation for terminal text
    const terminalText = document.querySelector('.terminal-text');
    const textToType = 'Kirubel@portfolio:~$ whoami\nSoftware Developer';
    terminalText.textContent = ''; // Start empty

    anime({
      targets: terminalText,
      duration: 3000,
      easing: 'linear',
      delay: 1200, // Start after terminal fades in
      update: function(anim) {
        const progress = Math.round(anim.progress * textToType.length / 100);
        terminalText.textContent = textToType.substring(0, progress);
      }
    });
  }

  window.addEventListener('load', initHeroAnimation);

  /**
 * Stats Section Animation with Anime.js
 */
function initStatsAnimation() {
  // Animate the terminal window
  anime({
    targets: '.stats .terminal-stats',
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 1000,
    easing: 'easeOutQuad',
    delay: 200
  });

  // Sync terminal stats with PureCounter
  const statsValues = document.querySelectorAll('.stats-value');
  const counters = document.querySelectorAll('.stats-counter');
  
  counters.forEach((counter, index) => {
    counter.addEventListener('purecounter-updated', () => {
      const value = counter.textContent;
      anime({
        targets: statsValues[index],
        innerHTML: [statsValues[index].textContent, value],
        easing: 'easeOutQuad',
        duration: 500,
        round: 1 // Ensure whole numbers
      });
    });
  });

  // Add glitch effect to counters on hover
  document.querySelectorAll('.stats-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const counter = item.querySelector('.stats-counter');
      counter.classList.add('glitch');
      setTimeout(() => counter.classList.remove('glitch'), 300);
    });
  });
}

window.addEventListener('load', initStatsAnimation);
/**
 * Services Section Animation with Anime.js
 */
function initServicesAnimation() {
  document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Ripple effect on icon
      anime({
        targets: item.querySelector('i'),
        scale: [1, 1.2, 1],
        duration: 600,
        easing: 'easeInOutQuad'
      });

      // Typing effect for service-code
      const codeElement = item.querySelector('.service-code pre');
      const codeText = codeElement.textContent;
      codeElement.textContent = ''; // Clear initially

      anime({
        targets: codeElement,
        duration: codeText.length * 50, // 50ms per character
        easing: 'linear',
        update: function(anim) {
          const progress = Math.round(anim.progress * codeText.length / 100);
          codeElement.textContent = codeText.substring(0, progress);
        }
      });
    });

    // Reset on mouse leave
    item.addEventListener('mouseleave', () => {
      const codeElement = item.querySelector('.service-code pre');
      codeElement.textContent = codeElement.textContent; // Keep final text
    });
  });
}

window.addEventListener('load', initServicesAnimation);

/**
 * Features Section Animation with Anime.js
 */
function initFeaturesAnimation() {
  document.querySelectorAll('.features-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Pulse animation for icon
      anime({
        targets: item.querySelector('i'),
        scale: [1, 1.2, 1],
        duration: 600,
        easing: 'easeInOutQuad'
      });

      // Fade-in animation for description
      const descElement = item.querySelector('.feature-desc');
      anime({
        targets: descElement,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 300,
        easing: 'easeOutQuad'
      });
    });

    item.addEventListener('mouseleave', () => {
      // Reset description position
      const descElement = item.querySelector('.feature-desc');
      anime({
        targets: descElement,
        opacity: [1, 0],
        translateY: [0, 20],
        duration: 300,
        easing: 'easeInQuad'
      });
    });
  });
}

window.addEventListener('load', initFeaturesAnimation);
/**
 * Portfolio Section Animation with Anime.js
 */
function initPortfolioAnimation() {
  document.querySelectorAll('.portfolio-content').forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Glitch effect for image
      anime({
        targets: item.querySelector('img'),
        translateX: [
          { value: 5, duration: 50 },
          { value: -5, duration: 50 },
          { value: 3, duration: 50 },
          { value: 0, duration: 50 }
        ],
        easing: 'easeInOutSine',
        duration: 200
      });

      // Typing effect for portfolio-code
      const codeElement = item.querySelector('.portfolio-code pre');
      const codeText = codeElement.textContent;
      codeElement.textContent = ''; // Clear initially

      anime({
        targets: codeElement,
        duration: codeText.length * 50, // 50ms per character
        easing: 'linear',
        update: function(anim) {
          const progress = Math.round(anim.progress * codeText.length / 100);
          codeElement.textContent = codeText.substring(0, progress);
        }
      });
    });

    // Reset on mouse leave
    item.addEventListener('mouseleave', () => {
      const codeElement = item.querySelector('.portfolio-code pre');
      codeElement.textContent = codeElement.textContent; // Keep final text
    });
  });
}

window.addEventListener('load', initPortfolioAnimation);
/**
 * Contact Section Animation with Anime.js
 */
function initContactAnimation() {
  // Animate form inputs on focus
  document.querySelectorAll('.php-email-form .form-control').forEach(input => {
    input.addEventListener('focus', () => {
      anime({
        targets: input,
        scale: [1, 1.02],
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
    input.addEventListener('blur', () => {
      anime({
        targets: input,
        scale: [1.02, 1],
        duration: 300,
        easing: 'easeInQuad'
      });
    });
  });

  // Animate form submission
  const form = document.querySelector('.php-email-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Remove this if your form submits via PHP
    form.classList.add('loading');

    // Simulate processing with terminal-style dots
    const loadingText = form.querySelector('.loading');
    let dots = 0;
    const dotAnimation = setInterval(() => {
      dots = (dots + 1) % 4;
      loadingText.textContent = `Processing${'.'.repeat(dots)}`;
    }, 300);

    // Simulate success after 2 seconds (replace with actual form logic)
    setTimeout(() => {
      clearInterval(dotAnimation);
      form.classList.remove('loading');
      form.classList.add('sent');
      setTimeout(() => form.classList.remove('sent'), 3000); // Hide message after 3s
    }, 2000);
  });
}

window.addEventListener('load', initContactAnimation);
/**
 * Header Animation with Anime.js
 */
function initHeaderAnimation() {
  // Animate nav links on hover
  document.querySelectorAll('.navmenu .nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      anime({
        targets: link,
        scale: [1, 1.05],
        duration: 300,
        easing: 'easeOutQuad',
        color: '#0386aa' // Your accent color
      });
    });
    link.addEventListener('mouseleave', () => {
      anime({
        targets: link,
        scale: [1.05, 1],
        duration: 300,
        easing: 'easeInQuad',
        color: getComputedStyle(link).color // Reset to original
      });
    });
  });

  // Mobile nav toggle animation
  const toggle = document.querySelector('.mobile-nav-toggle');
  const navmenu = document.querySelector('#navmenu');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navmenu.classList.toggle('active');

    if (navmenu.classList.contains('active')) {
      anime({
        targets: navmenu,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 300,
        easing: 'easeOutQuad'
      });
    } else {
      anime({
        targets: navmenu,
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => navmenu.style.display = 'none' // Reset display after animation
      });
    }
  });

  // Ensure navmenu is hidden on load for mobile
  if (window.innerWidth <= 991) {
    navmenu.style.display = 'none';
  }
}

window.addEventListener('load', initHeaderAnimation);

/**
 * Footer Animation and Dynamic Year with Anime.js
 */
function initFooterAnimation() {
  // Set current year
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Animate terminal text on load
  const terminalText = document.querySelector('.terminal-text');
  const prompt = terminalText.querySelector('.prompt');
  const command = terminalText.querySelector('.command');
  const output = terminalText.querySelector('.output');

  anime.timeline({
    easing: 'easeOutQuad'
  })
    .add({
      targets: prompt,
      opacity: [0, 1],
      duration: 300
    })
    .add({
      targets: command,
      opacity: [0, 1],
      duration: 300
    }, '-=100')
    .add({
      targets: output,
      opacity: [0, 1],
      duration: 500
    }, '-=100');

  // Animate social links on hover
  document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      anime({
        targets: link,
        scale: [1, 1.1],
        rotate: '5deg',
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
    link.addEventListener('mouseleave', () => {
      anime({
        targets: link,
        scale: [1.1, 1],
        rotate: '0deg',
        duration: 300,
        easing: 'easeInQuad'
      });
    });
  });

  // Animate credit link on hover
  const creditLink = document.querySelector('.credits .credit-link');
  creditLink.addEventListener('mouseenter', () => {
    anime({
      targets: creditLink,
      translateX: [0, 3, -3, 2, 0], // Subtle glitch
      duration: 400,
      easing: 'easeInOutSine',
      color: '#ffffff'
    });
  });
  creditLink.addEventListener('mouseleave', () => {
    anime({
      targets: creditLink,
      color: '#0386aa' // Reset to accent color
    });
  });
}

window.addEventListener('load', initFooterAnimation);

})();

