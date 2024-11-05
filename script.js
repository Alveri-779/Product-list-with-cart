import { desserts } from "./desserts.js";
import { cart, addToCart, updateCartDisplay, removeItem } from "./cart.js";

let dessertsHTML = '';
export let productQuantities = {};

desserts.forEach((dessert) => {
  productQuantities[dessert.name] = 0;
  dessertsHTML +=`
    <div class="dessert-item js-dessert-item">
      <div class="img-container js-img-container" data-product-name="${dessert.name}">
        <picture>
          <source
            srcset="${dessert.image.mobile}"
            media="(max-width: 600px)"
          />
          <source
            srcset="${dessert.image.desktop}"
            media="(min-width: 601px)"
          />
          <img src="${dessert.image.desktop}">
        </picture>
        <button class="add-to-cart-btn" data-product-name="${dessert.name}" data-product-price="${dessert.price}" data-product-img="${dessert.image.thumbnail}">
          <span class="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
          </span> Add to Cart
        </button>
      </div>
      <div class="dessert-info">
        <p class="category">${dessert.category}</p>
        <p class="name">${dessert.name}</p>
        <p class="price js-price">$${(dessert.price).toFixed(2)}</p>
      </div>
    </div>
  `;
});

document.querySelector('.js-desserts').innerHTML = dessertsHTML;

export const addBtns = document.querySelectorAll('.add-to-cart-btn');

function btnClicked(e) {
  const productName = e.dataset.productName;
  const productPrice = e.dataset.productPrice;
  const productImg = e.dataset.productImg;
  addToCart(productName, productPrice, productImg);
  updateCartDisplay();
  if (productQuantities[productName] === undefined) {
    productQuantities[productName] = 0;
  }
  productQuantities[productName]++;
  let itemQuantity = Number(productQuantities[productName]);
  e.classList.add('btn-clicked');
  e.innerHTML = `
  <div class="btn-text">
    <span class="decrease-btn">
      <svg class="plus-minus" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
    </span>
    <p class="items-amount">${itemQuantity}</p>
    <span class="increase-btn">
      <svg class="plus-minus" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
    </span>
  </div>
  `;
  e.querySelector('.decrease-btn').addEventListener('click', () => {
    if (productQuantities[productName] > 1) {
      productQuantities[productName]--;
      removeItem(productName);
      updateCartDisplay();
      let updatedQuantity = productQuantities[productName];
      e.querySelector('.items-amount').textContent = updatedQuantity;
    } else {
      productQuantities[productName] = 0;
      removeItem(productName)
      e.classList.remove('btn-clicked');
      e.innerHTML = `
      <span class="cart-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
      </span> Add to Cart
      `;
      const container = document.querySelector(`.js-img-container[data-product-name="${productName}"]`)
      if (container) {
        container.classList.remove('selected-box');
      }
      e.disabled = false;
    }
  });

  e.querySelector('.increase-btn').addEventListener('click', () => {
    productQuantities[productName]++;
    addToCart(productName, productPrice);
    updateCartDisplay();
    let updatedQuantity = productQuantities[productName];
    e.querySelector('.items-amount').textContent = updatedQuantity;
  })
}

export const boxes = document.querySelectorAll('.js-img-container');

function boxColor(e) {
  const productName = e.dataset.productName;
  const container = document.querySelector(`.js-img-container[data-product-name="${productName}"]`);
  container.classList.add('selected-box');
}

addBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    btnClicked(btn);
    boxColor(btn);
    btn.disabled = true;
    console.log(cart)
  })
})