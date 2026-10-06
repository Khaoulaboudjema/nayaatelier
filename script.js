// Navigation Mobile
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('#main-nav');
  
    if (burger && nav) {
      burger.addEventListener('click', () => {
        const isOpen = nav.getAttribute('data-open') === 'true';
        nav.setAttribute('data-open', !isOpen);
        burger.setAttribute('aria-expanded', !isOpen);
      });
    }
  
    // Smooth Scroll pour liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          if (nav) nav.removeAttribute('data-open');
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // Validation Formulaire Contact Native
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
  
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (contactForm.checkValidity()) {
          formFeedback.style.color = '#A45A6B';
          formFeedback.style.marginTop = '1rem';
          formFeedback.textContent = 'Merci ! Votre message a été envoyé avec succès. Nous vous recontacterons très vite.';
          contactForm.reset();
        } else {
          formFeedback.style.color = '#c0392b';
          formFeedback.style.marginTop = '1rem';
          formFeedback.textContent = 'Veuillez remplir correctement tous les champs obligatoires.';
        }
      });
    }
  });
  
  /* ==================================================
   CONFIGURABLE CAL.COM INTEGRATION
   ================================================== */
/**
 * ATELIER Naya — Script d'interaction & d'intégration Cal.com
 */

document.addEventListener('DOMContentLoaded', () => {
    // Config
    const CAL_CONFIG = {
      calLink: 'atelier-seve/soin-sur-mesure',
      theme: 'light'
    };
  
    /* ==========================================================================
       1. INITIALISATION CAL.COM EMBED
       ========================================================================== */
    if (window.Cal) {
      window.Cal('init', { origin: 'https://cal.com' });
  
      window.Cal('inline', {
        elementOrSelector: '#my-cal-inline',
        calLink: CAL_CONFIG.calLink,
        config: {
          theme: CAL_CONFIG.theme,
          layout: 'month_view'
        }
      });
  
      window.Cal('ui', {
        theme: CAL_CONFIG.theme,
        styles: {
          branding: {
            brandColor: '#560018'
          }
        },
        hideEventTypeDetails: false,
        layout: 'month_view'
      });
    }
  
    /* ==========================================================================
       2. NAVIGATION & HEADER SCROLL
       ========================================================================== */
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
  
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
  
    if (navToggle && navList) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('nav__list--active');
      });
  
      // Fermeture du menu mobile lors du clic sur un lien
      navList.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
          navList.classList.remove('nav__list--active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  
    /* ==========================================================================
       3. PARALLAX SUBTIL SUR ÉLÉMENTS FLOTTANTS (DESKTOP ONLY)
       ========================================================================== */
    const floatElements = document.querySelectorAll('.float-element');
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
    if (window.innerWidth > 1024 && !isReducedMotion) {
      window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
  
        floatElements.forEach((el, index) => {
          const depth = (index + 1) * 8;
          const moveX = mouseX * depth;
          const moveY = mouseY * depth;
          el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
      }, { passive: true });
    }
  
    /* ==========================================================================
       4. CURSEUR PERSONNALISÉ ELEGANT
       ========================================================================== */
    const cursor = document.getElementById('customCursor');
    if (cursor && window.innerWidth > 1024 && !isReducedMotion) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
  
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, .soin-item');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('custom-cursor--hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('custom-cursor--hover'));
      });
    }
  
    /* ==========================================================================
       5. VALIDATION DU FORMULAIRE DE CONTACT
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
  
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        formStatus.textContent = '';
        formStatus.className = 'form-status';
  
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
  
        if (!name.value.trim()) {
          document.getElementById('nameError').textContent = 'Veuillez renseigner votre nom.';
          isValid = false;
        }
  
        if (!email.value.trim() || !validateEmail(email.value)) {
          document.getElementById('emailError').textContent = 'Veuillez renseigner une adresse e-mail valide.';
          isValid = false;
        }
  
        if (!message.value.trim()) {
          document.getElementById('messageError').textContent = 'Veuillez saisir votre message.';
          isValid = false;
        }
  
        if (isValid) {
          // Envoi simulé ou Formspree
          formStatus.textContent = 'Envoi en cours...';
          
          setTimeout(() => {
            formStatus.textContent = 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.';
            formStatus.classList.add('form-status--success');
            contactForm.reset();
          }, 1000);
        }
      });
    }
  
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  });


  