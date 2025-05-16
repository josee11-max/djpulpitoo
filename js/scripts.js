// Estado del carrito
const cart = {
  items: []
};

// Función para añadir al carrito
function addToCart(name) {
  cart.items.push({ name });
  updateCartUI();
}

// Actualiza la UI del carrito
function updateCartUI() {
  const listEl      = document.getElementById('cart-items');
  const totalEl     = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const formEl      = document.getElementById('checkout-form');

  if (cart.items.length === 0) {
    listEl.innerHTML = '<em>No hay productos en el carrito.</em>';
    totalEl.textContent = 'Total: A convenir';
    checkoutBtn.style.display = 'none';
    formEl.style.display = 'none';
    return;
  }

  // Listado de productos (sin precios)
  listEl.innerHTML = cart.items.map((it, i) =>
    `<p>${i + 1}. ${it.name}</p>`
  ).join('');

  // Total
  totalEl.textContent = 'Total: A convenir';

  // Mostrar botón Finalizar
  checkoutBtn.style.display = 'inline-block';
}

// Mostrar formulario al hacer clic en Finalizar Compra
document.getElementById('checkout-btn').addEventListener('click', () => {
  document.getElementById('checkout-form').style.display = 'block';
  document.getElementById('checkout-btn').style.display = 'none';
});

// Interceptar el envío del formulario para redirigir a WhatsApp
document.getElementById('checkout-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // 1) Datos del comprador
  const name     = document.getElementById('customer-name').value.trim();
  const email    = document.getElementById('customer-email').value.trim();
  const location = document.getElementById('customer-location').value.trim();
  const date     = document.getElementById('event-date').value.trim(); 

  // Validación básica
  if (!name || !email || !location || !date) {
    alert('Por favor, completá todos los datos: nombre, email, ubicación y fecha del evento.');
    return;
  }

  // 2) Construir mensaje
  let message = '*Nuevo pedido DJ Pulpito*%0A';
  message += `*Nombre:* ${encodeURIComponent(name)}%0A`;
  message += `*Email:* ${encodeURIComponent(email)}%0A`;
  message += `*Ubicación del evento:* ${encodeURIComponent(location)}%0A`;
  message += `*Fecha del evento:* ${encodeURIComponent(date)}%0A%0A`;
  message += '*Detalle del Carrito:*%0A';

  cart.items.forEach((it, i) => {
    message += `${i + 1}. ${encodeURIComponent(it.name)}%0A`;
  });

  message += `%0A*Precio a convenir por este medio.*`;

  // 3) Número de WhatsApp
  const myNumber = '5493777654593';
  const waURL = `https://wa.me/${myNumber}?text=${message}`;

  // 4) Redirigir a WhatsApp
  window.location.href = waURL;
});

// CONTACTO GENERAL
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name    = encodeURIComponent(document.getElementById('contact-name').value);
  const email   = encodeURIComponent(document.getElementById('contact-email').value);
  const message = encodeURIComponent(document.getElementById('contact-message').value);

  const fullMessage = `Nuevo mensaje de contacto:%0A%0A👤 Nombre: ${name}%0A📧 Email: ${email}%0A📝 Mensaje: ${message}`;

  // Mostrar modal de éxito
  const modal = document.getElementById('success-modal');
  modal.style.display = 'block';

  const sound = document.getElementById('ding-sound');
  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    modal.style.display = 'none';
    const phoneNumber = '5493777654593';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${fullMessage}`;
    window.location.href = whatsappURL;
  }, 2000);
});
