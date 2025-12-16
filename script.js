/*************************************************************
 🔹 SCRIPT.JS
 🔹 Handles slideshow, cart, and animations for C-Block
*************************************************************/

/* ===== LANDING PAGE SLIDESHOW ===== */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // change slide every 5s
  }

  /* ===== DROP-TEXT ANIMATION ===== */
  const dropTextElements = document.querySelectorAll(".drop-text");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  dropTextElements.forEach((el) => observer.observe(el));

  /* ===== SHOPPING CART COUNTER ===== */
  const cartButtons = document.querySelectorAll(".product-card .btn");
  let cartCount = 0;

  cartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      cartCount++;
      updateCartIcon();
      // Optional: alert or toast notification
      alert("Added to cart! Total items: " + cartCount);
    });
  });

  function updateCartIcon() {
    let cartIcon = document.querySelector("#cart-count");
    if (!cartIcon) {
      // Create cart icon if it doesn't exist
      cartIcon = document.createElement("div");
      cartIcon.id = "cart-count";
      cartIcon.style.position = "fixed";
      cartIcon.style.top = "20px";
      cartIcon.style.right = "20px";
      cartIcon.style.background = "#111";
      cartIcon.style.color = "#fff";
      cartIcon.style.width = "40px";
      cartIcon.style.height = "40px";
      cartIcon.style.borderRadius = "50%";
      cartIcon.style.display = "flex";
      cartIcon.style.alignItems = "center";
      cartIcon.style.justifyContent = "center";
      cartIcon.style.fontWeight = "bold";
      cartIcon.style.fontSize = "16px";
      cartIcon.style.zIndex = "1000";
      cartIcon.style.cursor = "pointer";
      document.body.appendChild(cartIcon);

      cartIcon.addEventListener("click", () => {
        alert("Cart has " + cartCount + " items.");
      });
    }
    cartIcon.textContent = cartCount;
  }
});
// ===== Cart Counter =====
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  if(cartCount) cartCount.innerText = count;
}

// Update counter on page load
updateCartCounter();

// Update counter whenever an item is added
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const product = {
      name: card.querySelector('h3').innerText,
      price: parseFloat(card.querySelector('p').innerText.replace('$','')),
      img: card.querySelector('img').src,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    alert(`${product.name} added to cart!`);
  });
});
