const products = [
  {
    id: 1,
    name: "Product 1",
    price: 199.99,
    imageUrl: "assets/hero-img3.jpg",
    subtitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatibus maxime unde tempora sit libero atque delectus dolor illo neque?",
  },
  {
    id: 2,
    name: "Product 2",
    price: 149.99,
    imageUrl: "assets/hero-img4.png",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, odio?",
  },
  {
    id: 3,
    name: "Product 3",
    price: 99.99,
    imageUrl: "assets/hero-img5.jpg",
    subtitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorum!",
  },
  {
    id: 4,
    name: "Product 3",
    price: 99.99,
    imageUrl: "assets/hero-img5.jpg",
    subtitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorum!",
  },
  {
    id: 5,
    name: "Product 3",
    price: 99.99,
    imageUrl: "assets/hero-img5.jpg",
    subtitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorum!",
  },
  {
    id: 6,
    name: "Product 3",
    price: 99.99,
    imageUrl: "assets/hero-img5.jpg",
    subtitle:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorum!",
  },
];

let cart = []; // Array to store cart items
const productContainer = document.querySelector(".product-container");
const cartCount = document.querySelector(".product-count");
const cartModal = document.querySelector(".cart-modal");
const closeModal = document.querySelector(".close-modal");
const cartItemsContainer = document.querySelector(".cart-items-container");
const totalPriceElement = document.getElementById("total-price");
const checkoutButton = document.querySelector(".checkout-btn");
const diccountInput = document.querySelector(".discount-input");
const diccountBtn = document.querySelector(".discount-btn");
const discountAmount = document.querySelector(".discount");
const subtotal = document.querySelector(".subtotal");
let discountApplied = true;
let discountTxt;

// Open the cart modal
document.querySelector(".cart").addEventListener("click", () => {
  cartModal.style.display = "flex"; // Show modal
  renderCartItems(); // Render cart items
});

// Close the cart modal
closeModal.addEventListener("click", () => {
  cartModal.style.display = "none"; // Hide modal
});

// Function to add product to cart
function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1; // Increment quantity if product already in cart
  } else {
    cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
  }

  updateCartCount();
  renderCartItems();
}

// Function to update cart item count
// Function to update cart item count
function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (totalItems > 0) {
    cartCount.style.display = "flex"; // Ensure the count is visible
    cartCount.textContent = totalItems; // Update the cart count
  } else {
    cartCount.style.display = "none"; // Hide the count if cart is empty
  }
}

// Function to render cart items inside the modal
function renderCartItems() {
  cartItemsContainer.innerHTML = ""; // Clear current cart items
  let totalPrice = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <div class="id-img">
        <p>${item.id}</p>
        <div class="cart-item-img-container">
          <img src="${item.imageUrl}" alt="${
      item.name
    }" class="cart-item-img" />
        </div>
      </div>
      <p>${item.name}</p>
      <p>Price: $${item.price.toFixed(2)}</p>
      <p>Quantity: ${item.quantity}</p>
      <div class="cart-item-btns">
        <button class="decrement">-</button>
        <button class="increment">+</button>
        <button class="delete">&times;</button>
      </div>
    `;

    // Update total price
    totalPrice += item.price * item.quantity;

    // Add event listeners to increment/decrement buttons
    itemElement.querySelector(".increment").addEventListener("click", () => {
      updateItemQuantity(item.id, 1);
      if (discountTxt) {
        const discountText1 = "ostad10";
        const discountText2 = "ostad5";

        if (discountTxt === discountText1) {
          const totalPrice = parseFloat(totalPriceElement.textContent);
          const discountPrice = totalPrice - totalPrice * 0.1;
          totalPriceElement.textContent = discountPrice.toFixed(2);
          discountTxt = discountText1;
          discountAmount.textContent = parseFloat(totalPrice - discountPrice);
          // diccountInput.value = "";
        } else if (discountTxt === discountText2) {
          const totalPrice = parseFloat(totalPriceElement.textContent);
          const discountPrice = totalPrice - totalPrice * 0.05;
          totalPriceElement.textContent = discountPrice.toFixed(2);
          // diccountInput.value = "";
          discountTxt = discountText2;
          discountAmount.textContent = parseFloat(totalPrice - discountPrice);
        }
      }
    });
    itemElement.querySelector(".decrement").addEventListener("click", () => {
      updateItemQuantity(item.id, -1);
      if (discountTxt) {
        const discountText1 = "ostad10";
        const discountText2 = "ostad5";

        if (discountTxt === discountText1) {
          const totalPrice = parseFloat(totalPriceElement.textContent);
          const discountPrice = totalPrice - totalPrice * 0.1;
          totalPriceElement.textContent = discountPrice.toFixed(2);
          subtotal.textContent = parseFloat(totalPrice + discountAmount);
          discountTxt = discountText1;
          // diccountInput.value = "";
        } else if (discountTxt === discountText2) {
          const totalPrice = parseFloat(totalPriceElement.textContent);
          const discountPrice = totalPrice - totalPrice * 0.05;
          totalPriceElement.textContent = discountPrice.toFixed(2);
          // diccountInput.value = "";
          discountTxt = discountText2;
          subtotal.textContent = parseFloat(totalPrice + discountAmount);
        }
      }
    });
    itemElement.querySelector(".delete").addEventListener("click", () => {
      removeItemFromCart(item.id);
    });

    cartItemsContainer.appendChild(itemElement);
  });

  totalPriceElement.textContent = `${totalPrice.toFixed(2)}`;
}

// Function to update item quantity
function updateItemQuantity(id, change) {
  const item = cart.find((product) => product.id === id);
  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      cart = cart.filter((product) => product.id !== id); // Remove item if quantity is 0 or less
    }
    renderCartItems();
    updateCartCount();
  }
}

// Function to remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((product) => product.id !== id);
  renderCartItems();
  updateCartCount();
}

// Render the products list
products.forEach((product) => {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  productElement.innerHTML = `
    <div class="product-img-container">
      <img src="${product.imageUrl}" alt="${
    product.name
  }" class="product-img" />
    </div>
    <div class="product-details">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
      <p class="product-subtitle">${product.subtitle}</p>
      <button class="product-btn" data-id="${product.id}">Add to Cart</button>
    </div>
  `;

  const addButton = productElement.querySelector(".product-btn");
  addButton.addEventListener("click", () => addToCart(product)); // Add event listener

  productContainer.appendChild(productElement);
});

// Checkout button logic
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add some products!");
    return;
  }
  alert("Thank you for your purchase!");
  cart = []; // Clear the cart
  updateCartCount();
  renderCartItems();
  cartModal.style.display = "none"; // Close modal
});

const calculateDiscount = () => {
  const discountText1 = "ostad10";
  const discountText2 = "ostad5";
  const discountInputValue = diccountInput.value.toLowerCase();

  if (discountApplied) {
    if (discountInputValue === discountText1) {
      const totalPrice = parseFloat(totalPriceElement.textContent);
      const discountPrice = totalPrice - totalPrice * 0.1;
      totalPriceElement.textContent = discountPrice.toFixed(2);
      alert("You have received a 10% discount!");
      discountTxt = discountText1;
      diccountInput.value = "";
      discountApplied = false;
      discountAmount.textContent = parseFloat(totalPrice - discountPrice);
      subtotal.textContent = parseFloat(totalPrice + discountAmount);
    } else if (discountInputValue === discountText2) {
      const totalPrice = parseFloat(totalPriceElement.textContent);
      const discountPrice = totalPrice - totalPrice * 0.05;
      totalPriceElement.textContent = discountPrice.toFixed(2);
      alert("You have received a 5% discount!");
      diccountInput.value = "";
      discountTxt = discountText2;
      discountApplied = false;
      discountAmount.textContent = parseFloat(totalPrice - discountPrice);
      subtotal.textContent = parseFloat(totalPrice + discountAmount);
    } else {
      alert("Invalid discount code");
    }
  } else {
    alert("You have already applied a discount code");
    diccountInput.value = "";
  }
};

diccountBtn.addEventListener("click", () => {
  calculateDiscount();
});
