import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  #modal = null;
  #modalBody = null;
  #form = null;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if(product == null || product == undefined) {
      return;
    }
    let cartItem = this.cartItems.find(cartItem =>
       cartItem.product == product);
    if(cartItem) {
      cartItem.count++;
    } else {
      cartItem = {'product': product, count: 1};
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !(this.cartItems.length);
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems
      .forEach(cartItem => totalCount += cartItem.count);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems
      .forEach(cartItem =>
         totalPrice += cartItem.count * cartItem.product.price);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`
    <form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.#modal = new Modal();
    this.#modal.setTitle(`Your order`);
    this.#modal.setBody(this.cartTemplate());
    this.#modal.open();
    this.#modalBody = document.querySelector('.modal');
    
    this.onClickButtonUpdate();
    
    this.#form = this.#modalBody.querySelector('.cart-form');
    this.#form.addEventListener('submit', (event) => {
        this.onSubmit(event);
      });
  }

  cartTemplate() {
    let cartTemplate = createElement('<div></div>');
    this.cartItems.forEach(cartItem =>
      cartTemplate.append(this.renderProduct(cartItem.product, cartItem.count)));   
    cartTemplate.append(this.renderOrderForm());
    
    return cartTemplate;
  }

  onClickButtonUpdate() {
    this.#modalBody.addEventListener('click', (event) => {
      if(event.target.closest('.cart-counter__button_minus')) {
        this.updateProductCount((event.target.closest('.cart-product').dataset.productId), -1);
      } else
      if(event.target.closest('.cart-counter__button_plus')) {
        this.updateProductCount((event.target.closest('.cart-product').dataset.productId), 1);
      }
    });
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(cartItem =>
      cartItem.product.id == productId);

    if(amount == 1) {
      cartItem.count++;
    } else if(amount == -1){
      cartItem.count--;
      if(cartItem.count == 0) {
        let indexCartItem = this.cartItems.indexOf(cartItem);
        this.cartItems.splice(indexCartItem, 1);
      }
    }
    this.onProductUpdate(cartItem);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    let productId = cartItem.product.id;
    if(document.body.classList.contains('is-modal-open')) {
      let productCount = this.#modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`); 
      let productPrice = this.#modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`); 
      let infoPrice = this.#modalBody.querySelector(`.cart-buttons__info-price`); 

      if(!this.getTotalCount()) {
        this.#modal.close();
      } else
      if(!cartItem.count) {
        this.#modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      } else {
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.#modalBody.querySelector(`[type="submit"]`).classList.add('is-loading');
    let response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(this.#form)
    });

    if(response) {
      this.#modal.setTitle('Success!');
      this.cartItems.splice(0,);
      this.#modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`));
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
