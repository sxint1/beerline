// Add the real phone number in international format, for example +380XXXXXXXXX.
const CONTACT_PHONE = '+380123456789';

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

document.querySelector('[data-contact]').addEventListener('click', () => {
  if (CONTACT_PHONE) {
    window.location.href = `tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`;
    return;
  }
  document.querySelector('#contact-status').textContent = 'Номер телефону ще не додано. Незабаром тут можна буде зателефонувати до beerline.';
});

document.querySelector('#year').textContent = new Date().getFullYear();
