import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;
  #categories = [];
  #arrowLeft = null;
  #arrowRight = null;
  #ribbonInner = null;

  constructor(categories) {
    this.#categories = categories ||this.#categories;
    this.elem = this.#createRibbonRoot(categories) || this.elem;
    this.#initRibbon();
    this.#renderButtons();
    this.#renderCategories();
  }

  #createRibbonRoot(categories) {
    return createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        <a href="#" class="ribbon__item ribbon__item_active" data-id="${this.#categories[0].id}">${this.#categories[0].name}</a>
        ${this.#categories.slice(1,).map((category) =>
           `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`)
          .join('')}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `);
  }

  #initRibbon() {
    this.#ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.#arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.#arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    
    this.elem.addEventListener('click', (event) => this.#moveRibbon(event));
  }

  #moveRibbon(event) {
    if(event.target.closest('.ribbon__arrow_left')) {
      this.#ribbonInner.scrollBy(-350, 0);
    }
    else if(event.target.closest('.ribbon__arrow_right')) {
      this.#ribbonInner.scrollBy(350, 0);
    }
  }

  #renderButtons() {
    this.#ribbonInner.addEventListener('scroll', () => {
      this.#ribbonInner.scrollLeft == 0 ?
       this.#arrowLeft.classList.remove('ribbon__arrow_visible') :
        this.#arrowLeft.classList.add('ribbon__arrow_visible');

      (this.#ribbonInner.scrollWidth - this.#ribbonInner.scrollLeft - this.#ribbonInner.clientWidth) < 1 ?
        this.#arrowRight.classList.remove('ribbon__arrow_visible') :
         this.#arrowRight.classList.add('ribbon__arrow_visible');
    })
  }

  #renderCategories() {
    this.#ribbonInner.addEventListener('click', (event) => {
      event.preventDefault();
      let ribbonItemActive = this.#ribbonInner.querySelector('.ribbon__item_active');
      if(ribbonItemActive) {
        ribbonItemActive.classList.remove('ribbon__item_active');
      }
      event.target.classList.add('ribbon__item_active');

      this.#addCustomEvent(event);
    });
  }

  #addCustomEvent(event) {
    let _customEvent = new CustomEvent('ribbon-select',
      {detail: event.target.dataset.id,
      bubbles: true})

    this.elem.dispatchEvent(_customEvent);
  }
}
