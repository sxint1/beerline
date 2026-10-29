document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-category]').forEach(product => {
      product.hidden = button.dataset.filter !== 'all' && product.dataset.category !== button.dataset.filter;
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

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
