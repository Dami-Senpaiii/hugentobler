const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const header = nav?.closest('.site-header');
const headerInner = header?.querySelector('.header-inner');

if (navToggle && nav && header && headerInner) {
  const closeNav = () => {
    nav.setAttribute('data-open', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const updateNavLayout = () => {
    header.classList.remove('nav-collapsed');
    const shouldCollapse = headerInner.scrollWidth > headerInner.clientWidth;
    header.classList.toggle('nav-collapsed', shouldCollapse);
    if (!shouldCollapse) closeNav();
  };

  navToggle.addEventListener('click', () => {
    if (!header.classList.contains('nav-collapsed')) return;
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    navToggle.setAttribute('aria-expanded', String(!open));
  });

  window.addEventListener('resize', updateNavLayout);
  window.addEventListener('load', updateNavLayout);
  updateNavLayout();
}

const wizard = document.querySelector('[data-wizard]');
if (wizard) {
  const steps = [...wizard.querySelectorAll('.wizard-step')];
  const pills = [...wizard.querySelectorAll('.stepper li')];
  let idx = 0;
  const render = () => {
    steps.forEach((el, i) => el.hidden = i !== idx);
    pills.forEach((el, i) => el.classList.toggle('active', i === idx));
  };
  wizard.addEventListener('click', (e) => {
    const next = e.target.closest('[data-next]');
    const prev = e.target.closest('[data-prev]');
    if (next && idx < steps.length - 1) { idx += 1; render(); }
    if (prev && idx > 0) { idx -= 1; render(); }
  });
  render();
}
