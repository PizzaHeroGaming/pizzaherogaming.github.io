// Pizza Hero Gaming — minimal interactivity

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal-on-scroll for sections and cards
const revealTargets = document.querySelectorAll('.section, .game-card, .hero-stats');
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => io.observe(el));

// Smooth nav active-state highlighting
const navLinks = document.querySelectorAll('.nav-links a');
const sections = ['games', 'app', 'about', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const onScroll = () => {
  const scrollY = window.scrollY + 140;
  let activeId = null;
  for (const section of sections) {
    if (section.offsetTop <= scrollY) activeId = section.id;
  }
  navLinks.forEach(link => {
    const matches = link.getAttribute('href') === `#${activeId}`;
    link.style.color = matches ? 'var(--text)' : '';
  });
};
window.addEventListener('scroll', onScroll, { passive: true });

// Parallax wobble for hero floating emoji
const floats = document.querySelectorAll('.float');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  floats.forEach((el, i) => {
    const depth = (i + 1) * 0.4;
    el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
}, { passive: true });
