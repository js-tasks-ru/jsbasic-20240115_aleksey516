import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;
  products = [];
  productsGridInner = null;
  filters = {};

  constructor(products) {
    this.products = products || this.products;
    this.elem = this.createProductGrid() || this.elem;
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: ''
    };
    this.renderCards(this.products);
  }

  createProductGrid() {
    return new createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
    `);
  }

  renderCards(products) {
    this.productsGridInner = this.elem.querySelector('.products-grid__inner');
    this.productsGridInner.textContent = '';

    products.forEach(product =>
      this.productsGridInner.append(new ProductCard(product).elem));
  }

  updateFilter(filters) {
    for(let key in filters) {
      this.filters[key] = filters[key];
    }
    this.renderCards(this.filterProducts());
  }

  filterProducts() {
    return this.products.filter(product => 
      (this.filters.noNuts == !product.nuts || !this.filters.noNuts || this.filters.noNuts == undefined)&&
      (this.filters.vegeterianOnly == product.vegeterian || !this.filters.vegeterianOnly)&&
      (this.filters.maxSpiciness >= product.spiciness)&&
      (this.filters.category == product.category || this.filters.category == '' || this.filters.category == undefined));
  }    
}
