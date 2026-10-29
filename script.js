document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-category]').forEach(product => {
      const filter = button.dataset.filter;
      product.hidden = filter !== 'all' && product.dataset.category !== filter && product.dataset.kind !== filter;
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const beerData = JSON.parse(document.querySelector('#beer-data').textContent);
const beerDialog = document.querySelector('#beer-dialog');
let beerTrigger;
const formatNumber = value => new Intl.NumberFormat('uk-UA').format(value);

document.querySelectorAll('[data-beer]').forEach(button => {
  button.addEventListener('click', () => {
    const beer = beerData.find(item => item.id === button.dataset.beer);
    if (!beer) return;
    beerTrigger = button;
    document.querySelector('#beer-title').textContent = beer.name;
    document.querySelector('#beer-style').textContent = `${beer.style} · Розливне пиво`;
    document.querySelector('#beer-price').textContent = `${formatNumber(beer.price)} грн / 1 л`;
    document.querySelector('#beer-abv').textContent = `${formatNumber(beer.abv)}% об.`;
    document.querySelector('#beer-ibu').textContent = `${beer.ibu} IBU`;
    document.querySelector('#beer-density').textContent = `${formatNumber(beer.density)}%`;
    document.querySelector('#beer-description').textContent = beer.description;
    document.querySelector('#beer-dialog-art').replaceChildren(button.querySelector('.catalog-art').cloneNode(true));
    beerDialog.showModal();
    beerDialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
  });
});

beerDialog.querySelector('.dialog-close').addEventListener('click', () => beerDialog.close());
beerDialog.addEventListener('click', event => {
  if (event.target !== beerDialog) return;
  const box = beerDialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) beerDialog.close();
});
beerDialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  beerTrigger?.focus({ preventScroll: true });
});

// Reveal only when supported; content remains visible without JavaScript.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.benefits article, .product, .steps article, .review-inner').forEach((item, index) => {
    item.classList.add('reveal');
    item.style.setProperty('--delay', `${index % 3 * 70}ms`);
    observer.observe(item);
  });
}
