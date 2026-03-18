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

const productGrid = document.querySelector('#product-grid');
const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#kategorie-filter');
const tagsSelect = document.querySelector('#tags-filter');
const applyButton = document.querySelector('#filter-apply');
const nameDatalist = document.querySelector('#produktnamen-liste');
const noResults = document.querySelector('#no-results');

if (productGrid && searchInput && categorySelect && tagsSelect && applyButton && nameDatalist && noResults) {
  const escapeHtml = (value) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  const normalize = (value) => value.toLowerCase().trim();

  const createCard = (entry) => {
    const title = escapeHtml(entry.name);
    const category = escapeHtml(entry.category);
    const source = escapeHtml(entry.source);
    return `<article class="product-card"><a class="product-media" href="${source}"><img src="../assets/products/placeholder.svg" alt="Platzhalterbild für ${title}" width="800" height="600" loading="lazy" decoding="async"></a><div class="product-body"><div class="product-tags"><span class="product-tag">${category}</span></div><h3 class="product-title">${title}</h3></div></article>`;
  };

  const updateView = (entries) => {
    productGrid.innerHTML = entries.map(createCard).join('');
    noResults.hidden = entries.length !== 0;
  };

  fetch('../produkte/produkte_extrahiert.json')
    .then((response) => response.json())
    .then((data) => {
      const products = (data.kategorien || []).flatMap((cat) =>
        (cat.produkte || []).map((product) => ({
          name: typeof product === 'string' ? product : product.name,
          category: cat.kategorie,
          source: typeof product === 'string' ? cat.url : (product.pdf || cat.url),
        }))
      );

      const categories = [...new Set(products.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'de'));
      categorySelect.innerHTML = '<option value="">Alle Kategorien</option>' + categories.map((cat) => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');

      const tags = ['LED', 'Solar', 'Warnung', 'Tunnel', 'Flughafen', 'Helikopter', 'Seezeichen'];
      tagsSelect.innerHTML = '<option value="">Alle Tags</option>' + tags.map((tag) => `<option value="${escapeHtml(tag)}">${escapeHtml(tag)}</option>`).join('');

      nameDatalist.innerHTML = products.map((item) => `<option value="${escapeHtml(item.name)}"></option>`).join('');

      const applyFilters = () => {
        const q = normalize(searchInput.value);
        const selectedCategory = normalize(categorySelect.value);
        const selectedTag = normalize(tagsSelect.value);

        const filtered = products.filter((item) => {
          const inName = !q || normalize(item.name).includes(q);
          const inCategory = !selectedCategory || normalize(item.category) === selectedCategory;
          const inTag = !selectedTag || normalize(item.name).includes(selectedTag) || normalize(item.category).includes(selectedTag);
          return inName && inCategory && inTag;
        });

        updateView(filtered);
      };

      applyButton.addEventListener('click', applyFilters);
      searchInput.addEventListener('input', applyFilters);
      categorySelect.addEventListener('change', applyFilters);
      tagsSelect.addEventListener('change', applyFilters);

      updateView(products);
    })
    .catch(() => {
      // Falls JSON nicht geladen werden kann, bleibt die statische Produktliste sichtbar.
    });
}
