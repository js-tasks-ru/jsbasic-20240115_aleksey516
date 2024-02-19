import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps = 0;
  #value = 0;
  #segments = 0;
  #valuePercents = 0;
  #thumb = null;
  #progress = null;
  #sliderValue = null;
  #sliderIsMoved = false;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#segments = this.#steps - 1;
    this.#valuePercents = this.#value / this.#segments * 100;

    this.elem = this.#createRootSlider() || this.elem;
    this.#initSlider();
    this.#renderOnClick();
    this.#renderOnPointer();
  }

  #createRootSlider() {
    let spanArr = [];      
    for(let i=0; i<this.#steps; i++) {
      spanArr.push(`<span data-id="${i}"></span>`);
    }
    return new createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: ${this.#valuePercents}%;">
          <span class="slider__value">${this.#value}</span>
        </div>
          <div class="slider__progress" style="width: ${this.#valuePercents}%;"></div>
          <div class="slider__steps">
          ${spanArr.join('')}
        </div>
      </div>
    `);
  }

  #initSlider() {
    this.#thumb = this.elem.querySelector('.slider__thumb');
    this.#progress = this.elem.querySelector('.slider__progress');
    this.#sliderValue = this.elem.querySelector('.slider__value');

    this.elem.querySelector(`[data-id="${this.#value}"]`).classList.add('slider__step-active');
  }

  #renderOnClick() {
    this.elem.addEventListener('click', (event) => {
      if(event.target.closest('.slider')) {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
        let approximateValue = leftRelative * this.#segments;
        let _value = Math.round(approximateValue);

        if(this.#value != _value) {
          this.#value = _value;
          this.#moveSlider();
          this.#addCustomEvent();
          this.#sliderIsMoved = false;
        }
      }
    });
  }

  #renderOnPointer() {
    this.#thumb.addEventListener('pointerdown', this.#onDownPointer);
  }
  
  #onDownPointer = () => {
    document.addEventListener('pointermove', this.#onMovePointer);
    document.addEventListener('pointerup', this.#onUpPointer, {
      once: true
    });
  }
  
  #onMovePointer = (event) => {
    this.elem.classList.add('slider_dragging');
    let sliderRect = this.elem.getBoundingClientRect();

    if(event.pageX > sliderRect.left && event.pageX < sliderRect.right) {
      let _left = event.clientX - sliderRect.left;
      let _leftRelative = _left / this.elem.offsetWidth;
      let _approximateValue = _leftRelative * this.#segments;
      let _valuePercents = _approximateValue / this.#segments * 100;
      
      this.#thumb.style.left = `${_valuePercents}%`;
      this.#progress.style.width = `${_valuePercents}%`;

      let _value = Math.round(_approximateValue);

        if(this.#value != _value) {
          this.#value = _value;
        }
    }
  }
  
  #onUpPointer = () => {
    this.#moveSlider();
    document.removeEventListener('pointermove', this.#onMovePointer);
    this.elem.classList.remove('slider_dragging');
    
    if(this.#sliderIsMoved) {
      this.#addCustomEvent();
    }
    this.#sliderIsMoved = false;
  }

  #moveSlider() {
    this.#valuePercents = this.#value / this.#segments * 100;
    
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    this.elem.querySelector(`[data-id="${this.#value}"]`).classList.add('slider__step-active');

    this.#sliderValue.textContent = this.#value;
    this.#thumb.style.left = `${this.#valuePercents}%`;
    this.#progress.style.width = `${this.#valuePercents}%`;

    this.#sliderIsMoved = true;
  }

  #addCustomEvent() {
    let _customEvent =
      new CustomEvent(
          'slider-change',
          {detail: this.#value,
          bubbles: true}
      );
    this.elem.dispatchEvent(_customEvent);
  } 
}
