import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  slides = [];
  carouselInner = {};
  arrowLeft = {};
  arrowRight = {};
  slidelWidth = 0;
  slideQuant = 0;
  counterSlidePos = 0;

  constructor(slides) {
    this.slides = slides || this.slides;
    this.elem = this.createRootCarusel(slides);
    this.initCarousel();
    this.render();
  }

  createRootCarusel(slides) {
    return createElement(`
    <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
  
      <div class="carousel__inner">
        ${this.slides.map((slide) => this.createSlide(slide)).join('')}
      </div>
    </div>
    `);
  }

  createSlide(slide) {
    return `
    <div class="carousel__slide" data-id=${slide.id}>
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `;
  }

  initCarousel() {
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.slideQuant = this.elem.querySelectorAll('.carousel__slide').length;

    this.arrowLeft.style.display = 'none';
    this.elem.addEventListener('click', (event) => this.carouselMove(event));
  }

  carouselMove(event) {
    this.slidelWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
  
    if(event.target.closest('.carousel__arrow_right')) {
      this.carouselInner.style.transform = `translateX(${-this.slidelWidth * (this.counterSlidePos + 1)}px)`;
      this.counterSlidePos++;
    } else if(event.target.closest('.carousel__arrow_left')) {
      this.counterSlidePos--;
      this.carouselInner.style.transform = `translateX(${-this.slidelWidth * this.counterSlidePos}px)`;
    }
    this.counterSlidePos == 0 ? this.arrowLeft.style.display = 'none' : this.arrowLeft.style.display = '';
    this.counterSlidePos == (this.slideQuant - 1) ? this.arrowRight.style.display = 'none' : this.arrowRight.style.display = '';
  }
    
  render() {
    this.elem.addEventListener('click', (event) => {
      if(event.target.closest('.carousel__button')) {
        this.addCustomEvent(event);}})
  }

  addCustomEvent(event) {
    const slideId = event.target.closest('.carousel__slide').dataset.id;
    const _customEvent = new CustomEvent("product-add", {
                          detail: slideId,
                          bubbles: true
                        });
    this.elem.dispatchEvent(_customEvent);
  }
}