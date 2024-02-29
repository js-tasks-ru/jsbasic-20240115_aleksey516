export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(cartItem =>
       cartItem.product.id == productId);
    if(amount == 1) {
      cartItem.count++;
    } else {
      cartItem.count--;
      if(cartItem.count == 0) {
        let indexCartItem = this.cartItems.indexOf(cartItem);
        this.cartItems.splice(indexCartItem, 1);
      }
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

