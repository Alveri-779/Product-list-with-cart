import { productQuantities, addBtns, boxes } from "./script.js";

export let cart = [];


export function addToCart(productName, productPrice, productImg) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productName === cartItem.productName) {
      matchingItem = cartItem;
    }
  })

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productName: productName,
      quantity: 1,
      price: productPrice,
      image: productImg
    })
  }
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  });
  return cartQuantity;
}

export function removeFromCart(productName) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (productName !== cartItem.productName) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;
}

export function removeItem(productName) {
  let targetItem;
  
  cart.forEach((cartItem) => {
    if (productName === cartItem.productName) {
      targetItem = cartItem;
    }
  })
  if (targetItem) {
    targetItem.quantity--;
  }
  quantityCheck();
  updateCartDisplay();
}

function quantityCheck() {
  cart = cart.filter(item => item.quantity > 0);
}

function removeItemFromCart(productName) {
  cart = cart.filter(cartItem => productName !== cartItem.productName);

  updateCartDisplay();
}

export function updateCartDisplay() {
  const emptyCart = document.getElementById('emptyCart');
  const cartContainer = document.getElementById('filledCart');
  const cartQuantity = document.getElementById('quantity');

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartContainer.innerHTML = '';
    cartQuantity.textContent = 0;
  } else {
    emptyCart.style.display = "none";

    let filledCartHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((cartItem) => {
      totalItems += cartItem.quantity;
      totalPrice += cartItem.price * cartItem.quantity;

      filledCartHTML += `
        <div class="item-container">
          <div class="selected-items">
            <p id="itemName">${cartItem.productName}</p>
            <div class="item-price-container">
              <p class="item-amount" id="itemAmount">${cartItem.quantity}x</p>
              <p class="item-price" id="itemPrice">@ $${Number(cartItem.price).toFixed(2)}</p>
              <p class="item-total-price" id="itemTotal">$${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
            </div>
          </div>
          <span class="remove-item" data-product-name="${cartItem.productName}">
            <svg
              class="remove-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path
                fill="#CAAFA7"
                d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
              />
            </svg>
          </span>
        </div>
      `
    });

    filledCartHTML += `
      <div class="total-price-container">
        <p>Order Total</p>
        <h2 id="orderTotal">$${totalPrice.toFixed(2)}</h2>
      </div>
      <div class="delivery-container">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
        </span>
        <p>This is a <span class="carbon">carbon-neutral</span> delivery</p>
      </div>
      <button class="confirm-btn">Confirm Order</button>
    `;

    cartContainer.innerHTML = filledCartHTML;

    const updateOrderTotal = document.getElementById('orderTotal');
    if (updateOrderTotal) {
      updateOrderTotal.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      console.error('orderTotal element not found');
    }
    cartQuantity.textContent = totalItems;

    const removeBtn = document.querySelectorAll('.remove-item');
    removeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const productName = btn.dataset.productName;
        removeItemFromCart(productName);
        updateCartDisplay();

        const addToCartBtn = document.querySelector(`.add-to-cart-btn[data-product-name="${productName}"]`)
        const container = document.querySelector(`.js-img-container[data-product-name="${productName}"]`);
        addToCartBtn.classList.remove('btn-clicked');
        addToCartBtn.innerHTML = `
        <span class="cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
        </span> Add to Cart
        `;
        if (container) {
          container.classList.remove('selected-box');
        }
        productQuantities[productName] = 0;
        addToCartBtn.disabled = false;
      })
    });

    const confirmBtn = document.querySelector('.confirm-btn');
    const confirmationOverlay = document.getElementById('confirmationOverlay');
    const restartBtn = document.querySelector('.restartBtn');

    confirmBtn.addEventListener('click', () => {
      confirmationOverlay.style.display = "flex";
      fillConfirmationDetails();
    })

    restartBtn.addEventListener('click', () => {
      confirmationOverlay.style.display = "none";
      cart = [];
      updateCartDisplay();
      addBtns.forEach((btn) => {
        btn.classList.remove('btn-clicked');
        const productName = btn.dataset.productName;
        productQuantities[productName] = 0;
        btn.innerHTML = `
          <span class="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
          </span> Add to Cart
        `;
        btn.disabled = false;
      })
      boxes.forEach((box) => {
        box.classList.remove('selected-box');
      })
    })
  }
}

function fillConfirmationDetails() {
  const selectedItemsContainer = document.querySelector('.selected-items-container');
  let filledItemsHTML = '';

  cart.forEach((cartItem) => {
    filledItemsHTML += `
    <div class="picked-items">
      <div class="selected-items-info">
        <div class="selected-img-container">
          <img
            class="product-img"
            src="${cartItem.image}"
          />
        </div>
        <div>
          <p class="dessert-name">${cartItem.productName}</p>
          <div class="selected-items-price-info">
            <p class="dessert-quantity">${cartItem.quantity}x</p>
            <p class="dessert-price">@ $${Number(cartItem.price).toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div class="selected-items-price">
        <p>$${(cartItem.quantity * cartItem.price).toFixed(2)}</p>
      </div>
    </div>
    `;
  });

  filledItemsHTML += `
    <div class="selected-items-total">
      <p>Order Total</p>
      <h2 class="selected-item-total">$${calculateTotal()}</h2>
    </div>
  `;

  selectedItemsContainer.innerHTML = filledItemsHTML;
  document.querySelector('.selected-item-total').innerHTML = `$${calculateTotal()}`;
}

function calculateTotal() {
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity
  })

  return (totalPrice).toFixed(2);
}

