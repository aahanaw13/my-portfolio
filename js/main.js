/* ── 1. Scroll-Reveal Animation ──
   Elements with class "reveal" fade-in and slide up
   when they enter the viewport.
*/
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/* ── 2. Navbar Background on Scroll ──
   Adds a frosted-glass background to the navbar
   once the user scrolls past 60px.
*/
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 60) {
    navbar.style.backgroundColor = 'rgba(255, 248, 240, 0.92)';
    navbar.style.backdropFilter = 'blur(12px)';
    navbar.style.borderBottom = '1px solid rgba(232, 213, 192, 0.5)';
  } else {
    navbar.style.backgroundColor = 'transparent';
    navbar.style.backdropFilter = 'none';
    navbar.style.borderBottom = '1px solid transparent';
  }
});


/* ── 3. Active Nav Link Tracking ──
   Highlights the nav link corresponding to whichever
   section is currently in view.
*/
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(
          `.nav-link[data-section="${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


/* ── 4. Mobile Menu Toggle ──
   Opens/closes the hamburger menu on mobile screens.
   Uses Tailwind transform classes so the hidden state
   works even without the external CSS loaded.
*/
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  const isOpen = mobileMenu.classList.toggle('translate-y-0');
  if (isOpen) {
    mobileMenu.classList.remove('-translate-y-full');
  } else {
    mobileMenu.classList.add('-translate-y-full');
  }
});

function closeMobileMenu() {
  menuToggle.classList.remove('open');
  mobileMenu.classList.remove('translate-y-0');
  mobileMenu.classList.add('-translate-y-full');
}