import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  slides = [];

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
    const carousel = this.elem;
    const arrowRight = carousel.querySelector('.carousel__arrow_right');
    const arrowLeft = carousel.querySelector('.carousel__arrow_left');
    const slideQuant = carousel.querySelectorAll('.carousel__slide').length;
    let counterSlidePos = 0;
      
    function carouselMove(event) {
      const carouselInner = carousel.querySelector('.carousel__inner');
      const slidelWidth = carousel.querySelector('.carousel__slide').offsetWidth;
    
      if(event.target.closest('.carousel__arrow_right')) {
        carouselInner.style.transform = `translateX(${-slidelWidth * (counterSlidePos + 1)}px)`;
        counterSlidePos++;
      } else if(event.target.closest('.carousel__arrow_left')) {
        counterSlidePos--;
        carouselInner.style.transform = `translateX(${-slidelWidth * counterSlidePos}px)`;
      }
      counterSlidePos == 0 ? arrowLeft.style.display = 'none' : arrowLeft.style.display = '';
      counterSlidePos == (slideQuant - 1) ? arrowRight.style.display = 'none' : arrowRight.style.display = '';
    }
    
    arrowLeft.style.display = 'none';
    carousel.addEventListener('click', (event) => carouselMove(event));
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