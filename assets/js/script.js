// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", function() {
  // Navigation scroll effect
  const nav = document.querySelector('.main-nav');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      // Add mobile menu functionality here
    });
  }
  
  // Initialize Swiper if element exists
  if (document.querySelector('.swiper-container')) {
    var swiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      speed: 1000,
      grabCursor: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  
  // Poetic tagline hover effect
  const poeticTagline = document.querySelector('.poetic-tagline');
  if (poeticTagline) {
    const quoteMarks = poeticTagline.querySelectorAll('.quote-mark');
    const poeticText = poeticTagline.querySelector('.poetic-text');
    
    poeticTagline.addEventListener('mouseenter', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(quoteMarks, {
          x: function(i) { return i === 0 ? -5 : 5; },
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        gsap.to(poeticText, {
          scale: 1.03,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
    
    poeticTagline.addEventListener('mouseleave', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(quoteMarks, {
          x: 0,
          opacity: 0.5,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        gsap.to(poeticText, {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
  }
  
  // SVG Morphing Animation for Creation Process
  const morphPaths = document.querySelectorAll('.morph-path');
  if (morphPaths.length > 0) {
    // Define different path shapes for morphing
    const pathShapes = [
      "M198.7,25.2c45.5-17.2,97.7-9.3,139.6,12.3s76.1,58.1,95.6,101c19.5,42.9,22.6,91.9,9.4,135.6c-13.2,43.7-42.7,82.2-81.2,105.7c-38.5,23.6-85.9,32.1-130.6,22.4C187,392.4,146,364.6,118.1,325c-27.9-39.6-41.6-89.9-32.8-135.9C94.2,143.1,125.6,100.9,167,74.6C188.1,61.2,198.7,25.2,198.7,25.2z",
      "M213.4,22.6c42.3-10.4,88.9-0.4,123.6,25.1c34.7,25.5,57.5,67.4,61.3,110.3c3.8,42.9-11.5,86.8-39.2,119.5c-27.7,32.7-67.9,54.3-110.1,60.2c-42.2,5.9-86.4-4.9-120.5-29.4C94.5,283.9,70.5,246,61,204.2c-9.5-41.8-4.6-87.6,14.7-124.4c19.3-36.9,53-64.9,91.4-72.2C182.5,4.1,213.4,22.6,213.4,22.6z",
      "M225.1,27.9c42-7,86.2,6.3,117.8,31.9c31.6,25.6,50.5,63.4,55.1,102.2c4.6,38.8-5,78.6-24.8,111.5c-19.8,32.9-49.8,59-85.4,71c-35.6,12-77,9.9-112.4-5.4C140,322.9,110.5,294.3,91.7,258c-18.8-36.3-26.8-79.9-17-119.9c9.8-40,37.4-76.4,73.7-94.8C175.1,24.4,225.1,27.9,225.1,27.9z",
      "M193.7,26.5c48.3-15.5,102.8-3.5,142.2,23.3c39.4,26.8,63.8,68.3,73.4,113c9.6,44.7,4.3,92.6-15.6,132.5c-19.9,39.9-54.5,71.8-94.9,87.6c-40.4,15.8-86.6,15.5-126.9-0.8c-40.3-16.3-74.6-48.5-93.1-87.1c-18.5-38.6-21.1-83.6-6.9-122.9c14.2-39.3,45.2-72.9,82.7-91.6C179.5,64.4,193.7,26.5,193.7,26.5z",
      "M215.8,24.8c44.2-11.8,92.5-1.5,128,24.4s60.4,66.8,68.6,110.1c8.2,43.3-1.4,89.4-24.9,125.1c-23.5,35.7-60.9,61.2-102.4,70.3c-41.5,9.1-86.9,1.8-122.9-18.8c-36-20.6-62.6-54.5-75.2-93.5c-12.6-39-11.2-82.1,4.1-119.1c15.3-37,44.4-67.9,79.5-82.9C190.5,30.1,215.8,24.8,215.8,24.8z"
    ];
    
    // Apply hover morphing effect
    morphPaths.forEach((path, index) => {
      const originalShape = path.getAttribute('d');
      const alternateShape = pathShapes[index % pathShapes.length];
      
      const processStep = path.closest('.process-step');
      if (processStep) {
        // Morph on hover
        processStep.addEventListener('mouseenter', () => {
          path.animate([
            { d: originalShape },
            { d: alternateShape }
          ], {
            duration: 1000,
            fill: 'forwards',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
          });
        });
        
        // Morph back on mouse leave
        processStep.addEventListener('mouseleave', () => {
          path.animate([
            { d: alternateShape },
            { d: originalShape }
          ], {
            duration: 1000,
            fill: 'forwards',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
          });
        });
      }
    });
  }
  
  // GSAP animations if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Video parallax effect only (removed hero content animation)
    gsap.to('#hero-video', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      scale: 1.1
    });
    
    // Luxury Essence section animations
    gsap.from('.essence-title', {
      scrollTrigger: {
        trigger: '.luxury-essence',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
    
    gsap.from('.essence-line', {
      scrollTrigger: {
        trigger: '.luxury-essence',
        start: 'top 80%'
      },
      width: 0,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out'
    });
    
    gsap.from('.gallery-item', {
      scrollTrigger: {
        trigger: '.essence-gallery',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power2.out'
    });
    
    gsap.from('.essence-description', {
      scrollTrigger: {
        trigger: '.essence-footer',
        start: 'top 90%'
      },
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
    
    gsap.from('.essence-accent', {
      scrollTrigger: {
        trigger: '.essence-footer',
        start: 'top 90%'
      },
      width: 0,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power2.out'
    });
    
    // Creation Process section animations
    if (document.querySelector('.creation-process')) {
      // Animate process header
      gsap.from('.process-title', {
        scrollTrigger: {
          trigger: '.creation-process',
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.from('.process-subtitle', {
        scrollTrigger: {
          trigger: '.creation-process',
          start: 'top 80%'
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
      });
      
      // Animate timeline line
      gsap.from('.timeline-line', {
        scrollTrigger: {
          trigger: '.process-timeline',
          start: 'top 80%'
        },
        height: 0,
        duration: 1.5,
        ease: 'power2.out'
      });
      
      // Animate process steps
      gsap.from('.process-step', {
        scrollTrigger: {
          trigger: '.process-timeline',
          start: 'top 70%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      // Animate SVG paths when they come into view
      document.querySelectorAll('.morph-path').forEach((path, index) => {
        gsap.from(path, {
          scrollTrigger: {
            trigger: path,
            start: 'top 80%'
          },
          strokeDashoffset: 1500,
          duration: 1.5,
          delay: 0.2,
          ease: 'power2.out'
        });
      });
      
      // Animate process footer
      gsap.from('.process-footer', {
        scrollTrigger: {
          trigger: '.process-footer',
          start: 'top 85%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
    
    // Collection Showcase section animations for collections.html
    if (document.querySelector('.collection-showcase')) {
      // Animate showcase header
      gsap.from('.showcase-title', {
        scrollTrigger: {
          trigger: '.collection-showcase',
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.from('.showcase-description', {
        scrollTrigger: {
          trigger: '.collection-showcase',
          start: 'top 80%'
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
      });
      
      // Animate perfume cards
      gsap.from('.perfume-card', {
        scrollTrigger: {
          trigger: '.showcase-cards',
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
    
    // Collection Preview section animations
    gsap.from('.preview-title', {
      scrollTrigger: {
        trigger: '.collection-preview',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    gsap.from('.preview-line', {
      scrollTrigger: {
        trigger: '.collection-preview',
        start: 'top 80%'
      },
      width: 0,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out'
    });
    
    // Simplified preview item animation
    gsap.from('.preview-item', {
      scrollTrigger: {
        trigger: '.preview-grid',
        start: 'top 85%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6
    });
    
    gsap.from('.preview-footer', {
      scrollTrigger: {
        trigger: '.preview-footer',
        start: 'top 90%'
      },
      y: 20,
      opacity: 0,
      duration: 0.6
    });
    
    // Footer animations
    gsap.from('.footer-logo', {
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 85%'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    gsap.from('.footer-tagline', {
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 85%'
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out'
    });
    
    gsap.from('.footer-social', {
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 85%'
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.out'
    });
    
    gsap.from('.footer-heading', {
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 85%'
      },
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    gsap.from('.footer-list li', {
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 80%'
      },
      x: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power1.out'
    });
    
    gsap.from('.newsletter-form', {
      scrollTrigger: {
        trigger: '.footer-newsletter',
        start: 'top 85%'
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.out'
    });
    
    gsap.from('.footer-bottom', {
      scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 95%'
      },
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }
  
  // Ensure video plays
  const video = document.getElementById('hero-video');
  if (video) {
    video.play().catch(function(err) {
      console.log('Video playback prevented by browser');
    });
  }
});
