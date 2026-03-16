const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    navToggle.setAttribute('aria-expanded', String(!open));
  });
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
